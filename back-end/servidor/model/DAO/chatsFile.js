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

    mandarMensaje = async (idChat, mensaje) => {
        let chats = [];
        
        try {
            chats = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de chats.");
        }
        
        let chatAgregar = chats.find(c => c.id == idChat)
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

    /*agregarChat = async (chat) => {
        let chats = [];
        try {
            chats = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de chats.");
        }
        let nuevoId = 1
        
        if(chats.length != 0){
            nuevoId = chats[chats.length - 1].id + 1
        }

        let nuevoChat = {...chat, id: nuevoId}

        chats.push(nuevoChat)
        
        try {
            await this.escribirArchivo(chats);
            return nuevoChat;
        }
        catch {
            throw new DatabaseError("Error al escribir el archivo de chats.");
        }
    };*/

    obtenerChatPorParticipantes = async (idUsuario1, idUsuario2) => {
        let chats = [];
        try {
            chats = JSON.parse(await this.leerArchivo());
        } catch {
            chats = [];
        }

        let res = chats.find(c => c.participantes.includes(parseInt(idUsuario1)) && c.participantes.includes(parseInt(idUsuario2)));

        if (!res) {
            let nuevoChat = {
                participantes: [parseInt(idUsuario1), parseInt(idUsuario2)],
                mensajes: [],
                ultimoMensaje: { emisor: 0, contenido: "" },
            };

            let nuevoId = 1
        
            if(chats.length != 0){
                nuevoId = chats[chats.length - 1].id + 1
            }

            nuevoChat = {...nuevoChat, id: nuevoId}

            chats.push(nuevoChat);
            try {
                await this.escribirArchivo(chats);
                res = nuevoChat;
            }
            catch {
                throw new DatabaseError("Error al escribir el archivo de chats.");
            }
        }

        return res;
    }
}

export default ModelFile;
