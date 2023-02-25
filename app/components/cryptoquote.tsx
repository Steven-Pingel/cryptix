import { useFetcher } from "@remix-run/react";
import React, { useEffect, createRef, useState } from "react";
import { alphaRegex, splitToAlphas } from "~/common/utlities";
import LetterInput from "./letterInput";
import StaticCharacter from "./staticCharacter";
import WhiteSpace from "./whiteSpace";

interface CryptoquoteProps {
  cryptoquote: string;
  author: string;
}

export interface AnswerKey {
  [index: string]: string
}

const Cryptoquote = ({ cryptoquote, author }: CryptoquoteProps) => {
  const alphas = splitToAlphas(cryptoquote);

  const initialKey:AnswerKey = {};
  alphas.map((entry) => initialKey[entry] = '');
  
  const answerValidator = useFetcher();
  const [cryptoKey, setCryptoKey] = useState<AnswerKey>(initialKey);
  const [, setActiveIndex] = useState<number>(0);
  const [selectedLetter, setSelectedLetter] = useState<string>();
  const [inputRefsArray] = useState<React.RefObject<HTMLInputElement>[]>(() =>
    Array.from({ length: alphas.length }, () => createRef())
  );

  useEffect(() => {
    const valCount = Array.from(Object.values(cryptoKey)).filter(x => x !== '').length
    const keyCount = Array.from(Object.keys(cryptoKey)).length
    if(valCount === keyCount){
      console.log(JSON.stringify(cryptoKey))
      answerValidator.submit({answerKey: JSON.stringify(cryptoKey)}, 
      { 
        relative: 'route',
        method:'post',
        replace: true
      })
      setCryptoKey(initialKey);
    }
  }, [cryptoKey])

  useEffect(() => {
    if (inputRefsArray?.[0]?.current) {
      inputRefsArray?.[0]?.current?.focus();
    }

    const moveBackward = () => setActiveIndex((prevIndex) => {
      const index = prevIndex ?? 0;
      let nextIndex = index - 1 < 0 ? alphas.length - 1 : index - 1;
      const nextInput = inputRefsArray?.[nextIndex]?.current;
      nextInput?.focus();
      nextInput?.select();

      return nextIndex;
    });

    const moveForward = () =>  setActiveIndex((prevIndex) => {
      const index = prevIndex ?? 0;
      let nextIndex = index < alphas.length - 1 ? index + 1 : 0;
      const nextInput = inputRefsArray?.[nextIndex]?.current;
      nextInput?.focus();
      nextInput?.select();

      return nextIndex;
    });

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key.length == 1 && e.key.match(alphaRegex)) {
        setActiveIndex((prevIndex) => {
          const index = prevIndex ?? 0;
          let nextIndex = index < alphas.length - 1 ? index + 1 : 0;
          while (nextIndex < alphas.length) {
            const nextInput = inputRefsArray?.[nextIndex]?.current;
            if (!nextInput?.value.match(alphaRegex)) {
              nextInput?.focus();
              nextInput?.select();
              break;
            }
            nextIndex++;
          }

          return nextIndex;
        });
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft") {
        moveBackward()
      }
      if (e.code === "ArrowRight") {
        moveForward()
      }
    };

    const handleClick = (e: MouseEvent) => {
      const isInput = (e.target as HTMLElement).tagName === "INPUT";
      if (isInput) return;
      e.stopPropagation();
      e.preventDefault();
    };

    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [alphas.length, inputRefsArray]);

  
  const resetKey = () => setCryptoKey(initialKey);
  const onCharacterChange = (cryptoLetter: string, letter: string) => {
    const updatedKey:AnswerKey = {...cryptoKey};
    updatedKey[cryptoLetter] = letter
    setCryptoKey(updatedKey);
  };

  let refIndex = 0;
  const createWordComponent = (word: string) => {
    const words = word.split("").map((char, index) => {
      if (char.match(alphaRegex)) {
        const index = refIndex++;
        const result = (
          <LetterInput
            active={selectedLetter === char}
            onFocus={() => {
              setActiveIndex(index);
              setSelectedLetter(char)
            }}
            ref={inputRefsArray[index]}
            key={`${word}-${char}-${index}`}
            cryptoLetter={char}
            onChange={onCharacterChange}
            cryptoKey={cryptoKey}
          />
        );
        return result;
      }

      return (
        <StaticCharacter key={`static-${word}-${index}`} character={char} />
      );
    });

    return (
      <span key={`${refIndex}-${word}`}>
        <div className="inline-block">{words}</div>
        <WhiteSpace key={`ws-${word}`} />
      </span>
    );
  };

  const wordComponents = cryptoquote
    .trim()
    .split(" ")
    .map((word) => createWordComponent(word));

  return (
    <div>
        {wordComponents}
      <div>
        <div></div>
        <div className="text-2xl">- {author}</div>
        <button onClick={resetKey}>Clear</button>
        {answerValidator.data?.answerIsCorrect? 'YOU WIN' : ''}
      </div>
    </div>
  );
};

export default Cryptoquote;
