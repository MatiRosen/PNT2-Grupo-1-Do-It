<script>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../../stores/user';
import { useIdeasStore } from '../../stores/creador/ideas';
import ideaService from "../../services/ideaService";
import { RouterLink } from 'vue-router';

export default {
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
      guardarIdea
    };
  }
}

</script>

<template>   
  <section>
    <div class="container">
      <div class="row top-separation">
        <div class="col-md-4 columnas" v-for="idea in ideas" :key="idea.id">
          <div class="card shadow-lg">
            <div>
              <div>
                <RouterLink to="/idea/${idea.id}" @click="guardarIdea(idea)"><img src="../../assets/lupa.png"></RouterLink>
                  <div class="col-md-7 offset-md-1">
                    <h2 class="titulosgrises">{{ idea.titulo }}</h2>
                    <h3 class="subtituloRojo">{{ idea.categoria }}</h3>
                    <h4 class="descripcion">Precio:</h4>
                    <p class="precio">${{ idea.precio }}</p>                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

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
.precio{
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