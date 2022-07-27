import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            <h1>Error 404: Página no encontrada</h1>
            <div className="button-return">
                <Link to="/" className="btn btn-outline-light">
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
};

export default NotFound;