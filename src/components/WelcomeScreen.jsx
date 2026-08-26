import ClockBar from './ClockBar.jsx';

export default function WelcomeScreen({ consented, onConsentChange, onContinue }) {
  return (
    <div className="screen welcome-screen">
      <ClockBar />

      <div className="screen-body">
        <h1 className="survey-title">New Vehicle Delivery Experience Survey</h1>
        <p className="survey-intro">
          Thank you for choosing Toyota. Your feedback helps us improve every customer's
          delivery experience. This survey takes about 2 minutes to complete.
        </p>

        <section className="popia-notice" aria-labelledby="popia-heading">
          <h2 id="popia-heading">POPIA Privacy Notice</h2>

          <div className="popia-section">
            <h3>What we collect</h3>
            <ul>
              <li>Your survey ratings and responses</li>
              <li>The date and time you completed this survey</li>
              <li>Your device and browser information</li>
            </ul>
          </div>

          <div className="popia-section">
            <h3>How we use it</h3>
            <ul>
              <li>To improve our services and delivery experience</li>
              <li>To address any concerns you raise</li>
              <li>To compile anonymous statistical reports</li>
              <li>To follow up with you if you give us a low rating</li>
            </ul>
          </div>

          <div className="popia-section">
            <h3>Your rights</h3>
            <ul>
              <li>You may request access to the personal information we hold about you</li>
              <li>You may request that we correct any inaccurate information</li>
              <li>You may withdraw your consent at any time</li>
            </ul>
          </div>
        </section>

        <label className="consent-checkbox">
          <input
            type="checkbox"
            checked={consented}
            onChange={(e) => onConsentChange(e.target.checked)}
          />
          <span>
            I have read the POPIA Privacy Notice above and consent to Toyota collecting and
            processing my information as described.
          </span>
        </label>

        <button className="btn btn-primary btn-block" disabled={!consented} onClick={onContinue}>
          Start Survey
        </button>
      </div>
    </div>
  );
}
