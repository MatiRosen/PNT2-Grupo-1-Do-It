<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card shadow-lg">
          <div class="card-block position-relative">
            <div class="row">
              <div>
                <img :src="imagen" />
              </div>
            </div>
            <div class="row">
              <h2 class="titulosgrises">{{ idea.titulo }}</h2>
              <h3 class="subtituloRojo">{{ idea.categoria }}</h3>
              <p class="texto">{{ idea.descripcion }}</p>
              <div class="descripcion-container">
                <h4 class="descripcion">Precio</h4>
              </div>
              <p class="precio">${{ idea.precio }}</p>
              <div>
                <button
                  v-if="!tieneInversores"
                  @click="editarIdea"
                  class="btn btn-secondary"
                >
                  Contactar Creador
                </button>
                <button
                  v-if="!tieneInversores"
                  @click="eliminarIdea"
                  class="btn btn-warning"
                >
                  Invertir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useIdeasStore } from "../../stores/creador/ideas";
import { useRouter } from "vue-router";
import ideaService from "../../services/ideaService";

export default {
  setup() {
    const router = useRouter();
    const { idea } = useIdeasStore();
    const imagen = `../src/assets/${idea.imagen}`;
    let { tieneInversores } = useIdeasStore();

    return {
      idea,
      tieneInversores,
      ideaService,
      imagen,
    };
  },
};
</script>
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
.texto {
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
.precio {
  font-weight: bold;
  color: #16bd3a;
  font-size: 15px;
}
img {
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 400px;
  object-fit: contain;
  margin-top: 5px;
}
button {
  margin: 10px;
}
</style>
