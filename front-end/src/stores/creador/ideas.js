import { ref, computed } from "vue"
import { defineStore } from "pinia"

export const useIdeasStore = defineStore("ideas", {
    state: () => {
        return {
            ideas: [
                {id: 1, titulo: "Idea 1", imagen: "Imagen 1", categoria: "Categoria 1", descripcion: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Reiciendis nihil ipsum perferendis impedit exercitationem, veritatis provident doloribus eos molestias, at placeat"},
                {id: 2, titulo: "Idea 2", imagen: "Imagen 2", categoria: "Categoria 2", descripcion: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Reiciendis nihil ipsum perferendis impedit exercitationem, veritatis provident doloribus eos molestias, at placeat"},
                {id: 3, titulo: "Idea 3", imagen: "Imagen 3", categoria: "Categoria 3", descripcion: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Reiciendis nihil ipsum perferendis impedit exercitationem, veritatis provident doloribus eos molestias, at placeat"},
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