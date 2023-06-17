import Joi from "joi";

export const validar = (usuario) => {
    const usuarioSchema = Joi.object({
        nombre: Joi.string().alphanum().required(),
        apellido: Joi.string().alphanum().required(),
        email: Joi.string().email().required(),
        dni: Joi.number().min(1000000).required(),
        nacimiento: Joi.date().greater("1-1-1900").less("now").required(),
        genero: Joi.string().alphanum().required(),
        telefono: Joi.number().required(),
        direccion: Joi.string().pattern(new RegExp("^[a-zA-Z0-9 ]{3,30}$")).required(),
        contraseña: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{5,30}$")).required(),
        tipo: Joi.string().pattern(new RegExp("^(Creador|Inversor)$")).required(),
        dinero: Joi.number().min(0)
    });

    const { error } = usuarioSchema.validate(usuario);

    if (error) {
        return { result: false, error };
    }

    return { result: true };
};
