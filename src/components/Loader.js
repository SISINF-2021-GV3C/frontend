import Spinner from "react-bootstrap/esm/Spinner";

function Loading () {

    const handleLoading = () => {
        setTimeout(() => {
            window.location.href = '/coins'
        },2000)

        return(
            <h2>Cargando...
                <div className="spinner">
                    <p>
                        <Spinner animation="border"/>
                    </p>
                </div>
            </h2>
        )
    }

    return (
        handleLoading()
    )
}

export default Loading