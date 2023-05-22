<template>
    <div class="article__flex-container">
        <form
            @submit.prevent="login(usuario, vue)"
            class="article__form"
            name="form"
        >
            <div class="article__form__section">
                <input
                    v-model="usuario.email"
                    type="email"
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
                <button type="submit">Iniciar sesión</button>
            </div>
        </form>

        <div v-if="estaLogueado">{{ user.nombre }}</div>
    </div>
</template>

<script>
import axios from "axios";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

export default {
    setup() {
        const storeUser = useUserStore();
        const { user } = storeToRefs(storeUser);
        const { agregarUsuario } = storeUser;
        let { estaLogueado } = storeToRefs(storeUser);

        return {
            user,
            agregarUsuario,
            estaLogueado,
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
        login: (usuario, vue) => {
            let respuesta = axios
                .post("http://localhost:8080/login", usuario)
                .then(function (response) {
                    vue.usuario.nombre = response.data.nombre;
                    vue.agregarUsuario(response.data.nombre, response.data.tipo, response.data.dinero);
                    vue.$router.push("/");
                })
                .catch(function (error) {
                    alert("Error de usuario y contraseña");
                    console.log(error);
                });
        },
    },
};
</script>

<style scoped></style>
