class Color {
    //Classes always need a constructor
    constructor(r, g, b, name) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name;
        this.calcHSL();
    };

    //Methods can be added on classes
    hex() {
        const { r, g, b } = this;
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };

    //Destructures and returns the colors, so that they are not destructured under multiple methods
    innerRGB() {
        const {
            r,
            g,
            b
        } = this;
        return `${r}, ${g}, ${b}`;
    };

    //Calls the destructuring method and returns the rgb in the correct format
    rgb() {
        return `rgb(${this.innerRGB()})`;
    };

    rgba(a = 1.0) {
        return `rgba(${this.innerRGB()}, ${a})`;
    };

    hsl() {
        const { h, s, l } = this;
        return `hsl(${h},${s}%,${l}%)`
    };

    opposite() {
        const { h, s, l } = this;
        const newHue = (h + 180) % 360;
        return `hsl(${newHue},${s}%,${l}%)`  
    };

    fullSaturation() {
        const { h, l } = this;
        return `hsl(${h},100%,${l}%)`
    };

    //Calculates HSL color values
    calcHSL() {
        let { r, g, b } = this;
        r /= 255;
        g /= 255;
        b /= 255;

        // Find greatest and smallest channel values
        let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
        if (delta == 0) h = 0;
        else if (cmax == r)
            // Red is max
            h = ((g - b) / delta) % 6;
        else if (cmax == g)
            // Green is max
            h = (b - r) / delta + 2;
        else
            // Blue is max
            h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        // Make negative hues positive behind 360°
        if (h < 0) h += 360;
        // Calculate lightness
        l = (cmax + cmin) / 2;

        // Calculate saturation
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        // Multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
        this.h = h;
		this.s = s;
		this.l = l;
    };

}

const c1 = new Color(12, 57, 132, 'firstColor');
const c2 = new Color(255, 255, 255, 'white');