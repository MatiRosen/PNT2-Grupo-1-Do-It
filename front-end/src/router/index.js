import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import {useUserStore} from "../stores/user.js";

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
            component: () => import("../views/creador/HomeViewCreador.vue"),           
            beforeEnter: (to, from, next) => {
                if (useUserStore().esCreador) {
                    next();
                } else {
                    next({ name: "home" });
                }
            },
        },
        {
            path: "/nuevaIdea",
            name: "nuevaIdea",
            component: () => import("../views/creador/NewIdeaView.vue"),
        },
        {
            path: "/idea/:id",
            name: "idea",
            component: () => import("../views/creador/IdeaView.vue"),
        },
        {
            path: "/editarIdea/:id",
            name: "editarIdea",
            component: () => import("../views/creador/EditIdeaView.vue"),
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
        },
        { 
            path:"/chats",
            name:"chats",
            component: () => import("../views/ChatsView.vue"),
        },
        {
            path:"/chat/:id",
            name:"chat",
            component: () => import("../views/ChatView.vue"),
        },
        {
            path:"/perfil",
            name:"perfil",
            component: () => import("../views/ProfileView.vue"),
        },
        {
            path: "/billetera",
            name: "billetera",
            component: () => import("../views/inversor/BilleteraView.vue"),
        },
        {
            path: "/invertirIdea/:id",
            name: "invertirIdea",
            component: () => import("../views/creador/IdeaView.vue"),
        },
    ],
});

export default router;
