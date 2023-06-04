import { defineStore } from "pinia";

export const useInversionesStore = defineStore("inversion", {
    state: () => {
        return {
            inversion: {
                id: -1,
                titulo: "",
                descripcion: "",
                imagen: "",
                categoria: "",
                precio: 0,
                idCreador: -1,
                dineroInvertido: 0,
            },
        };
    },
    actions: {
        setInversion(inversion) {
            this.inversion = inversion;
        },
    },
    getters: {
    },
});
