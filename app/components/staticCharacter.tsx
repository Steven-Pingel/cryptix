interface StaticCharacterProps {
  character: string;
}

const StaticCharacter = ({ character }: StaticCharacterProps) => {
  return (
    <div className="w-10 h-20 my-4 min-h-full mx-0.5 bg-white text-center inline-block border-2 border-black">
      <div className="h-1/2 w-9 pt-2 text-center inline-block border-b border-black">
        {character}
      </div>
      <div className="h-1/2 pt-2 bg-black text-white">{character}</div>
    </div>
  );
};

export default StaticCharacter;
