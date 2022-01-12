const Character = require('./Character');
const Potion = require('../lib/Potion');

class Player extends Character {
    constructor(name = '') {
        super(name); 

        // assign properties
        this.inventory = [new Potion('health'), new Potion()];
    }

    // assign Player specific methods
    getStats() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    }

    getInventory() {
        if (this.inventory.length) {
            return this.inventory;
        }
        return false;
    }

    addPotion(potion) {
        this.inventory.push(potion);
    }

    usePotion(index) {
        // remove single potion from inventory arr at given index
        // splice removes it and makes arr of removed items, potion at [0] of this new arr is val of new var potion
        const potion = this.getInventory().splice(index, 1)[0];

        switch (potion.name) {
            case 'agility':
                this.agility += potion.value;
                break;
            case 'health':
                this.health += potion.value;
                break;
            case 'strength':
                this.strength += potion.value;
                break;
        }
    }
};

module.exports = Player;