function test() {
    //querySelector works as a CSS selector
    const btn = document.querySelector('.hover-button');
    console.dir(btn);
    btn.addEventListener('mouseover', function(){alert("alert")});

    //textContent keeps the formatting from the HTML, shows some nested tags around text and hidden elements
    const h1 = document.querySelector('h1');
    console.log(h1.textContent);

    //innerText gets the text from the selected element with standard formatting
    const ul = document.querySelector('ul');
    console.log(ul.innerText);

    //innerHTML gets the text and all nested tags, even if there is no text
    const form = document.querySelector('form');
    console.log(form.innerHTML);
    console.log(ul.innerHTML);
    
    //Different ways to get some attributes (they don't work correctly when called like this in this case)
    const inputs = document.querySelectorAll('input');
    //console.log(inputs[0].value); //Gets the string from the input
    //inputs[1].placeholder = 'Please enter password' //Changes placeholders
    //console.log(inputs[2].checked); //Returns boolean based on checkbox
    //console.log(inputs[3].value); //Returns the value of the range tag in the form

    const link = document.querySelector('a');
    console.log(link.href); //Gets the href from an 'a' tag

    const img = document.querySelector('img');
    console.log(img.src); //Gets the src of an 'img' tag
    
    //The best ways to get and/or change an attribute
    const range = document.querySelector('input[type="range"]');
    range.getAttribute('max');
    range.setAttribute('min', '-500');
    //range.setAttribute('type', 'radio'); //The type of an input can also be changed
    
    //Get parent/child elements
    const firstLi = document.querySelector('li');
    console.log(firstLi.parentElement);
    console.log(ul.children);
    const secondLi = firstLi.nextElementSibling; //Gets the next element from the same parent
    console.log(secondLi.previousElementSibling); //Gets the previous element from the same parent
    
    //Changes the content of all li's
    // const allLis = document.querySelectorAll('li');
    // for (let i = 0; i < allLis.length; i++) {
    //     allLis[i].innerText = 'changed'; 
    // }

    h1.style.color = 'red'; //Changes any CSS styles
    h1.style.backgroundColor = 'black'; //Style names must be camel cased, or they won't work

    const styles = getComputedStyle(firstLi); //Gets all current CSS styles
    console.log(styles.color);
    
    const todo = document.querySelector('#todos .todo');
    console.log(todo.classList); //Gets all of the classes from an element
    todo.classList.toggle('done'); //Toggles a class and adds/removes it without affecting other classes

    //Create a new element, add properties to it, and then append as a last child
    const h3 = document.createElement('h3');
    h3.innerText = 'New h3';
    h3.classList.add('special');
    link.appendChild(h3);

    const newLi = document.createElement('li');
    newLi.innerText = 'New li'
    //ul.insertBefore(newLi, secondLi); //Inserts the new element before the specified one
    //ul.insertAdjacentElement("afterbegin", newLi); //Inserts the new element depending on keyword
    //ul.append(newLi, secondLi); //Appends the specified elements
    ul.prepend(newLi, secondLi); //Inserts the specified elements at the start of the element

    const newUl = document.querySelector('section ul');
    const toBeRemoved = newUl.querySelector('.special');
    //const deleted = newUl.removeChild(toBeRemoved); //Removes the specified child from the parent, can be kept in a variable
    toBeRemoved.remove(); //Removes the specified element anywhere in the document
}
test();