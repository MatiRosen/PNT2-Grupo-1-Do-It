import ModelFile from "./inversionesFile.js";
import ModelMongo from "./inversionesMongo.js";

class ModelFactory {
    static get(tipo) {
        switch (tipo) {
            case "FILE":
                console.log(
                    "**** Persistiendo inversiones en File System ****"
                );
                return new ModelFile();
            case "MONGO":
                console.log("**** Persistiendo inversiones en MongoDB ****");
                return new ModelMongo();
            default:
                console.log(
                    "**** Persistiendo inversiones en File System (default) ****"
                );
                return new ModelFile();
        }
    }
}

export default ModelFactory;
