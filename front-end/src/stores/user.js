import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => {
      return {
        user: {
          nombre: "",

        }
      };
    },
    actions: {
      agregarUsuario(nombre) {
        this.user.nombre = nombre;
      }
    },
    getters: {

    },
});
