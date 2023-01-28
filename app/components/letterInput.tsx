import React from "react";

interface LetterInputProps {
    cryptoLetter: string
    cryptoKey: Map<string, string>
    onChange: (cryptoLetter:string, letter:string) => void
}

const LetterInput = ({cryptoLetter, cryptoKey, onChange}:LetterInputProps) => {
    const normalizedCryptoLetter = cryptoLetter.toUpperCase();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const alphaRegex = /^[A-Za-z]+$/;
        const result = value.match(alphaRegex) ? e.target.value.toUpperCase() : '';
        onChange(normalizedCryptoLetter, result);
    };


    return (
        <div className="w-10 h-20 min-h-full mx-0.5 text-center inline-block border-2 border-black">
            <input name='character' type='text' maxLength={1} onChange={handleChange} value={cryptoKey.get(normalizedCryptoLetter)} className='w-9 h-1/2 text-center inline-block outline-none'/>
            <div className="h-1/2 pt-2 bg-black text-white">
                {normalizedCryptoLetter}
            </div>
        </div>
    );
}

export default LetterInput;