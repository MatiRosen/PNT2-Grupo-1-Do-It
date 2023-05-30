import express from "express";
import ControladorIdeas from "../controlador/ideas.js";

class RouterIdeas {
    constructor() {
        this.router = express.Router();
        this.controlador = new ControladorIdeas();
    }

    start() {
        this.router.get("/:email?", this.controlador.obtenerIdeas);
        this.router.get("/:campo/:valor", this.controlador.obtenerIdeasPorCampo);
        this.router.post("/", this.controlador.agregarIdea);
        this.router.delete("/:id", this.controlador.eliminarIdea);

        return this.router;
    }
}

export default RouterIdeas;
