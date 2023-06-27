import express from "express";
import Controlador from "../controlador/usuarios.js";

class Router {
    constructor(persistencia) {
        this.router = express.Router();
        this.controlador = new Controlador(persistencia);
    }

    start() {
        this.router.post("/", this.controlador.guardarUsuario);
        this.router.put("/dinero/:id", this.controlador.actualizarDinero);
        this.router.post("/login", this.controlador.logUsuario);
        this.router.delete("/:id", this.controlador.eliminarUsuario);
        this.router.get("/creadores/:idCreador?", this.controlador.obtenerCreadores);
        this.router.get("/id/:id", this.controlador.obtenerUsuario);
        
        return this.router;
    }
}

export default Router;
