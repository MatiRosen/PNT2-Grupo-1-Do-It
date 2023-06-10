import express from "express";
import ControladorChats from "../controlador/chats.js";

class RouterChats {
    constructor() {
        this.router = express.Router();
        this.controlador = new ControladorChats();
    }

    start() {
        this.router.get("/user/:id", this.controlador.obtenerChatsDelUsuario);
        this.router.get("/:id", this.controlador.obtenerChat);
        this.router.post("/", this.controlador.crearChat);
        this.router.post("/mensaje/:id", this.controlador.mandarMensaje);

        return this.router;
    }
}

export default RouterChats;