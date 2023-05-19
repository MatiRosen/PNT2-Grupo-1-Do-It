import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/creador",
            name: "creador",
            component: () => import("../views/creador/HomeView.vue"),
        },
        {
            path: "/inversor",
            name: "inversor",
            component: () => import("../views/inversor/HomeView.vue"),
        },
        {
            path: "/registrarse",
            name: "registrarse",
            component: () => import("../views/RegisterView.vue"),
        },
        {
            path: "/login",
            name: "login",
            component: () => import("../views/LoginView.vue"),
        }
    ],
});

export default router;
