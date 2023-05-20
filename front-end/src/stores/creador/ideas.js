import { ref, computed } from "vue"
import { defineStore } from "pinia"

export const useIdeasStore = defineStore("ideas", {
    state: () => {
        return {
            ideas: [
                {id: 1, titulo: "Idea 1", descripcion: "Descripcion 1", imagen: "Imagen 1", categoria: "Categoria 1"},
                {id: 2, titulo: "Idea 2", descripcion: "Descripcion 2", imagen: "Imagen 2", categoria: "Categoria 2"},
            ],
        }
    },
    actions: {
        agregarIdea(idea) {
            
        }
    },
    getters: {
        getIdeas() {
            return this.ideas
        }
    }
})