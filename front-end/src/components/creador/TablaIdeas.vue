<script>
import { ref } from 'vue';
import ideaService from "../../services/ideaService";

export default {
    setup() {
      const ideas = ref([]);
    },
    data() {
      return {
        ideas
      }
    },
    methods: {
      getIdeas: async () => {
        ideas = await ideaService.obtenerIdeas("valdo@gmail.com");
    }
  }
}

</script>

<template>    
    <table class="table table-striped">
        <tbody>
            <tr v-for="idea in this.ideas">
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