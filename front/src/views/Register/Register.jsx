import {Formik, Form, Field, ErrorMessage} from 'formik'
import { validate } from '../../helpers/validate';
import styles from './Register.module.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate()
    const registrarUsuario = (valoresFormulario) => {
        delete valoresFormulario.passwordConfirmation
        console.log(valoresFormulario)
        axios.post('http://localhost:3000/users/register', valoresFormulario).
        then((response) => {
            alert(response.data.message)
            navigate('/');
        }).
        catch((error) => alert(error.response.data))
    }

    return (
        <div className={styles.contenedor}>
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    birthdate: "",
                    nDni: "",
                    username: "",
                    password: "",
                    passwordConfirmation: ""
                }}
                validate={validate}
                validateOnChange={true}
                validateOnBlur={true}
                onSubmit={registrarUsuario}
            >
                {
                    ({errors, touched, handleChange}) => {
                        const handleChangePersonalizado = (e) => {
                            handleChange(e)
                            touched[e.target.name] = true
                        }
                        return (
                            <Form className={styles.formulario}>
                                <label>Nombre</label>
                                <Field type='text' name='name' onChange={handleChangePersonalizado}
                                />
                                {touched.name && errors.name && <ErrorMessage name='name'/>}
                                <label>Email</label>
                                <Field type='email' name='email'onChange={
                                    handleChangePersonalizado

                                    }/>
                                {touched.email && errors.email && <ErrorMessage name='email'/>}
                                <label>Fecha de nacimiento</label>
                                <Field type='date' name='birthdate'onChange={
                                    handleChangePersonalizado
                                    }/>
                                {touched.birthdate && errors.birthdate && <ErrorMessage name='birthdate'/>}
                                <label>nDni</label>
                                <Field type='text' name='nDni'onChange={
                                    handleChangePersonalizado
                                    }/>
                                {touched.nDni && errors.nDni && <ErrorMessage name='nDni'/>}
                                <label>Usuario</label>
                                <Field type='text' name='username'onChange={
                                    handleChangePersonalizado
                                    }/>
                                {touched.username && errors.username && <ErrorMessage name='username'/>}
                                <label>Contraseña</label>
                                <Field type='password' name='password'onChange={
                                    handleChangePersonalizado
                                    }/>
                                {touched.password && errors.password && <ErrorMessage name='password'/>}
                                <label>Repite tu Contraseña</label>
                                <Field type='password' name='passwordConfirmation'onChange={
                                    handleChangePersonalizado
                                    }/>
                                {touched.passwordConfirmation && errors.passwordConfirmation && <ErrorMessage name='passwordConfirmation'/>}
                                <button disabled={Object.keys(errors).length > 0} type="submit">Ingresar</button>
                            </Form>
                        )
                    }
                }
            </Formik>
            <p>¿Ya tienes una cuenta? <Link to={"/"}>Ingresa</Link></p> 
        </div>
    )
}

export default Register;