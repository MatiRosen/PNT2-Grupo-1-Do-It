<template>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../../stores/user';
import { useIdeasStore } from '../../stores/creador/ideas';
import ideaService from "../../services/ideaService";
import { RouterLink } from 'vue-router';

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
</script>

<style scoped>

</style>