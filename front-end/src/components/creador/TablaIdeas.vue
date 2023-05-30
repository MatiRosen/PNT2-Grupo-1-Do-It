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
    <table class="table table-striped">
        <tbody>
            <tr v-for="idea in ideas">
                <td>{{ idea.titulo }}</td>
                <td>{{ idea.descripcion }}</td>
                <td>{{ idea.imagen }}</td>
                <td>{{ idea.categoria }}</td>
                <td>{{ idea.precio }}</td>
                <td><RouterLink to="/idea/${idea.id}" @click="guardarIdea(idea)"><img src="../../assets/busqueda.png"></RouterLink></td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
img {
    width: 30px;
    height: 30px;
}
</style>