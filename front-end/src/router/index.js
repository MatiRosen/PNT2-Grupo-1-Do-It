import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useUserStore } from "../stores/user.js";
import { useChatStore } from "../stores/chat.js";

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
            beforeEnter: (to, from, next) => {
                if (useUserStore().esCreador) {
                    next();
                } else {
                    next({ name: "home" });
                }
            }
        },
        {
            path: "/idea/:id",
            name: "idea",
            component: () => import("../views/creador/IdeaView.vue"),
        },
        {
            path: "/inversion/:id",
            name: "inversion",
            component: () => import("../views/inversor/InversionView.vue"),
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
            beforeEnter: (to, from, next) => {
                if (useUserStore().esInversor) {
                    next();
                } else {
                    next({ name: "home" });
                }
            }
        },
        {
            path: "/registrarse",
            name: "registrarse",
            component: () => import("../views/RegisterView.vue"),
            // No necesito el beforeEnter porque si ponen el link, se recarga la pagina y se pierde el estado de la store. 
        },
        {
            path: "/login",
            name: "login",
            component: () => import("../views/LoginView.vue"),
            // No necesito el beforeEnter porque si ponen el link, se recarga la pagina y se pierde el estado de la store.
        },
        { 
            path:"/chats",
            name:"chats",
            component: () => import("../views/ChatsView.vue"),
            beforeEnter: (to, from, next) => {
                if (useUserStore().estaLogueado) {
                    next();
                } else {
                    next({ name: "home" });
                }
            }
        },
        {
            path:"/chat/:id",
            name:"chat",
            component: () => import("../views/ChatView.vue"),
            // Agregamos que solo se pueda acceder si el id del chat es de un chat en el que participa el usuario logueado:
            beforeEnter: (to, from, next) => {
                if (useUserStore().estaLogueado) {
                    let chatId = to.params.id;
                    let userId = useUserStore().user.id;
                    
                    useChatStore().getChat(chatId).then(c =>{                   
                        if (c.data.participantes.includes(userId)) {
                            next();
                        } else {
                            next({ name: "chats" });
                        }
                    });
                } else {
                    next({ name: "home" });
                }
            }
        },
        {
            path:"/perfil",
            name:"perfil",
            component: () => import("../views/ProfileView.vue"),
            beforeEnter: (to, from, next) => {
                if (useUserStore().estaLogueado) {
                    next();
                } else {
                    next({ name: "home" });
                }
            }
        },
        {
            path: "/billetera",
            name: "billetera",
            component: () => import("../views/inversor/BilleteraView.vue"),
            beforeEnter: (to, from, next) => {
                if (useUserStore().esInversor) {
                    next();
                } else {
                    next({ name: "home" });
                }
            }
        },
        {
            path: "/invertirIdea/:id",
            name: "invertirIdea",
            component: () => import("../views/inversor/InvertirIdeaView.vue"),
            beforeEnter: (to, from, next) => {
                if (useUserStore().esInversor) {
                    next();
                } else {
                    next({ name: "home" });
                }
            }
        },
        {
            path: "/inversor/inversiones",
            name: "inversiones",
            component: () => import("../views/inversor/Inversiones.vue"),
            beforeEnter: (to, from, next) => {
                if (useUserStore().esInversor) {
                    next();
                } else {
                    next({ name: "home" });
                }
            }
        },
        { // Cualquier otra ruta que no sea ninguna de las anteriores, redirige a la home
            path: "/:pathMatch(.*)*",
            redirect: { name: "home" },
        },
        
    ],
});

export default router;
