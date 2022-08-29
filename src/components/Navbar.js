import React, { useEffect, useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import logo from "../images/logo_white.png";
import "../css/navBar.css";

export default function Navbar() {
  const loadLoggedIn = sessionStorage.getItem("loggedIn");
  const [login, setLogin] = useState(false);

  useEffect(() => {
    setLogin(loadLoggedIn);
  }, [loadLoggedIn]);

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        {" "}
        <img
          className="logo-pic"
          src={logo}
          alt="Cryptoaholic Logo"
          width="35"
          height="35"
        ></img>{" "}
        Cryptoaholic{" "}
      </Link>
      <ul className="link-title">
        <CustomLink to={`${login ? "/my-coins" : "/login"}`}>
          <i
            className={`bi bi-bookmark-star ${login ? "icon" : "icon-hidden"}`}
          ></i>
        </CustomLink>
        <CustomLink to="/coins">
          <i className="bi bi-currency-bitcoin icon"></i>
        </CustomLink>
        <CustomLink to={`${login ? "/profile" : "/login"}`}>
          <i className="bi bi-person-circle icon"></i>
        </CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
