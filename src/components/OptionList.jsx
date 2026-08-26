export default function OptionList({ options, value, onChange, name }) {
  return (
    <div className="option-list" role="radiogroup" aria-label={name}>
      {options.map((option) => {
        const selected = value === option;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected}
            className={`option-card${selected ? ' option-card-selected' : ''}`}
            onClick={() => onChange(option)}
          >
            <span className="option-radio" aria-hidden="true" />
            <span>{option}</span>
          </button>
        );
      })}
    </div>
  );
}
