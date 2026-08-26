import toyotaLogoWhite from '../assets/toyota-logo-white.png';

export default function Header() {
  return (
    <header className="app-header">
      <img src={toyotaLogoWhite} alt="Toyota" className="header-mark" height={34} />
    </header>
  );
}
