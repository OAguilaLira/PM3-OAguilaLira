import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import styles from "./AgendarTurno.module.css";
import { validateCitas } from "../../helpers/validateCitas";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';

const AgendarTurno = () => {
  const [startDate, setStartDate] = useState(new Date());
  const isLogin = useSelector((state) => state.login);
  const idUserLogin = useSelector((state) => state.user.id)
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin]);
    
  

  const handleOnSubmit = (valoresFormulario) => {
    const dateTime = new Date(`${valoresFormulario.date}T${valoresFormulario.time}:00.000Z`).toISOString();
    valoresFormulario.userId = idUserLogin;
    valoresFormulario.date = dateTime
    valoresFormulario.time = dateTime
    console.log(valoresFormulario);
    axios
      .post("http://localhost:3000/appointment/schedule", valoresFormulario)
      .then((response) => alert(response.data.message))
      .catch((error) => alert(error.response.data));
  };

  return (
    <div className={styles.contenedor}>
      {/* <Formik
        initialValues={{
          date: "",
          time: "",
        }}
        validate={validateCitas}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={handleOnSubmit}
      >
        {({ errors, touched, handleChange }) => {
          const handleChangePersonalizado = (e) => {
            // if (e.target.name === "time") {
            //   let value = e.target.value;
            //   let [hours, minutes] = value.split(':').map(Number);

            //   // Redondear a los 30 minutos más cercanos
            //   if (minutes >= 0 && minutes < 15) {
            //     minutes = 0;
            //   } else if (minutes >= 15 && minutes < 45) {
            //     minutes = 30;
            //   } else {
            //     minutes = 0;
            //     hours = (hours + 1) % 24;
            //   }

            //   // Asegurarse de que los minutos son 00 o 30
            //   const newTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
            //   e.target.value = newTime;
            // }
            handleChange(e);
            touched[e.target.name] = true;
          };
          return (
            <Form className={styles.formulario}>
              <label>Fecha</label>
              <Field
                type="date"
                name="date"
                onChange={handleChangePersonalizado}
              />
              {touched.date && errors.date && <ErrorMessage name="date" />}
              <label htmlFor="time">Hora:</label>
              <Field
                type="time"
                id="time"
                name="time"
                step="1800"
                required
                onChange={handleChangePersonalizado}
              />
              {touched.time && errors.time && <ErrorMessage name="time" />}
              <button disabled={Object.keys(errors).length > 0} type="submit">
                Ingresar
              </button>
            </Form>
          );
        }}
      </Formik> */}
      
    </div>
  );
};

export default AgendarTurno;
