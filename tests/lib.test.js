const lib = require('../lib');
/*
- Calculate execution paths and make sure test covers 
- Find balance between too generall and too specific
*/

// Numbers
describe('absolute', () => {
    it('It should return a positive number if input is positive.', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
    });

    it('It should return a positive number if input is negative.', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });

    it('It should return 0  if input is 0.', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });

})

// Strings
describe('greet', () => {
    it('should return the greeting message', () => {
      const result = lib.greet('will');
        expect(result).toMatch(/will/)
        expect(result).toContain('!')
    })
})

// Arrays
describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();

        // Not great way
        expect(result).toContain('USD');
        expect(result).toContain('AUD');

        //Better way
        expect(result).toEqual(expect.arrayContaining(['USD', 'EUR', 'AUD']))
    })
})

// Objects
describe('getProduct', () => {
    it('should return the product with given id', () => {
        const result = lib.getProduct(1);
        // 1. Attributes must match exactly
        // expect(result).toEqual({ id: 1, price: 10 })
        
        // 2. This just checks for the listed attributes 
        expect(result).toMatchObject({ id: 1, price: 200 })

        // 3. Checks for existence of specific attribute with provided value. TYPE MATTERS!
        expect(result).toHaveProperty('id', 1);
    })
})