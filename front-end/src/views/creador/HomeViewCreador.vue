<script setup>
import { RouterLink, RouterView } from "vue-router";
import TablaIdeas from '../../components/creador/TablaIdeas.vue'
</script>

<template>
  <TablaIdeas></TablaIdeas>
  <div>
    <button class="btn btn-primary"><RouterLink class="botonAgregar"  to="/nuevaIdea">Agregar Idea</RouterLink></button>
  </div>   
</template>

<style scoped>
 .ideas{
  background: url("../../assets/fondo-contacto.png");
  background-position: center;
  position: absolute;
  top: 0;
  background-size: cover;
  width: 100%;
  height: 100%;
}
.botonAgregar{
  text-decoration: none;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
button{
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
div{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>