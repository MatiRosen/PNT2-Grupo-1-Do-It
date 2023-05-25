import { ref, computed } from "vue"
import { defineStore } from "pinia"

export const useIdeasStore = defineStore("ideas", {
    state: () => {
        return {
            ideas: {
                "titulo": "",
                "descripcion": "",
                "imagen": "",
                "cateoria": "",
                "precio": 0,
                "creador": ""
            }
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