<template>
    <section id="Registrar">
        <div class="container">
            <div class="row">
                <div class="card shadow-lg">
                    <div class="card-block position-relative">
                        <div class="row text-center">
                            <h2>Registrarte</h2>
                        </div>
                        <div class="row">
                            <div class="col-md-12 mt-3">
                                <form
                                    @submit.prevent="registrar(vue, usuario)"
                                    name="form">
                                    <div class="mb-md-3 mt-3 form-group">
                                        <input
                                            v-model="usuario.nombre"
                                            type="text"
                                            id="txtNombre"
                                            name="txtNombre"
                                            class="form-control shadow"
                                            placeholder="Nombre"
                                            required />
                                    </div>
                                    <div class="mb-md-3 form-group">
                                        <input
                                            v-model="usuario.apellido"
                                            type="text"
                                            id="txtApellido"
                                            name="txtApellido"
                                            class="form-control shadow"
                                            placeholder="Apellido"
                                            required />
                                    </div>
                                    <div class="mb-md-3 form-group">
                                        <input
                                            v-model="usuario.email"
                                            type="email"
                                            id="txtCorreo"
                                            name="txtCorreo"
                                            class="form-control shadow"
                                            placeholder="Correo"
                                            required />
                                    </div>
                                    <div class="mb-md-3 form-group">
                                        <input
                                            v-model="usuario.dni"
                                            type="number"
                                            id="txtDni"
                                            name="txtDni"
                                            class="form-control shadow"
                                            placeholder="Número de Documento"
                                            required />
                                    </div>
                                    <div class="mb-md-3 form-group">
                                        <input
                                            v-model="usuario.nacimiento"
                                            type="Date"
                                            id="txtFechaNacimiento"
                                            name="txtFechaNacimiento"
                                            class="form-control shadow"
                                            placeholder="Fecha de Nacimiento"
                                            required />
                                    </div>
                                    <div class="mb-md-3 form-group">
                                        <select
                                            class="form-control shadow"
                                            v-model="usuario.genero"
                                            required>
                                            <option value="" disabled>
                                                Género
                                            </option>
                                            <option value="mujer">Mujer</option>
                                            <option value="hombre">
                                                Hombre
                                            </option>
                                            <option value="otro">Otro</option>
                                        </select>
                                    </div>
                                    <div class="mb-md-3 form-group">
                                        <input
                                            v-model="usuario.telefono"
                                            type="number"
                                            id="txtTelefono"
                                            name="txtTelefono"
                                            class="form-control shadow"
                                            placeholder="Número de telefono"
                                            required />
                                    </div>
                                    <div class="mb-md-3 form-group">
                                        <input
                                            v-model="usuario.direccion"
                                            type="text"
                                            id="txtDireccion"
                                            name="txtDireccion"
                                            class="form-control shadow"
                                            placeholder="Dirección"
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
                                    <div class="mb-md-3 form-group">
                                        <p class="form-check-inline ml-2">
                                            Tipo de usuario:
                                        </p>
                                        <div
                                            class="form-check form-check-inline">
                                            <input
                                                v-model="usuario.tipo"
                                                class="form-check-input mt-1"
                                                type="radio"
                                                name="Tipo"
                                                id="tipo"
                                                value="tipo"
                                                required />
                                            <label
                                                class="form-check-label"
                                                for="flexRadioDefault1">
                                                Creador
                                            </label>
                                        </div>
                                        <div
                                            class="form-check form-check-inline">
                                            <input
                                                v-model="usuario.tipo"
                                                class="form-check-input mt-1"
                                                type="radio"
                                                name="Tipo"
                                                id="tipo"
                                                value="tipo"
                                                required />
                                            <label
                                                class="form-check-label"
                                                for="flexRadioDefault2">
                                                Inversor
                                            </label>
                                        </div>
                                    </div>
                                    <div class="mb-md-3 form-group text-right">
                                        <button class="btn btn-primary">
                                            Registrarse
                                        </button>
                                    </div>
                                </form>
                            </div>
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
                nombre: "",
                apellido: "",
                email: "",
                dni: "",
                nacimiento: "",
                genero: "",
                telefono: "",
                direccion: "",
                contraseña: "",
                tipo: "",
            },
            vue: this,
        };
    },
    methods: {
        registrar(vue, usuario) {
            userService
                .register(usuario)
                .then(function (response) {
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
                    if (usuario.tipo == "Inversor") {
                        vue.$router.push("/inversor");
                    } else if (usuario.tipo == "Creador") {
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
@import "../assets/estilos.css";
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
    height: 80vh;
    display: flex;
    width: fit-content;
    flex-direction: column;
    justify-items: center;
    justify-content: flex-end;
}
</style>
|
