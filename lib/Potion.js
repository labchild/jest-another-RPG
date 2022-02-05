class Potion {
    constructor(name) {
        this.types = ['strength', 'agility', 'health'];
        // name prop will be param OR random index of this.types arr (if no param given, cuz it's after the name prop)
        this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

        if (this.name === 'health') {
            this.value = Math.floor(Math.random() * 10 + 30);
        } else {
            this.value = Math.floor(Math.random() * 5 + 7);
        }
    }
};

module.exports = Potion;