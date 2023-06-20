import { ObjectId } from "mongodb";
import CnxMongoDB from "../DBMongo.js";
import { DatabaseError, InvalidCredentialsError } from "../../../errores.js";

class ModelMongo {
    constructor() {}

    obtenerTop = async () => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        let ideas = [];
        try {
            ideas = await CnxMongoDB.db
                .collection("ideas")
                .find({})
                .sort({ vecesVisto: -1 })
                .limit(3)
                .toArray();
            return ideas;
        } catch {
            throw new DatabaseError("Error al leer el archivo de ideas.");
        }
    };

    obtenerIdeas = async (idCreador) => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        try {
            if (idCreador) {
                const ideasUsuario = await CnxMongoDB.db
                    .collection("ideas")
                    .find({ idCreador: idCreador })
                    .toArray();
                return ideasUsuario;
            } else {
                const ideas = await CnxMongoDB.db
                    .collection("ideas")
                    .find({})
                    .toArray();
                return ideas;
            }
        } catch {
            throw new DatabaseError("Error al leer el archivo de ideas.");
        }
    };

    obtenerIdeasPorCampo = async (campo, valor) => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        let ideas = [];
        try {
            ideas = await CnxMongoDB.db
                .collection("ideas")
                .find({
                    [campo]: {
                        $regex: valor.replace(/\s/g, ""),
                        $options: "i",
                    },
                })
                .toArray();
        } catch {
            throw new DatabaseError("Error al leer el archivo de ideas.");
        }

        if (ideas.length == 0) {
            throw new InvalidCredentialsError(
                `No existen ideas con el ${campo} indicado.`
            );
        }

        return ideas;
    };

    agregarIdea = async (idea) => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        // Podemos validar que no exista una idea con el mismo título
        /*
        try{
            await this.validarIdeaExistente("titulo", idea.titulo);
        } catch(error) {
            throw error;
        }
        */

        try {
            await CnxMongoDB.db.collection("ideas").insertOne(idea);
        } catch {
            throw new DatabaseError("Error al guardar la idea.");
        }

        return idea;
    };

    /*
    validarIdeaExistente = async (campo, valor) => {
        let ideaExistente = null;
        try {
            ideaExistente = await CnxMongoDB.db
                .collection("ideas")
                .findOne({ [campo]: valor });
        } catch {
            throw new DatabaseError("Error al leer el archivo de ideas.");
        }

        if (ideaExistente) {
            throw new InvalidCredentialsError(
                `Ya hay una idea con ese ${campo}.`
            );
        }
    }
    */

    eliminarIdeas = async (idCreador) => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        let cantEliminadas = 0;
        try {
            const { deletedCount } = await CnxMongoDB.db
                .collection("ideas")
                .deleteMany({ idCreador: idCreador });

            cantEliminadas = deletedCount;
        } catch {
            throw new DatabaseError("Error al eliminar las ideas.");
        }

        if (cantEliminadas == 0) {
            throw new InvalidCredentialsError(
                "No existen ideas con el id del creador indicado."
            );
        }
    };

    eliminarIdea = async (id) => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        let ideaEliminada = null;
        try {
            ideaEliminada = await CnxMongoDB.db
                .collection("ideas")
                .findOneAndDelete({ _id: this.generarObjectId(id) });
            // findOneAndDelete devuelve un objeto con la idea eliminada
        } catch {
            throw new DatabaseError("Error al eliminar la idea.");
        }

        if (!ideaEliminada) {
            throw new InvalidCredentialsError(
                "No existe una idea con el id indicado."
            );
        }

        console.log(ideaEliminada);
    };

    actualizarIdea = async (id, idea) => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        let ideaActualizada = null;
        try {
            ideaActualizada = await CnxMongoDB.db
                .collection("ideas")
                .findOneAndUpdate(
                    { _id: this.generarObjectId(id) },
                    { $set: idea },
                    { returnNewDocument: true }
                );
            // findOneAndUpdate devuelve un objeto con la idea actualizada
        } catch {
            throw new DatabaseError("Error al actualizar la idea.");
        }

        if (!ideaActualizada) {
            throw new InvalidCredentialsError(
                "No existe una idea con el id indicado."
            );
        }

        return await this.obtenerIdea(id);
    };

    generarObjectId = (id) => {
        if (!ObjectId.isValid(id)) {
            throw new InvalidCredentialsError("El id no es válido.");
        }
        return new ObjectId(id);
    };
}

export default ModelMongo;
