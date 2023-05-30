import fs from "fs";
import { DatabaseError, InvalidCredentialsError } from "../../../errores.js";

class ModelFile {
    constructor() {
        this.nombreArchivo = "servidor/ideas.json";
    }

    async leerArchivo() {
        return await fs.promises.readFile(this.nombreArchivo, "utf-8");
    }
    obtenerIdeas = async (idCreador) => {
        let ideas = [];
        try {
            ideas = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de ideas.");
        }

        if (idCreador) {
            const ideasUsuario = ideas.filter((idea) => idea.idCreador == idCreador);
            return ideasUsuario;
        }
        return ideas;
    };

    obtenerIdeasPorCampo = async (campo, valor) => {
        let ideas = [];
        try {
            ideas = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de ideas.");
        }

        const ideasPorCampo = ideas.filter((idea) => {
            return idea[campo].toString().toLowerCase().trim().includes(valor.toString().toLowerCase().trim());
        });

        if (ideasPorCampo.length == 0)
            throw new InvalidCredentialsError(
                `No existen ideas con el ${campo} indicado.`
            );

        return ideasPorCampo;
    }

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
