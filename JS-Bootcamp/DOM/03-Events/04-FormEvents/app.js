const form = document.querySelector('#signup-form');
const card = document.querySelector('#credit-card');
const termsCheck = document.querySelector('#terms');
const veggieSelect = document.querySelector('#veggie');

form.addEventListener('submit', function (e) {
    alert('Submitted the form');
    e.preventDefault(); //Prevents the default behaviour - no data was submitted
    console.log('cc', card.value); //Gets the value of the input field
    console.log('terms', termsCheck.checked); //Gets true/false based on checked/unchecked
    console.log('veggie', veggieSelect.value); //Gets the submitted value from the select tag
});

//Gather information from the form as it is being changed, before the user submits it
const formData = {};

//Flexible and works with different named forms
for (let input of [card, termsCheck, veggieSelect]) {
    input.addEventListener('input', ({target}) => { //'change' works like 'input' for text fields, but it updates only if the focus is changed or enter is pressed
        const {name, type, value, checked} = target;
        formData[name] = type === 'checkbox' ? checked : value;
    });
}

//Works but is not flexible
// card.addEventListener('input', (e) => {
//     console.log('CC Changed', e);
//     formData['cc'] = e.target.value;
// });

// termsCheck.addEventListener('input', (e) => {
//     console.log('Checkbox', e);
//     formData['agreedToTerms'] = e.target.checked;
// });

// veggieSelect.addEventListener('input', (e) => {
//     console.log('Veggie Changed', e);
//     formData['veggie'] = e.target.value;
// });