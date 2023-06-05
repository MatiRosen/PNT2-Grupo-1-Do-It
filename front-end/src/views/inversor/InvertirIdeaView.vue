<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2 text-center">
        <div class="card shadow-lg">
          <div class="card-block position-relative">
            <div class="row">
              <div>
                <img :src="imagen" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-8 offset-md-2">
                <h2 class="titulosgrises">{{ idea.titulo }}</h2>
                <h3 class="subtituloRojo">{{ idea.categoria }}</h3>
                <p class="texto">{{ idea.descripcion }}</p>
                <p class="precio">${{ idea.invertido }}</p>
                <h4 class="autor">Autor {{ creador.nombre }}</h4>
                <h4 class="descripcion">Contribuido de ${{ idea.precio }}</h4>
                <div class="row">
                  <div class="col-md-4">
                    <RouterLink
                      to="/misInversiones/"
                      @click="invertirIdea(idea)"
                      ><button class="btn btn-success">
                        Contactar Creador
                      </button></RouterLink
                    >
                  </div>
                  <div class="col-md-2 offset-md-2">
                    <input
                      v-model="idea.invertido"
                      type="string"
                      id="txtInvertido"
                      name="txtInvertido"
                      class="form-control shadow"
                      required
                    />
                  </div>
                  <div class="col-md-4">
                    <RouterLink
                      to="/inversor/inversiones/"
                      @click="invertirIdea(idea)"
                      ><button class="btn btn-success">
                        Invertir
                      </button></RouterLink
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useInversionesStore } from "../../stores/inversor/inversiones"
import { useIdeasStore } from "../../stores/creador/ideas";
import usuarioService from "../../services/userService";
import { ref, onMounted } from "vue";

const { idea } = useIdeasStore();
const { inversion } = useInversionesStore();
const imagen = `../src/assets/${idea.imagen}`;

const creador = ref();

const getCreador = async () => {
  creador.value = (await usuarioService.obtenerCreadores(idea.idCreador)).data;
}

onMounted(getCreador);
</script>
<style scoped>
.titulosgrises .autor {
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
  width: 100%;
  padding: 20px;

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
