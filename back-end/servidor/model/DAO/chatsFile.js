import fs from "fs";
import { DatabaseError, InvalidCredentialsError } from "../../../errores.js";

class ModelFile {
    constructor() {
        this.nombreArchivo = "servidor/chats.json";
    }

    async leerArchivo() {
        return await fs.promises.readFile(this.nombreArchivo, "utf-8");
    }

    async escribirArchivo(chats) {
        await fs.promises.writeFile(
            this.nombreArchivo,
            JSON.stringify(chats, null, "\t")
        );
    }

    obtenerChatsDelUsuario = async (userId) => {
        let chats = [];
        try {
            chats = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de chats.");
        }
        
        const chatsDelUsuario = chats.filter(c => c.participantes.includes(parseInt(userId)));
        
        return chatsDelUsuario;
    };

    obtenerChat = async (chatId) => {
        let chats = [];
        try {
            chats = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de chats.");
        }
        
        const chat = chats.find(c => c.id == chatId);

        return chat;
    };

    mandarMensaje = async (idChat,mensaje) => {
        let chats = [];
        try {
            chats = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de chats.");
        }
        
        let chat = chats.find(c => c.id == idChat)
        chatAgregar.mensajes.push(mensaje)
        chatAgregar.ultimoMensaje = mensaje
        
        try {
            await this.escribirArchivo(chats);
            return mensaje;
        }
        catch {
            throw new DatabaseError("Error al escribir el archivo de chats.");
        }
    };

    agregarChat = async (chat) => {
        let chats = [];
        try {
            chats = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de chats.");
        }

        chats.push(chat);

        try {
            await this.escribirArchivo(chats);
        }
        catch {
            throw new DatabaseError("Error al escribir el archivo de chats.");
        }
    };
}

export default ModelFile;
