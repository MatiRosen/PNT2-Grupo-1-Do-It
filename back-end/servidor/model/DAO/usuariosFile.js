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

    actualizarUsuario = async (email, usuario) => {
        let usuarios = [];
        try {
            usuarios = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de usuarios.");
        }

        const indice = usuarios.findIndex((usuario) => usuario.email === email);
        if (indice == -1)
            throw new InvalidCredentialsError(
                "No hay ningún usuario asociado a ese email."
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

    // rehacer
    eliminarUsuario = async (email) => {
        let usuarios = [];
        try {
            usuarios = JSON.parse(await this.leerArchivo());
        } catch {
            throw new DatabaseError("Error al leer el archivo de usuarios.");
        }

        const indice = usuarios.findIndex((usuario) => usuario.email == email);
        let usuario;

        if (indice != -1) {
            usuario = usuarios.splice(indice, 1)[0];
        }

        await this.escribirArchivo(usuarios);
        return usuario;
    };
}

export default ModelFile;
