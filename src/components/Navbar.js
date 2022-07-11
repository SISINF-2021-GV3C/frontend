import { Link, useMatch, useResolvedPath } from "react-router-dom"
import logo from '../images/logo_white.png';

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title"> <img src={logo} alt="Cryptoaholic Logo" width="35" height="35"></img> Cryptoaholic </Link>
      <ul className="link-title">
        <CustomLink to="/login">Iniciar sesión</CustomLink>
        <CustomLink to="/register">Registrar</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}