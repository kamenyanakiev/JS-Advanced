const {
	Engine,
	Render,
	Runner,
	World,
	Bodies
} = Matter;

const cells = 3;
const width = 600;
const height = 600;

const unitLength = width / cells;
const unitHeight = height / cells;

//Creates the enviornment
const engine = Engine.create();
const {
	world
} = engine;
const render = Render.create({
	element: document.body,
	engine: engine,
	options: {
		wireframes: false,
		width,
		height
	}
});

Render.run(render);
Runner.run(Runner.create(), engine);

//Creates a shape to be placed into the enviornment, it accepts single shapes and arrays
//Properties: px from x, px from y, width, height

//Walls
const walls = [
	Bodies.rectangle(width / 2, 0, width, 2, {
		isStatic: true
	}),
	Bodies.rectangle(0, height / 2, 2, height, {
		isStatic: true
	}),
	Bodies.rectangle(width / 2, height, width, 2, {
		isStatic: true
	}),
	Bodies.rectangle(width, height / 2, 2, height, {
		isStatic: true
	})
];

World.add(world, walls);

//Maze generation

const shuffle = (arr) => {
	let counter = arr.length;
	//Randomizes the pathing of the maze
	while (counter > 0) {
		const index = Math.floor(Math.random() * counter);
		counter--;
		const temp = arr[counter];
		arr[counter] = arr[index];
		arr[index] = temp;
	}
	return arr;
};

//Fills the grid, vertical and horizontal walls
const grid = Array(cells).fill(null).map(() => Array(cells).fill(false));
//console.log(grid);

const verticals = Array(cells).fill(null).map(() => Array(cells - 1).fill(false));
const horizontals = Array(cells - 1).fill(null).map(() => Array(cells).fill(false));
// console.log(verticals);
// console.log(horizontals);

//Select a random cell from the grid to start from
const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

//Generate the maze by updating grid, horizontals and verticals
const stepThroughCell = (row, column) => {
	if (grid[row][column]) {
		return;
	}

	grid[row][column] = true;

	const neighbours = shuffle([
		[row - 1, column, 'up'],
		[row, column + 1, 'right'],
		[row + 1, column, 'down'],
		[row, column - 1, 'left']
	]);
	//console.log(neighbours);

	for (let neighbour of neighbours) {
		const [nextRow, nextColumn, direction] = neighbour;
		//Check if that neighbour is out of bounds
		if (nextRow < 0 || nextRow >= cells || nextColumn < 0 || nextColumn >= cells) {
			continue;
		}
		//Check if that neighbour was visited, continue to next
		if (grid[nextRow][nextColumn]) {
			continue;
		}
		//Remove vertical or horizontal wall
		if (direction === 'left') {
			verticals[row][column - 1] = true;
		} else if (direction === 'right') {
			verticals[row][column] = true;
		} else if (direction === 'up') {
			horizontals[row - 1][column] = true;
		} else if (direction === 'down') {
			horizontals[row][column] = true;
		}

		stepThroughCell(nextRow, nextColumn);
	};
};

stepThroughCell(startRow, startColumn);

//Drawing the walls in the canvas
horizontals.forEach((row, rowIndex) => {
	row.forEach((open, columnIndex) => {
		if (open) {
			return;
		}
		const wall = Bodies.rectangle(
			columnIndex * unitLength + unitLength / 2,
			rowIndex * unitLength + unitLength,
			unitLength,
			5,
			{
				isStatic: true
			}
		);
		World.add(world, wall);
	});
});

verticals.forEach((row, rowIndex) => {
	row.forEach((open, columnIndex) => {
		if (open) {
			return;
		}
		const wall = Bodies.rectangle(
			columnIndex * unitLength + unitLength,
			rowIndex * unitLength + unitLength / 2,
			5,
			unitLength,
			{
				isStatic: true
			}
		);
		World.add(world, wall);
	});
});

//Creates the goal
const goal = Bodies.rectangle(
	width - unitLength / 2,
	height - unitLength / 2,
	unitLength * 0.7,
	unitLength * 0.7,
	{
		isStatic: true
	} 
);

World.add(world, goal);

//Creates player ball
const ball = Bodies.circle(
	unitLength / 2,
	unitLength / 2,
	unitLength / 4,
	{
		isStatic: true
	}
);

World.add(world, ball);