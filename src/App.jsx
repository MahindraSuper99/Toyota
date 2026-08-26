import { useMemo, useState } from 'react';
import { getSurveyParams, isLinkExpired } from './utils/urlParams.js';
import { getDeviceInfo } from './utils/deviceInfo.js';
import { OSAT_TRIGGERS_DISSATISFACTION } from './constants/survey.js';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import NpsStep from './components/NpsStep.jsx';
import VehicleSatisfactionStep from './components/VehicleSatisfactionStep.jsx';
import OsatStep from './components/OsatStep.jsx';
import DissatisfactionStep from './components/DissatisfactionStep.jsx';
import AdditionalFeedbackStep from './components/AdditionalFeedbackStep.jsx';
import ThankYouScreen from './components/ThankYouScreen.jsx';
import ExpiredScreen from './components/ExpiredScreen.jsx';
import './styles/index.css';

const STEP_ORDER = ['welcome', 'nps', 'vehicle', 'osat', 'dissatisfaction', 'feedback', 'thankyou'];

function initialAnswers() {
  return {
    npsScore: null,
    vehicleSatisfaction: '',
    osat: '',
    dissatisfactionReasons: [],
    elaborations: {},
    facilitiesDetail: [],
    otherReasonText: '',
    wantsAdditionalFeedback: null,
    additionalFeedbackText: '',
    popiaConsentWelcome: false,
    popiaConsentFinal: false,
  };
}

export default function App() {
  const params = useMemo(() => getSurveyParams(), []);
  const expired = useMemo(() => isLinkExpired(params.expires), [params.expires]);

  const [step, setStep] = useState('welcome');
  const [answers, setAnswers] = useState(initialAnswers);
  const [startedAt] = useState(() => new Date().toISOString());
  const [submitState, setSubmitState] = useState('idle'); // idle | submitting | error
  const [submitError, setSubmitError] = useState('');

  const needsDissatisfaction = OSAT_TRIGGERS_DISSATISFACTION.includes(answers.osat);

  const visibleSteps = useMemo(
    () => STEP_ORDER.filter((s) => s !== 'welcome' && s !== 'thankyou' && (s !== 'dissatisfaction' || needsDissatisfaction)),
    [needsDissatisfaction]
  );
  const currentStepIndex = visibleSteps.indexOf(step);

  function updateAnswers(patch) {
    setAnswers((prev) => ({ ...prev, ...patch }));
  }

  function goNext() {
    const idx = STEP_ORDER.indexOf(step);
    let nextIdx = idx + 1;
    while (STEP_ORDER[nextIdx] === 'dissatisfaction' && !needsDissatisfaction) {
      nextIdx += 1;
    }
    setStep(STEP_ORDER[nextIdx]);
  }

  function goBack() {
    const idx = STEP_ORDER.indexOf(step);
    let prevIdx = idx - 1;
    while (STEP_ORDER[prevIdx] === 'dissatisfaction' && !needsDissatisfaction) {
      prevIdx -= 1;
    }
    setStep(STEP_ORDER[prevIdx]);
  }

  async function submitSurvey() {
    setSubmitState('submitting');
    setSubmitError('');
    const completedAt = new Date().toISOString();
    const device = getDeviceInfo();

    const payload = {
      surveyId: params.id,
      dealer: params.dealer,
      npsScore: answers.npsScore,
      vehicleSatisfaction: answers.vehicleSatisfaction,
      osat: answers.osat,
      dissatisfactionReasons: answers.dissatisfactionReasons,
      elaborations: answers.elaborations,
      facilitiesDetail: answers.facilitiesDetail,
      otherReasonText: answers.otherReasonText,
      wantsAdditionalFeedback: answers.wantsAdditionalFeedback,
      additionalFeedbackText: answers.additionalFeedbackText,
      popiaConsentWelcome: answers.popiaConsentWelcome,
      popiaConsentFinal: answers.popiaConsentFinal,
      startedAt,
      completedAt,
      device,
    };

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error(`Submission failed (${res.status})`);
      }
      setSubmitState('idle');
      setStep('thankyou');
    } catch (err) {
      setSubmitState('error');
      setSubmitError('We could not submit your responses. Please check your connection and try again.');
    }
  }

  if (expired) {
    return <ExpiredScreen />;
  }

  return (
    <div className="survey-shell">
      {step !== 'welcome' && step !== 'thankyou' && (
        <ProgressBar current={currentStepIndex + 1} total={visibleSteps.length} />
      )}

      {step === 'welcome' && (
        <WelcomeScreen
          consented={answers.popiaConsentWelcome}
          onConsentChange={(v) => updateAnswers({ popiaConsentWelcome: v })}
          onContinue={goNext}
        />
      )}

      {step === 'nps' && (
        <NpsStep
          value={answers.npsScore}
          onChange={(v) => updateAnswers({ npsScore: v })}
          onNext={goNext}
          onBack={goBack}
        />
      )}

      {step === 'vehicle' && (
        <VehicleSatisfactionStep
          value={answers.vehicleSatisfaction}
          onChange={(v) => updateAnswers({ vehicleSatisfaction: v })}
          onNext={goNext}
          onBack={goBack}
        />
      )}

      {step === 'osat' && (
        <OsatStep
          dealer={params.dealer}
          value={answers.osat}
          onChange={(v) => updateAnswers({ osat: v })}
          onNext={goNext}
          onBack={goBack}
        />
      )}

      {step === 'dissatisfaction' && needsDissatisfaction && (
        <DissatisfactionStep
          selectedReasons={answers.dissatisfactionReasons}
          elaborations={answers.elaborations}
          facilitiesDetail={answers.facilitiesDetail}
          otherReasonText={answers.otherReasonText}
          onChange={updateAnswers}
          onNext={goNext}
          onBack={goBack}
        />
      )}

      {step === 'feedback' && (
        <AdditionalFeedbackStep
          wantsAdditionalFeedback={answers.wantsAdditionalFeedback}
          additionalFeedbackText={answers.additionalFeedbackText}
          popiaConsentFinal={answers.popiaConsentFinal}
          onChange={updateAnswers}
          onBack={goBack}
          onSubmit={submitSurvey}
          submitState={submitState}
          submitError={submitError}
        />
      )}

      {step === 'thankyou' && <ThankYouScreen dissatisfied={needsDissatisfaction} />}
    </div>
  );
}
