<template>
    <div>
        <form
            @submit.prevent="agregarDinero(usuario, user, vue)"
            class="article__form"
            name="form">
            <div class="article__form__section">
                <input
                    v-model="usuario.dinero"
                    type="number"
                    name="Dinero"
                    id="numDinero"
                    class="article__form__input"
                    placeholder="Ingrese la cantidad de dinero que desea depositar"
                    required />
                <span class="text-danger"></span>
            </div>

            <button>Agregar dinero</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user";

export default {
    setup() {
        const storeUser = useUserStore();
        const { user } = storeToRefs(storeUser);
        const { agregarDinero } = storeUser;

        return {
            user,
            agregarDinero,
        };
    },
    data() {
        return {
            usuario: {
                dinero: 0,
            },
            vue: this,
        };
    },
    methods: {
        agregarDinero: (usuario, user, vue) => {
            let respuesta = axios
                .put("http://localhost:8080/usuarios/" + user.email, usuario)
                .then(function (response) {
                    console.log(response.data);
                    vue.agregarDinero(response.data.dinero);

                    vue.$router.push("/inversor");
                })
                .catch(function (error) {
                    alert("Error ingresando dinero");
                    console.log(error);
                });
        },
    },
};
</script>

<style scoped></style>
