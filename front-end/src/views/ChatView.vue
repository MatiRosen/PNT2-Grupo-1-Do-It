<template>
    mensajes
    <div v-for="m in chat.mensajes">
        {{ m.contenido }}
    </div>
    <form @submit.prevent="mandarMensaje(contenido,chat.id)">
                      <input type="text" v-model="contenido">
                      <button type="submit">mandar mensaje</button>
                  </form>
</template>

<script setup>
import { useChatStore } from "../stores/chat";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { useUserStore } from "../stores/user";

const storeUser = useUserStore();
const { user } = storeUser;

const route = useRoute();
const chatId = route.params.id;

const chatStore = useChatStore();
const chat = chatStore.getChat(chatId);

let contenido = ref('')

const mandarMensaje = (contenido, chatId) =>{
    let mensajeMandar = { emisor: user.id, contenido}
    chatStore.mandarMensaje(chatId, mensajeMandar)
}

</script>