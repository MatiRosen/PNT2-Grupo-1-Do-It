import ServicioChats from "../servicio/chats.js";
import { InvalidCredentialsError } from "../../errores.js";

class ControladorChats {
    constructor(persistencia) {
        this.servicio = new ServicioChats(persistencia);
    }

    obtenerChatsDelUsuario = async (req, res) => {
        try {
            const chats = await this.servicio.obtenerChatsDelUsuario(req.params.id);
            res.json(chats);
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                res.status(401).json(error.message);
            } else {
                res.status(500).json({
                    message:
                        "Hubo un problema interno. Intente nuevamente más tarde.",
                });
            }
        }
    }

    obtenerChat = async (req, res) => {
        try {
            const chat = await this.servicio.obtenerChat(req.params.id);
            res.json(chat);
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                res.status(401).json(error.message);
            } else {
                res.status(500).json({
                    message:
                        "Hubo un problema interno. Intente nuevamente más tarde.",
                });
            }
        }
    }

    mandarMensaje = async (req, res) => {
        try {
            const mensaje = await this.servicio.mandarMensaje(req.params.id, req.body);
            
            res.json(mensaje);
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                res.status(401).json(error.message);
            } else {
                res.status(500).json({
                    message:
                        "Hubo un problema interno. Intente nuevamente más tarde.",
                });
            }
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
            if (error instanceof InvalidCredentialsError) {
                res.status(401).json(error.message);
            } else {
                res.status(500).json({
                    message:
                        "Hubo un problema interno. Intente nuevamente más tarde.",
                });
            }
        }
    }

}

export default ControladorChats;
