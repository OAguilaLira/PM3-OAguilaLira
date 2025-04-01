export const validateLogin = (values) => {
    const errors = {};
    if(!values.username){
        errors.username = 'El campo usuario no puede estar vacio';
    }

    if(!values.password){
        errors.password = 'El campo contraseña no puede estar vacio'
    }
    return errors
}