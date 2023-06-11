<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2 text-center">
                <div class="card shadow-lg">
                    <div class="card-block position-relative">
                        <div class="row">
                            <div>
                                <img :src="imagen" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-8 offset-md-2">
                                <h2 class="titulosgrises">{{ idea.titulo }}</h2>
                                <h3 class="subtituloRojo">
                                    {{ idea.categoria }}
                                </h3>
                                <p class="texto">{{ idea.descripcion }}</p>
                                <p class="precio">${{ idea.invertido }}</p>
                                <h4 class="autor">Autor {{ nombreCreador }}</h4>
                                <h4 class="descripcion">
                                    Contribuido de ${{ idea.precio }}
                                </h4>
                                <div class="row">
                                    <div class="col-md-4">
                                        <RouteterLink
                                            @click="contactarCreador(idea)">
                                            <button class="btn btn-success">
                                                Contactar Creador
                                            </button>
                                        </RouteterLink>
                                    </div>
                                    <div class="col-md-2 offset-md-2">
                                        <input
                                            v-if="!yaInvirtio"
                                            v-model="idea.invertido"
                                            type="number"
                                            id="txtInvertido"
                                            name="txtInvertido"
                                            class="form-control shadow"
                                            required />
                                    </div>
                                    <div class="col-md-4" v-if="!yaInvirtio">
                                        ><button
                                            class="btn btn-success"
                                            @click="invertirIdea(idea)">
                                            Invertir
                                        </button>
                                        >
                                    </div>
                                    <div class="col-md-4" v-else>
                                        <h4>
                                            Dinero invertido: ${{
                                                inversion.dineroInvertido
                                            }}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useIdeasStore } from "../../stores/creador/ideas";
import usuarioService from "../../services/userService";
import inversionService from "../../services/inversionService";
import { useUserStore } from "../../stores/user";
import { ref, onMounted } from "vue";
import ideaService from "../../services/ideaService";
import { useInversionesStore } from "../../stores/inversor/inversiones";
import chatService from "../../services/chatService";
import { useRouter } from "vue-router";

const { idea } = useIdeasStore();

const imagen = `http://localhost:8080/images/${idea.imagen}`;

const { inversion } = useInversionesStore();
const router = useRouter();
const { user } = useUserStore();
const creador = ref();
const nombreCreador = ref();

const yaInvirtio = ref(true);

const getInversiones = async () => {
    const inversion = (
        await inversionService.obtenerInversion(idea.id, user.id)
    ).data;

    if (!inversion) {
        yaInvirtio.value = false;
    }
};

const getCreador = async () => {
    creador.value = (
        await usuarioService.obtenerCreadores(idea.idCreador)
    ).data;
    nombreCreador.value = creador.value.nombre + " " + creador.value.apellido;
};

onMounted(() => {
    getInversiones();
    getCreador();
});

const invertirIdea = async (idea) => {
    if (idea.invertido > user.dinero) {
        alert("No tienes suficiente dinero");
        return;
    }
    const inversion = {
        idIdea: idea.id,
        idInversor: user.id,
        dineroInvertido: idea.invertido,
    };

    await inversionService.agregarInversion(inversion);

    user.dinero -= idea.invertido;
    await usuarioService.sumarDinero({ dinero: user.dinero }, user.id);

    idea.cantidadInversiones = Number(idea.cantidadInversiones) + 1

    await ideaService.actualizarIdea(idea.id, idea);
    router.push(`/inversor/inversiones/`);
};
const contactarCreador = (idea) => {
    let nuevoChat = {
        id: 0,
        participantes: [user.id, parseInt(idea.idCreador)],
        mensajes: [],
        ultimoMensaje: { emisor: 0, contenido: "" },
    };
    chatService.crearChat(nuevoChat).then((res) => {
        router.replace(`/chat/${res.data.id}`);
    });
};
</script>

<style>

</style>
