<template>
    <section id="Loguear">
        <div class="container">
            <div class="row">
                <div class="card shadow-lg">
                    <div
                        v-if="!estaLogueado"
                        class="card-block position-relative">
                        <div class="row text-center">
                            <h2>Iniciar sesión</h2>
                        </div>
                        <div class="row">
                            <div class="col-md-12 mt-3">
                                <form
                                    @submit.prevent="loguear(usuario, vue)"
                                    name="form">
                                    <div class="mb-md-3 form-group">
                                        <input
                                            v-model="usuario.email"
                                            type="email"
                                            id="txtCorreo"
                                            name="Email"
                                            class="form-control shadow"
                                            placeholder="Correo"
                                            required />
                                    </div>
                                    <div class="mb-md-3 form-group">
                                        <input
                                            v-model="usuario.contraseña"
                                            type="password"
                                            name="Contraseña"
                                            id="txtContra"
                                            class="form-control shadow"
                                            placeholder="Contraseña"
                                            required />
                                    </div>
                                    <div class="mb-md-3 form-group text-right">
                                        <button class="btn btn-primary">
                                            Iniciar sesión
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div v-else class="card-block position-relative">
                        <div class="row text-center">
                            <h2>{{ user.nombre }}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
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
                        response.data.id,
                        response.data.nombre,
                        response.data.apellido,
                        response.data.email,
                        response.data.dni,
                        response.data.genero,
                        response.data.telefono,
                        response.data.direccion,
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

<style scoped>
h2 {
    color: #e20000;
}
.btn {
    background-color: #e20000;
    border-color: #e20000;
}
.form-check-input:checked {
    background-color: #e20000;
    border-color: #e20000;
}
#Loguear {
    background: url("../assets/fondo-contacto.png");
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: 100% 100%;
}
.card {
    border-radius: 20px;
    border-color: white;
    width: auto;
    border: 2;
    padding-inline: 50px;
    padding-top: 30px;
}

.card-body {
    padding: 0;
    margin: 0;
}
.container {
    height: 55vh;
    display: flex;
    width: fit-content;
    flex-direction: column;
    justify-items: center;
    justify-content: flex-end;
}


</style>
