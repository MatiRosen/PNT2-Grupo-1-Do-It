import express from "express";
import Controlador from "../controlador/usuarios.js";

class Router {
    constructor() {
        this.router = express.Router();
        this.controlador = new Controlador();
    }

    start() {
        // API REST FULL
        //this.router.get("/usuarios/:email?", this.controlador.obtenerUsuarios);
        this.router.post("/", this.controlador.guardarUsuario);
        this.router.put("/:email", this.controlador.actualizarUsuario); // Podriamos hacer un put para sumar dinero
        //this.router.delete("/usuarios/:email", this.controlador.eliminarUsuario);

        this.router.post("/login", this.controlador.logUsuario);

        return this.router;
    }
}

export default Router;
