import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => {
      return {
        user: {
          email: "",
        }
      };
    },
    actions: {
      agregarUsuario(email) {
        this.user.email = email;
      }
    },
    getters: {

    },
});
