<script setup>
import { RouterLink, RouterView } from "vue-router";
import TablaIdeas from '../../components/creador/TablaIdeas.vue'
</script>

<template>
  <div>
    <h1>Mis ideas</h1>
    <TablaIdeas></TablaIdeas>
  </div> 
  <div>
    <RouterLink to="/nuevaIdea"><button class="btn-primary">Agregar Idea</button></RouterLink>
  </div>
</template>