import React, { useState } from "react";

interface LetterInputProps {
    cryptoLetter: string
    cryptoKey: Map<string, string>
    onChange: (cryptoLetter:string, letter:string) => void
}

const LetterInput = ({cryptoLetter, cryptoKey, onChange}:LetterInputProps) => {
    const normalizedCryptoLetter = cryptoLetter.toUpperCase();
    const [isActive, setIsActive] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const alphaRegex = /^[A-Za-z]+$/;
        const result = value.match(alphaRegex) ? e.target.value.toUpperCase() : '';
        onChange(normalizedCryptoLetter, result);
    };

    const clearInput = () => {
        onChange(normalizedCryptoLetter, '')
    };

    const handleFocus = (e: React.FocusEvent) => {
        setIsActive(true);
        clearInput();
    }


    return (
        <div className="w-10 h-20 my-4 min-h-full mx-0.5 text-center inline-block border-2 border-black">
            <input name='character' type='text' onFocus={handleFocus} onBlur={() => setIsActive(false)} maxLength={1} onChange={handleChange} value={cryptoKey.get(normalizedCryptoLetter)} className={`w-9 h-1/2 ${isActive && 'bg-yellow-300'} text-center inline-block outline-none`} autoComplete="off"/>
            <div className="h-1/2 pt-2 bg-black text-white">
                {normalizedCryptoLetter}
            </div>
        </div>
    );
}

export default LetterInput;