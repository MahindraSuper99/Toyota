export default function ExpiredScreen() {
  return (
    <div className="survey-shell">
      <div className="screen">
        <div className="screen-body screen-body-centered">
          <img
            src="/toyota-logo-placeholder.svg"
            alt="Toyota"
            className="toyota-logo"
            width={180}
            height={49}
          />
          <h1 className="survey-title">This Link Has Expired</h1>
          <p className="survey-intro">
            This survey link is no longer active. If you'd still like to share your feedback,
            please contact your dealership directly.
          </p>
        </div>
      </div>
    </div>
  );
}
