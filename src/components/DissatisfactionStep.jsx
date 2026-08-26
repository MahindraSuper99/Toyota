import StepNav from './StepNav.jsx';
import {
  DISSATISFACTION_REASONS,
  FACILITIES_OPTION_KEY,
  FACILITIES_SUB_OPTIONS,
} from '../constants/survey.js';

export default function DissatisfactionStep({
  selectedReasons,
  elaborations,
  facilitiesDetail,
  otherReasonText,
  onChange,
  onNext,
  onBack,
}) {
  function toggleReason(key) {
    const isSelected = selectedReasons.includes(key);
    const nextReasons = isSelected
      ? selectedReasons.filter((r) => r !== key)
      : [...selectedReasons, key];

    const patch = { dissatisfactionReasons: nextReasons };

    if (isSelected) {
      const nextElaborations = { ...elaborations };
      delete nextElaborations[key];
      patch.elaborations = nextElaborations;
      if (key === FACILITIES_OPTION_KEY) patch.facilitiesDetail = [];
      if (key === 'other') patch.otherReasonText = '';
    }

    onChange(patch);
  }

  function setElaboration(key, text) {
    onChange({ elaborations: { ...elaborations, [key]: text } });
  }

  function toggleFacility(option) {
    const next = facilitiesDetail.includes(option)
      ? facilitiesDetail.filter((f) => f !== option)
      : [...facilitiesDetail, option];
    onChange({ facilitiesDetail: next });
  }

  const otherSelected = selectedReasons.includes('other');
  const canProceed =
    selectedReasons.length > 0 && (!otherSelected || otherReasonText.trim().length > 0);

  return (
    <div className="screen">
      <div className="screen-body">
        <h2 className="step-question">
          We're sorry your experience wasn't what we'd hoped for. What went wrong? (select all that
          apply)
        </h2>

        <div className="reason-list">
          {DISSATISFACTION_REASONS.map((reason) => {
            const checked = selectedReasons.includes(reason.key);
            return (
              <div key={reason.key} className={`reason-item${checked ? ' reason-item-selected' : ''}`}>
                <label className="reason-checkbox">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleReason(reason.key)}
                  />
                  <span>{reason.label}</span>
                </label>

                {checked && reason.hasSubOptions && (
                  <div className="facilities-suboptions">
                    <p className="suboptions-label">Which facilities?</p>
                    {FACILITIES_SUB_OPTIONS.map((opt) => (
                      <label key={opt} className="reason-checkbox reason-checkbox-sub">
                        <input
                          type="checkbox"
                          checked={facilitiesDetail.includes(opt)}
                          onChange={() => toggleFacility(opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                )}

                {checked && reason.requiresText && (
                  <div className="elaboration-box">
                    <textarea
                      placeholder="Please tell us more (required)"
                      value={otherReasonText}
                      onChange={(e) => onChange({ otherReasonText: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>
                )}

                {checked && !reason.requiresText && (
                  <div className="elaboration-box">
                    <textarea
                      placeholder="Add more detail (optional)"
                      value={elaborations[reason.key] || ''}
                      onChange={(e) => setElaboration(reason.key, e.target.value)}
                      rows={2}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <StepNav onBack={onBack} onNext={onNext} nextDisabled={!canProceed} />
      </div>
    </div>
  );
}
