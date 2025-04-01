import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from './Login.module.css'
import { validateLogin } from "../../helpers/validateLogin";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import { login } from "../../redux/userSlice";


const Login = () => {
    const navigate = useNavigate()
    const dispath = useDispatch();
    const handleOnSumbmit = (values) => {
        axios.post('http://localhost:3000/users/login', values).
        then((response) => {
            const respuesta = response.data.login ? 'Logeo exitoso' : 'Logeo fallido'
            alert(respuesta)
            dispath(login(response.data))
            navigate("/turnos")
        }).catch((error) => alert( error.response ? error.response.data : error))
    }

    return (
        <div className={styles.contenedor}>
            <Formik
                initialValues={{
                    username: "",
                    password: ""
                }}
                validate={validateLogin}
                onSubmit={handleOnSumbmit}
            >
                {
                    ({errors}) => {
                        return (
                            <Form className={styles.formulario}>
                                <label htmlFor="username">Usuario</label>
                                <Field type="text" name="username" />
                                <ErrorMessage name="username" />
                                <label htmlFor="password">Contraseña</label>
                                <Field type="password" name="password" />
                                <ErrorMessage name="password" />
                                <button disabled={Object.keys(errors).length > 0} type="submit">Ingresar</button>
                            </Form>
                        )
                    }
                }  
            </Formik>
            <p>¿Aún no tienes una cuenta? <Link to={"/register"}>Registrate</Link></p>  
        </div>
    )
}

export default Login;