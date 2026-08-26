export default function AdditionalFeedbackStep({
  wantsAdditionalFeedback,
  additionalFeedbackText,
  popiaConsentFinal,
  onChange,
  onBack,
  onSubmit,
  submitState,
  submitError,
}) {
  const answered = wantsAdditionalFeedback !== null;
  const needsComment = wantsAdditionalFeedback === 'yes';
  const commentOk = !needsComment || additionalFeedbackText.trim().length > 0;
  const canSubmit = answered && commentOk && popiaConsentFinal && submitState !== 'submitting';

  return (
    <div className="screen">
      <div className="screen-body">
        <h2 className="step-question">Would you like to share any additional feedback?</h2>

        <div className="yes-no-toggle" role="radiogroup" aria-label="Additional feedback">
          <button
            type="button"
            role="radio"
            aria-checked={wantsAdditionalFeedback === 'yes'}
            className={`btn btn-toggle${wantsAdditionalFeedback === 'yes' ? ' btn-toggle-selected' : ''}`}
            onClick={() => onChange({ wantsAdditionalFeedback: 'yes' })}
          >
            Yes
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={wantsAdditionalFeedback === 'no'}
            className={`btn btn-toggle${wantsAdditionalFeedback === 'no' ? ' btn-toggle-selected' : ''}`}
            onClick={() => onChange({ wantsAdditionalFeedback: 'no', additionalFeedbackText: '' })}
          >
            No
          </button>
        </div>

        {needsComment && (
          <div className="elaboration-box">
            <textarea
              placeholder="Please share your feedback (required)"
              value={additionalFeedbackText}
              onChange={(e) => onChange({ additionalFeedbackText: e.target.value })}
              rows={4}
              required
            />
          </div>
        )}

        <label className="consent-checkbox">
          <input
            type="checkbox"
            checked={popiaConsentFinal}
            onChange={(e) => onChange({ popiaConsentFinal: e.target.checked })}
          />
          <span>
            I confirm my responses are accurate and consent to Toyota processing this
            information in line with the POPIA Privacy Notice.
          </span>
        </label>

        {submitError && <p className="form-error">{submitError}</p>}

        <div className="step-nav">
          <button type="button" className="btn btn-secondary" onClick={onBack}>
            Back
          </button>
          <button type="button" className="btn btn-primary" onClick={onSubmit} disabled={!canSubmit}>
            {submitState === 'submitting' ? 'Submitting…' : 'Submit Survey'}
          </button>
        </div>
      </div>
    </div>
  );
}
