<template>
    <div v-if="!estaLogueado" class="article__flex-container">
        <form @submit.prevent="loguear(usuario, vue)" name="form">
            <div class="article__form__section">
                <input
                    v-model="usuario.email"
                    type="email"
                    name="Email"
                    id="txtMail"
                    class="article__form__input"
                    placeholder="Email"
                    required />
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
                    required />
                <span class="text-danger"></span>
            </div>

            <div class="article__form__section">
                <button class="btn btn-primary" type="submit">
                    Iniciar sesión
                </button>
            </div>
        </form>

        <div v-if="estaLogueado">{{ user.nombre }}</div>
    </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import userService from "../services/userService";

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
            userService,
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
        loguear: (usuario, vue) => {
            userService
                .login(usuario)
                .then(function (response) {
                    vue.usuario.nombre = response.data.nombre;
                    vue.agregarUsuario(
                        response.data.nombre,
                        response.data.email,
                        response.data.tipo,
                        response.data.dinero
                    );
                    if (response.data.tipo == "Inversor") {
                        vue.$router.push("/inversor");
                    } else if (response.data.tipo == "Creador") {
                        vue.$router.push("/creador");
                    }
                })
                .catch(function (error) {
                    alert(error.response.data);
                });
        },
    },
};
</script>

<style scoped></style>
