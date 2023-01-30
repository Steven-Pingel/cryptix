import React, { useEffect, createRef, useState } from "react";
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
    const [currentIndex, setActiveIndex] = useState<number>(0);
    const [inputRefsArray] = useState<React.RefObject<HTMLInputElement>[]>(() =>
        Array.from({ length: alphas.length }, () => createRef())
    );

    useEffect(() => {
        if (inputRefsArray?.[0]?.current) {
            inputRefsArray?.[0]?.current?.focus();
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key.length == 1 && e.key.match(alphaRegex)) {
                setActiveIndex((prevIndex) => {
                    const index = prevIndex ?? 0;
                    let nextIndex = index < alphas.length -1 ? index + 1 : 0;
                    while(nextIndex < alphas.length - 1){
                        const nextInput = inputRefsArray?.[nextIndex]?.current;
                        if(!nextInput?.value.match(alphaRegex)){
                            nextInput?.focus();
                            nextInput?.select();
                            break;
                        }
                        nextIndex++
                    }
                    
                    return nextIndex;
                });
            }
        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.code === 'ArrowLeft'){
                setActiveIndex((prevIndex) => {
                    const index = prevIndex ?? 0;
                    let nextIndex = index - 1 < 0 ? alphas.length - 1 : index - 1;
                    const nextInput = inputRefsArray?.[nextIndex]?.current;
                    nextInput?.focus();
                    nextInput?.select();
                    
                    return nextIndex;
                });
            }
            if(e.code === 'ArrowRight'){
                setActiveIndex((prevIndex) => {
                    const index = prevIndex ?? 0;
                    let nextIndex = index < alphas.length - 1 ? index + 1 : 0;
                    const nextInput = inputRefsArray?.[nextIndex]?.current;
                    nextInput?.focus();
                    nextInput?.select();
                    
                    return nextIndex;
                });
            }
        }

        document.addEventListener('keyup', handleKeyUp);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keyup', handleKeyUp);
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [alphas.length, inputRefsArray])

    const onCharacterChange = (cryptoLetter: string, letter: string) => {
        setCryptoKey(key => new Map(key.set(cryptoLetter, letter)));
    }

    let refIndex = 0;
    const createWordComponent = (word: string) => {
        const words = word.split('').map((char, index) => {
            if (char.match(alphaRegex)) {
                const index = refIndex++;
                const result = <LetterInput active={index === currentIndex} onFocus={() => setActiveIndex(index)} ref={inputRefsArray[index]} key={`${word}-${char}-${index}`} cryptoLetter={char} onChange={onCharacterChange} cryptoKey={cryptoKey} />;
                return result;
            }

            return <StaticCharacter key={`static-${word}-${index}`} character={char} />

        });

        return (
            <span key={`${refIndex}-${word}`}>
                <div className="inline-block">
                    {words}
                </div>
                <WhiteSpace key={`ws-${word}`} />
            </span>
        )
    }

    const wordComponents = cryptoquote
        .trim().split(' ')
        .map(word => createWordComponent(word));


    return (
        <>
            {wordComponents}
            <div>Author - {author}</div>
        </>
    )
}

export default Cryptoquote;