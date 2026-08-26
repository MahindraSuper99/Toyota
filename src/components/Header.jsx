export default function Header() {
  return (
    <header className="app-header">
      <svg
        className="header-mark"
        viewBox="0 0 100 60"
        width={44}
        height={26}
        role="img"
        aria-label="Toyota"
      >
        <ellipse cx="50" cy="30" rx="48" ry="22" fill="none" stroke="currentColor" strokeWidth="4" />
        <ellipse cx="50" cy="30" rx="20" ry="28" fill="none" stroke="currentColor" strokeWidth="4" />
        <ellipse cx="50" cy="12" rx="28" ry="9" fill="currentColor" />
      </svg>
    </header>
  );
}
