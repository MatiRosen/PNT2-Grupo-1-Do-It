<template>
    <nav class="navbar navbar-default">
        <!--https://fontawesome.com/v6/docs/web/use-with/vue/ ver para iconos-->
        <RouterLink :to="rutaTipo"><button>Home</button></RouterLink>

        <div v-if="estaLogueado">
            <div>
                <h3>{{ user.nombre }}</h3>
            </div>
            <div>
                <RouterLink to="/perfil"><button>Perfil</button></RouterLink>
            </div>

            <div>
                <RouterLink to="/chat"><button>Chat</button></RouterLink>
            </div>

            <div v-if="esInversor">
                <p>${{ user.dinero }}</p>
            </div>

            <div>
                <RouterLink to="/"
                    ><button @click="logout()">
                        Cerrar sesión
                    </button></RouterLink
                >
            </div>
        </div>

        <div v-else>
            <div>
                <RouterLink to="/registrarse"
                    ><button>Registrarse</button></RouterLink
                >
            </div>

            <div>
                <RouterLink to="/login"
                    ><button>Iniciar sesión</button></RouterLink
                >
            </div>
        </div>
    </nav>
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
div {
    display: inline-block;
}
p {
    color: green;
}
</style>
