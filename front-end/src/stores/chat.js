import { defineStore } from "pinia";

export const useChatStore = defineStore('chat',{
    state: () => ({
        chats: [
            { id: 0,
            participantes: [3,2],
            mensajes: [ {emisor: 2, contenido: 'hola'},
            {emisor: 3, contenido: 'chau'}],
            ultimoMensaje: {emisor: 3, contenido: 'chau'}, }
        ]
    }),
    actions: {
        mandarMensaje(id, mensaje){
            let chatAgregar = this.chats.find(c => c.id == id)
            chatAgregar.mensajes.push(mensaje)
            chatAgregar.ultimoMensaje = mensaje
        },
        getChat(chatId) {
            return this.chats.find(c => c.id == chatId)
        },
        getChats(userId) {
            return this.chats.filter(c => c.participantes.includes(userId))
        }
    },
    getters: {
        
        
    }
})


