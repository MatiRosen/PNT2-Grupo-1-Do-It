import ModelFile from "./chatsFile.js"

class ModelFactory {
    static get(tipo) {
        switch (tipo) {
            case "FILE":
                console.log("**** Persistiendo chats en File System ****");
                return new ModelFile();
            default:
                console.log("**** Persistiendo chats en File System (default) ****");
                return new ModelFile();
        }
    }
}

export default ModelFactory;