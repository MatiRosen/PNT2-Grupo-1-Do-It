<template>
<div class="ideas"></div>
    
<section id="ideas">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h2 v-for="p in chat.participantes"><span v-if="p != user.id">Chat con {{ otherUser.nombre }} </span></h2>
        </div>
      </div>
      <div class="col-md-8 ">
        <div class="row my-1 " v-for="m in chat.mensajes">
          <div class="card shadow-lg">
              <div class="card-block position-relative">
                <div class="row">
                  <div class="col-md-12 ">
                      <h2>
                        <div v-if="m.emisor == user.id" class="subtituloRojo">
                          {{ m.contenido }}
                        </div>
                        <div v-else class="subtitulovioleta">
                          {{ m.contenido }}
                        </div>
                      </h2>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <form @submit.prevent="mandarMensaje(contenido,chat.id)">
            <input type="text" v-model="contenido">
            <button type="submit">mandar mensaje</button>
        </form>
      </div>
    </div>
  </section>



</template>

<script setup>
import { useChatStore } from "../stores/chat";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/user";
import service from "../services/userService";

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

const otherUser = ref('')

const getOtherUser = async () => {
    let otherUserId = chat.participantes.find(p => p != user.id)
    otherUser.value = (await service.obtenerUsuario(otherUserId)).data
    console.log(otherUser)
}

onMounted(getOtherUser)
</script>

<style scoped>

 .ideas{
  background: url("../assets/fondo-contacto.png");
  background-position: center;
  position: absolute;
  top: 0;
  background-size: cover;
  width: 100%;
  height: 100%;
}

.titulosgrises {
  font-weight: bold;
  color: #6a6a6a;
  font-size: 20px;
}
.subtitulovioleta {
  font-weight: bold;
  color: #370a6d;
  font-size: 17px;
}
.subtituloRojo {
  font-weight: bold;
  color: #e20000;
  font-size: 17px;
}
.descripcion {
  font-weight: normal;
  color: #6a6a6a;
  font-size: 15px;
}
.p {
  font-size: 12px;
}


.card {
  border-radius: 20px;
  border-color: white;
  width: fit-content;
  border: 0;
}

.card-body {
  padding: 0;
  margin: 0;
}

.card-text {
  padding: 10px;
  margin: 5px 5px;
}

.card-title {
  padding: 0;
  margin: 0;
}


</style>