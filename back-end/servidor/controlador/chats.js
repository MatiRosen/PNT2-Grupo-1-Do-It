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
            res.status(500).json({mensaje: error.message});
        }
    }

    obtenerChat = async (req, res) => {
        try {
            const chat = await this.servicio.obtenerChat(req.params.id);
            res.json(chat);
        } catch (error) {
            res.status(500).json({mensaje: error.message});
        }
    }

    mandarMensaje = async (req, res) => {
        try {
            const mensaje = await this.servicio.mandarMensaje(req.params.id, req.body);
            
            res.json(mensaje);
        } catch (error) {
            res.status(500).json({mensaje: error.message});
        }
    }

    /*crearChat = async (req, res) => {
        try {
            const chat = await this.servicio.crearChat(req.body);
            res.json(chat);
        } catch (error) {
            res.status(500).json({mensaje: error.message});
        }
    }*/

    obtenerChatPorParticipantes = async (req, res) => {
        try {
            const chat = await this.servicio.obtenerChatPorParticipantes(req.params.id1, req.params.id2);
            res.json(chat);
        } catch (error) {
            res.status(500).json({mensaje: error.message});
        }
    }

}

export default ControladorChats;
