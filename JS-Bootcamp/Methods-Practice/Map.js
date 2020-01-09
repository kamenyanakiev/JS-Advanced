function getId(array) {
    //Gets the id's of every object in the array
    let idArray = array.map(data => {
        return data.id;
    });
    console.log(idArray);
}

getId([{name:'one', id:111}, {name:'two', id:112}, {name:'three', id:113}]);