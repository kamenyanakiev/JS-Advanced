function isTouching(a, b) {
	//Detects if the two images in the DOM are overlapping
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}

const avatar = document.querySelector('#player');
const coin = document.querySelector('#coin');
let scoreCounter = -1;

window.addEventListener('keyup', function (e) {
	//Checks for key that was let go, and moves avatar if it is valid
	if (e.key === 'ArrowDown' || e.key === 'Down') {
		moveVertical(avatar, 50);
	} else if (e.key === 'ArrowUp' || e.key === 'Up') {
		moveVertical(avatar, -50);
	} else if (e.key === 'ArrowRight' || e.key === 'Right') {
		moveHorizontal(avatar, 50);
		avatar.style.transform = 'scale(1, 1)'; //Flips avatar icon to the right
	} else if (e.key === 'ArrowLeft' || e.key === 'Left') {
		moveHorizontal(avatar, -50)
		avatar.style.transform = 'scale(-1, 1)'; //Flips avatar icon to the left
	}
	//If the avatar and coin are overlapping calls for the coin to move
	if (isTouching(avatar, coin)) moveCoin();
});

//Moves the avatar vertically
const moveVertical = (element, amount) => {
	const currTop = extractPos(element.style.top);
	element.style.top = `${currTop + amount}px`;
};

//Moves the avatar horizontally
const moveHorizontal = (element, amount) => {
	const currentLeft = extractPos(element.style.left);
	avatar.style.left = `${currentLeft + amount}px`;

};

//Gets the top or left position as a string, and returns it as a number without the 'px' at the end
const extractPos = (pos) => {
	if (!pos) return 100;
	return parseInt(pos.slice(0, -2));
};

//Moves the coin to a random place in the window
const moveCoin = () => {
	const x = Math.floor(Math.random() * window.innerWidth);
	const y = Math.floor(Math.random() * window.innerHeight);
	coin.style.top = `${y}px`;
	coin.style.left = `${x}px`;
	scoreCounter++;
	console.log(`Score: ${scoreCounter}`);
};

moveCoin();