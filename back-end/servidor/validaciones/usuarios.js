import Joi from "joi";

export const validar = (usuario) => {
    const usuarioSchema = Joi.object({
        nombre: Joi.string().alphanum().required().messages({
            "string.pattern.base": "Debes escribir tu nombre.",
        }),
        apellido: Joi.string().alphanum().required().messages({
            "string.pattern.base": "Debes escribir tu apellido.",
        }),
        email: Joi.string().email().required().messages({
            "string.email": "El email debe ser válido.",
        }),
        dni: Joi.number().min(1000000).required().messages({
            "number.min": "El DNI debe tener al menos 7 numeros.",
        }),
        nacimiento: Joi.date()
            .greater("1-1-1900")
            .less("now")
            .required()
            .messages({
                "date.greater": "La fecha de nacimiento debe ser mayor a 1900.",
                "date.less":
                    "La fecha de nacimiento debe ser menor a la actual.",
            }),
        genero: Joi.string().alphanum().required().messages({
            "string.pattern.base": "Debes escribir un género.",
        }),
        telefono: Joi.number().required().messages({
            "number.base": "Debes escribir un número de teléfono.",
        }),
        direccion: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9 ]{3,50}$"))
            .required().messages({
                "string.pattern.base":
                    "La dirección debe tener entre 3 y 50 caracteres alfanuméricos.",
            }),
        contraseña: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9]{5,30}$"))
            .required()
            .messages({
                "string.pattern.base":
                    "La contraseña debe tener entre 5 y 30 caracteres alfanuméricos.",
            }),
        tipo: Joi.string()
            .pattern(new RegExp("^(Creador|Inversor)$"))
            .required().messages({
                "string.pattern.base":
                    "El tipo de usuario debe ser Creador o Inversor.",
            }),
        dinero: Joi.number().min(0).messages({
            "number.min": "El dinero debe ser mayor o igual a 0.",
        }),
    });

    const { error } = usuarioSchema.validate(usuario);

    if (error) {
        return { result: false, error };
    }

    return { result: true };
};
