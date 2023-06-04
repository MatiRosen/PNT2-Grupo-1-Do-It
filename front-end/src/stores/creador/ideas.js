import { defineStore } from "pinia"

export const useIdeasStore = defineStore("idea", {
    state: () => {
        return {
            idea: {
                id: 0,
                titulo: "",
                descripcion: "",
                imagen: "",
                categoria: "",
                precio: 0,
                creador: "",
                vecesVisto: 0,
                cantidadInversiones: 0,
            }
        }
    },
    actions: {
        setIdea(idea) {
            this.idea = idea
        }
    },
    getters: {
        tieneInversores() {            
            return this.idea.cantidadInversiones > 0;
        }
    }
})