const Potion = require('../lib/Potion');

// test we create a health potion
test('creates a health potion object', () => {
    // create a potion with our constructor, str is the name we wish to give it
    const potion = new Potion('health');

    // epect the new potion obj we made to have name we gave it (str/health)
    expect(potion.name).toBe('health');
    // expect the potion obj to have a prop called value with value as a number
    // this Number is a constructor
    expect(potion.value).toEqual(expect.any(Number));
});

// test we create a random potion
test('creates a random potion object', () => {
    // create random potion
    const potion = new Potion();

    // expect a random name
    expect(potion.name).toEqual(expect.any(String));
    // expect the name value (str) to exist
    expect(potion.name.length).toBeGreaterThan(0);
    // expect value prop to be a number
    expect(potion.value).toEqual(expect.any(Number));
});