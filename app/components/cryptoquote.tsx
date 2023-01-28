import { useState } from "react";
import LetterInput from "./letterInput";
import StaticCharacter from "./staticCharacter";
import WhiteSpace from "./whiteSpace";

interface CryptoquoteProps {
    cryptoquote: string;
}

const Cryptoquote = ({ cryptoquote }: CryptoquoteProps) => {
    const alphaRegex = /^[A-Za-z]+$/;
    const initialKey = new Map();
    cryptoquote.split('')
        .filter(char => char.match(alphaRegex))
        .map(entry => initialKey.has(entry.toUpperCase()) || initialKey.set(entry.toUpperCase(), null));

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
        </>
    )
}

export default Cryptoquote;