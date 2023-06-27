import { MongoClient } from "mongodb";
import config from "../config.js";

class CnxMongoDB {
    static client = null;
    static connection = false;
    static db = null;

    static conectar = async () => {
        try {
            console.log("Conectando a MongoDB");

            CnxMongoDB.client = new MongoClient(config.STRCNX, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            await CnxMongoDB.client.connect();
            console.log("MongoDB conectado!");

            CnxMongoDB.db = CnxMongoDB.client.db(config.BASE);
            CnxMongoDB.connection = true;
        } catch (error) {
            throw new Error(`Error en la conexion a MongoDB: ${error.message}`);
        }
    };

    static desconectar = async () => {
        if (!CnxMongoDB.connection) return;

        try {
            await CnxMongoDB.client.close();
            console.log("MongoDB desconectado!");
        } catch (error) {
            console.log(`Error en la desconexion a MongoDB: ${error.message}`);
        }
    };
}

export default CnxMongoDB;
