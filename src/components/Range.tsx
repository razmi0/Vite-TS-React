import React from "react";

interface RangeProps {
  userPoksLength: number;
  setUserPoksLength: (value: number) => void;
  poksLength: number;
}

function Range({ userPoksLength, setUserPoksLength, poksLength }: RangeProps) {
  return (
    <>
      <label htmlFor="userRange" className="form-label fw-bold mt-1">
        Number of pokemons : {userPoksLength} / {poksLength}
      </label>
      <input
        type="range"
        className="form-range"
        min="1"
        max={poksLength}
        step="1"
        onMouseUp={(e) => setUserPoksLength(Number(e.currentTarget.value))}
        id="userRange"
      />
    </>
  );
}

export default Range;
