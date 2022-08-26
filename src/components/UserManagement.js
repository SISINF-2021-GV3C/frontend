import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaAngleDoubleUp, FaPlus } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faSortUp } from "@fortawesome/free-solid-svg-icons";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
import axios from "axios";
import Loading from "../components/Loader";
import UsersList from "../data/UsersList.json";
import Swal from "sweetalert2";
import "../css/adminPage.css";

const usersURL = "http://ec2-18-206-137-85.compute-1.amazonaws.com/getUsers/";
const userDelURL =
  "http://ec2-18-206-137-85.compute-1.amazonaws.com/deleteUser/";

function Management() {
  const navigate = useNavigate();
  // Constantes de manejo de datos y paginación
  const usersPerPage = 10;
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginate, setPaginate] = useState(usersPerPage);
  const [query, setQuery] = useState("");
  const [closeVisibility, setCloseVisibility] = useState(false);

  // Constantes de dirección del orden en la tabla
  const [directionName, setDirectionName] = useState("ASC");
  const [directionCountry, setDirectionCountry] = useState("ASC");

  // Constantes de iconos del orden en la tabla
  const [iconName, setIconName] = useState(faSort);
  const [iconCountry, setIconCountry] = useState(faSort);

  // Descargar usuarios a través de la API de Cryptoaholic
  const fetchUsers = async () => {
    const { data } = await axios.get(usersURL);
    setUser(data);
  };

  useEffect(() => {
    fetchUsers();
    setTimeout(() => setLoading(false), 500);
  }, []);

  // Función para introducir la búsqueda en la barra
  const inputQuery = (e) => {
    setQuery(e.target.value);
    setCloseVisibility(true);
  };

  // Función para limpiar la búsqueda de la barra
  const clearInput = () => {
    setQuery("");
    setCloseVisibility(false);
  };

  // Función para cargar más usuarios
  const loadMore = () => {
    setPaginate((prevValue) => prevValue + usersPerPage);
  };

  // Función para volver al principio de la página
  const scrollToTop = () => {
    const element = document.getElementById("top-index-users");
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const handleDeleteUser = (user) => {
    const nickUser = user.nickname;
    console.log(nickUser);
    Swal.fire({
      title: "¿Deseas eliminar el usuario?",
      text: "¡Los cambios serán irreversibles!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡elimínalo!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(userDelURL, { username: user.nickname });
        Swal.fire(
          "¡Éxito!",
          "El usuario ha sido eliminado de la base de datos.",
          "success"
        );
        fetchUsers();
        //window.location.href = "/management/user-management";
      }
    });
  };

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

  const displayUsers = user
    // eslint-disable-next-line
    .filter((value) => {
      if (query === "") {
        return value;
      } else if (
        value.nickname.toLowerCase().includes(query.toLocaleLowerCase())
      ) {
        return value;
      }
    })
    .slice(0, paginate)
    .map((userItem) => {
      const { nickname, pais } = userItem;
      return (
        <div key={nickname}>
          <table className="table table-striped table-dark table-bordered table-hover align-middle">
            <tbody>
              <tr>
                <th width="33%" scope="row">
                  {nickname}
                </th>
                <td width="33%">{pais}</td>
                <td width="10%">
                  <button
                    className="btn-del-usr"
                    onClick={() => handleDeleteUser(userItem)}
                  >
                    <Delete />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });

  return (
    <>
      {loading === false ? (
        <div className="admin-container">
          <div className="ui grid container admin">
            <div id="top-index-users" className="top-index-users">
              <h1>Usuarios registrados</h1>
              <p />
              <div className="inline-coinlist">
                <input
                  id="search"
                  type="text"
                  className="search-box"
                  placeholder="Busca aquí..."
                  value={query}
                  onChange={inputQuery}
                  autoComplete="off"
                />
                <i
                  className={
                    closeVisibility === false
                      ? "close-btn-hidden-coinlist"
                      : "close-btn-visible-coinlist"
                  }
                  onClick={clearInput}
                >
                  <Close />
                </i>
              </div>
            </div>
            <br></br>
            {displayHeader()}
            {displayUsers}
            {paginate < user?.length && (
              <button type="button" className="btn btn-warn" onClick={loadMore}>
                <FaPlus />
              </button>
            )}
            <p></p>
            <button
              type="button"
              className="btn btn-top-admin"
              onClick={scrollToTop}
            >
              <FaAngleDoubleUp />
            </button>
            <button onClick={() => navigate(-1)} className="btn btn-back-admin">
              <FaArrowCircleLeft />
            </button>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Management;
