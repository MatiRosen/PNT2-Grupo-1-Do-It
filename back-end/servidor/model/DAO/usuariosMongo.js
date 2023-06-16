import { ObjectId } from "mongodb";
import CnxMongoDB from "../DBMongo.js";
import { DatabaseError, InvalidCredentialsError } from "../../../errores.js";

class ModelMongo {
    constructor() {}

    obtenerUsuarios = async (email) => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        try {
            if (email) {
                const usuario = await CnxMongoDB.db
                    .collection("usuarios")
                    .findOne({ email: email });
                console.log(usuario);
                return usuario;
            } else {
                const usuarios = await CnxMongoDB.db
                    .collection("usuarios")
                    .find({})
                    .toArray();
                return usuarios;
            }
        } catch {
            throw new DatabaseError("Error al leer el archivo de usuarios.");
        }
    };

    obtenerUsuario = async (id) => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        let usuario = null;
        try {
            usuario = await CnxMongoDB.db
                .collection("usuarios")
                .findOne({ _id: new ObjectId(id) });
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
                .updateOne({ _id: new ObjectId(id) }, { $set: usuario });
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
                .deleteOne({ _id: new ObjectId(id) });
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
                    .findOne({ _id: new ObjectId(idCreador), tipo: "Creador" });
                return creador;
            } else {
                const creadores = await CnxMongoDB.db
                    .collection("usuarios")
                    .find({ tipo: "Creador" })
                    .toArray();
                return creadores;
            }
        } catch {
            throw new DatabaseError("Error al leer el archivo de creadores.");
        }
    };
}

export default ModelMongo;
