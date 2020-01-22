
axios.get('https://swapi.co/api/planets/')
.then((res) => {
    console.log(res.data);
}) //Parses JSON
.catch((err) => { 
    console.log(err);
}); //Catches HTTP errors manualy