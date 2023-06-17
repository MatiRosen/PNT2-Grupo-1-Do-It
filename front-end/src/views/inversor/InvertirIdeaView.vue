<template>
    <section id="invertirIdea">
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
                                    <h2 class="titulosgrises">
                                        {{ idea.titulo }}
                                    </h2>
                                    <h3 class="subtituloRojo">
                                        {{ idea.categoria }}
                                    </h3>
                                    <p class="texto">{{ idea.descripcion }}</p>
                                    <h4 class="autor">
                                        Autor: {{ nombreCreador }}
                                    </h4>
                                    <h4 class="precio">
                                        Meta total ${{ idea.precio }}
                                    </h4>
                                    <h5 v-if="yaInvirtio" class="invertido">
                                        Dinero invertido: ${{
                                            inversion.dineroInvertido
                                        }}
                                    </h5>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <RouteterLink
                                                @click="contactarCreador(idea)">
                                                <button class="btn btn-info">
                                                    Contactar Creador
                                                </button>
                                            </RouteterLink>
                                        </div>
                                        <div class="col-md-2 offset-md-1 pt-2">
                                            <input
                                                v-if="!yaInvirtio"
                                                v-model="idea.invertido"
                                                type="number"
                                                id="txtInvertido"
                                                name="txtInvertido"
                                                class="form-control shadow"
                                                required />
                                        </div>
                                        <div
                                            class="col-md-1 offset-md-2 mx-0 pl-0"
                                            v-if="!yaInvirtio">
                                            <button
                                                class="btn btn-success"
                                                @click="invertirIdea(idea)">
                                                Invertir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
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
    await usuarioService.obtenerCreadores(idea.idCreador).then((res) => {
        creador.value = res.data;
        nombreCreador.value =
            creador.value.nombre + " " + creador.value.apellido;
    }).catch((err) => {
      console.log(`Ha ocurrido un error: ${err.response.data}`);
    })
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

    idea.cantidadInversiones = Number(idea.cantidadInversiones) + 1;

    await ideaService.actualizarIdea(idea.id, idea);
    router.push(`/inversor/inversiones/`);
};
const contactarCreador = (idea) => {

  let id = user.id;
  let idCreador = parseInt(idea.idCreador);
  
  chatService.obtenerChatPorParticipantes(id, idCreador).then(res => {
    router.replace(`/chat/${res.data.id}`);
  })

  
};
</script>

<style scoped>
.btn-info {
    color: #fff;
    background-color: #17a2b8;  
    border-color: #17a2b8;
}
.precio {
    font-weight: bold;
    color: #16bd3a;
    font-size: 20px;
}
.invertido {
    font-weight: bold;
    font-size: 17px;
}
.titulosgrises {
    font-weight: bold;
    color: #6a6a6a;
    margin-bottom: 10px;
    margin-top: 20px;
}
.autor {
    font-weight: bold;
    color: #6a6a6a;
    font-size: 20px;
    margin-bottom: 10px;
    margin-top: 0;
}
.texto {
    font-weight: normal;
    color: #6a6a6a;
    font-size: 15px;
    width: 100%;
    padding: 0;
    margin-bottom: 10px;
    text-align: center;
}
.img-fluid {
    height: fit-content;
    padding-top: 15px;
}
</style>
