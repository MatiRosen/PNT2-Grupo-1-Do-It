import ServicioChats from "../servicio/chats.js";

class ControladorChats {
    constructor() {
        this.servicio = new ServicioChats();
    }

    obtenerChatsDelUsuario = async (req, res) => {
        try {
            const chats = await this.servicio.obtenerChatsDelUsuario(req.params.id);
            res.json(chats);
        } catch (error) {
            next(error);
        }
    }

    obtenerChat = async (req, res) => {
        try {
            const chat = await this.servicio.obtenerChat(req.params.id);
            res.json(chat);
        } catch (error) {
            next(error);
        }
    }

    mandarMensaje = async (req, res) => {
        try {
            const mensaje = await this.servicio.mandarMensaje(req.paras.id, req.body);
            res.json(mensaje);
        } catch (error) {
            next(error);
        }
    }

    crearChat = async (req, res) => {
        try {
            const chat = await this.servicio.crearChat(req.body);
            res.json(chat);
        } catch (error) {
            next(error);
        }
    }

}

export default ControladorChats;
