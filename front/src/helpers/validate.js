export const validate = (values) => {
    const errors = {}; 
    if(!values.name){
        errors.name = 'El campo nombre es requerido'
    } else if(values.name.length > 40) {
        errors.name = 'El nombre no puede exceder los 45 caracteres'
    }

    
    if (!values.email) {
            errors.email = 'El correo electrónico es requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Correo electrónico inválido';
          
    }

    if(!values.birthdate) {
        errors.birthdate = 'El campo Fecha de nacimiento es requerido'
    } 
    // Recordar validar que la fecha no sea muy vieja ni muy nueva

    if(!values.nDni) {
        errors.nDni = 'El campo nDni es requerido'
    }
    // Recordar buscar formato válido 

    if(!values.username){
        errors.username = 'El campo usuario es requerido'
    }

    if(!values.password){
        errors.password = 'El campo contraseña no puede estar vacio'
    }

    // Recordar buscar una regex para que la contraseña tenga una mayuscula y un número

    if(values.passwordConfirmation !== values.password){
        errors.passwordConfirmation = 'Las contraseña no coincide por favor revisela'
    }
    return errors;
}