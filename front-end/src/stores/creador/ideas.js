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
                invertido: 0,
                creador: "",
                idInversores: [],
                vecesVisto: 0
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
            return this.idea.idInversores.length > 0
        }
    }
})