<script setup>
import { RouterLink, RouterView } from "vue-router";
import TablaIdeas from "../../components/creador/TablaIdeas.vue";
</script>

<template>
  <section id="inversor">
    <TablaIdeas></TablaIdeas>
    <div class="nuevaIdea">
      <button class="btn btn-primary">
        <RouterLink class="botonAgregar" to="/nuevaIdea"
          >Agregar Idea</RouterLink
        >
      </button>
    </div>
  </section>
</template>

<style scoped>

@import "../../assets/estilos.css";
.nuevaIdea {
  display: flex;
  justify-content: center;
  align-items: center;
}
.botonAgregar {
  text-decoration: none;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
  border-radius: 20px;
  border-color: white;
  border: 0;
  background-color: #370a6d;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-decoration: none;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
