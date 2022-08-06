import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ButtonUnstyled } from "@mui/base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../css/userForm.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);

  // Función de inicio de sesión
  const handleLogin = (event) => {
    event.preventDefault();
  };

  // Mostrar contraseña
  const handleToggle = () => {
    if (type === "password") {
      setIcon(faEye);
      setType("text");
    } else {
      setIcon(faEyeSlash);
      setType("password");
    }
  };

  return (
    <div className="userform-container">
      <div className="log-wrapper">
        <div className="log-inner">
          <form onSubmit={handleLogin} autoComplete="off">
            <h3>Inicia sesión con tu cuenta</h3>
            <div className="form-group">
              <label>Nombre de usuario</label>
              <input
                type="text"
                className="form-control"
                name="Username"
                placeholder="Introduce tu nombre de usuario"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <p></p>
            <div className="form-group">
              <label>Contraseña</label>
              <div className="input-group mb-3">
                <input
                  type={type}
                  className="form-control"
                  name="Password"
                  placeholder="Introduce tu contraseña"
                  onChange={({ target }) => setPassword(target.value)}
                />
                <ButtonUnstyled className="show-btn" onClick={handleToggle}>
                  <FontAwesomeIcon icon={icon} />
                </ButtonUnstyled>
              </div>
            </div>
            <p></p>
            <br></br>
            <div className="d-grid gap-2">
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
              >
                Iniciar sesión
              </button>
            </div>
            <br></br>
            <h1 className="generic-text">
              ¿Todavía no tienes cuenta?{" "}
              <Link className="reset-link" to="/register">
                Registrar
              </Link>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
