export default function ThankYouScreen({ dissatisfied }) {
  return (
    <div className="screen">
      <div className="screen-body screen-body-centered">
        <div className="check-circle" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="40" height="40">
            <path
              d="M5 13l4 4L19 7"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="survey-title">Thank You!</h1>
        <p className="survey-intro">
          We appreciate you taking the time to share your feedback on your new vehicle delivery
          experience. Your responses help us serve Toyota customers better.
        </p>

        {dissatisfied && (
          <p className="followup-note">
            Because you indicated some dissatisfaction, a member of our team may follow up with
            you directly to help resolve your concerns.
          </p>
        )}
      </div>
    </div>
  );
}
