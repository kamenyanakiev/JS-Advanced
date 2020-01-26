//A new method can be created for a prototype, methods can also be overridden

String.prototype.yell = function () {
    return `${this.toLocaleUpperCase()}!!!`
};

//Factory functions
//Creates and returns an object, that has methods
//The methods get applied to every instance that the function is called, and have different references
function makeColor (r, g, b) {
    const color = {};
    color.r = r;
    color.g = g;
    color.b = b;
    color.rgb = function () {
        const {r, g, b} = this
        return `rgb(${r}, ${g}, ${b})`;
    }
    color.hex = function () {
        const {r, g, b} = this;
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    return color;
}

//Constructor functions and the new operator
function Color (r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
}

Color.prototype.rgb = function () { //Adds a method to the constructor, that can be accessed from the prototype object
    const {r, g, b} = this
    return `rgb(${r}, ${g}, ${b})`;
};

Color.prototype.hex = function () {
    const {r, g, b} = this;
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

Color.prototype.rgba = function (a = 1.0) {
    const {r, g, b} = this;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
//Unlike in the Factory functions, the methods here have the same reference since they are defined to the prototype

// const color1 = new Color(255, 40, 100);
// const color2 = new Color(0, 0, 0);