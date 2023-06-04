import express from "express";
import ControladorInversiones from "../controlador/inversiones.js";

class RouterInversiones {
    constructor() {
        this.router = express.Router();
        this.controlador = new ControladorInversiones();
    }

    start() {
        this.router.get("/", this.controlador.obtenerInversiones);
        this.router.get("/:idIdea/:idInversor", this.controlador.obtenerInversion);
        this.router.get("/filtro/:campo/:id?", this.controlador.obtenerInversionesPorCampo);
        
        this.router.post("/", this.controlador.agregarInversion);
        this.router.delete("/:idIdea/:idInversor", this.controlador.eliminarInversion);
        this.router.put("/:idIdea/:idInversor", this.controlador.actualizarInversion);

        return this.router;
    }
}

export default RouterInversiones;