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
                idInversores: []
            }
        }
    },
    actions: {
        setIdea(idea) {
            this.idea = idea
        }
    },
    getters: {
    }
})