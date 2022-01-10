const Player = require('../lib/Player');
const Potion = require('../lib/Potion');

jest.mock('../lib/Potion');

console.log(new Potion());

// test Player obj creation
test('create a Player object', () => {
    // create a new Player obj with name prop = Dave
    const player = new Player('Dave');
    
    // checks if player obj has a name that is our param
    expect(player.name).toBe('Dave');
    // check it health, strength, and agility props exist & have number values
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    // check that it has an inventory that is array and array has object in it
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
});

// test Player obj method getStats() which returns data
test("gets the Player's stats as an object", () => {
    const player = new Player('Dave');

    // checks if stats obj has potions, health, strength, agility properties
    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

// test Player obj has method getInventory(), which return inventory and should be arr
test('gets inventory from player or returns false', () => {
    const player = new Player('Dave');
    // check that getInventory method returns array (should have values on creation)
    expect(player.getInventory()).toEqual(expect.any(Array));

    // set inventory prop to empty arr to check false return
    player.inventory = [];
    // check that empty arr in inventory prop returns false when getInventory method is called
    expect(player.getInventory()).toEqual(false);
})
