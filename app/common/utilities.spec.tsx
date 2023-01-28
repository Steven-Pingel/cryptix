import { generateCryptoQuote } from "./utlities";

describe('Utilities', () => {
    it('should generate an equal length cryptostring', () => {
        const testString = "All good things come to those who don't poop the bed."
        const result = generateCryptoQuote(testString);

        expect(result.length).toBe(testString.length);
        expect(result).not.toEqual(testString);
    })

    it('should leave punctuation where it belongs', () => {
        const testString = "All good things come to those who don't poop the bed."
        const index1 = testString.indexOf('\'');
        const index2 = testString.indexOf('.');
        const result = generateCryptoQuote(testString);

        const arr = result.split('');
        expect(arr[index1]).toEqual('\'');
        expect(arr[index2]).toEqual('.');
    });

    it('should substitute values correctly', () => {
        const testString = "AABBCC"
        const result = generateCryptoQuote(testString);

        const resultStringArr = result.split('');
        expect(resultStringArr[0]).toEqual(resultStringArr[1]);
        expect(resultStringArr[2]).not.toEqual(resultStringArr[1]);
        
        expect(resultStringArr[2]).toEqual(resultStringArr[3]);
        
        expect(resultStringArr[4]).toEqual(resultStringArr[5]);
    }) 
});