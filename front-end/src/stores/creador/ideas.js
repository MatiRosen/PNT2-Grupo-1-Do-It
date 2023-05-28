import { ref, computed } from "vue"
import { defineStore } from "pinia"

export const useIdeasStore = defineStore("ideas", {
    state: () => {
        return {
            ideas: [
                {
                    titulo: "Idea 1",
                    descripcion: "Descripcion idea 1",
                    imagen: "Imagen 1",
                    categoria: "Categoria 1",
                    precio: 1000,
                    creador: "valdo@gmail.com"
                },
                {
                    titulo: "Idea 2",
                    descripcion: "Descripcion idea 2",
                    imagen: "Imagen 2",
                    categoria: "Categoria 2",
                    precio: 500,
                    creador: "valdo@gmail.com"
                },
                {
                    titulo: "Idea 3",
                    descripcion: "Descripcion idea 3",
                    imagen: "Imagen 3",
                    categoria: "Categoria 3",
                    precio: 1700,
                    creador: "matias.rosen@cliente.com"
                },
            ],
        }
    },
    actions: {
        agregarIdea(titulo, descripcion, imagen, categoria, precio, creador) {
            const idea = {}
            idea.titulo = titulo
            idea.descripcion = descripcion
            idea.imagen = imagen
            idea.categoria = categoria
            idea.precio = precio
            idea.creador = creador
            this.ideas.push(idea)
        }
    },
    getters: {
        getIdeas() {
            return this.ideas
        }
    }
})