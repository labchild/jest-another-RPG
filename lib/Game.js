const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
};

Game.prototype.initializeGame = function () {
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));

    this.currentEnemy = this.enemies[0];

    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
        // destrcuture name from prompt object
        .then(({ name }) => {
            this.player = new Player(name);
            console.log(`Hello, ${this.player.name}! Get ready to fight!`);
            this.startNewBattle();
        });
};

Game.prototype.startNewBattle = function () {
    // figure out who goes first based on agility stats
    // debugger;
    let userAgility = this.player.agility;
    let enemyAgility = this.currentEnemy.agility;

    if (userAgility > enemyAgility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    };

    // display player stats and enemy description
    console.log('Your stats are as follows:');
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());

    // fight!
    this.battle();
};

Game.prototype.battle = function () {
    // if player turn
    if (this.isPlayerTurn) {
        // prompt user to attack or use potion
        inquirer
            .prompt({
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['Attack', 'Use a potion']
            })
            .then(({ action }) => {
                // if potion
                if (action === 'Use a potion') {
                    // check that player has potions
                    if (!this.player.getInventory()) {
                        console.log("You don't have any potions!");
                        return this.checkEndOfBattle();
                    }

                    // display list of potions in player inventory (another prompt)
                    inquirer
                        .prompt({
                            type: 'list',
                            name: 'action',
                            message: 'Which potion would you like to use?',
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                        })
                        // apply selected potion to player obj
                        .then( ({ action }) => {
                            const potionDetails = action.split(': ');

                            this.player.usePotion(potionDetails[0] - 1);
                            console.log(`You used a ${potionDetails[1]} potion.`);
                            this.checkEndOfBattle();
                        });
                    
                } else {
                    // if attack, subtract health from enemy based on player attack val
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked the ${this.currentEnemy.name}.`);
                    console.log(this.currentEnemy.getHealth());
                    this.checkEndOfBattle();
                }
            });
    } else {
        // if enemy turn, subtract health from player based on enemy attack val
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were attacked by the ${this.currentEnemy.name}.`);
        console.log(this.player.getHealth());
        this.checkEndOfBattle();
    }
};

Game.prototype.checkEndOfBattle = function () {
    if (this.player.isAlive() && this.currentEnemy.isAlive()) {
        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle();
    } else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
        this.player.inventory.push(this.currentEnemy.potion);
        console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion.`);

        this.roundNumber++;

        if (this.roundNumber < this.enemies.length) {
            this.currentEnemy = this.enemies[this.roundNumber];
            this.startNewBattle();
        } else {
            console.log('You win!');
        }
    } else {
        console.log('You have been defeated!');
    }
};

module.exports = Game;