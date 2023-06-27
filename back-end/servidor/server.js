import express from "express";
import RouterUsuarios from "./router/usuarios.js";
import RouterIdeas from "./router/ideas.js";
import RouterInversiones from "./router/inversiones.js";
import RouterChats from "./router/chats.js";
import cors from "cors";
import CnxMongo from "./model/DBMongo.js";

class Server {
    constructor(port, persistencia) {
        this.app = express();
        this.port = port;
        this.persistencia = persistencia;
    }

    async start() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(express.static("public")); 
        
        if (this.persistencia === "MONGO") await CnxMongo.conectar().catch((error) => {
            console.log(error.message);
            console.log("Usando persistencia en FS");
            this.persistencia = "FS";
        });

        this.app.use("/api/usuarios", new RouterUsuarios(this.persistencia).start());
        this.app.use("/api/ideas", new RouterIdeas(this.persistencia).start());
        this.app.use("/api/inversiones", new RouterInversiones(this.persistencia).start());
        this.app.use("/api/chats", new RouterChats(this.persistencia).start());

        const PORT = this.port;
        this.server = this.app.listen(PORT, () =>
            console.log(
                `Servidor HTTP express escuchando en http://localhost:${PORT}`
            )
        );

        this.server.on("error", (error) =>
            console.log(`Error en servidor: ${error.message}`)
        );

        return this.app;
    }

    async stop() {
        this.server.close(() => console.log("Servidor cerrado"));
        await CnxMongo.desconectar();
    }
}

export default Server;