import { ObjectId } from "mongodb";
import CnxMongoDB from "../DBMongo.js";
import { DatabaseError, InvalidCredentialsError } from "../../../errores.js";

class ModelMongo {
    constructor() {}

    obtenerInversiones = async () => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        let inversiones = [];
        try {
            inversiones = await CnxMongoDB.db
                .collection("inversiones")
                .find({})
                .toArray();
        } catch {
            throw new DatabaseError("Error al leer el archivo de inversiones.");
        }

        return inversiones;
    };

    obtenerInversion = async (idIdea, idInversor) => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        let inversion = null;
        try {
            inversion = await CnxMongoDB.db
                .collection("inversiones")
                .findOne({ idIdea: idIdea, idInversor: idInversor });
        } catch {
            throw new DatabaseError("Error al leer el archivo de inversiones.");
        }

        if (!inversion) {
            throw new InvalidCredentialsError(
                "No existe una inversión con esos datos."
            );
        }

        return inversion;
    };

    obtenerInversionesPorCampo = async (campo, valor) => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        let inversiones = [];
        try {
            inversiones = await CnxMongoDB.db
                .collection("inversiones")
                .find({
                    [campo]: {
                        $regex: valor.replace(/\s/g, ""),
                        $options: "i",
                    },
                })
                .toArray();
        } catch {
            throw new DatabaseError("Error al leer el archivo de inversiones.");
        }

        if (inversiones.length == 0) {
            throw new InvalidCredentialsError(
                `No existen inversiones con el ${campo} indicado.`
            );
        }

        return inversiones;
    };

    agregarInversion = async (inversion) => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        try {
            await this.validarInversionExistente(
                "idIdea",
                inversion.idIdea,
                "idInversor",
                inversion.idInversor
            );
        } catch (error) {
            throw error;
        }

        try {
            await CnxMongoDB.db.collection("inversiones").insertOne(inversion);
        } catch {
            throw new DatabaseError("Error al guardar la inversión.");
        }

        return inversion;
    };

    validarInversionExistente = async (campo1, valor1, campo2, valor2) => {
        let inversionExistente = null;
        try {
            inversionExistente = await CnxMongoDB.db
                .collection("inversiones")
                .findOne({ [campo1]: valor1, [campo2]: valor2 });
        } catch {
            throw new DatabaseError("Error al leer el archivo de inversiones.");
        }

        if (inversionExistente) {
            throw new InvalidCredentialsError(
                `Ya hay una inversión con ese ${campo1} y ${campo2}.`
            );
        }
    };

    eliminarInversion = async (idIdea, idInversor) => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        let inversionEliminada = null;
        try {
            inversionEliminada = await CnxMongoDB.db
                .collection("inversiones")
                .findOneAndDelete({
                    idIdea: idIdea,
                    idInversor: idInversor,
                });
        } catch {
            throw new DatabaseError("Error al eliminar la inversión.");
        }

        if (!inversionEliminada) {
            throw new InvalidCredentialsError(
                "No existe una inversión con esos datos."
            );
        }

        console.log(inversionEliminada);
    };

    actualizarInversion = async (idIdea, idInversor, inversion) => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        let inversionActualizada = null;
        try {
            inversionActualizada = await CnxMongoDB.db
                .collection("inversiones")
                .findOneAndUpdate(
                    { idIdea: idIdea, idInversor: idInversor },
                    { $set: inversion },
                    { returnNewDocument: true }
                );
        } catch {
            throw new DatabaseError("Error al actualizar la inversión.");
        }

        if (!inversionActualizada) {
            throw new InvalidCredentialsError(
                "No existe una inversión con esos datos."
            );
        }
        return await this.obtenerInversion(idIdea, idInversor);
    };

    generarObjectId = (id) => {
        if (!ObjectId.isValid(id)) {
            throw new InvalidCredentialsError("El id no es válido.");
        }
        return new ObjectId(id);
    };
}

export default ModelMongo;
