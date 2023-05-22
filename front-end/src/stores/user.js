import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            user: {
                nombre: "",
                tipo: "",
                dinero: 0
            },
        };
    },
    actions: {
        agregarUsuario(nombre, tipo, dinero = 0) {
            this.user.nombre = nombre;
            this.user.tipo = tipo;
            this.user.dinero = dinero;
        },
        eliminarUsuario() {
            this.user.nombre = "";
            this.user.tipo = "";
            this.user.dinero = 0;
        }
    },
    getters: {
        estaLogueado() {
            return this.user.nombre != "";
        },
        esInversor(){
            return this.user.tipo == "inversor";
        }
    },
});
