import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            user: {
                id: -1,
                nombre: "",
                email: "",
                tipo: "",
                dinero: 0,
            },
        };
    },
    actions: {
        agregarUsuario(id = -1, nombre, email, tipo, dinero = 0) {
            this.user.id = id;
            this.user.nombre = nombre;
            this.user.email = email;
            this.user.tipo = tipo;
            this.user.dinero = dinero;
        },
        eliminarUsuario() {
            this.$reset();
        },
        sumarDinero(dinero) {
            this.user.dinero = dinero;
        },
    },
    getters: {
        estaLogueado() {
            return this.user.nombre != "";
        },
        esInversor() {
            return this.user.tipo == "Inversor";
        },
        esCreador() {
            return this.user.tipo == "Creador";
        },
    },
});
