const exercise = require('../exercise1')

describe('fizzBuzz', () => {
    it('should throw an exception if input is not a number', () => {
        const inputs = ['a', [1,2,3], null, undefined, {id: 'one'}, true]
        inputs.forEach(input => {
            expect(() => {exercise.fizzBuzz(input)}).toThrow() })
        //-------------------- OR --------------------
        // expect(() => exercise.fizzBuzz('a')).toThrow()
        // expect(() => exercise.fizzBuzz(null)).toThrow()
        // expect(() => exercise.fizzBuzz(undefined)).toThrow()
        // expect(() => exercise.fizzBuzz({name: 'will'})).toThrow()
        // expect(() => exercise.fizzBuzz(true)).toThrow()
    })

    it('should return FizzBuzz if input is divisible by 3 and 5', () => {
        const result = exercise.fizzBuzz(15)
        expect(result).toBe('FizzBuzz')
    })

    it('should return Fizz if input is only divisible by 3', () => {
        const result = exercise.fizzBuzz(3)
        expect(result).toBe('Fizz')
    })

    it('should return Buzz if input is only divisible by 5', () => {
        const result = exercise.fizzBuzz(5)
        expect(result).toBe('Buzz')
    })

    it('should return input if it is not divisible by 3 or 5', () => {
        const result = exercise.fizzBuzz(1)
        expect(result).toBe(1)
    })


})