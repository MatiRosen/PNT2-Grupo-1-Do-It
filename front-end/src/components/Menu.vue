<template>
  <div class="container d-flex justify-content-center menu-component">
    <nav class="navbar navbar-expand-lg">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="navbar-nav mr-auto">
          <RouterLink :to="rutaTipo" class="nav-item nav-link">Home</RouterLink>
        </div>
        <div v-if="estaLogueado">
          <div class="navbar-nav mr-auto">
            <RouterLink to="/perfil" class="nav-item nav-link"
              >Perfil</RouterLink
            >
            <RouterLink to="/chats" class="nav-item nav-link">Chat</RouterLink>
            <div v-if="esInversor" class="nav-item money mt-2 mx-2">
              ${{ user.dinero }}
            </div>
            <RouterLink to="/" class="nav-item nav-link" @click="logout()">
              Cerrar sesión
            </RouterLink>
          </div>
        </div>
        <div v-else>
          <div class="navbar-nav mr-auto">
            <RouterLink to="/registrarse" class="nav-item nav-link"
              >Registrarse</RouterLink
            >
            <RouterLink to="/login" class="nav-item nav-link">
              Iniciar sesion</RouterLink
            >
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import { computed } from "vue";

const storeUser = useUserStore();
const { user } = storeToRefs(storeUser);
let { estaLogueado, esInversor, esCreador } = storeToRefs(storeUser);
const { eliminarUsuario } = storeUser;

const rutaTipo = computed(() => {
  if (esInversor.value) {
    return "/inversor";
  } else if (esCreador.value) {
    return "/creador";
  } else {
    return "/";
  }
});

const logout = () => {
  eliminarUsuario();
};
</script>

<style scoped>
.nav {
  padding: 25px;
  text-align: center;
}

.nav-item {
  font-weight: bold;
  color: #e20000;
  font-size: 20px;
}
.money {
  color: #3eb805;
}

</style>
