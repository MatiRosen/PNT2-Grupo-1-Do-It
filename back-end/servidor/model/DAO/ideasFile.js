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

    obtenerIdeasPorCategoria = async (categoria) => {
        let ideas = [];
        try {
            ideas = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de ideas.");
        }

        const ideasPorCategoria = ideas.filter(
            (idea) => idea.categoria.toLowerCase() == categoria.toLowerCase()
        );

        if (ideasPorCategoria.length == 0)
            throw new InvalidCredentialsError(
                "No existen ideas con la categoría indicada."
            );

        return ideasPorCategoria;
    };

    obtenerIdeasPorTitulo = async (titulo) => {
        let ideas = [];
        try {
            ideas = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de ideas.");
        }

        const ideasPorTitulo = ideas.filter((idea) => {
            return idea.titulo.toLowerCase().includes(titulo.toLowerCase());
        });

        if (ideasPorTitulo.length == 0)
            throw new InvalidCredentialsError(
                "No existen ideas con el título indicado."
            );

        return ideasPorTitulo;
    };

    agregarIdea = async (idea) => {
        let ideas = [];
        try {
            ideas = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de ideas.");
        }
        idea.id = (ideas[ideas.length - 1]?.id || 0) + 1;
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
    };

    eliminarIdea = async (id) => {
        let ideas = [];
        try {
            ideas = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de ideas.");
        }

        const ideaAEliminar = ideas.find((idea) => idea.id == id);
        if (!ideaAEliminar) {
            throw new InvalidCredentialsError(
                "No existe una idea con el id indicado."
            );
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
    };
}

export default ModelFile;
