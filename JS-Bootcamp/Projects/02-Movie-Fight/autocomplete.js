const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
    root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
    `;

    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');

    //Gets the text in the input field
    const onInput = async event => {
        const items = await fetchData(event.target.value);

        //If the results are empty, closes the dropdown menu
        if (!items.length) {
            dropdown.classList.remove('is-active');
            return;
        }

        //Cleans the list from previous results
        resultsWrapper.innerHTML = '';

        //Adds the is-active class to the menu, so it drops
        dropdown.classList.add('is-active');

        for (let item of items) {
            const option = document.createElement('a');
            //Checks if the movie has a poster, and if not, assigns an empty string to it so that no errors pop up

            option.classList.add('dropdown-item')
            option.innerHTML = renderOption(item);

            //Closes the dropdown when an item in the list is clicked, and sets the input to show the movie title
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item);
            });

            resultsWrapper.appendChild(option);
        };
    };

    //Calls the debounce func, so that a request is sent only when there is .5 sec no input
    input.addEventListener('input', debounce(onInput, 500));

    document.addEventListener('click', event => {
        //Checks where the user has clicked
        // console.log(event.target);
        //Checks if the element that was clicked is not contained within the root element(list)
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active');
        }
    });
};