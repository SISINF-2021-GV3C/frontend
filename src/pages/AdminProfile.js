import React, { useState } from "react";
import { ButtonUnstyled } from "@mui/base";
import { useNavigate } from "react-router-dom";
import "../css/profile.css";

function AdminProfile() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [tlf, setTlf] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  // Función para gestionar la pestaña de administración
  const handleAdminPage = () => {
    window.location.href = "/management";
    localStorage.clear();
  };

  // Función para gestionar el cierre de sesión
  const handleLogout = () => {
    window.location.href = "/";
    localStorage.clear();
  };

  return (
    <div className="userform-container">
      <div className="profile-wrapper">
        <div className="profile-inner">
          <form>
            <h3>Perfil del usuario</h3>
            <div className="row g-3">
              <div className="col">
                <label>Nombre</label>
                <input
                  disabled="true"
                  type="text"
                  className="form-control"
                  name="firstName"
                  placeholder="Nombre"
                />
              </div>
              <div className="col">
                <label>Apellido</label>
                <input
                  disabled="true"
                  type="text"
                  className="form-control"
                  name="lastName"
                  placeholder="Apellido"
                />
              </div>
            </div>
            <div className="row g-3">
              <div className="col">
                <label>Nombre de usuario</label>
                <input
                  disabled="true"
                  type="text"
                  className="form-control"
                  name="userName"
                  placeholder="Nombre de usuario"
                />
              </div>
              <div className="col">
                <label>Teléfono</label>
                <input
                  disabled="true"
                  type="text"
                  className="form-control"
                  name="tlf"
                  placeholder="Número de teléfono"
                />
              </div>
            </div>
            <div className="row g-3">
              <div className="col">
                <label>Fecha de nacimiento</label>
                <input
                  disabled="true"
                  type="text"
                  className="form-control"
                  name="userName"
                  placeholder="Fecha de nacimiento"
                />
              </div>
              <div className="col">
                <label>Nacionalidad</label>
                <input
                  disabled="true"
                  type="text"
                  className="form-control"
                  name="tlf"
                  placeholder="Nacionalidad"
                />
              </div>
            </div>
            <p></p>
            <div className="form-group">
              <label>Correo electrónico</label>
              <input
                disabled="true"
                type="text"
                className="form-control"
                name="email"
                placeholder="Correo electrónico"
              />
            </div>
            <br></br>
            <div className="d-grid gap-2">
              <ButtonUnstyled
                onClick={handleAdminPage}
                className="btn btn-secondary btn-block btn-lg"
              >
                Administrar
              </ButtonUnstyled>
              <ButtonUnstyled
                onClick={() => navigate(-1)}
                className="btn btn-primary btn-block btn-lg"
              >
                Volver atrás
              </ButtonUnstyled>
              <ButtonUnstyled
                onClick={handleLogout}
                className="btn btn-danger btn-block btn-lg"
              >
                Cerrar sesión
              </ButtonUnstyled>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
