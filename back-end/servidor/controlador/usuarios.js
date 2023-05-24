import Servicio from "../servicio/usuarios.js";
import { InvalidCredentialsError, DatabaseError } from "../../errores.js";

class Controlador {
    constructor() {
        this.servicio = new Servicio();
    }

    // Eliminar
    /*obtenerUsuarios = async (req, res) => {
        try {
            const { email } = req.params;
            const usuarios = await this.servicio.obtenerUsuarios(email);

            res.json(usuarios);
        } catch (error) {
            console.log(
                "Error al obtener usuarios en el controlador: ",
                error.message
            );
        }
    };*/

    guardarUsuario = async (req, res) => {
        try {
            const usuario = req.body;
            const usuarioGuardado = await this.servicio.guardarUsuario(usuario);

            res.json(usuarioGuardado);
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                res.status(400).json(error.message);
            } else if (error instanceof DatabaseError) {
                res.status(500).json({
                    message:
                        "Hubo un problema interno. Intente nuevamente más tarde.",
                });
            }
        }
    };

    logUsuario = async (req, res) => {
        try {
            const usuario = req.body;
            const usuarioLogueado = await this.servicio.logUsuario(usuario);

            res.status(200).json(usuarioLogueado);
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                res.status(400).json(error.message);
            } else if (error instanceof DatabaseError) {
                res.status(500).json({
                    message:
                        "Hubo un problema interno. Intente nuevamente más tarde.",
                });
            }
        }
    };

    actualizarUsuario = async (req, res) => {
        try {
            const { email } = req.params;
            const usuario = req.body;
            const usuarioActualizado = await this.servicio.actualizarUsuario(
                email,
                usuario
            );

            res.status(200).json(usuarioActualizado);
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                res.status(400).json(error.message);
            } else if (error instanceof DatabaseError) {
                res.status(500).json({
                    message:
                        "Hubo un problema interno. Intente nuevamente más tarde.",
                });
            }
        }
    };

    eliminarUsuario = async (req, res) => {
        try {
            const { id } = req.params;
            const usuarioBorrado = await this.servicio.eliminarUsuario(id);

            res.json(usuarioBorrado);
        } catch (error) {
            console.log(
                "Error al eliminar usuario en el controlador: ",
                error.message
            );
        }
    };
}

export default Controlador;
