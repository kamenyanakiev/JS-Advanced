//A function that returns a Promise
const makeDogPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const rand = Math.random();
            if (rand < 0.5) {
                resolve(); 
             } else {
                reject();
             }
        }, 5000);
    });
};

makeDogPromise().then(() => {
    console.log('Got a dog');
}).catch(() => {
    console.log('No dog');
});

const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
                const pages = {
                '/users': [
                    { id: 1, username: 'FirstUser' },
                    { id: 2, username: 'SecondUser' }
                ],
                '/about': 'This is the about page'
            };
            const data = pages[url];
            if (data) { //If the url is found within the pages object
                resolve({ status: 200, data });
            } else { //If the url is not found within the pages object
                reject({ status: 404 })
            }
            resolve({ status: 200, data });
        }, 1000);
    });
}

fakeRequest('/users')
    .then((res) => {
        console.log('Status code:', res.status);
        console.log('Data:', res.data);
        console.log('Worked');
    }).catch((res) => {
        console.log(res.status);
        console.log('Request failed');
    });