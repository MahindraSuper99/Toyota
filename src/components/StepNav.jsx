export default function StepNav({ onBack, onNext, nextDisabled, nextLabel = 'Next' }) {
  return (
    <div className="step-nav">
      {onBack && (
        <button type="button" className="btn btn-secondary" onClick={onBack}>
          Back
        </button>
      )}
      <button
        type="button"
        className="btn btn-primary"
        onClick={onNext}
        disabled={nextDisabled}
      >
        {nextLabel}
      </button>
    </div>
  );
}
