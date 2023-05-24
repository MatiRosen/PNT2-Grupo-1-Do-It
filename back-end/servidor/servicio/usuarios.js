import ModelFactory from "../model/DAO/usuariosFactory.js";
import config from "../config.js";
import { InvalidCredentialsError } from "../../errores.js";

class Servicio {
    constructor() {
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA);
    }

    /*obtenerUsuarios = async (email) => {
        try {
            const usuarios = await this.model.obtenerUsuarios(email);
            return usuarios;
        } catch (error) {
            return error;
        }
    };*/

    guardarUsuario = async (usuario) => {
        try {
            const usuarioGuardado = await this.model.guardarUsuario(usuario);
            return {
                nombre: usuarioGuardado.nombre,
                email: usuarioGuardado.email,
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

            if (
                usuario.contraseña == usuarioAux.contraseña
            ) {
                return {
                    nombre: usuarioAux.nombre,
                    email: usuarioAux.email,
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

    actualizarUsuario = async (email, usuario) => {
        /*if (!usuario.dinero)
            throw new InvalidCredentialsError(
                "Debe ingresar el dinero."
            );

        for (let atributo in usuario) {
            if (atributo != "dinero") {
                throw new InvalidCredentialsError(
                    "Solamente se puede modificar el dinero"
                );
            }
        }
        
        Esto es para que no se pueda modificar nada más que el dinero. Capaz haya que ponerlo en otro método que se llame sumarDinero o algo así.
        */

        try {
            const usuarioActualizado = await this.model.actualizarUsuario(
                email,
                usuario
            );
            return { dinero: usuarioActualizado.dinero };
        } catch (error) {
            throw error;
        }
    };

    // Modificar
    eliminarUsuario = async (email) => {
        const usuarioEliminado = await this.model.eliminarUsuario(email);
        return usuarioEliminado;
    };
}

export default Servicio;
