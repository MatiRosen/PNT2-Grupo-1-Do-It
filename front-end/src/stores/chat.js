import { defineStore } from "pinia";
import chatService from "../services/chatService.js";

export const useChatStore = defineStore('chat',{
    state: () => ({
        chats: []
    }),
    actions: {
        async mandarMensaje(id, mensaje){
            await chatService.mandarMensaje(id, mensaje)
        },
        async getChat(chatId) {
            return await chatService.obtenerChat(chatId)
        },
        async getChatsDelUsuario(userId) {
            let c = chatService.obtenerChats(userId)
            this.chats = c
            return this.chats
        }
    },
    getters: {
        
    }
})


