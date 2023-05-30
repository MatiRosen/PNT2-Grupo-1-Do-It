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
  <section id="ideas">
    <div class="container">
      <div class="row top-separation">
        <div class="col-md-4 columnas" v-for="idea in ideas" :key="idea.id">
          <div class="card shadow-lg">
            <div class="card-block position-relative">
              <div class="row">
                <RouterLink to="/idea/${idea.id}" @click="guardarIdea(idea)"><img src="../../assets/lupa.png"></RouterLink>
                <div class="col-md-7 offset-md-1">
                  <h2 class="titulosgrises">{{ idea.titulo }}</h2>
                  <h3 class="subtituloRojo">{{ idea.categoria }}</h3>
                  <h4 class="descripcion">Descripcion</h4>
                  <p>{{ idea.descripcion }}</p>
                  <h4 class="descripcion">Precio</h4>
                  <p class="precio">{{ idea.precio }}</p>
                  
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
.subtitulovioleta {
  font-weight: bold;
  color: #370a6d;
  font-size: 17px;
}
.subtituloRojo {
  font-weight: bold;
  color: #e20000;
  font-size: 17px;
}
.descripcion {
  display: inline-block;
  font-weight: normal;
  color: #6a6a6a;
  font-size: 15px;
}
.precio{
  margin-left: 10px;
  display: inline-block;
  font-weight: bold;
  color: #16bd3a;
  font-size: 15px;
}
.p {
  font-size: 12px;
}
.card {
  border-radius: 20px;
  border-color: white;
  border: 0;
}
.card-body {
  padding: 0;
  margin: 0;
}
.card-text {
  padding: 10px;
  margin: 5px 5px;
}
.card-title {
  padding: 0;
  margin: 0;
}
.color-gradiente {
  color: white;
  padding: 15px;
  background: rgba(107, 35, 35, 1);
  background: -moz-linear-gradient(
    left,
    rgba(107, 35, 35, 1) 0%,
    rgba(231, 55, 39, 1) 69%,
    rgba(231, 55, 39, 1) 100%
  );
  background: -webkit-gradient(
    left top,
    right top,
    color-stop(0%, rgba(107, 35, 35, 1)),
    color-stop(69%, rgba(231, 55, 39, 1)),
    color-stop(100%, rgba(231, 55, 39, 1))
  );
  background: -webkit-linear-gradient(
    left,
    rgba(107, 35, 35, 1) 0%,
    rgba(231, 55, 39, 1) 69%,
    rgba(231, 55, 39, 1) 100%
  );
  background: -o-linear-gradient(
    left,
    rgba(107, 35, 35, 1) 0%,
    rgba(231, 55, 39, 1) 69%,
    rgba(231, 55, 39, 1) 100%
  );
  background: -ms-linear-gradient(
    left,
    rgba(107, 35, 35, 1) 0%,
    rgba(231, 55, 39, 1) 69%,
    rgba(231, 55, 39, 1) 100%
  );
  background: linear-gradient(
    to right,
    rgba(107, 35, 35, 1) 0%,
    rgba(231, 55, 39, 1) 69%,
    rgba(231, 55, 39, 1) 100%
  );
  filter: progid: DXImageTransform.Microsoft.gradient( startColorstr='#6b2323', endColorstr='#e73727', GradientType=1);
}
</style>