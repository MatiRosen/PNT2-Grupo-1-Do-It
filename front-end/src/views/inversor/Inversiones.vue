<template>
    <section>
        <div class="container">
            <div class="row top-separation">
                <div
                    class="col-md-4 columnas"
                    v-for="inversion in inversiones"
                    :key="inversion.id">
                    <div class="card shadow-lg">
                        <div>
                            <div>
                                <button @click="guardarInversion(inversion)"><img src="../../assets/lupa.png"></button>
                                <div class="col-md-7 offset-md-1">
                                    <h2 class="titulosgrises">
                                        {{ inversion.titulo }}
                                    </h2>
                                    <h3 class="subtituloRojo">
                                        {{ inversion.categoria }}
                                    </h3>
                                    <h4 class="descripcion">Dinero invertido:</h4>
                                    <p class="precio">${{ inversion.dineroInvertido }}</p>
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
import { ref, onMounted } from "vue";
import { useUserStore } from "../../stores/user";
import inversionService from "../../services/inversionService";
import ideaService from "../../services/ideaService";
import { useInversionesStore } from "../../stores/inversor/inversiones";
import { useRouter } from "vue-router";
import { useIdeasStore } from "../../stores/creador/ideas";

const router = useRouter();
const inversiones = ref([]);
const { user } = useUserStore();
const { setInversion } = useInversionesStore();
const { setIdea } = useIdeasStore();

const getInversiones = async () => {
    const inversionesUsuario = (await inversionService.obtenerInversionesPorCampo("idInversor", user.id)).data;

    for (const inversion of inversionesUsuario) {
        const idea = (await ideaService.obtenerIdeasPorCampo("id", inversion.idIdea)).data[0];
        const inversionConIdea = {
            id: idea.id,
            titulo: idea.titulo,
            descripcion: idea.descripcion,
            imagen: idea.imagen,
            categoria: idea.categoria,
            precio: idea.precio,
            idCreador: idea.idCreador,
            dineroInvertido: inversion.dineroInvertido
        };
        inversiones.value.push(inversionConIdea);
    }
};


onMounted(getInversiones);

const guardarInversion = async (inversion) => {
    const idea = await ideaService.obtenerIdeasPorCampo("id", inversion.id);
    const inversionAux = await inversionService.obtenerInversion(inversion.id, user.id);
    setInversion(inversionAux.data);
    setIdea(idea.data[0]);
    router.push(`/invertirIdea/${inversion.id}`);
};

</script>

<style scoped>
img {
    width: 30px;
    height: 30px;
}
.columnas {
    margin-bottom: 20px;
}
.titulosgrises {
    font-weight: bold;
    color: #6a6a6a;
    font-size: 20px;
}
.subtituloRojo {
    font-weight: bold;
    color: #e20000;
    font-size: 17px;
}
.descripcion {
    display: inline-block;
    color: #6a6a6a;
    font-size: 15px;
}
.precio {
    margin-left: 5px;
    display: inline-block;
    font-weight: bold;
    color: #16bd3a;
    font-size: 15px;
}
.card {
    border-radius: 20px;
    border-color: white;
    border: 0;
}
</style>

