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

    agregarIdea = async (idea) => {
        let ideas = [];
        try {
            ideas = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de ideas.");
        }
        idea.id = (ideas[ideas.length - 1]?.id || 0) + 1        
        ideas.push(idea);

        try {
            await fs.promises.writeFile(
                this.nombreArchivo,
                JSON.stringify(ideas, null, 2)
            );
        } catch {
            throw new DatabaseError("Error al escribir el archivo de ideas.");
        }

        return idea;
    }

    eliminarIdea = async (id) => {
        let ideas = [];
        try {
            ideas = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de ideas.");
        }

        const ideaAEliminar = ideas.find((idea) => idea.id == id);
        if (!ideaAEliminar) {
            throw new InvalidCredentialsError("No existe una idea con el id indicado.");
        }

        ideas = ideas.filter((idea) => idea.id != id);

        try {
            await fs.promises.writeFile(
                this.nombreArchivo,
                JSON.stringify(ideas, null, 2)
            );
        } catch {
            throw new DatabaseError("Error al escribir el archivo de ideas.");
        }
    }
}

export default ModelFile;
