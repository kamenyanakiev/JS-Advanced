const {
	Engine,
	Render,
	Runner,
	World,
	Bodies,
	Body,
	Events
} = Matter;

const cellsHorizontal = 14;
const cellsVertical = 10;
const width = parseInt(window.innerWidth);
const height = parseInt(window.innerHeight);

const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

//Creates the enviornment
const engine = Engine.create();
engine.world.gravity.y = 0;
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
const grid = Array(cellsVertical).fill(null).map(() => Array(cellsHorizontal).fill(false));
//console.log(grid);

const verticals = Array(cellsVertical).fill(null).map(() => Array(cellsHorizontal - 1).fill(false));
const horizontals = Array(cellsVertical - 1).fill(null).map(() => Array(cellsHorizontal).fill(false));
// console.log(verticals);
// console.log(horizontals);

//Select a random cell from the grid to start from
const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);

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
		if (nextRow < 0 || nextRow >= cellsVertical || nextColumn < 0 || nextColumn >= cellsHorizontal) {
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
			columnIndex * unitLengthX + unitLengthX / 2,
			rowIndex * unitLengthY + unitLengthY,
			unitLengthX,
			5,
			{
				label: 'wall',
				isStatic: true,
				render: {
					fillStyle: 'firebrick'
				}
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
			columnIndex * unitLengthX + unitLengthX,
			rowIndex * unitLengthY + unitLengthY / 2,
			5,
			unitLengthY,
			{
				label: 'wall',
				isStatic: true,
				render: {
					fillStyle: 'firebrick'
				}
			}
		);
		World.add(world, wall);
	});
});

//Creates the goal
const goal = Bodies.rectangle(
	width - unitLengthX / 2,
	height - unitLengthY / 2,
	unitLengthX * 0.7,
	unitLengthY * 0.7,
	{
		isStatic: true,
		label: 'goal',
		render: {
			fillStyle: 'forestgreen'
		}
	} 
);

World.add(world, goal);

//Creates player ball
const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
const ball = Bodies.circle(
	unitLengthX / 2,
	unitLengthY / 2,
	ballRadius,
	{
		label: 'ball',
		render: {
			fillStyle: 'lightskyblue'
		}
	}
);

World.add(world, ball);

document.addEventListener('keydown', event => {
	const { x, y } = ball.velocity;
	//Up
	if (event.keyCode === 87) {
		Body.setVelocity(ball, { x, y : y - 5 });
	}
	//Right
	if (event.keyCode === 68) {
		Body.setVelocity(ball, {x : x + 5, y});
	}
	//Left
	if (event.keyCode === 65) {
		Body.setVelocity(ball, {x : x - 5, y});
	}
	//Down
	if (event.keyCode === 83) {
		Body.setVelocity(ball, { x, y : y + 5 });
	}
});

//Win condition
Events.on(engine, 'collisionStart', event => {
	event.pairs.forEach((collision) => {
		const labels = [ 'ball', 'goal' ];
		if (labels.includes(collision.bodyA.label) && labels.includes(collision.bodyB.label)) {
			document.querySelector('.winner').classList.remove('hidden')
			world.gravity.y = 1;
			world.bodies.forEach((body) => {
				if (body.label === 'wall') {
					Body.setStatic(body, false);
				}
			});
		}
	});
});