export function Range({
  userPoksLength,
  setUserPoksLength,
  poksLength,
  handleChange,
}: {
  userPoksLength: number;
  setUserPoksLength: (value: number) => void;
  poksLength: number;
  handleChange: (value: number) => void;
}) {
  return (
    <>
      <label htmlFor="userRange" className="form-label fw-bold mt-1">
        Pokemons :
      </label>
      <br />
      <input
        type="number"
        min="1"
        minLength={1}
        maxLength={3}
        className="poks-input mb-1"
        value={userPoksLength}
        onChange={(e) => handleChange(Number(e.currentTarget.value))}
      />
      / {poksLength}
      <input
        type="range"
        className="form-range"
        min={1}
        max={poksLength}
        step="1"
        onMouseUp={(e) => handleChange(Number(e.currentTarget.value))}
        id="userRange"
      />
    </>
  );
}
