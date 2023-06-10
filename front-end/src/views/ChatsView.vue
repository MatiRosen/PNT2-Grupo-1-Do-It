<template>
    <div class="ideas"></div>

    <section id="ideas">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h2>Chats</h2>
        </div>
      </div>
      <div class="row top-separation">
        <div class=" columnas" v-for="c in chatsDelUsuario" :key="c.id">
          <RouterLink :to="{name: 'chat', params: {id: c.id}}">
            <div class="card shadow-lg">
              <div class="card-block position-relative">
                <div class="row">
                  <div class="col-md-2">
                    <img class="img-fluid" src="../assets/ideas.jpg" />
                  </div>
                  <div class="col-md-7 offset-md-1">
                      <h2 class="titulosgrises">chat con {{ c.otherUser.nombre }}</h2>

                      <h2>
                        <div v-if="c.ultimoMensaje.emisor == user.email" class="subtituloRojo">
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
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

</template>

<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import { useChatStore } from "../stores/chat";
import { ref, onMounted } from "vue";
import service from "../services/userService";

const storeUser = useUserStore();
const { user } = storeToRefs(storeUser);

const chatStore = useChatStore()

const chatsDelUsuario = ref(chatStore.getChats(user.value.id))

const buscarUsuario = async c =>{
  c.otherUser = (await service.obtenerUsuario(c.participantes.find(p => p != user.value.id))).data
}
chatsDelUsuario.value.forEach(buscarUsuario)
</script>

<style scoped>
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