const lib = require('../lib');
const db = require('../db');
const mail = require('../mail')
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

// Exceptions
describe('registerUser', () => {
    it("it should throw if username is falsy(null, undefined, nan, '', 0, false ", () => {
        const args = [null, undefined, NaN, '', 0, false]
        args.forEach(arg => {
             expect(() => { lib.registerUser(arg) }).toThrow()
        })   
    }) 

    it('should return a user object if valid username is passed', () => {
        const result = lib.registerUser( 'will')
        expect(result).toMatchObject({ username: 'will' })
        console.log('id:' + result.id)
        expect(result.id).toBeGreaterThan(0)
    })
});

describe('applyDiscount', () => {
    db.getCustomerSync = function (customerId) {
        console.log('Fake reading customer')
        return { id: customerId, points: 20 };
    }

    const order = { customerId: 1, totalPrice: 10 };  
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
})

describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {
        // const mockFunction = jest.fn();
        // mockFunction();
        // // mockFunction.mockReturnValue(1); //
        // // mockFunction.mockResolveValue(1); //
        // mockFunction.mockRejectValue(new Error('....'));//
        // const result = mockFunction()
        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });
        mail.send = jest.fn();
        lib.notifyCustomer({ customerId: 1 });
        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a')
        expect(mail.send.mock.calls[0][1]).toMatch(/order/)

    })
})
