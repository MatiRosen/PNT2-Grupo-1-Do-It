import axios from "./axiosClient.js";

const apiClient = axios.getApiClient();

export default {
    obtenerChats(idUsuario) {
        return apiClient.get(`/api/chats/user/${idUsuario}`);
    },
    obtenerChat(idChat) {
        return apiClient.get(`/api/chats/${idChat}`);
    },
    crearChat(chat) {
        return apiClient.post("/api/chats", chat);
    },
    mandarMensaje(idChat, mensaje) {
        return apiClient.post(`/api/chats/mensaje/${idChat}`, mensaje);
    },
    obtenerChatPorParticipantes(idUsuario1, idUsuario2) {
        return apiClient.get(`/api/chats/usuarios/${idUsuario1}/${idUsuario2}`);
    }
};