import StepNav from './StepNav.jsx';
import OptionList from './OptionList.jsx';
import { VEHICLE_SATISFACTION_OPTIONS } from '../constants/survey.js';

export default function VehicleSatisfactionStep({ value, onChange, onNext, onBack }) {
  return (
    <div className="screen">
      <div className="screen-body">
        <h2 className="step-question">
          How satisfied are you with your vehicle, including its technology and features?
        </h2>

        <OptionList
          name="Vehicle satisfaction"
          options={VEHICLE_SATISFACTION_OPTIONS}
          value={value}
          onChange={onChange}
        />

        <StepNav onBack={onBack} onNext={onNext} nextDisabled={!value} />
      </div>
    </div>
  );
}
