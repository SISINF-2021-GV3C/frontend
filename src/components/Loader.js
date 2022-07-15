import CircularProgress from '@mui/material/CircularProgress';

function Loading () {
    return (
        <h2>Cargando...
            <div className="spinner">
                <p>
                    <CircularProgress color="inherit"/>
                </p>
            </div>
        </h2>
    )
}

export default Loading