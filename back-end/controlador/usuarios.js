import Servicio from "../servicio/usuarios.js";

class Controlador {
    constructor() {
        this.servicio = new Servicio();
    }

    obtenerUsuarios = async (req, res) => {
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
    };

    guardarUsuario = async (req, res) => {
        try {
            const usuario = req.body;
            const usuarioGuardado = await this.servicio.guardarUsuario(usuario);

            res.json(usuarioGuardado);
        } catch {
            console.log(
                "Error al guardar usuario en el controlador: ",
                error.message
            );
        }
    };

    logUsuario = async (req, res) => {
        try {
            const usuario = req.body;
            const usuarioLogueado = await this.servicio.logUsuario(usuario);

            if (usuarioLogueado != null) {
                res.status(200).json({ nombre: usuarioLogueado.nombre, tipo: usuarioLogueado.tipo, dinero: usuarioLogueado.dinero });
            } else {
                res.status(401).json({ error: "Credenciales inválidas" });
            }
        } catch (error) {
            console.error(
                "Error al loguear usuario en el controlador:",
                error.message
            );
            res.status(500).json({ error: "Error interno del servidor" });
        }
    };

    // Modificar
    actualizarUsuario = async (req, res) => {
        try {
            const id = Number(req.params.id);
            const usuario = req.body;
            const usuarioActualizado = await this.servicio.actualizarUsuario(
                id,
                usuario
            );

            res.json(usuarioActualizado);
        } catch (error) {
            console.log(
                "Error al actualizar usuario en el controlador: ",
                error.message
            );
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
