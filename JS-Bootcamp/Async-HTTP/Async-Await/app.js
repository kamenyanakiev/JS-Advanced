//Async
async function greet() {
    return 'Hello';
} ;

//async functions return a promise, so .then() and .catch() can be used on it
greet().then((val) => {
    console.log(`Promise resolved with: ${val}`);
});

async function add(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') { //For a promise to be rejected with async, it needs a throw
        throw 'X and Y must be numbers';
    } else {
        return x + y; //Return always resolves the promises in async
    }
};

add('s', 5)
.then((val) => {
    console.log(`Promise resolved with ${val}`);
})
.catch(err => {
    console.log(`Promise rejected with ${err}`);
});

//Await
async function getPlanets() {
    try { //Tries the request, if there are no errors, runs the code
        const res = await axios.get('https://swapi.co/api/planets/'); //await puts a stop to the execution of the code until the promise is resolved
        //await can only be used in an async function
        console.log(res.data);
    } catch (e) { //Catches for errors in the request, if any are cought, runs the code
        console.log(`In catch ${e}`);
    };
};

getPlanets();

//Paraller and Sequential requests

//Sequential requests - waits for each request to be completed, before sending off the next one

async function getThreePokemon() {
    const pokeOne = await axios.get('https://pokeapi.co/api/v2/pokemon/1'); //By placing await there, the value is stored in the variable and can be accessed
    const pokeTwo = await axios.get('https://pokeapi.co/api/v2/pokemon/2');
    const pokeThree = await axios.get('https://pokeapi.co/api/v2/pokemon/3');
    // console.log(pokeOne.data);
    // console.log(pokeTwo.data);
    // console.log(pokeThree.data);
}

//Parallel requests - sends off the requests one after the other independantly
//-> Parallel requests are faster than sequential request, and are a better practice when one request does not rely on another

async function getThreePokemon() {
    const promOne = axios.get('https://pokeapi.co/api/v2/pokemon/1'); //This does not store the value, since await is not there
    const promTwo = axios.get('https://pokeapi.co/api/v2/pokemon/2');
    const promThree = axios.get('https://pokeapi.co/api/v2/pokemon/3');
    const pokeOne = await promOne; //This stores the value in a variable, after which it can be accessed
    const pokeTwo = await promTwo;
    const pokeThree = await promThree;
    // console.log(pokeOne.data);
    // console.log(pokeTwo.data);
    // console.log(pokeThree.data);
}

//Promise helper method

async function getThreePokemon() {
    const promOne = axios.get('https://pokeapi.co/api/v2/pokemon/1');
    const promTwo = axios.get('https://pokeapi.co/api/v2/pokemon/2');
    const promThree = axios.get('https://pokeapi.co/api/v2/pokemon/3');
    const results = await Promise.all([promOne, promTwo, promThree]); //Does the same as the above, but stores the results in an array
    //console.log(results);
    printPokemon(results);
}

function printPokemon(results) {
    for (let pokemon of results) {
        console.log(pokemon.data.name);
    }
}

getThreePokemon();