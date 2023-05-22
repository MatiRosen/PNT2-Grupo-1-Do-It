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
                    v-model="usuario.password"
                    type="password"
                    name="Password"
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
                    v-model="usuario.tipoUsuario"
                    type="radio"
                    name="TipoUsuario"
                    id="creador"
                    class="article__form__input"
                    value="Creador"
                    required
                />
                <label for="Creador">Creador</label>
                <input
                    v-model="usuario.tipoUsuario"
                    type="radio"
                    name="TipoUsuario"
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
    <div v-for="usuario in usuarios" :key="usuario.email">
        {{ usuario.nombre }}
    </div>
</template>

<script>
export default {
    data() {
        return {
            usuarios: [],
            usuario: {
                nombre: "",
                apellido: "",
                email: "",
                dni: "",
                nacimiento: "",
                genero: "",
                telefono: "",
                direccion: "",
                password: "",
                tipoUsuario: "",
            },
            vue: this,
        };
    },
    methods: {
        registrar(vue, usuario) {
            vue.usuarios.push(usuario);
        },
    },
};
</script>

<style scoped></style>
