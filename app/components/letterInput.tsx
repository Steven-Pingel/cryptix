import React, { forwardRef, useEffect, useState } from "react";
import type { AnswerKey } from "./cryptoquote";

interface LetterInputProps {
  cryptoLetter: string;
  cryptoKey: AnswerKey;
  onChange: (cryptoLetter: string, letter: string) => void;
  onFocus: () => void;
  active: boolean;
}

const LetterInput = forwardRef(
  (
    { cryptoLetter, cryptoKey, onChange, onFocus, active }: LetterInputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const normalizedCryptoLetter = cryptoLetter.toUpperCase();
    const currentValue = cryptoKey[normalizedCryptoLetter] ?? "";
    const [value, setValue] = useState(currentValue);

    const isDuplicate = Array.from(Object.values(cryptoKey)).filter(val => val !== '' && val === currentValue).length > 1

    useEffect(() => {
      setValue(currentValue);
    }, [cryptoKey, currentValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      const alphaRegex = /^[A-Za-z]+$/;
      const result = val.match(alphaRegex) ? val.toUpperCase() : "";
      setValue(result);
      onChange(normalizedCryptoLetter, result);
    };

    const handleFocus = () => {
      if (currentValue !== "") {
        setValue("");
      }
      onFocus();
    };

    const handleBlur = () => {
      if (value === "" && currentValue !== "") {
        setValue(currentValue);
      }
    };

    return (
      <div className="w-10 h-20 my-4 min-h-full mx-0.5 text-center inline-block border-2 border-black">
        <input
          ref={ref}
          name="character"
          type="text"
          maxLength={1}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          value={value}
          className={`w-9 h-1/2 
          ${ active && "bg-yellow-300"} 
          ${ isDuplicate && "bg-red-600"}
          focus:bg-green-300 focus:animate-pulse text-center inline-block outline-none caret-transparent`}

          autoComplete="off"
        />
        <div className="h-1/2 pt-2 bg-black text-white">
          {normalizedCryptoLetter}
        </div>
      </div>
    );
  }
);

LetterInput.displayName = "LetterInput";

export default LetterInput;
