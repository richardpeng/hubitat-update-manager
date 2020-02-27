import { useRouter } from 'next/router'
import queryString from 'query-string'

const linkStyle = {
  marginRight: 15
};

const Header = () => {
  const router = useRouter();
  const query = queryString.stringify(router.query);

  return (
    <div>
      <a style={linkStyle} href={`/?${query}`}>Hub</a>
      <a style={linkStyle} href={`/apps?${query}`}>Apps</a>
      <a style={linkStyle} href={`/drivers?${query}`}>Drivers</a>
    </div>
  );
}

export default Header;
