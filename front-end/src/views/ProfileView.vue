<template>
    <div v-if="estaLogueado">
        <h1>{{ user.nombre }}</h1>

        <div v-if="esInversor">
            <RouterLink to="/billetera"
                ><button>Agregar dinero</button></RouterLink
            >
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
</script>
