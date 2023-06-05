<template>
  <div class="ideas mt-5">
    <TablaInversiones></TablaInversiones>
  </div>
</template>

<script setup>
import TablaInversiones from "../../components/inversor/TablaInversiones.vue";
</script>

<style scoped>
.ideas {
  background: url("../../assets/fondo-contacto.png");
  background-position: center;
  position: absolute;
  top: 0;
  background-size: cover;
  width: 100%; 
}
</style>
