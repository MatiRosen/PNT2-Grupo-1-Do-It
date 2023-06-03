import express from "express";
import ControladorIdeas from "../controlador/ideas.js";

class RouterIdeas {
    constructor() {
        this.router = express.Router();
        this.controlador = new ControladorIdeas();
    }

    start() {
        this.router.get("/creador/:idCreador?", this.controlador.obtenerIdeas);
        this.router.get("/inversor/:idInversor", this.controlador.obtenerIdeasInversor);
        this.router.get("/filtro/:campo/:valor", this.controlador.obtenerIdeasPorCampo);
        this.router.get("/obtenerTop", this.controlador.obtenerTop);
        this.router.post("/", this.controlador.agregarIdea);
        this.router.delete("/:id", this.controlador.eliminarIdea);
        this.router.put("/idea/:id", this.controlador.actualizaridea);

        return this.router;
    }
}

export default RouterIdeas;
