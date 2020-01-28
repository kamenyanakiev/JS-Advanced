//Debounce function, can be applied anywhere
const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        //Sets a timeout of 1 sec for the request to be sent
        timeoutId = setTimeout(() => {
            //Calls the function with however many args there are passed into it, as seperate args
            func.apply(null, args);
        }, delay);
    };
};