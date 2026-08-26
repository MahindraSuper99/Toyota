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
        <ellipse cx="200" cy="130" rx="185" ry="75" fill="none" stroke="currentColor" strokeWidth="15" />
        <ellipse cx="200" cy="140" rx="52" ry="90" fill="none" stroke="currentColor" strokeWidth="15" />
        <ellipse cx="200" cy="68" rx="98" ry="22" fill="none" stroke="currentColor" strokeWidth="15" />
      </svg>
    </header>
  );
}
