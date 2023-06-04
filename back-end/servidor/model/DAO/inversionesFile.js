import fs from "fs";
import { DatabaseError, InvalidCredentialsError } from "../../../errores.js";

class ModelFile {
    constructor() {
        this.nombreArchivo = "servidor/inversiones.json";
    }

    async leerArchivo() {
        return await fs.promises.readFile(this.nombreArchivo, "utf-8");
    }

    async escribirArchivo(inversiones) {
        await fs.promises.writeFile(
            this.nombreArchivo,
            JSON.stringify(inversiones, null, "\t")
        );
    }

    obtenerInversiones = async () => {
        let inversiones = [];
        try {
            inversiones = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de inversiones.");
        }

        return inversiones;
    };

    obtenerInversion = async (idIdea, idInversor) => {
        let inversiones = [];
        try {
            inversiones = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de inversiones.");
        }

        const inversion = inversiones.find(
            (inversion) =>
                inversion.idIdea == idIdea && inversion.idInversor == idInversor
        );

        if (!inversion)
            throw new InvalidCredentialsError(
                "No existe una inversión con esos datos."
            );

        return inversion;
    };

    obtenerInversionesPorCampo = async (campo, id) => {
        let inversiones = [];
        try {
            inversiones = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de inversiones.");
        }

        const inversionesPorCampo = inversiones.filter((inversion) =>
            inversion[campo]
                .toString()
                .toLowerCase()
                .trim()
                .includes(id.toString().toLowerCase().trim())
        );

        if (inversionesPorCampo.length == 0)
            throw new InvalidCredentialsError(
                `No existen inversiones con el ${campo} indicado.`
            );

        return inversionesPorCampo;
    };

    agregarInversion = async (inversion) => {
        let inversiones = [];
        try {
            inversiones = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de inversiones.");
        }

        const existeInversion = inversiones.find(
            (inv) =>
                inv.idIdea == inversion.idIdea &&
                inv.idInversor == inversion.idInversor
        );

        console.log(existeInversion);
        if (existeInversion) {
            throw new InvalidCredentialsError(
                "Ya existe una inversión con esos datos."
            );
        }

        inversiones.push(inversion);
        try {
            await this.escribirArchivo(inversiones);
        } catch {
            throw new DatabaseError(
                "Error al escribir el archivo de inversiones."
            );
        }

        return inversion;
    };

    eliminarInversion = async (idIdea, idInversor) => {
        let inversiones = [];
        try {
            inversiones = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de inversiones.");
        }

        const indice = inversiones.findIndex(
            (inversion) =>
                inversion.idIdea == idIdea && inversion.idInversor == idInversor
        );

        if (indice == -1) {
            throw new InvalidCredentialsError(
                "No existe una inversión con esos datos."
            );
        }

        const inversion = inversiones.splice(indice, 1)[0];

        try {
            await this.escribirArchivo(inversiones);
        } catch {
            throw new DatabaseError(
                "Error al escribir el archivo de inversiones."
            );
        }

        return inversion;
    };

    actualizarInversion = async (idIdea, idInversor, inversion) => {
        let inversiones = [];
        try {
            inversiones = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de inversiones.");
        }

        const indice = inversiones.findIndex(
            (inversion) =>
                inversion.idIdea == idIdea && inversion.idInversor == idInversor
        );

        if (indice == -1) {
            throw new InvalidCredentialsError(
                "No existe una inversión con esos datos."
            );
        }

        const inversionActualizada = { ...inversiones[indice], ...inversion };
        inversiones.splice(indice, 1, inversionActualizada);

        try {
            await this.escribirArchivo(inversiones);
        } catch {
            throw new DatabaseError(
                "Error al escribir el archivo de inversiones."
            );
        }

        return inversionActualizada;
    };
}

export default ModelFile;
