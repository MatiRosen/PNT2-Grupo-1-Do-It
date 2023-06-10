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
                                        <button @click="contactarCreador(idea)" class="btn btn-success">
                                                Contactar Creador
                                        </button>
                                    </div>
                                    <div class="col-md-2 offset-md-2">
                                        <input v-if="!yaInvirtio"
                                            v-model="idea.invertido"
                                            type="number"
                                            id="txtInvertido"
                                            name="txtInvertido"
                                            class="form-control shadow"
                                            required />
                                    </div>
                                    <div class="col-md-4" v-if="!yaInvirtio">
                                        <RouterLink
                                            :to="ruta"
                                            @click="invertirIdea(idea)"
                                            ><button class="btn btn-success">
                                                Invertir
                                            </button></RouterLink
                                        >
                                    </div>
                                    <div class="col-md-4" v-else>
                                      <h4>Dinero invertido: ${{ inversion.dineroInvertido }}</h4>
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
import {useInversionesStore} from "../../stores/inversor/inversiones";
import chatService from "../../services/chatService";
import router from "../../router";

const { idea } = useIdeasStore();
const imagen = `../src/assets/${idea.imagen}`;

const { inversion } = useInversionesStore();

const { user } = useUserStore();
const creador = ref();
const nombreCreador = ref();

const yaInvirtio = ref(true);

const ruta = yaInvirtio ? "/inversor/inversiones/" : "/inversor/";

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

    idea.cantidadInversiones += 1;
    await ideaService.actualizarIdea(idea, idea.id);
};
const contactarCreador = (idea) => {
    let nuevoChat = {id: 0,
		participantes: [user.id, parseInt(idea.idCreador)],
		mensajes: [	],
		ultimoMensaje: { emisor: 0,	contenido: "" }
    }
    chatService.crearChat(nuevoChat).then(res => {
        console.log('nos vamos', res.data.id)
        router.replace(`/chat/${res.data.id}`)
        
    });
};
</script>

<style scoped>
.titulosgrises .autor {
    font-weight: bold;
    color: #6a6a6a;
    font-size: 20px;
    margin-bottom: 10px;
}
.subtituloRojo {
    margin-top: 5px;
    font-weight: bold;
    color: #e20000;
    font-size: 17px;
}
.card {
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    border-color: white;
    border: 0;
    border-radius: 20px;
}
.texto {
    font-weight: normal;
    color: #6a6a6a;
    font-size: 15px;
    width: 100%;
    padding: 20px;

    text-align: center;
}
.descripcion {
    font-weight: normal;
    color: #6a6a6a;
    font-size: 15px;
}
.precio {
    font-weight: bold;
    color: #16bd3a;
    font-size: 15px;
}
img {
    width: 100%;
    height: 100%;
    max-width: 400px;
    max-height: 400px;
    object-fit: contain;
    margin-top: 5px;
}
button {
    margin: 10px;
}
</style>
