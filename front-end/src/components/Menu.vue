<template>
    <div>
        <RouterLink to="/"><button>Home</button></RouterLink>
    </div>
    <div>
        <RouterLink to="/registrarse"><button>Registrarse</button></RouterLink>
    </div>

    <div>
        <RouterLink to="/login"><button>Iniciar sesión</button></RouterLink>
    </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";
</script>

<style scoped>
div {
    display: inline-block
}
</style>
