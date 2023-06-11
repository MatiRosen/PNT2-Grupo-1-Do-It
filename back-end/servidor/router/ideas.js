import express from "express";
import ControladorIdeas from "../controlador/ideas.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../back-end/public/images');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

class RouterIdeas {
    constructor() {
        this.router = express.Router();
        this.controlador = new ControladorIdeas();
    }

    start() {
        this.router.get("/creador/:idCreador?", this.controlador.obtenerIdeas);
        this.router.get("/filtro/:campo/:valor", this.controlador.obtenerIdeasPorCampo);
        this.router.get("/obtenerTop", this.controlador.obtenerTop);
        this.router.post("/", upload.single('imagen'), this.controlador.agregarIdea);        
        this.router.delete("/:id", this.controlador.eliminarIdea);
        this.router.put("/idea/imagen/:id", upload.single('imagen'), this.actualizarIdeaMiddleware, this.controlador.actualizarImagenIdea);
        this.router.put("/idea/:id", this.controlador.actualizarIdea);

        return this.router;
    }

    actualizarIdeaMiddleware(req, res, next) {
      if (!req.file) {
        req.file = null;
      }
      next();
    }
}

export default RouterIdeas;
