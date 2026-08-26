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
        <ellipse cx="200" cy="130" rx="180" ry="78" fill="none" stroke="currentColor" strokeWidth="16" />
        <ellipse cx="200" cy="132" rx="78" ry="95" fill="none" stroke="currentColor" strokeWidth="16" />
        <ellipse cx="200" cy="78" rx="115" ry="30" fill="none" stroke="currentColor" strokeWidth="16" />
      </svg>
    </header>
  );
}
