<template>
    <RouterLink to="/"><button>Home</button></RouterLink>
    <div class="" v-if="!registrado" >
        <RouterLink><button>Registrarse</button></RouterLink>
    </div>

    <RouterLink to="/login"><button>Iniciar sesión</button></RouterLink>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import {ref} from "vue";

</script>


<style scoped>
div {
  display: inline-block;
}

</style>
