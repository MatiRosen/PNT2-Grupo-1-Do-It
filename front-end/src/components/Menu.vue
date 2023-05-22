<template>
    <!--Preguntar como hacer que si hacen /login no se muestre el login porque ya estan logeados.-->
    <div>
        <RouterLink to="/"><button>Home</button></RouterLink>
    </div>

    <div v-if="!estaLogueado">
        <div>
            <RouterLink to="/registrarse"
                ><button>Registrarse</button></RouterLink
            >
        </div>

        <div>
            <RouterLink to="/login"><button>Iniciar sesión</button></RouterLink>
        </div>
    </div>

    <div v-if="estaLogueado">
        <div>
            <h3>{{ user.nombre }}</h3>
        </div>
        <div>
            <RouterLink to="/perfil"><button>Perfil</button></RouterLink>
        </div>

        <div>
            <RouterLink to="/"
                ><button @click="logout()">Cerrar sesión</button></RouterLink
            >
        </div>

        <div>
            <RouterLink to="/chat"><button>Chat</button></RouterLink>
        </div>

        <div v-if="esInversor">
            <p>${{ user.dinero }}</p>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

const storeUser = useUserStore();
const { user } = storeToRefs(storeUser);
let { estaLogueado, esInversor } = storeToRefs(storeUser);
const { eliminarUsuario } = storeUser;

const logout = () => {
    eliminarUsuario();
};
</script>

<style scoped>
div {
    display: inline-block;
}
p {
    color: green;
}
</style>
