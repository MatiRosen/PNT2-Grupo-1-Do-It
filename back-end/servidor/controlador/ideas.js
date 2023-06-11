import ServicioIdeas from "../servicio/ideas.js";
import { InvalidCredentialsError } from "../../errores.js";

class ControladorIdeas {
    constructor() {
        this.ServicioIdeas = new ServicioIdeas();
    }

    obtenerTop = async (req, res) => {
        try {
            const topIdeas = await this.ServicioIdeas.obtenerTop();

            res.json(topIdeas);
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                res.json(error.message);
            } else {
                res.json({
                    message:
                        "Hubo un problema interno. Intente nuevamente más tarde.",
                });
            }
        }
    };

    obtenerIdeas = async (req, res) => {
        try {
            const { idCreador } = req.params;
            const ideas = await this.ServicioIdeas.obtenerIdeas(idCreador);

            res.json(ideas);
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                res.json(error.message);
            } else {
                res.json({
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

            res.json(ideas);
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                res.json(error.message);
            } else {
                res.json({
                    message:
                        "Hubo un problema interno. Intente nuevamente más tarde.",
                });
            }
        }
    };

    agregarIdea = async (req, res) => {
        try {
            const idea = req.body;
            idea.imagen = req.file.filename;
            const ideaAgregada = await this.ServicioIdeas.agregarIdea(idea);

            res.json(ideaAgregada);
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                res.json(error.message);
            } else {
                res.json({
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

            res.json({ message: "Idea eliminada exitosamente." });
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                res.json(error.message);
            } else {
                res.json({
                    message:
                        "Hubo un problema interno. Intente nuevamente más tarde.",
                });
            }
        }
    };

    actualizarIdea = async (req, res) => {
        try {
            const { id } = req.params;
            const idea = req.body;
            const ideaActualizada = await this.ServicioIdeas.actualizarIdea(
                id,
                idea
            );
            res.json(ideaActualizada);
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                res.json(error.message);
            } else {
                res.json({
                    message:
                        "Hubo un problema interno. Intente nuevamente más tarde.",
                });
            }
        }
    };

    actualizarImagenIdea = async (req, res) => {
        try {
            const { id } = req.params;
            const idea = req.body;
            if (req.file !== null) {
                idea.imagen = req.file.filename;
            }
            const ideaActualizada = await this.ServicioIdeas.actualizarIdea(
                id,
                idea
            );
            res.json(ideaActualizada);
        } catch (error) {
            res.json({
                message:
                    "Hubo un problema interno. Intente nuevamente más tarde.",
            });
        }
    };
}

export default ControladorIdeas;
