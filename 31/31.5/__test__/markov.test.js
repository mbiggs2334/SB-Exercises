const { MarkovMachine } = require('../markov');
const mm = new MarkovMachine(`i can't believe it's not butter`);

describe('test MarkovMachine class', () => {

    describe('test MM instance creation values', () => {

        test('MM.word is Array', () => {
            expect(mm.words).toEqual(expect.any(Array));
        });

        test('Array elements are strings', () => {
            for(let i = 0; i < mm.words.length; i++){
                expect(mm.words[i]).toEqual(expect.any(String));
            };
        });

    });

    describe('test MM methods', () => {

        test('test MM.makeText() to output string', () => {
            expect(mm.makeText()).toEqual(expect.any(String));
        });

        test('test MM.makeTest() ends with last array value', () => {
            expect(mm.makeText().indexOf(mm.words[mm.words.length - 1])).not.toEqual(-1);
        });

    });

});