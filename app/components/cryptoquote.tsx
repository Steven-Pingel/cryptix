import { useState } from "react";
import { alphaRegex, splitToAlphas } from "~/common/utlities";
import LetterInput from "./letterInput";
import StaticCharacter from "./staticCharacter";
import WhiteSpace from "./whiteSpace";

interface CryptoquoteProps {
    cryptoquote: string,
    author: string
}

const Cryptoquote = ({ cryptoquote, author }: CryptoquoteProps) => {
    const initialKey = new Map();
    splitToAlphas(cryptoquote)
        .map(entry => initialKey.has(entry) || initialKey.set(entry, ''));

    const [cryptoKey, setCryptoKey] = useState<Map<string, string>>(initialKey);

    const onCharacterChange = (cryptoLetter: string, letter:string) => {
        setCryptoKey(key => new Map(key.set(cryptoLetter, letter)));
    }

    const characterComponents = cryptoquote
        .trim().split('')
        .map((char, index) => {
            if (char.match(alphaRegex)) {
                return <LetterInput key={`${char}-${index}`} cryptoLetter={char} onChange={onCharacterChange} cryptoKey={cryptoKey} />;
            }

            if (char !== ' ') {
                return <StaticCharacter key={`static-${index}`} character={char} />
            }

            return <WhiteSpace key={`ws-${index}`} />;
        });

    return (
        <>
            {characterComponents}
            <div>Author - {author}</div>
        </>
    )
}

export default Cryptoquote;