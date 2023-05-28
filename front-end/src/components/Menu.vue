<template>  
  <div class="container d-flex justify-content-center menu-component">
    <nav class="navbar navbar-expand-lg">      
      <div class="collapse navbar-collapse" id="navbarSupportedContent">    
            <div v-if="estaLogueado">        
                <div class="navbar-nav mr-auto">
                  <div v-if="esCreador">
                    <router-link to="/creador" class="nav-item nav-link">Home</router-link>        
                  </div>
                  <div v-else>
                    <router-link to="/" class="nav-item nav-link">Home</router-link>        
                  </div>                    
                    <router-link to="/perfil" class="nav-item nav-link">Perfil</router-link>
                    <router-link to="/chat" class="nav-link">Chat</router-link>
                    <router-link to="/Contact" class="nav-link">Contact</router-link>                
                    <div class="nav-item">
                        <RouterLink to="/"><button type="button" class="btn" @click="logout()">Cerrar sesión</button></RouterLink>
                    </div>
                </div>
            </div>    
            <div v-else>
                <div class="navbar-nav mr-auto">
                    <router-link to="/" class="nav-item nav-link">Home</router-link>        
                    <router-link to="/registrarse" class="nav-item nav-link">Registrarse</router-link>
                    <router-link to="/login" class="nav-link nav-link"> Iniciar sesion</router-link>
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
#nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: whitesmoke;
  background: crimson;
  border-radius: .5rem;
}
.menu-component {
  position: relative;
  z-index: 2; /* Valor mayor que el fondo */
}
</style>
