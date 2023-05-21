<template>
    <h1>Home general</h1>
    <p>
        Aca vamos a poner alguna imagen inspiradora, un titulo lindo, los
        nombres y un resumen de la app.
    </p>
    <h1>{{ user.nombre }}</h1>
    <p></p>
</template>

<script>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

export default {
    setup() {
        const storeUser = useUserStore();
        const { user } = storeToRefs(storeUser);
        return {
            user,
        };
    },
};
</script>

<style></style>
