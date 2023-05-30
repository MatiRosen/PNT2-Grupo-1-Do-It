import ServicioIdeas from "../servicio/ideas.js";
import { InvalidCredentialsError } from "../../errores.js";

class ControladorIdeas {
    constructor() {
        this.ServicioIdeas = new ServicioIdeas();
    }

    obtenerIdeas = async (req, res) => {
        try {
            const { idCreador } = req.params;
            const ideas = await this.ServicioIdeas.obtenerIdeas(idCreador);

            res.status(200).json(ideas);
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                res.status(400).json(error.message);
            } else {
                res.status(500).json({
                    message:
                        "Hubo un problema interno. Intente nuevamente más tarde.",
                });
            }
        }
    };

    obtenerIdeasPorCampo = async (req, res) => {
        try {
            const { campo, valor } = req.params;
            const ideas = await this.ServicioIdeas.obtenerIdeasPorCampo(
                campo,
                valor
            );
            
            res.status(200).json(ideas);
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                res.status(400).json(error.message);
            } else {
                res.status(500).json({
                    message:
                        "Hubo un problema interno. Intente nuevamente más tarde.",
                });
            }
        }
    }

    agregarIdea = async (req, res) => {
        try {
            const idea = req.body;
            const ideaAgregada = await this.ServicioIdeas.agregarIdea(idea);

            res.status(201).json(ideaAgregada);
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                res.status(400).json(error.message);
            } else {
                res.status(500).json({
                    message:
                        "Hubo un problema interno. Intente nuevamente más tarde.",
                });
            }
        }
    };

    eliminarIdea = async (req, res) => {
        try {
            const { id } = req.params;
            await this.ServicioIdeas.eliminarIdea(id);

            res.status(200).json({ message: "Idea eliminada exitosamente." });
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                res.status(400).json(error.message);
            } else {
                res.status(500).json({
                    message:
                        "Hubo un problema interno. Intente nuevamente más tarde.",
                });
            }
        }
    };
}

export default ControladorIdeas;
