<script>
import { useIdeasStore } from '../../stores/creador/ideas';
import ideaService from '../../services/ideaService';

export default {
  setup() {
    const { idea } = useIdeasStore();
    const imagen = `http://localhost:8080/images/${idea.imagen}`

    return {
      idea,
      imagen,
      ideaService
    };
  },
  data() {
  },
  methods: {
    actualizarIdea(idea, vue) {
      ideaService
        .actualizarIdea(idea, idea.id)
        .then((response) => {
          this.$router.push("/creador");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  }
}
</script>

<template>
  <div class="container">
    <form @submit.prevent="actualizarIdea(idea)">
      <div class="card shadow-lg">
        <div>
          <img :src="imagen">
        </div>
        <input 
          v-model="idea.titulo"
          type="text"
          class="form-control"
          placeholder="Titulo"
        >
        <input
          v-model="idea.categoria"
          type="text"
          class="form-control"
          placeholder="Categoria"
        >
        <input
          v-model="idea.descripcion"
          type="text"
          class="form-control"
          placeholder="Descripcion"
        > 
        <div class="descripcion-container">
          <h4 class="descripcion">Precio</h4>
        </div>
        <input
          v-model="idea.precio"
          type="text"
          class="form-control"
          placeholder="Precio"
        >
        <button type="submit" class="btn btn-primary">Guardar</button>
      </div>
    </form>    
  </div>    
</template>


<style scoped>
.titulosgrises {
  font-weight: bold;
  color: #6a6a6a;
  font-size: 20px;
  margin-bottom: 10px;
}
.subtituloRojo {
  margin-top: 5px;
  font-weight: bold;
  color: #e20000;
  font-size: 17px;
}
.card {
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  border-color: white;
  border: 0;
  border-radius: 20px;
  
}
.texto{
  font-weight: normal;
  color: #6a6a6a;
  font-size: 15px;
  width: 600px;
  text-align: center;
}
.descripcion {
  font-weight: normal;
  color: #6a6a6a;
  font-size: 15px;
}
.precio{
  font-weight: bold;
  color: #16bd3a;
  font-size: 15px;
}
img{
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 400px;
  object-fit:contain;
  margin-top: 5px;
}
button{
  margin: 10px;
}
</style>
