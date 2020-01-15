const colors = ['red', 'blue', 'green', 'purple', 'orange', 'yellow', 'black'];

//Fills a section with boxes of different colors, and changes the color of the h1 based on the clicked box

const container = document.querySelector('#boxes');
const h1 = document.querySelector('h1');

const changeColor = function (event) {
    console.log(event);
    
    h1.style.color = this.style.backgroundColor;
    console.log(this.style.backgroundColor);
}

for (let color of colors) {
    const box = document.createElement('div');
    box.style.backgroundColor = color;
    box.classList.add('box');
    box.addEventListener('click', changeColor);
    container.appendChild(box);
};

//Key events

const input = document.querySelector(['#username']);

input.addEventListener('keydown', function (e) { //When any key is pressed
    console.log('keydown');
});

input.addEventListener('keyup', function (e) { //When any key is released
    console.log('keyup');
});

input.addEventListener('keypress', function (e) { //Only if something appears on the input field, including return
    console.log('key press');
});

//Create a list from an input field, generates it on the press of 'Enter'

const addItemInput = document.querySelector('#addItem');
const itemsUl = document.querySelector('#items');

addItemInput.addEventListener('keypress', function (e) {
    if (event.key === 'Enter') {
        if (!this.value) return;
        const newItemText = this.value;
        const newItem = document.createElement('li');
        newItem.innerText = newItemText;
        itemsUl.appendChild(newItem);
        this.value = '';
    }
});