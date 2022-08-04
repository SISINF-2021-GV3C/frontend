import React, { useState } from "react"
import { Link } from "react-router-dom"
import { ButtonUnstyled } from "@mui/base";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../css/profile.css"
import { Button } from "bootstrap";

function Profile() {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [tlf, setTlf] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

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
                                    placeholder="Nombre de usuario" 
                                />                    
                            </div>
                            <div className="col">
                                <label>Nacionalidad</label>
                                <input
                                    disabled="true"
                                    type="text" 
                                    className="form-control" 
                                    name="tlf" 
                                    placeholder="Número de teléfono" 
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
                            <ButtonUnstyled className="btn btn-primary btn-block btn-lg">Volver atrás</ButtonUnstyled>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;