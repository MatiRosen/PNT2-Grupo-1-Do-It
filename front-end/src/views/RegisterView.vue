<template>
    <form action=""></form>

    <div class="article__flex-container">
        <form
            @submit.prevent="registrar(vue, usuario)"
            class="article__form"
            name="form"
        >
            <div class="article__form__section">
                <input
                    v-model="usuario.nombre"
                    type="text"
                    name="Nombre"
                    id="txtNombre"
                    class="article__form__input"
                    placeholder="Nombre"
                    required
                />
                <span class="text-danger"></span>
            </div>
            <div class="article__form__section">
                <input
                    v-model="usuario.apellido"
                    type="text"
                    name="Apellido"
                    id="txtApellido"
                    class="article__form__input"
                    placeholder="Apellido"
                    required
                />
                <span class="text-danger"></span>
            </div>
            <div class="article__form__section">
                <input
                    v-model="usuario.email"
                    type="email"
                    name="Email"
                    id="txtEMail"
                    class="article__form__input"
                    placeholder="Email"
                    required
                />
                <span class="text-danger"></span>
            </div>
            <div class="article__form__section">
                <input
                    v-model="usuario.dni"
                    type="number"
                    name="Dni"
                    id="numDni"
                    class="article__form__input"
                    placeholder="Documento de identificación"
                    required
                />
                <span class="text-danger"></span>
            </div>
            <div class="article__form__section">
                <input
                    v-model="usuario.nacimiento"
                    type="date"
                    name="Nacimiento"
                    id="fechaNacimiento"
                    class="article__form__input"
                    required
                />
                <span class="text-danger"></span>
            </div>
            <div class="article__form__section">
                <select class="select" v-model="usuario.genero">
                    <option value="" disabled>Género</option>
                    <option value="mujer">Mujer</option>
                    <option value="hombre">Hombre</option>
                    <option value="otro">Otro</option>
                </select>
            </div>
            <div class="article__form__section">
                <input
                    v-model="usuario.telefono"
                    type="number"
                    name="Telefono"
                    id="numTel"
                    class="article__form__input"
                    placeholder="Numero de telefono"
                    required
                />
                <span class="text-danger"></span>
            </div>
            <div class="article__form__section">
                <input
                    v-model="usuario.direccion"
                    type="text"
                    name="Direccion"
                    id="txtDom"
                    class="article__form__input"
                    placeholder="Domicilio"
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
                <p class="article__form__p">
                    Elige el tipo de usuario que eres:
                </p>
                <input
                    v-model="usuario.tipo"
                    type="radio"
                    name="Tipo"
                    id="creador"
                    class="article__form__input"
                    value="Creador"
                    required
                />
                <label for="Creador">Creador</label>
                <input
                    v-model="usuario.tipo"
                    type="radio"
                    name="Tipo"
                    id="Inversor"
                    class="article__form__input"
                    value="Usuario"
                    required
                />
                <label class="article__form__label">Inversor</label>
                <span class="text-danger"></span>
            </div>
            <div class="article__form__section">
                <button>Registrarse</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

export default {
    setup(){
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
            let respuesta = axios
                .post("http://localhost:8080/api/usuarios", usuario)
                .then(function (response) {
                    vue.agregarUsuario(response.data.nombre, response.data.tipo, response.data.dinero);
                    if (usuario.tipo == "Inversor"){
                        vue.$router.push("/inversor");
                    }else if (usuario.tipo == "Creador"){
                         vue.$router.push("/creador");
                    }
                   
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
