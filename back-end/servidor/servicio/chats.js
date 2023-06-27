import ModelFactory from "../model/DAO/chatsFactory.js";


class ServicioChats {
    constructor(persistencia) {
        this.model = ModelFactory.get(persistencia);
    }

    obtenerChatsDelUsuario = async (userId) => {
        try {
            const chats = await this.model.obtenerChatsDelUsuario(userId);
            return chats;
        } catch (error) {
            return error;
        }
    };

    obtenerChat = async (chatId) => {
        try {
            const chat = await this.model.obtenerChat(chatId);
            return chat;
        } catch (error) {
            return error;
        }
    };

    mandarMensaje = async (idChat, mensaje) => {
        try {
            const mensajeNuevo = await this.model.mandarMensaje(idChat, mensaje);
            return mensajeNuevo;
        } catch (error) {
            throw error;
        }
    };

    /*crearChat = async (chat) => {
        try {
            const chatNuevo = await this.model.agregarChat(chat);
            return chatNuevo;
        } catch (error) {
            throw error;
        }
    }*/

    obtenerChatPorParticipantes = async (idUsuario1, idUsuario2) => {
        try {
            const chat = await this.model.obtenerChatPorParticipantes(idUsuario1, idUsuario2);
            return chat;
        } catch (error) {
            throw error;
        }
    }
    
}

export default ServicioChats;