import Servicio from "../servicio/usuarios.js";
import { InvalidCredentialsError } from "../../errores.js";

class Controlador {
    constructor() {
        this.servicio = new Servicio();
    }

    obtenerUsuario = async (req, res) => {
        try {
            const { id } = req.params;
            const usuario = await this.servicio.obtenerUsuario(id);
            
            res.json(usuario);
        } catch (error) {
           if (error instanceof InvalidCredentialsError) {
                res.status(400).json(error.message);
               
            } else {
                 res.status(500).json({
                message:
                    "Hubo un problema interno. Intente nuevamente más tarde.",
            });
            }
        }
    };

    guardarUsuario = async (req, res) => {
        try {
            const usuario = req.body;
            const usuarioGuardado = await this.servicio.guardarUsuario(usuario);

            res.json(usuarioGuardado);
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                res.status(400).json(error.message);
            } else {
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
            } else {
                res.status(500).json({
                    message:
                        "Hubo un problema interno. Intente nuevamente más tarde.",
                });
            }
        }
    };

    actualizarDinero = async (req, res) => {
        try {
            const { id } = req.params;
            const usuario = req.body;
            const usuarioActualizado = await this.servicio.actualizarDinero(
                id,
                usuario
            );

            res.status(200).json(usuarioActualizado);
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                res.status(400).json(error.message);
                return;
            } else {
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

            res.status(200).json(usuarioBorrado);
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                res.status(400).json(error.message);
            } else {
                res.status(500).json({
                    message:
                        "Hubo un problema interno. Intente nuevamente más tarde.",
                });
            }
        }
    };
        
    obtenerCreadores = async (req, res) => {
        try {
            const { idCreador } = req.params;
            const creadores = await this.servicio.obtenerCreadores(idCreador);

            res.status(200).json(creadores);
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                res.status(400).json(error.message);
            } else {
                res.status(500).json({
                    message:
                        "Hubo un problema interno. Intente nuevamente más tarde.",
                });
            }
        }
    };
}

export default Controlador;
