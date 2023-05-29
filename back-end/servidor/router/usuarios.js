import express from "express";
import Controlador from "../controlador/usuarios.js";

class Router {
    constructor() {
        this.router = express.Router();
        this.controlador = new Controlador();
    }

    start() {
        this.router.post("/", this.controlador.guardarUsuario);
        this.router.put("/dinero/:id", this.controlador.actualizarDinero);
        this.router.post("/login", this.controlador.logUsuario);
        this.router.delete("/:id", this.controlador.eliminarUsuario);

        return this.router;
    }
}

export default Router;
