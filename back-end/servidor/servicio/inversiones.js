import ModelFactory from "../model/DAO/inversionesFactory.js";
import { validar } from "../validaciones/inversiones.js";
import { ValidationError } from "../../errores.js";
import ControladorMailer from "../controlador/mailer.js";
import e from "cors";

class ServicioInversiones {
    constructor(persistencia) {
        this.model = ModelFactory.get(persistencia);
        this.ControladorMailer = new ControladorMailer();
    }

    obtenerInversiones = async () => {
        try {
            const inversiones = await this.model.obtenerInversiones();
            return inversiones;
        } catch (error) {
            throw error;
        }
    };

    obtenerInversion = async (idIdea, idInversor) => {
        try {
            const inversion = await this.model.obtenerInversion(
                idIdea,
                idInversor
            );
            return inversion;
        } catch (error) {
            throw error;
        }
    };

    obtenerInversionesPorCampo = async (campo, id) => {
        try {
            const inversiones = await this.model.obtenerInversionesPorCampo(
                campo,
                id
            );
            return inversiones;
        } catch (error) {
            throw error;
        }
    };

    agregarInversion = async (inversion) => {
        try {
            const res = validar(inversion);
            if (!res.result) {
                throw new ValidationError(
                    `Campo inválido: ${res.error.message}`
                );
            }

            await this.ControladorMailer.enviarMail(inversion);

            const inversionAgregada = await this.model.agregarInversion(
                inversion
            );
            return inversionAgregada;
        } catch (error) {
            throw error;
        }
    };

    eliminarInversion = async (idIdea, idInversor) => {
        try {
            await this.model.eliminarInversion(idIdea, idInversor);
        } catch (error) {
            throw error;
        }
    };

    actualizarInversion = async (idIdea, idInversor, inversion) => {
        try {
            const InversionActualizada = await this.model.actualizarInversion(
                idIdea,
                idInversor,
                inversion
            );
            return InversionActualizada;
        } catch (error) {
            throw error;
        }
    };
}

export default ServicioInversiones;
