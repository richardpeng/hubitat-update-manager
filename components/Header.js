import Link from 'next/link';
import { useRouter } from 'next/router'

const linkStyle = {
  marginRight: 15
};

const Header = () => {
  const router = useRouter();
  const { query } = router;

  return (
    <div>
      <Link href={{ pathname: "/", query }}>
        <a style={linkStyle}>Hub</a>
      </Link>
      <Link href={{ pathname: "/apps", query }}>
        <a style={linkStyle}>Apps</a>
      </Link>
      <Link href={{ pathname: "/drivers", query }}>
        <a style={linkStyle}>Drivers</a>
      </Link>
    </div>
  );
}

export default Header;
