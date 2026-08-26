export default function Header() {
  return (
    <header className="app-header">
      <svg
        className="header-mark"
        viewBox="0 0 400 260"
        width={54}
        height={35}
        role="img"
        aria-label="Toyota"
      >
        <ellipse cx="200" cy="130" rx="185" ry="75" fill="none" stroke="currentColor" strokeWidth="14" />
        <ellipse cx="200" cy="158" rx="60" ry="78" fill="none" stroke="currentColor" strokeWidth="14" />
        <ellipse cx="200" cy="70" rx="92" ry="20" fill="none" stroke="currentColor" strokeWidth="14" />
      </svg>
    </header>
  );
}
