<template>
    <div class="article__flex-container">
        <form class="article__form" name="form">
            <div class="article__form__section">
                <input
                    v-model="usuario.email"
                    type="text"
                    name="Email"
                    id="txtMail"
                    class="article__form__input"
                    placeholder="Email"
                    required
                />
                <span class="text-danger"></span>
            </div>
            <div class="article__form__section">
                <input
                    v-model="usuario.contraseña"
                    type="password"
                    name="Contraseña"
                    id="txtContra"
                    class="article__form__input"
                    placeholder="Contraseña"
                    required
                />
                <span class="text-danger"></span>
            </div>

            <div class="article__form__section">
                <button @click="login">Iniciar sesión</button>
            </div>
        </form>

        <div>{{ this.usuario.email }}</div>
    </div>
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
    data() {
        return {
            usuario: {
                email: "",
                contraseña: "",
            },
            vue: this,
        };
    },
    methods: {
        login() {
            this.storeUser.agregarUsuario(this.usuario.email);
        },
    },
};
</script>

<style scoped></style>
