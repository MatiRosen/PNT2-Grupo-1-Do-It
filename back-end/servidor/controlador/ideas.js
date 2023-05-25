import ServicioIdeas from "../servicio/ideas.js"

class ControladorIdeas {
    constructor() {
        this.ServicioIdeas = new ServicioIdeas()
    }

    obtenerIdeas = async (req, res) => {
        try {
            const { email } = req.params
            const ideas = await this.ServicioIdeas.obtenerIdeas(email)

            res.status(200).json(ideas)
        } catch(error) {
            console.log("Error al obtener ideas", error)
            res.status(500).json({
                message:
                    "Hubo un problema interno. Intente nuevamente más tarde.",
            });
        }
    }
}

export default ControladorIdeas