import fs from "fs";
import { DatabaseError, InvalidCredentialsError } from "../../../errores.js";

class ModelFile {
    constructor() {
        this.nombreArchivo = "servidor/ideas.json";
    }

    async leerArchivo() {
        return await fs.promises.readFile(this.nombreArchivo, "utf-8");
    }

    obtenerIdeas = async (email) => {
        let ideas = [];
        try {
            ideas = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de ideas.");
        }

        if (email) {
            const ideasUsuario = ideas.filter((idea) => idea.creador == email);
            return ideasUsuario;
        }
        return ideas;
    };
}

export default ModelFile;
