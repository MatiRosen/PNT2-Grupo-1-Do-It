import ModelFactory from "../model/DAO/usuariosFactory.js";
import { InvalidCredentialsError, ValidationError } from "../../errores.js";
import { validar } from "../validaciones/usuarios.js";
import axios from "axios";

// Usamos el patrón Singleton :)
let instancia = null;
class Servicio {
    constructor(persistencia) {
        if (!instancia) {
            instancia = this;
            this.model = ModelFactory.get(persistencia);
        }
        return instancia;
    }

    obtenerUsuario = async (id) => {
        try {
            const usuarios = await this.model.obtenerUsuario(id);
            return usuarios;
        } catch (error) {
            return error;
        }
    };

    guardarUsuario = async (usuario) => {
        try {
            const res = validar(usuario);
            if (!res.result) {
                throw new ValidationError(
                    `Campo inválido: ${res.error.message}`
                );
            }

            const usuarioGuardado = await this.model.guardarUsuario(usuario);
            return {
                id: usuarioGuardado.id,
                nombre: usuarioGuardado.nombre,
                apellido: usuarioGuardado.apellido,
                email: usuarioGuardado.email,
                dni: usuarioGuardado.dni,
                genero: usuarioGuardado.genero,
                telefono: usuarioGuardado.telefono,
                direccion: usuarioGuardado.direccion,
                tipo: usuarioGuardado.tipo,
                dinero: usuarioGuardado.dinero,
            };
        } catch (error) {
            throw error;
        }
    };

    logUsuario = async (usuario) => {
        try {
            if (!usuario.email || !usuario.contraseña) {
                throw new InvalidCredentialsError(
                    "Credenciales inválidas. Debe ingresar un email y una contraseña."
                );
            }
            const usuarioAux = await this.model.obtenerUsuarios(usuario.email);

            if (usuario.contraseña == usuarioAux.contraseña) {
                return {
                    id: usuarioAux.id,
                    nombre: usuarioAux.nombre,
                    apellido: usuarioAux.apellido,
                    email: usuarioAux.email,
                    dni: usuarioAux.dni,
                    genero: usuarioAux.genero,
                    telefono: usuarioAux.telefono,
                    direccion: usuarioAux.direccion,
                    tipo: usuarioAux.tipo,
                    dinero: usuarioAux.dinero,
                };
            } else {
                throw new InvalidCredentialsError("Contraseña incorrecta.");
            }
        } catch (error) {
            throw error;
        }
    };

    actualizarDinero = async (id, usuario) => {
        for (let atributo in usuario) {
            if (atributo != "dinero") {
                throw new InvalidCredentialsError(
                    "Solamente se puede modificar el dinero"
                );
            }
        }

        try {
            const usuarioActualizado = await this.model.actualizarUsuario(
                id,
                usuario
            );
            return { dinero: usuarioActualizado.dinero };
        } catch (error) {
            throw error;
        }
    };

    eliminarUsuario = async (id) => {
        try {
            const usuario = await this.model.obtenerUsuario(id);
            if (!usuario) {
                throw new InvalidCredentialsError(
                    "No se puede eliminar el usuario porque no existe."
                );
            }

            if (usuario.tipo == "Inversor") {
                let inversiones = [];
                await axios
                    .get(
                        `http://localhost:8080/api/inversiones/filtro/idInversor/${id}`
                    )
                    .then((res) => {
                        inversiones = res.data;
                    })
                    .catch((error) => {
                        inversiones = [];
                    });

                if (inversiones.length > 0) {
                    throw new InvalidCredentialsError(
                        "No se puede eliminar el usuario porque tiene inversiones."
                    );
                }
            } else {
                const res = await axios.get(
                    `http://localhost:8080/api/ideas/creador/${id}`
                );
                const ideas = res.data;
                if (ideas.length > 0) {
                    throw new InvalidCredentialsError(
                        "No se puede eliminar el usuario porque tiene ideas registradas."
                    );
                }
            }

            const usuarioEliminado = await this.model.eliminarUsuario(id);
            return {
                id: usuarioEliminado.id,
                dni: usuarioEliminado.dni,
                nombre: usuarioEliminado.nombre,
                email: usuarioEliminado.email,
                tipo: usuarioEliminado.tipo,
                dinero: usuarioEliminado.dinero,
            };
        } catch (error) {
            throw error;
        }
    };

    obtenerCreadores = async (idCreador) => {
        try {
            const usuarios = await this.model.obtenerCreadores(idCreador);

            return usuarios;
        } catch (error) {
            throw error;
        }
    };
}

export default Servicio;
