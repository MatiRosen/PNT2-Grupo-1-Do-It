import { defineStore } from "pinia";
import service from "../services/userService.js";
import chatService from "../services/chatService.js";

export const useChatStore = defineStore('chat',{
    state: () => ({
        chats: []
    }),
    actions: {
        async mandarMensaje(id, mensaje){
            await chatService.mandarMensaje(id, mensaje)
            let chatAgregar = this.chats.find(c => c.id == id)
            chatAgregar.mensajes.push(mensaje)
            chatAgregar.ultimoMensaje = mensaje
        },
        async getChat(chatId) {
            return await chatService.obtenerChat(chatId)
        },
        async getChatsDelUsuario(userId) {
            let c = await chatService.obtenerChats(userId)
            c.data.forEach(async c => {c.otherUser = (await service.obtenerUsuario(c.participantes.find(p => p != userId))).data})
            
            this.chats = c
            return this.chats
        }
    },
    getters: {
        
    }
})


