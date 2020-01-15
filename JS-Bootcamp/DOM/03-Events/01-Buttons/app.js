const clicker = document.querySelector('#clicker');

//Adds an event, if there is a repeating event, only the most recent will get applied, like CSS properties
clicker.onclick = function () {
    console.log('clicked');
};

clicker.ondblclick = function () {
    console.log('double click');
};

//addEventListener is better way to add events, and there can be multiple events of the same type
clicker.addEventListener('click', function() {
    alert('Alert');
})

clicker.addEventListener('mouseover', function() {
    clicker.innerText = 'Stop';
})

clicker.addEventListener('mouseout', function() {
    clicker.innerText = 'Click Me';
})

window.addEventListener('scroll', function() {
    console.log('stop scrolling');
})

//Create a moving button, depending on window size
const movingBtn = document.querySelector('#moving');

movingBtn.addEventListener('mouseover', function () {
    console.log('moused over');
    const y = Math.floor(Math.random() * window.innerHeight);
    const x = Math.floor(Math.random() * window.innerWidth);
    movingBtn.style.left = `${x}px`;
    movingBtn.style.top = `${y}px`;
});

movingBtn.addEventListener('click', function() {
    movingBtn.innerText = 'Got me';
    document.body.style.backgroundColor = 'green';
});