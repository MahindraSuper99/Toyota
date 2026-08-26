import StepNav from './StepNav.jsx';
import OptionList from './OptionList.jsx';
import { OSAT_OPTIONS } from '../constants/survey.js';

export default function OsatStep({ dealer, value, onChange, onNext, onBack }) {
  return (
    <div className="screen">
      <div className="screen-body">
        <h2 className="step-question">
          Based on your recent Purchase Experience, please rate us on your Overall Experience at{' '}
          <span className="dealer-name">{dealer}</span>
        </h2>

        <OptionList name="Overall experience" options={OSAT_OPTIONS} value={value} onChange={onChange} />

        <StepNav onBack={onBack} onNext={onNext} nextDisabled={!value} />
      </div>
    </div>
  );
}
