import { ObjectId } from "mongodb";
import CnxMongoDB from "../DBMongo.js";
import { DatabaseError, InvalidCredentialsError } from "../../../errores.js";
import e from "cors";

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

            ideas.forEach((idea) => {
                idea.id = idea._id;
                delete idea._id;
            });
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

                ideasUsuario.forEach((idea) => {
                    idea.id = idea._id;
                    delete idea._id;
                });
                return ideasUsuario;
            } else {
                const ideas = await CnxMongoDB.db
                    .collection("ideas")
                    .find({})
                    .toArray();

                ideas.forEach((idea) => {
                    idea.id = idea._id;
                    delete idea._id;
                });
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
        if (campo == "id") {
            campo = "_id";
            valor = this.generarObjectId(valor);
        }

        try {
            ideas = await CnxMongoDB.db
                .collection("ideas")
                .find({
                    [campo]: {
                        ...(valor instanceof ObjectId
                            ? { $eq: valor }
                            : {
                                  $regex: new RegExp(
                                      [...valor].join("\\s*"),
                                      "i"
                                  ),
                              }),
                    },
                })
                .toArray();

            ideas.forEach((idea) => {
                idea.id = idea._id;
                delete idea._id;
            });
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

        delete idea.id;

        try {
            await CnxMongoDB.db.collection("ideas").insertOne(idea);
        } catch {
            throw new DatabaseError("Error al guardar la idea.");
        }

        idea.id = idea._id;
        delete idea._id;
        return idea;
    };

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
    };

    actualizarIdea = async (id, idea) => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        let ideaActualizada = null;
        delete idea.id;
        try {
            ideaActualizada = await CnxMongoDB.db
                .collection("ideas")
                .findOneAndUpdate(
                    { _id: this.generarObjectId(id) },
                    { $set: idea },
                    { returnNewDocument: true }
                );
        } catch {
            throw new DatabaseError("Error al actualizar la idea.");
        }

        if (!ideaActualizada) {
            throw new InvalidCredentialsError(
                "No existe una idea con el id indicado."
            );
        }

        return await ideaActualizada;
    };

    generarObjectId = (id) => {
        if (!ObjectId.isValid(id)) {
            throw new InvalidCredentialsError("El id no es válido.");
        }
        return new ObjectId(id);
    };
}

export default ModelMongo;
