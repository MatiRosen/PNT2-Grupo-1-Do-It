<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Menu from "./components/Menu.vue"
</script>

<template>
  <header>
    <div class="wrapper">
      <Menu></Menu>
    </div>
  </header>

  <body> 
    <RouterView />
  </body>


  <footer>

  </footer>
 

 
</template>

<style scoped>

</style>
