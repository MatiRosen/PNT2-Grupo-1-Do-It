import express from "express";
import Controlador from "../controlador/usuarios.js";

class Router {
    constructor() {
        this.router = express.Router();
        this.controlador = new Controlador();
    }

    start() {
        this.router.get("/:email?", this.controlador.obtenerUsuarios);
        this.router.post("/", this.controlador.guardarUsuario);
        this.router.put("/:email", this.controlador.actualizarUsuario);
        this.router.delete("/:email", this.controlador.eliminarUsuario);

        return this.router;
    }
}

export default Router;
