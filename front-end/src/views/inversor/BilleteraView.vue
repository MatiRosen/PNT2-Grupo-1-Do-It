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
                    id="dinero"
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
import userService from "../../services/userService";
import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user";

export default {
    setup() {
        const storeUser = useUserStore();
        const { user } = storeToRefs(storeUser);
        const { sumarDinero } = storeUser;

        return {
            user,
            sumarDinero,
        };
    },
    data() {
        return {
            usuario: {
                dinero: 0
            },
            vue: this,
        };
    },
    methods: {
        agregarDinero: (usuario, user, vue) => {
            usuario.dinero += user.dinero;
            userService
                .sumarDinero(usuario, user.id)
                .then(function (response) {
                    vue.sumarDinero(response.data.dinero);

                    vue.$router.push("/inversor");
                })
                .catch(function (error) {
                    alert(error.response.data);
                });
        },
    },
};
</script>

<style scoped></style>
