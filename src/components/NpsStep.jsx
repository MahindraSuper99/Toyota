import StepNav from './StepNav.jsx';

const SCORES = Array.from({ length: 11 }, (_, i) => i);

function hueForScore(score) {
  // 0 -> red (0deg), 5 -> amber (45deg), 10 -> green (125deg)
  if (score <= 5) return (score / 5) * 45;
  return 45 + ((score - 5) / 5) * 80;
}

export default function NpsStep({ value, onChange, onNext, onBack }) {
  return (
    <div className="screen">
      <div className="screen-body">
        <h2 className="step-question">How likely are you to recommend your Toyota to others?</h2>

        <div className="nps-scale" role="radiogroup" aria-label="NPS score, 0 to 10">
          {SCORES.map((score) => {
            const selected = value === score;
            const hue = hueForScore(score);
            return (
              <button
                key={score}
                type="button"
                role="radio"
                aria-checked={selected}
                className={`nps-btn${selected ? ' nps-btn-selected' : ''}`}
                style={{
                  '--nps-color': `hsl(${hue}, 82%, 45%)`,
                }}
                onClick={() => onChange(score)}
              >
                {score}
              </button>
            );
          })}
        </div>

        <div className="nps-labels">
          <span>Not at all likely</span>
          <span>Extremely likely</span>
        </div>

        <StepNav onBack={onBack} onNext={onNext} nextDisabled={value === null} />
      </div>
    </div>
  );
}
