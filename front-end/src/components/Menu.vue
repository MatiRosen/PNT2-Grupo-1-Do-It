<template>
    <nav class="navbar navbar-default">
        <div v-if="estaLogueado">
            <div v-if="esInversor">
                <RouterLink to="/inversor"><button>Home</button></RouterLink>
            </div>
            <div v-else>
                <RouterLink to="/creador"><button>Home</button></RouterLink>
            </div>

            <div>
                <h3>{{ user.nombre }}</h3>
            </div>
            <div>
                <RouterLink to="/perfil"><button>Perfil</button></RouterLink>
            </div>

            <div>
                <RouterLink to="/"
                    ><button @click="logout()">
                        Cerrar sesión
                    </button></RouterLink
                >
            </div>

            <div>
                <RouterLink to="/chat"><button>Chat</button></RouterLink>
            </div>

            <div v-if="esInversor">
                <p>${{ user.dinero }}</p>
            </div>
        </div>

        <div v-else>
            <div>
                <RouterLink to="/"><button>Home</button></RouterLink>
            </div>
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
