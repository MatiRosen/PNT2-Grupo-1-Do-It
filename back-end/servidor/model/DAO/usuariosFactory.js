import ModelFile from "./usuariosFile.js";
import ModelMongo from "./usuariosMongo.js";

class ModelFactory {
    static get(tipo) {
        switch (tipo) {
            case "FILE":
                console.log("**** Persistiendo usuarios en File System ****");
                return new ModelFile();
            case "MONGO":
                console.log("**** Persistiendo usuarios en MongoDB ****");
                return new ModelMongo();
            default:
                console.log("**** Persistiendo usuarios en File System (default) ****");
                return new ModelFile();
        }
    }
}

export default ModelFactory;
