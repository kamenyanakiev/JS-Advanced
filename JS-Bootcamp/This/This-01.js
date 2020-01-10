function thisPractice() {
    const person = {
        first: 'Cherilyn',
        last: 'Sarkisian',
        nickName: 'Cher',

        fullName() {
            //Destructures the object using 'this'
            const {
                first,
                last,
                nickName
            } = this;
            return `${first} ${last } AKA ${nickName}`;
        },

        printBio() {
            const fullName = this.fullName();
            console.log(`${fullName} is a person.`)
        }
    };

    person.printBio();
    
    const annoyer = {
        phrases: ['HI', 'Hello', 'Hya', 'Ho', '!!!'],
        pickPhrase(){
            const {phrases} = this;
            const index = Math.floor(Math.random() * phrases.length);
            return phrases[index]
        },

        start() {
            console.log(this.pickPhrase());
            //Arrow functions do not change 'this', and it still refers to the object
            this.timerId = setInterval(() => {
                console.log(this.pickPhrase());
            }, 2000);
        },

        stop(){
            clearInterval(this.timerId);
            console.log(`It's over`);
        }
    };

    annoyer.start();
    //annoyer.stop(); to stop the printing
}

thisPractice();