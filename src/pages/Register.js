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

// Expresión regular para validar formato de teléfono
const regExpTlf = RegExp(
    /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{3})$/
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

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [tlf, setTlf] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
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
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <h3>Registra tu cuenta</h3>
                    <div className="row g-3">
                        <div className="col">
                            <label>Nombre</label>
                            <input
                                {...register("firstName", {
                                    required: "Campo obligatorio.",
                                })}
                                type="text" 
                                className="form-control" 
                                name="firstName" 
                                placeholder="Introduce tu nombre" 
                                onChange={({target}) => setFirstName(target.value)}/>                    
                            <p className="reg-warning">{errors.firstName?.message}</p>
                        </div>
                        <div className="col">
                            <label>Nombre</label>
                            <input
                                {...register("lastName", {
                                    required: "Campo obligatorio.",
                                })}
                                type="text" 
                                className="form-control" 
                                name="lastName" 
                                placeholder="Introduce tu apellido" 
                                onChange={({target}) => setLastName(target.value)}/>                    
                            <p className="reg-warning">{errors.lastName?.message}</p>
                        </div>
                    </div>
                    <div className="row g-3">
                        <div className="col">
                            <label>Nombre de usuario</label>
                            <input
                                {...register("userName", {
                                    required: "Campo obligatorio.",
                                    minLength: {
                                    value: 3,
                                    message: "El nombre debe tener al menos 3 caracteres.",
                                    },
                                    maxLength: {
                                    value: 30,
                                    message: "El nombre debe tener como máximo 30 caracteres.",
                                    },
                                })} 
                                type="text" 
                                className="form-control" 
                                name="userName" 
                                placeholder="Introduce tu nombre de usuario" 
                                onChange={({target}) => setUserName(target.value)}/>                    
                            <p className="reg-warning">{errors.userName?.message}</p>
                        </div>
                        <div className="col">
                            <label>Teléfono</label>
                            <input
                                {...register("tlf", {
                                    required: "Campo obligatorio.",
                                    pattern: {
                                        value: regExpTlf,
                                        message: "Correo electrónico no válido: formato XXX-XXX-XXX ó XXXXXXXXX.",
                                    },
                                })} 
                                type="text" 
                                className="form-control" 
                                name="tlf" 
                                placeholder="Introduce tu número de teléfono" 
                                onChange={({target}) => setTlf(target.value)}/>                    
                            <p className="reg-warning">{errors.tlf?.message}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Correo electrónico</label>
                        <input
                            {...register("email", {
                                required: "Campo obligatorio.",
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
                        <p className="reg-warning">{errors.email?.message}</p>
                    </div>
                    <div className="row g-3">
                        <div className="col">
                            <label>Contraseña</label>
                            <div className="input-group mb-3">
                                <input
                                    {...register("password", {
                                        required: "Campo obligatorio.",
                                        pattern: {
                                            value: regExpPass,
                                            message: "La contraseña debe tener al menos 8 caracteres y contener una mayúscula, una minúscula, un número y un carácter especial.",
                                        },
                                    })} 
                                    type={typePass} 
                                    className="form-control" 
                                    name="password" 
                                    placeholder="Introduce tu contraseña" 
                                    onChange={({target}) => setPassword(target.value)}
                                />
                                <ButtonUnstyled className="show-btn" onClick={handleToggle}>
                                    <FontAwesomeIcon icon={iconPass} />
                                </ButtonUnstyled>
                            </div>
                            <p className="reg-warning-pass">{errors.password?.message}</p>
                        </div>
                        <div className="col">
                            <label>Confirmar contraseña</label>
                            <div className="input-group mb-3">
                                <input
                                    {...register("cPassword", {
                                        required: "Campo obligatorio.",
                                        pattern: {
                                            value: regExpPass,
                                            message: "La contraseña debe tener al menos 8 caracteres y contener una mayúscula, una minúscula, un número y un carácter especial.",
                                        },
                                    })} 
                                    type={typeCPass} 
                                    className="form-control"
                                    name="cPassword" 
                                    placeholder="Confirma tu contraseña" 
                                    onChange={({target}) => setCPassword(target.value)}/>
                                <ButtonUnstyled className="show-btn" onClick={handleToggle2}>
                                    <FontAwesomeIcon icon={iconCPass} />
                                </ButtonUnstyled>
                            </div>
                            <p className="reg-warning-pass">{errors.cPassword?.message}</p>
                        </div>
                    </div>
                    <br></br>
                    <div className="d-grid gap-2"> 
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