import ModelFile from "./usuariosFile.js";

class ModelFactory {
    static get(tipo) {
        switch (tipo) {
            case "FILE":
                console.log("**** Persistiendo usuarios en File System ****");
                return new ModelFile();
            default:
                console.log("**** Persistiendo usuarios en File System (default) ****");
                return new ModelFile();
        }
    }
}

export default ModelFactory;
