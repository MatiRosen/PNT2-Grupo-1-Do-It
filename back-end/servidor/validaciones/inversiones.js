import Joi from "joi";

export const validar = (inversion) => {
    const inversionSchema = Joi.object({
        idIdea: Joi.required().messages({
            "any.required": "El id de la idea debe existir.",
        }),
        idInversor: Joi.required().messages({
            "any.required": "El id del inversor debe existir.",
        }),
        dineroInvertido: Joi.number().min(1).required().messages({
            "any.required": "El dinero invertido debe existir.",
            "number.min": "El dinero invertido debe ser mayor a 0.",
        }),
    });

    const { error } = inversionSchema.validate(inversion);

    if (error) {
        return { result: false, error };
    }

    return { result: true };
};
