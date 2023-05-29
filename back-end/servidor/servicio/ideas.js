import ModelFactory from "../model/DAO/ideasFactory.js";
import config from "../config.js";

class ServicioIdeas {
    constructor() {
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA);
    }

    obtenerIdeas = async (email) => {
        try {
            const ideas = await this.model.obtenerIdeas(email);
            return ideas;
        } catch (error) {
            throw error;
        }
    };

    agregarIdea = async (idea) => {
        try {
            const ideaAgregada = await this.model.agregarIdea(idea);
            return ideaAgregada;
        } catch (error) {
            throw error;
        }
    }

    eliminarIdea = async (id) => {
        try {
            await this.model.eliminarIdea(id);
        } catch (error) {
            throw error;
        }
    }
}

export default ServicioIdeas;
