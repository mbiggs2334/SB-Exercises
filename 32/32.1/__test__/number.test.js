const NumbersArray = require('../number');

describe('test NumbersArray Class', () => {

    const stringNumbers = '5,1,2,4,3';
    const numArray = new NumbersArray(stringNumbers);

    test('test getMean() function', () => {
        expect(numArray.mean).toEqual(3);
    });

    test('test getMedian() function', () => {
        expect(numArray.median).toEqual(3);
    });

    test('test getMode() function', () => {
        expect(numArray.mode).toEqual(1);
    });

});