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

    // actualizar
    actualizarUsuario = async (email, producto) => {
        let productos = [];
        try {
            productos = JSON.parse(await this.leerArchivo());
        } catch {}

        producto.email = email;
        const indice = productos.findIndex((producto) => producto.email === email);

        if (indice != -1) {
            const productoAnterior = productos[indice];
            const productoNuevo = { ...productoAnterior, ...producto };

            productos.splice(indice, 1, productoNuevo);
            await this.escribirArchivo(usuarios);

            return productoNuevo;
        } else {
            productos.push(producto);
            await this.escribirArchivo(usuarios);

            return producto;
        }
    };

    eliminarUsuario = async (email) => {
        let productos = [];
        try {
            productos = JSON.parse(await this.leerArchivo());
        } catch {}

        const indice = productos.findIndex((producto) => producto.email == email);
        let producto;

        if (indice != -1) {
            producto = productos.splice(indice, 1)[0];
        }

        await this.escribirArchivo(usuarios);
        return producto;
    };
}

export default ModelFile;
