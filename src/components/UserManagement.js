import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faSortUp } from "@fortawesome/free-solid-svg-icons";
import { Delete } from "@mui/icons-material";
import Loading from "../components/Loader";
import UsersList from "../data/UsersList.json";
import "../css/adminPage.css";

function Management() {
  // Constantes de manejo de datos y paginación
  const usersPerPage = 25;
  const [loading, setLoading] = useState(true);

  // Constantes de dirección del orden en la tabla
  const [directionName, setDirectionName] = useState("ASC");
  const [directionCountry, setDirectionCountry] = useState("ASC");

  // Constantes de iconos del orden en la tabla
  const [iconName, setIconName] = useState(faSort);
  const [iconCountry, setIconCountry] = useState(faSort);

  // Ordenar por nombre
  const sortByName = () => {
    /*if (directionName === "ASC") {
      setCoin(
        coin.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        )
      );
      setIconName(faSortUp);
      setDirectionName("DESC");
    } else if (directionName === "DESC") {
      setCoin(
        coin.sort((a, b) =>
          a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
        )
      );
      setIconName(faSortDown);
      setDirectionName("ASC");
    } else {
      return coin;
    }

    // Resetear los iconos y direcciones de las columnas restantes
    setDirectionCountry("ASC");
    setIconCountry(faSort);
    */
  };

  // Ordenar por nombre
  const sortByCountry = () => {};

  // Mostrar cabecera
  const displayHeader = () => {
    return (
      <table className="table table-striped table-dark table-bordered align-middle">
        <thead>
          <tr>
            <th onClick={sortByName} width="33%" scope="col">
              Nombre
              <FontAwesomeIcon className="sort" icon={iconName} />
            </th>
            <th onClick={sortByCountry} width="33%" scope="col">
              País
              <FontAwesomeIcon className="sort" icon={iconName} />
            </th>
            <th width="10%" scope="col">
              Acción
            </th>
          </tr>
        </thead>
      </table>
    );
  };
  const displayUsers = UsersList.map((user) => {
    const { name, country } = user;
    return (
      <div key={name}>
        <table className="table table-striped table-dark table-bordered table-hover align-middle">
          <tbody>
            <tr>
              <th width="33%" scope="row">
                {name}
              </th>
              <td width="33%">{country}</td>
              <td width="10%">
                <Delete />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  });

  return (
    <>
      {loading === true ? (
        <div className="admin-container">
          <div className="ui grid container admin">
            <div id="top-index-users" className="top-index-users">
              <h1>Usuarios registrados</h1>
            </div>
            <br></br>
            {displayHeader()}
            {displayUsers}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Management;
