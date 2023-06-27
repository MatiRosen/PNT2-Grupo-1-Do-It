import ModelFile from "./chatsFile.js";
import ModelMongo from "./chatsMongo.js";

class ModelFactory {
    static get(tipo) {
        switch (tipo) {
            case "FILE":
                console.log("**** Persistiendo chats en File System ****");
                return new ModelFile();
            case "MONGO":
                console.log("**** Persistiendo chats en MongoDB ****");
                return new ModelMongo();
            default:
                console.log(
                    "**** Persistiendo chats en File System (default) ****"
                );
                return new ModelFile();
        }
    }
}

export default ModelFactory;
