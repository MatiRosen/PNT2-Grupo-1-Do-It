<script>
import { ref, onMounted } from "vue";
import { useUserStore } from "../../stores/user";
import { useIdeasStore } from "../../stores/creador/ideas";
import ideaService from "../../services/ideaService";
import { RouterLink } from "vue-router";

export default {
  methods: {
    getImageUrl(imageName) {
      return `http://localhost:8080/images/${imageName}`;
    },
  },
  setup() {
    const ideas = ref([]);
    const { user } = useUserStore();
    const { setIdea } = useIdeasStore();

    const getIdeas = async () => {
      ideas.value = (await ideaService.obtenerIdeas(user.id)).data;
    };

    const guardarIdea = (idea) => {
      setIdea(idea);
    };

    onMounted(getIdeas);

    return {
      ideas,
      getIdeas,
      guardarIdea,
    };
  },
};
</script>

<template>
  <div class="container">
    <div class="row top-separation">
      <div class="col-md-12 text-center">
        <h2>Mis ideas</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 columnas" v-for="idea in ideas" :key="idea.id">
        <div class="card shadow-lg">
          <div class="card-block position-relative">
            <div class="row">
              <div class="col-md-12">
                <img class="img-fluid" :src="getImageUrl(idea.imagen)" />
              </div>
            </div>
            <div class="row p-4">
              <div class="col-md-10">
                <h2 class="titulosgrises">{{ idea.titulo }}</h2>
                <h3 class="subtituloRojo">{{ idea.categoria }}</h3>
                <h4 class="descripcion">
                  Objetivo:
                  <span class="precio">${{ idea.precio }}</span>
                </h4>
              </div>
              <div class="col-md-2">
                <RouterLink to="/idea/${idea.id}" @click="guardarIdea(idea)"
                  ><img src="../../assets/lupa.png"
                /></RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../../assets/estilos.css';
.img-fluid {
  height: fit-content;
  padding-top: 15px;
}
img {
  max-width: 380px;
  max-height: 220px;
}
.lupa {
  align-items: self-start;
}
.container{
    min-height: 81vh;
}
</style>
