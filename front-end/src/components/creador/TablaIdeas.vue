<script>
import { ref, onMounted } from "vue";
import { useUserStore } from "../../stores/user";
import { useIdeasStore } from "../../stores/creador/ideas";
import ideaService from "../../services/ideaService";
import { RouterLink } from "vue-router";

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
            guardarIdea,
        };
    },
};
</script>

<template>
    <section>
        <div class="container">
            <div class="row top-separation">
                <div
                    class="col-md-4 columnas"
                    v-for="idea in ideas"
                    :key="idea.id">
                    <div class="card shadow-lg">
                        <div class="card-block position-relative">
                            <div>
                                <div>
                                    <RouterLink
                                        to="/idea/${idea.id}"
                                        @click="guardarIdea(idea)"
                                        ><img src="../../assets/lupa.png"
                                    /></RouterLink>
                                    <div class="col-md-7 offset-md-1">
                                        <h2 class="titulosgrises">
                                            {{ idea.titulo }}
                                        </h2>
                                        <h3 class="subtituloRojo">
                                            {{ idea.categoria }}
                                        </h3>
                                        <h4 class="descripcion">Precio:</h4>
                                        <p class="precio">${{ idea.precio }}</p>
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

<style scoped>

</style>
