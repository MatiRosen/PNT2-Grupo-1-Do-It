import Joi from "joi";

export const validar = (inversion) => {
    const inversionSchema = Joi.object({
        idIdea: Joi.string().required(),
        idInversor: Joi.string().required(),
        dineroInvertido: Joi.number().min(0).required(),
    });

    const { error } = inversionSchema.validate(inversion);

    if (error) {
        return { result: false, error };
    }

    return { result: true };
};
