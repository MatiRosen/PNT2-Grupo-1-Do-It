<template>
    <div class="article__flex-container">
        <form class="article__form" name="form">
            <div class="article__form__section">
                <input v-model="usuario.email"
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
                <input v-model="usuario.contraseña"
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            usuarios: [],
            usuario: {
                email: "",
                contraseña: "",
            },
        };
    },
    methods: {
        login() {
        },
    },
};
</script>

<style scoped>

</style>
