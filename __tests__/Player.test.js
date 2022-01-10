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
})