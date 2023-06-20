import ModelFile from "./ideasFile.js";
import ModelMongo from "./ideasMongo.js";

class ModelFactory {
    static get(tipo) {
        switch (tipo) {
            case "FILE":
                console.log("**** Persistiendo ideas en File System ****");
                return new ModelFile();
            case "MONGO":
                console.log("**** Persistiendo ideas en MongoDB ****");
                return new ModelMongo();
            default:
                console.log(
                    "**** Persistiendo ideas en File System (default) ****"
                );
                return new ModelFile();
        }
    }
}

export default ModelFactory;
