class Pet {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    };

    eat() {
        return `${this.name} is eating`
    };
}

//Extends parent class
class Cat extends Pet {
    constructor(name, age, livesLeft = 9) {
        //Extends any parameters from the parent class, without needing to specify them again with this
        super(name, age);
        this.livesLeft = livesLeft;
    }

    meow() {
        return 'Meow';
    };
}

class Dog extends Pet {
    bark() {
        return 'Woof';
    };
}

const monty = new Cat('Monty', 9);
const wyatt = new Dog('Wyatt', 12);