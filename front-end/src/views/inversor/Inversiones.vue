<template>
<section>
    <div class="container">
      <div class="row top-separation">
        <div class="col-md-4 columnas" v-for="idea in ideas" :key="idea.id">
          <div class="card shadow-lg">
            <div>
              <div>
                <!--<RouterLink to="/idea/${idea.id}" @click="guardarIdea(idea)"><img src="../../assets/lupa.png"></RouterLink>-->
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

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../../stores/user';
import inversionService from "../../services/inversionService";
import { RouterLink } from 'vue-router';

const ideas = ref([]);
const { user } = useUserStore();

const getIdeas = async () => {
  ideas.value = (await inversionService.obtenerInversionesPorCampo("idInversor", user.id)).data;
};

onMounted(getIdeas);
</script>

<style scoped>

</style>