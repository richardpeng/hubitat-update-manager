import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/apps">
      <a style={linkStyle}>Apps</a>
    </Link>
    <Link href="/drivers">
      <a style={linkStyle}>Drivers</a>
    </Link>
  </div>
);

export default Header;
