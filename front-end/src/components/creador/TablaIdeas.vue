<script>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../../stores/user';
import ideaService from "../../services/ideaService";

export default {
  setup() {
    const ideas = ref([]);
    const { user } = useUserStore();

    const getIdeas = async () => {
      ideas.value = (await ideaService.obtenerIdeas(user.email)).data;
      console.log(ideas.value);
    };

    onMounted(getIdeas);

    return {
      ideas,
      getIdeas
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
                <td>{{ idea.creador }}</td>
                <td></td>
            </tr>
        </tbody>
    </table>
</template>