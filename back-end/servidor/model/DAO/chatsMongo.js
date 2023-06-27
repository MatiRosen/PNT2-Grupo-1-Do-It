import { ObjectId } from "mongodb";
import CnxMongoDB from "../DBMongo.js";
import { DatabaseError, InvalidCredentialsError } from "../../../errores.js";

class ModelMongo {
    constructor() {}

    obtenerChatsDelUsuario = async (userId) => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        let chats = [];
        try {
            chats = await CnxMongoDB.db
                .collection("chats")
                .find({ participantes: userId })
                .toArray();

            chats.forEach((chat) => {
                chat.id = chat._id;
                delete chat._id;
            });
        } catch {
            throw new DatabaseError("Error al leer el archivo de chats.");
        }

        return chats;
    }
    
    obtenerChat = async (chatId) => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        let chat = {};
        try {

            chat = await CnxMongoDB.db
                .collection("chats")
                .findOne({ _id: this.generarObjectId(chatId) });

            chat.id = chat._id;
            delete chat._id;
        } catch {
            throw new DatabaseError("Error al leer el archivo de chats.");
        }

        return chat;
    }

    mandarMensaje = async (idChat, mensaje) => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        let chat = {};
        try {
            chat = await CnxMongoDB.db
                .collection("chats")
                .findOne({ _id: this.generarObjectId(idChat) });
            
            chat.id = chat._id;
            delete chat._id;
        } catch {
            throw new DatabaseError("Error al leer el archivo de chats.");
        }

        chat.mensajes.push(mensaje)
        chat.ultimoMensaje = mensaje

        try {
            await CnxMongoDB.db
                .collection("chats")
                .updateOne({ _id: this.generarObjectId(idChat) }, { $set: chat });
        } catch {
            throw new DatabaseError("Error al leer el archivo de chats.");
        }
    }

    obtenerChatPorParticipantes = async (idUsuario1, idUsuario2) => {
        if (!CnxMongoDB.connection)
            throw new DatabaseError("No hay conexión a la base de datos.");

        let chat = {};
        try {
            chat = await CnxMongoDB.db
                .collection("chats")
                .findOne({ participantes: [idUsuario1, idUsuario2] });
            if (!chat) {
                chat = {
                    participantes: [idUsuario1, idUsuario2],
                    ultimoMensaje: {emisor: 0, contenido: ""},
                    mensajes: []
                }

                await CnxMongoDB.db
                    .collection("chats")
                    .insertOne(chat);
            }
            
            chat.id = chat._id;
            delete chat._id;
        } catch {
            throw new DatabaseError("Error al leer el archivo de chats.");
        }
        return chat;
    }


    generarObjectId = (id) => {
        if (!ObjectId.isValid(id)) {
            throw new InvalidCredentialsError("El id no es válido.");
        }

        return new ObjectId(id);
    };
}

export default ModelMongo;
