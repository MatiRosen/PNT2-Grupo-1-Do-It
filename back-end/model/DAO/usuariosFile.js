import fs from "fs";

class ModelFile {
    constructor() {
        this.nombreArchivo = "usuarios.json";
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
        try {
            const usuarios = JSON.parse(await this.leerArchivo());
            if (email) {
                const usuario = usuarios.find(
                    (usuario) => usuario.email == email
                );
                return usuario || { };
            } else {
                return usuarios;
            }
        } catch {
            return email ? {} : [];
        }
    };

    guardarUsuario = async (usuario) => {
        let usuarios = [];
        try {
            usuarios = JSON.parse(await this.leerArchivo());
        } catch {}

        usuarios.push(usuario);

        await this.escribirArchivo(usuarios);
        return usuario;
    };

    actualizarUsuario = async (email, usuario) => {
        let usuarios = [];
        try {
            usuarios = JSON.parse(await this.leerArchivo());
        } catch {}


        const indice = usuarios.findIndex((usuario) => usuario.email === email);
        if (indice != -1) {
            const usuarioAnterior = usuarios[indice];
            const usuarioNuevo = { ...usuarioAnterior, ...usuario };

            usuarios.splice(indice, 1, usuarioNuevo);
            await this.escribirArchivo(usuarios);

            return usuarioNuevo;
        }
    };

    eliminarUsuario = async (email) => {
        let usuarios = [];
        try {
            usuarios = JSON.parse(await this.leerArchivo());
        } catch {}

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
