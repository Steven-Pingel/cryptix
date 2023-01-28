import { useEffect, useState } from "react";
import { alphaRegex, splitToAlphas } from "~/common/utlities";
import LetterInput from "./letterInput";
import StaticCharacter from "./staticCharacter";
import WhiteSpace from "./whiteSpace";

interface CryptoquoteProps {
    cryptoquote: string,
    author: string
}

const Cryptoquote = ({ cryptoquote, author }: CryptoquoteProps) => {
    const alphas = splitToAlphas(cryptoquote);

    const initialKey = new Map();
    alphas.map(entry => initialKey.has(entry) || initialKey.set(entry, ''));

    const [cryptoKey, setCryptoKey] = useState<Map<string, string>>(initialKey);

    const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key.match(alphaRegex)) {
            const emptyFields: HTMLInputElement | null = document.querySelector(`input[value=""]`);
            if (emptyFields) {
                emptyFields.focus();
            }
        }
    }

    useEffect(() => {
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keyup', handleKeyUp);
        }
    })

    const onCharacterChange = (cryptoLetter: string, letter: string) => {
        setCryptoKey(key => new Map(key.set(cryptoLetter, letter)));
    }

    const createWordComponents = (word: string) => {
        const words = word.split('').map((char, index) => {
            if (char.match(alphaRegex)) {
                return <LetterInput key={`${char}-${index}`} cryptoLetter={char} onChange={onCharacterChange} cryptoKey={cryptoKey} />;
            }

            return <StaticCharacter key={`static-${index}`} character={char} />

        });

        return (
            <>
                <div className="inline-block">
                    {words}
                </div>
                <WhiteSpace key={`ws-${word}`} />
            </>
        )
    }

    const wordComponents = cryptoquote
        .trim().split(' ')
        .map(word => createWordComponents(word));


    return (
        <>
            {wordComponents}
            <div>Author - {author}</div>
        </>
    )
}

export default Cryptoquote;