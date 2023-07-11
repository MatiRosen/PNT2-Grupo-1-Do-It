import { ObjectId } from "mongodb";
import CnxMongoDB from "../DBMongo.js";
import { DatabaseError, InvalidCredentialsError } from "../../../errores.js";

class ModelMongo {
    constructor() {}

    obtenerUsuarios = async (email) => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        if (email) {
            let usuario = null;
            try {
                usuario = await CnxMongoDB.db
                    .collection("usuarios")
                    .findOne({ email: email });
            } catch (error) {
                throw new DatabaseError(
                    "Error al leer el archivo de usuarios."
                );
            }

            if (!usuario) {
                throw new InvalidCredentialsError(
                    "No hay ningún usuario asociado a ese email."
                );
            }
            usuario.id = usuario._id;
            delete usuario._id;
            return usuario;
        } else {
            let usuarios = null;
            try {
                usuarios = await CnxMongoDB.db
                    .collection("usuarios")
                    .find({})
                    .toArray();
            } catch (error) {
                throw new DatabaseError(
                    "Error al leer el archivo de usuarios."
                );
            }

            usuarios.forEach((usuario) => {
                usuario.id = usuario._id;
                delete usuario._id;
            });
            return usuarios;
        }
    };

    obtenerUsuario = async (id) => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        let usuario = null;
        try {
            usuario = await CnxMongoDB.db
                .collection("usuarios")
                .findOne({ _id: this.generarObjectId(id) });

            usuario.id = usuario._id;
            delete usuario._id;
        } catch {
            throw new DatabaseError("Error al leer el archivo de usuarios.");
        }

        if (!usuario) {
            throw new InvalidCredentialsError(
                "No hay ningún usuario asociado a ese id."
            );
        }
        return usuario;
    };

    guardarUsuario = async (usuario) => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        try {
            await this.validarUsuarioExistente("email", usuario.email);
            await this.validarUsuarioExistente("dni", usuario.dni);
            await this.validarUsuarioExistente("telefono", usuario.telefono);
        } catch (error) {
            throw error;
        }

        try {
            await CnxMongoDB.db.collection("usuarios").insertOne(usuario);

            usuario.id = usuario._id;
            delete usuario._id;
        } catch {
            throw new DatabaseError("Error al guardar el usuario.");
        }

        return usuario;
    };

    validarUsuarioExistente = async (campo, valor) => {
        let usuarioExistente = null;
        try {
            usuarioExistente = await CnxMongoDB.db
                .collection("usuarios")
                .findOne({ [campo]: valor });
        } catch {
            throw new DatabaseError("Error al leer el archivo de usuarios.");
        }

        if (usuarioExistente) {
            throw new InvalidCredentialsError(
                `Ya hay un usuario con ese ${campo}.`
            );
        }
    };

    actualizarUsuario = async (id, usuario) => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        try {
            await CnxMongoDB.db
                .collection("usuarios")
                .updateOne(
                    { _id: this.generarObjectId(id) },
                    { $set: usuario }
                );
        } catch {
            throw new DatabaseError("Error al actualizar el usuario.");
        }

        return await this.obtenerUsuario(id);
    };

    eliminarUsuario = async (id) => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        const usuario = await this.obtenerUsuario(id);
        try {
            await CnxMongoDB.db
                .collection("usuarios")
                .deleteOne({ _id: this.generarObjectId(id) });
        } catch {
            throw new DatabaseError("Error al eliminar el usuario.");
        }

        return usuario;
    };

    obtenerCreadores = async (idCreador) => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        try {
            if (idCreador) {
                const creador = await CnxMongoDB.db
                    .collection("usuarios")
                    .findOne({
                        _id: this.generarObjectId(idCreador),
                        tipo: "Creador",
                    });

                creador.id = creador._id;
                delete creador._id;
                return creador;
            } else {
                const creadores = await CnxMongoDB.db
                    .collection("usuarios")
                    .find({ tipo: "Creador" })
                    .toArray();

                creadores.forEach((creador) => {
                    creador.id = creador._id;
                    delete creador._id;
                });
                return creadores;
            }
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                throw error;
            }
            throw new DatabaseError("Error al leer el archivo de creadores.");
        }
    };

    generarObjectId = (id) => {
        if (!ObjectId.isValid(id)) {
            throw new InvalidCredentialsError("El id no es válido.");
        }
        return new ObjectId(id);
    };
}

export default ModelMongo;
