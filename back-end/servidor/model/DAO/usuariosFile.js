import fs from "fs";
import { DatabaseError, InvalidCredentialsError } from "../../../errores.js";

class ModelFile {
    constructor() {
        this.nombreArchivo = "servidor/usuarios.json";
    }

    async leerArchivo() {
        return await fs.promises.readFile(this.nombreArchivo, "utf-8");
    }

    async escribirArchivo(usuarios) {
        await fs.promises.writeFile(
            this.nombreArchivo,
            JSON.stringify(usuarios, null, "\t")
        );
    }

    obtenerUsuarios = async (email) => {
        let usuarios = [];
        try {
            usuarios = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de usuarios.");
        }

        if (email) {
            const usuario = usuarios.find((usuario) => usuario.email == email);

            if (!usuario)
                throw new InvalidCredentialsError(
                    "No hay ningún usuario asociado a ese email."
                );

            return usuario;
        }

        return usuarios;
    };

    guardarUsuario = async (usuario) => {
        let usuarios = [];
        try {
            usuarios = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de usuarios.");
        }

        if (usuarios.find((usr) => usr.email == usuario.email)) {
            throw new InvalidCredentialsError(
                "Ya hay un usuario con ese email."
            );
        } else if (usuarios.find((usr) => usr.dni == usuario.dni)) {
            throw new InvalidCredentialsError("Ya hay un usuario con ese dni.");
        } else if (usuarios.find((usr) => usr.telefono == usuario.telefono)) {
            throw new InvalidCredentialsError(
                "Ya hay un usuario con ese número de telefono."
            );
        }

        const id = (usuarios[usuarios.length - 1]?.id || 0) + 1;
        usuario = { id, ...usuario };
        usuarios.push(usuario);

        try {
            await this.escribirArchivo(usuarios);
        } catch (error) {
            throw new DatabaseError(
                "Error al escribir el archivo de usuarios."
            );
        }

        return usuario;
    };

    actualizarUsuario = async (id, usuario) => {
        let usuarios = [];
        try {
            usuarios = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de usuarios.");
        }

        const indice = usuarios.findIndex((usr) => usr.id == id);

        if (indice == -1)
            throw new InvalidCredentialsError(
                "No hay ningún usuario asociado a ese id."
            );

        const usuarioAnterior = usuarios[indice];
        const usuarioNuevo = { ...usuarioAnterior, ...usuario };

        usuarios.splice(indice, 1, usuarioNuevo);
        try {
            await this.escribirArchivo(usuarios);
        } catch (error) {
            throw new DatabaseError(
                "Error al escribir el archivo de usuarios."
            );
        }

        return usuarioNuevo;
    };

    eliminarUsuario = async (id) => {
        let usuarios = [];
        try {
            usuarios = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de usuarios.");
        }

        const indice = usuarios.findIndex((usr) => usr.id == id);

        if (indice == -1)
            throw new InvalidCredentialsError(
                "No hay ningún usuario asociado a ese id."
            );

        const usuario = usuarios.splice(indice, 1)[0];

        try {
            await this.escribirArchivo(usuarios);
        } catch (error) {
            throw new DatabaseError(
                "Error al escribir el archivo de usuarios."
            );
        }
        return usuario;
    };
}

export default ModelFile;