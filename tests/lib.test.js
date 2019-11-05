const lib = require('../lib');
//Calculate execution paths and make sure test covers all paths.

test('absolute - should return a positive number if input is positive.', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
});

test('absolute - should return a positive number if input is negative.', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
});

test('absolute - should return 0  if input is 0.', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
});