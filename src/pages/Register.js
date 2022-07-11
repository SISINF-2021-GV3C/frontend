import React, { useState } from "react"
import { Link } from "react-router-dom"
import { ButtonUnstyled } from "@mui/base";
import { useForm } from "react-hook-form";
import "../App.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// Expresión regular para validar formato de correo electrónico
const regExpMail = RegExp(
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
)

// Expresión regular para validar seguridad de la contraseña
const regExpPass = RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#\$%\^&\*])(?=.{8,})/
)

function Login() {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        mode: "all",
      });
    
    const onSubmit = (data) => console.log(data);

    console.log("errors", errors);

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
    const [typePass, setTypePass] = useState('password')
    const [typeCPass, setTypeCPass] = useState('password')
    const [iconPass, setIconPass] = useState(faEyeSlash)
    const [iconCPass, setIconCPass] = useState(faEyeSlash)

    const handleToggle = () => {
        if (typePass === 'password') {
            setIconPass(faEye)
            setTypePass('text')
        }
        else{
            setIconPass(faEyeSlash)
            setTypePass('password')
        }
    }

    const handleToggle2 = () => {
        if (typeCPass === 'password') {
            setIconCPass(faEye)
            setTypeCPass('text')
        }
        else{
            setIconCPass(faEyeSlash)
            setTypeCPass('password')
        }
    }

    return (
        <div className="reg-wrapper">
            <div className="reg-inner">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3>Registra tu cuenta</h3>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input type="text" className="form-control" name="Name" placeholder="Introduce tu nombre y apellido" onChange={({target}) => setName(target.value)}/>                    
                    </div>
                    <p></p>
                    <div className="form-group">
                        <label>Nombre de usuario</label>
                        <input type="text" className="form-control" name="Username" placeholder="Introduce tu nombre de usuario" onChange={({target}) => setUsername(target.value)}/>                    
                    </div>
                    <p></p>
                    <div className="form-group">
                        <label>Correo electrónico</label>
                        <input
                            {...register("email", {
                                required: "Correo electrónico obligatorio...",
                                pattern: {
                                value: regExpMail,
                                message: "Correo electrónico no válido.",
                                },
                            })} 
                            type="text" 
                            className="form-control" 
                            name="email" 
                            placeholder="Introduce tu correo electrónico" 
                            onChange={({target}) => setEmail(target.value)}
                        />                    
                    </div>
                    <p className="reg-warning">{errors.email?.message}</p>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <div className="input-group mb-3">
                            <input 
                                {...register("password", {
                                    required: "Contraseña obligatoria...",
                                    pattern: {
                                      value: regExpPass,
                                      message:
                                        "La contraseña debe tener al menos 8 caracteres y contener una mayúscula, una minúscula, un número y un caracter especial.",
                                    },
                                })}
                                type={typePass} 
                                className="form-control" 
                                name="Password" 
                                placeholder="Introduce tu contraseña" 
                                onChange={({target}) => setPassword(target.value)}
                            />
                            <ButtonUnstyled className="show-btn" onClick={handleToggle}>
                                <FontAwesomeIcon icon={iconPass} />
                            </ButtonUnstyled>
                        </div>
                    </div>
                    <p className="reg-warning">{errors.password?.message}</p>
                    <div className="form-group">
                        <label>Confirmar contraseña</label>
                        <div className="input-group mb-3">
                            <input 
                                {...register("cpassword", {
                                    required: "Contraseña obligatoria...",
                                    pattern: {
                                      value: regExpPass,
                                      message:
                                        "La contraseña debe tener al menos 8 caracteres y contener una mayúscula, una minúscula, un número y un caracter especial.",
                                    },
                                })}
                                type={typeCPass} 
                                className="form-control" 
                                name="CPassword" 
                                placeholder="Confirma tu contraseña" 
                                onChange={({target}) => setCPassword(target.value)}/>
                            <ButtonUnstyled className="show-btn" onClick={handleToggle2}>
                                <FontAwesomeIcon icon={iconCPass} />
                            </ButtonUnstyled>
                        </div>
                    </div>
                    <p className="reg-warning">{errors.cpassword?.message}</p>
                    <br></br>
                    <div class="d-grid gap-2"> 
                        <button type="submit" className="btn btn-primary btn-block btn-lg">Registrar</button>
                    </div>
                    <br></br>
                    <h1 className="generic-text">
                    ¿Ya te has registrado? <Link className="reset-link" to="/login">Inicia sesión</Link>
                    </h1>
                </form>
            </div>
        </div>
    );
}

export default Login;