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
                      <h2 class="titulosgrises">chat con {{ c.otherUser }}</h2>

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
import { ref, onMounted, reactive } from "vue";
import service from "../services/userService.js";

const storeUser = useUserStore();
const { user } = storeToRefs(storeUser);

const chatStore = useChatStore()

const chatsDelUsuario = ref('')

chatStore.getChatsDelUsuario(user.value.id).then(c => {
  chatsDelUsuario.value = c.data

  chatsDelUsuario.value.forEach(c => {
    (service.obtenerUsuario(c.participantes.find(p => p != user.value.id))).then(x => {
     c.otherUser = x.data.nombre
    })
  })
})

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

.color-gradiente {
  color: white;
  padding: 15px;
  background: rgba(107, 35, 35, 1);
  background: -moz-linear-gradient(
    left,
    rgba(107, 35, 35, 1) 0%,
    rgba(231, 55, 39, 1) 69%,
    rgba(231, 55, 39, 1) 100%
  );
  background: -webkit-gradient(
    left top,
    right top,
    color-stop(0%, rgba(107, 35, 35, 1)),
    color-stop(69%, rgba(231, 55, 39, 1)),
    color-stop(100%, rgba(231, 55, 39, 1))
  );
  background: -webkit-linear-gradient(
    left,
    rgba(107, 35, 35, 1) 0%,
    rgba(231, 55, 39, 1) 69%,
    rgba(231, 55, 39, 1) 100%
  );
  background: -o-linear-gradient(
    left,
    rgba(107, 35, 35, 1) 0%,
    rgba(231, 55, 39, 1) 69%,
    rgba(231, 55, 39, 1) 100%
  );
  background: -ms-linear-gradient(
    left,
    rgba(107, 35, 35, 1) 0%,
    rgba(231, 55, 39, 1) 69%,
    rgba(231, 55, 39, 1) 100%
  );
  background: linear-gradient(
    to right,
    rgba(107, 35, 35, 1) 0%,
    rgba(231, 55, 39, 1) 69%,
    rgba(231, 55, 39, 1) 100%
  );
  filter: progid: DXImageTransform.Microsoft.gradient( startColorstr='#6b2323', endColorstr='#e73727', GradientType=1);
}

</style>