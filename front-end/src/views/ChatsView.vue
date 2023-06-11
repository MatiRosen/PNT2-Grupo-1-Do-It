<template>
  <section id="Loguear">
    <div class="container">
      <div class="row top-separation">
        <div class="col-md-12">
          <h2>Chats</h2>
        </div>
      </div>
      <div class="row" v-for="c in chatsDelUsuario" :key="c.id">
        <div class="card shadow-lg">
          <div class="card-block position-relative">
            <div class="row">
              <div class="col-md-12">
                <RouterLink :to="{ name: 'chat', params: { id: c.id } }"
                  ><h2 class="titulosgrises">
                    Conversar con {{ c.otherUser }}
                  </h2></RouterLink
                >
                <h2>
                  <div
                    v-if="c.ultimoMensaje.emisor == user.email"
                    class="subtituloRojo"
                  >
                    {{ c.ultimoMensaje.contenido }}
                  </div>
                  <div v-else class="subtitulovioleta">
                    {{ c.ultimoMensaje.contenido }}
                  </div>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import { useChatStore } from "../stores/chat";
import { ref, onMounted, reactive } from "vue";
import service from "../services/userService.js";

const storeUser = useUserStore();
const { user } = storeToRefs(storeUser);

const chatStore = useChatStore();

const chatsDelUsuario = ref("");

chatStore.getChatsDelUsuario(user.value.id).then((c) => {
  chatsDelUsuario.value = c.data;

  chatsDelUsuario.value.forEach((c) => {
    service
      .obtenerUsuario(c.participantes.find((p) => p != user.value.id))
      .then((x) => {
        c.otherUser = x.data.nombre;
      });
  });
});
</script>

<style scoped>
@import "../assets/estilos.css";
.a{
  text-decoration: transparent;
}
.titulosgrises {
  font-weight: bold;
  color: #6a6a6a;
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 0;
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
  margin-top: 20px;
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
