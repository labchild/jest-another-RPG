const Enemy = require('../lib/Enemy');
const Potion = require('../lib/Potion');

jest.mock('../lib/Potion');

// test create an eemy obj
test('creates an enemy object', () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.name).toBe('goblin');
    expect(enemy.weapon).toBe('sword');

    expect(enemy.health).toEqual(expect.any(Number));
    expect(enemy.strength).toEqual(expect.any(Number));
    expect(enemy.agility).toEqual(expect.any(Number));
    expect(enemy.potion).toEqual(expect.any(Object));
});

// method tests
test("gets enemy's health value", () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.getHealth()).toEqual(expect.stringContaining(enemy.health.toString()));
});

test('checks if enemy is alive or not', () => {
    const enemy = new Enemy('goblin', 'sword');
    // enemy starts with health
    expect(enemy.isAlive()).toBeTruthy();

    enemy.health = 0;
    // reset health to 0 to check for falsy value
    expect(enemy.isAlive()).toBeFalsy();
});

test("subtracts from enemy's health", () => {
    // create enemy obj and a variable withh starting health (to check against method results)
    const enemy = new Enemy('goblin', 'sword');
    const oldHealth = enemy.health;

    // call method to test that it works
    enemy.reduceHealth(5);

    expect(enemy.health).toBe(oldHealth - 5);

    // call method to test health val never goes negative
    enemy.reduceHealth(9999);

    expect(enemy.health).toBe(0);
});

test("gets enemy's attack value", () => {
    const enemy = new Enemy('goblin', 'sword');
    enemy.strength = 10;

    expect(enemy.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(enemy.getAttackValue()).toBeLessThanOrEqual(15);
});

test('gets a description of the enemy', () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.getDescription()).toEqual(expect.stringContaining('goblin'));
    expect(enemy.getDescription()).toEqual(expect.stringContaining('sword'));
});