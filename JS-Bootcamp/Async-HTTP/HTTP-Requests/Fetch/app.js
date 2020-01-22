const checkStatusAndParse = (response) => {
    if (!response.ok) {
        throw new Error(`Status code error ${response.status}`)
    } else {
        return response.json();
    }
} //Checks if the url is valid

const printPlanets = (data) => {
    console.log('-> Loaded 10 more planets...');
    for (let planet of data.results){
        console.log(planet.name);
    }
    return Promise.resolve(data.next);
} //Prints the planets in the url, and returns a resolved promise, so that the code can keep running

const fetchNextPlanets = (url) => {
    return fetch(url);
} //Gets the url of the next 10 planets

//The commands can be chained as many times as required
fetch('https://swapi.co/api/planets/')
.then(checkStatusAndParse)
.then(printPlanets)
.then(fetchNextPlanets)
.then(checkStatusAndParse)
.then(printPlanets)
.catch((err) => {
    console.log('Something went wrong');
    console.log(err);
});