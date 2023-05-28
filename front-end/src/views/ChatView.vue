<template>
    hola
    {{ user.nombre }}
    <div v-for="c in chatsDelUsuario">
        chat entre {{ c.participantes }}
        <p>mensajes</p>
        <div v-for="m in c.mensajes">{{ m.contenido }} - {{ m.emisor }}</div>
    <form @submit.prevent="mandarMensaje(contenido,c.id)">
            <input type="text" v-model="contenido">
            <button type="submit">mandar mensaje</button>
        </form>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import { useChatStore } from "../stores/chat";
import { ref } from "vue";

const storeUser = useUserStore();
const { user } = storeToRefs(storeUser);

const chatStore = useChatStore()
const {chats} = storeToRefs(chatStore)

const chatsDelUsuario = chats.value.filter(c => c.participantes.find(p => p == user.value.email))

let contenido = ref('')

const mandarMensaje = (contenido, id) =>{
    let mensajeMandar = { emisor: user.value.email, contenido}
    chatStore.mandarMensaje(id, mensajeMandar)
}

</script>
