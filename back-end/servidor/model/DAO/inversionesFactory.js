import ModelFile from "./inversionesFile.js"

class ModelFactory {
    static get(tipo) {
        switch (tipo) {
            case "FILE":
                console.log("**** Persistiendo inversiones en File System ****");
                return new ModelFile();
            default:
                console.log("**** Persistiendo inversiones en File System (default) ****");
                return new ModelFile();
        }
    }
}

export default ModelFactory;