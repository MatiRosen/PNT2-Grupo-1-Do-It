<template>
  <section id="inversiones">
    <div class="container">
      <div class="row">
        <div
          class="col-md-4"
          v-for="inversion in inversiones"
          :key="inversion.id"
        >
          <div class="card shadow-lg topIdeas">
            <div class="card-block position-relative">
              <div class="row">
                <div class="col-md-10 offset-md-1">
                  <img
                    class="img-fluid justify-content-center"
                    :src="getImageUrl(inversion.imagen)"
                    @click="guardarInversion(inversion)"
                  />
                  <h2 class="titulosgrises">{{ inversion.titulo }}</h2>
                  <h3 class="subtituloRojo">{{ inversion.categoria }}</h3>
                  <h4 class="descripcion">
                    Dinero invertido:
                    <span class="precio">${{ inversion.dineroInvertido }}</span>
                  </h4>
                </div>
                <div class="col-md-1"></div>
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
  const inversionesUsuario = (
    await inversionService.obtenerInversionesPorCampo("idInversor", user.id)
  ).data;

  for (const inversion of inversionesUsuario) {
    const idea = (
      await ideaService.obtenerIdeasPorCampo("id", inversion.idIdea)
    ).data[0];
    const inversionConIdea = {
      id: idea.id,
      titulo: idea.titulo,
      descripcion: idea.descripcion,
      imagen: idea.imagen,
      categoria: idea.categoria,
      precio: idea.precio,
      idCreador: idea.idCreador,
      dineroInvertido: inversion.dineroInvertido,
    };
    inversiones.value.push(inversionConIdea);
  }
};

onMounted(getInversiones);

const guardarInversion = async (inversion) => {
  const idea = await ideaService.obtenerIdeasPorCampo("id", inversion.id);
  const inversionAux = await inversionService.obtenerInversion(
    inversion.id,
    user.id
  );
  setInversion(inversionAux.data);
  setIdea(idea.data[0]);
  router.push(`/invertirIdea/${inversion.id}`);
};
function getImageUrl(imageName) {
  return `http://localhost:8080/images/${imageName}`;
}
</script>

<style scoped>
@import "../../assets/estilos.css";
.img-fluid {
  height: fit-content;
  padding-top: 15px;
}
.boton {
  border-color: white;
  color: transparent;
  padding: 0;
  margin: 0;
  border: 0;
}
</style>
