import { defineStore } from "pinia";

export const useChatStore = defineStore('chat',{
    state: () => ({
        chats: [
            { id: 0,
            participantes: ['fran@lagares','matias.rosen@cliente.com'],
            mensajes: [ {emisor: 'matias.rosen@cliente.com', contenido: 'hola'},
            {emisor: 'fran@lagares', contenido: 'chau'}] }
        ]
    }),
    actions: {
        mandarMensaje(id, mensaje){
            let chatAgregar = this.chats.find(c => c.id == id)
            chatAgregar.mensajes.push(mensaje)
        }
    },
    getters: {}
})


