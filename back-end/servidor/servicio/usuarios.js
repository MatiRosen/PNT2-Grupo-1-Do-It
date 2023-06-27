import ModelFactory from "../model/DAO/usuariosFactory.js";
import { InvalidCredentialsError, ValidationError } from "../../errores.js";
import { validar } from "../validaciones/usuarios.js";

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

            if (!usuarioAux) {
                throw new InvalidCredentialsError(
                    "Credenciales inválidas. El email ingresado no existe."
                );
            }

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
        if (!usuario.dinero)
            throw new InvalidCredentialsError("Debe ingresar el dinero.");

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
