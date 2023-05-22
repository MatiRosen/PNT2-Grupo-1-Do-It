<template>
    <h1>Bienvenido {{ user.nombre }}!</h1>
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
