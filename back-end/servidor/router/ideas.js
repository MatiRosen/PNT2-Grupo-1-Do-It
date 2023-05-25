import express from 'express'
import ControladorIdeas from '../controlador/ideas.js'

class RouterIdeas {
    constructor() {
        this.router = express.Router()
        this.controlador = new ControladorIdeas()
    }

    start() {
        this.router.get("/:email", this.controlador.obtenerIdeas)
        return this.router
    }
}

export default RouterIdeas