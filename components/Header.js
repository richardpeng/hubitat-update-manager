const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <a style={linkStyle} href="/">Hub</a>
    <a style={linkStyle} href="/apps">Apps</a>
    <a style={linkStyle} href="/drivers">Drivers</a>
  </div>
);

export default Header;
