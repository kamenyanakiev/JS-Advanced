const firtsReq = new XMLHttpRequest(); //Creates a request
firtsReq.addEventListener('load', function() {
    console.log('-> First request worked');
    const data  = JSON.parse(this.responseText);
    const filmURL = data.results[0].films[0];
    const filmRequest = new XMLHttpRequest(); //Chaining XML requests
    filmRequest.addEventListener('load', function() {
        console.log('--> Second request worked');
        const filmData = JSON.parse(this.responseText);
        console.log(filmData);
    });
    filmRequest.addEventListener('error', function(e) {
        console.log('Error', e);
    });
    filmRequest.open('GET', filmURL);
    filmRequest.send();
    // for (let planet of data.results) {
    //     console.log(planet.name);
    // } //Prints the names of all the planets in the result
}); //When it loads successfully
firtsReq.addEventListener('error', () => {
    console.log(`-> Didn't work`);
}); //On error
firtsReq.open('GET', 'https://swapi.co/api/planets/');
firtsReq.send(); //Before the request is sent, everything must be configured
console.log('Request sent');