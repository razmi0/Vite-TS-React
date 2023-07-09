export function Range({
  pokemonQuantity,
  rawLength,
  handleChange,
  displayedLength,
}: {
  pokemonQuantity: number;
  rawLength: number;
  handleChange: (value: number) => void;
  displayedLength: number;
}) {
  return (
    <>
      <div>
        <label htmlFor="userRange" className="form-label fw-bold mt-1">
          Pokemons :
        </label>
        <input
          type="number"
          min="1"
          minLength={1}
          maxLength={3}
          className="poks-input mb-1"
          value={pokemonQuantity}
          onChange={(e) => handleChange(Number(e.currentTarget.value))}
        />
        / {rawLength}
        <br />
        <span className="form-label fw-bold mt-3">Filtered : </span>
        <span className="mt-1 mb-3">{displayedLength} pokemons</span>
      </div>
      <input
        type="range"
        className="form-range"
        min={1}
        max={rawLength}
        step="1"
        onMouseUp={(e) => handleChange(Number(e.currentTarget.value))}
        onTouchEnd={(e) => handleChange(Number(e.currentTarget.value))}
        id="userRange"
      />
    </>
  );
}
