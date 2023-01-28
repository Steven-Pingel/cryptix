export const alphaRegex = /^[A-Za-z]+$/;

export const splitToAlphas = (string: string): string[] => {
    return string.split('')
        .filter(char => char.match(alphaRegex))
        .map(char => char.toUpperCase());
};

const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export const generateCryptoQuote = (quote: string) => {
    const quoteArr = quote.trim().toUpperCase().split('');
    const alphaArr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const shuffledArr = [...alphaArr];
    shuffle(shuffledArr);

    const key = new Map();
    alphaArr.forEach((alpha, index) => {
        key.set(alpha, shuffledArr[index])
    });

    const result: string[] = [];
    quoteArr.forEach(char => result.push(char.match(alphaRegex) ? key.get(char) : char))

    return result.join('');
};