<template>
    <div class="ideas"></div>
    <!--hola
    {{ user.nombre }}
    <div v-for="c in chatsDelUsuario">
        chat entre {{ c.participantes }}
        <p>mensajes</p>
        <div v-for="m in c.mensajes">{{ m.contenido }} - {{ m.emisor }}</div>
    <form @submit.prevent="mandarMensaje(contenido,c.id)">
            <input type="text" v-model="contenido">
            <button type="submit">mandar mensaje</button>
    </form>
    </div>-->


    <section id="ideas">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h2>Chats</h2>
        </div>
      </div>
      <div class="row top-separation">
        <div class=" columnas" v-for="c in chatsDelUsuario" :key="c.id">
          <div class="card shadow-lg">
            <div class="card-block position-relative">
              <div class="row">
                <div class="col-md-3">
                  <!-- <img class="img-fluid" :src="idea.imagen" /> -->
                  <img class="img-fluid" src="../assets/ideas.jpg" />
                </div>
                <div class="col-md-7 offset-md-1">
                    <h2 class="titulosgrises">participantes <span v-for="p in c.participantes">{{ p }} - </span></h2>  
                  
                    <h3 v-for="m in c.mensajes">
                        <div v-if="m.emisor == user.email" class="subtituloRojo">
                            {{ m.contenido }}
                        </div>
                        <div v-else class="subtitulovioleta">
                            {{ m.contenido }}
                        </div>
                    </h3>

                <form @submit.prevent="mandarMensaje(contenido,c.id)">
                    <input type="text" v-model="contenido">
                    <button type="submit">mandar mensaje</button>
                </form>
                </div>
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