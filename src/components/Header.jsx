export default function Header() {
  return (
    <header className="app-header">
      <svg
        className="header-mark"
        viewBox="0 0 400 260"
        width={60}
        height={39}
        role="img"
        aria-label="Toyota"
      >
        <ellipse cx="200" cy="130" rx="180" ry="78" fill="none" stroke="currentColor" strokeWidth="15" />
        <ellipse cx="200" cy="130" rx="58" ry="97" fill="none" stroke="currentColor" strokeWidth="15" />
      </svg>
    </header>
  );
}
