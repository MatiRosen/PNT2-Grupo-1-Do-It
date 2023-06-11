<script>
import { useIdeasStore } from "../../stores/creador/ideas";
import { useRouter } from "vue-router";
import ideaService from "../../services/ideaService";

export default {
  setup() {
    const router = useRouter();
    const { idea } = useIdeasStore();
    const imagen = `http://localhost:8080/images/${idea.imagen}`;
    let { tieneInversores } = useIdeasStore();

    const editarIdea = () => {
      router.push({ name: "editarIdea" });
    };

    const eliminarIdea = () => {
      ideaService
        .eliminarIdea(idea.id)
        .then(() => {
          router.push({ name: "creador" });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return {
      idea,
      tieneInversores,
      editarIdea,
      ideaService,
      eliminarIdea,
      imagen,
    };
  },
};
</script>
<template>
  <section id="invertirIdea">
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
                  <h3 class="subtituloRojo">
                    {{ idea.categoria }}
                  </h3>
                  <p class="texto">{{ idea.descripcion }}</p>
                  <h4 class="precio">Meta total ${{ idea.precio }}</h4>
                  <button
                    v-if="!tieneInversores"
                    @click="editarIdea"
                    class="btn btn-secondary"
                  >
                    Editar
                  </button>
                  <button
                    v-if="!tieneInversores"
                    @click="eliminarIdea"
                    class="btn btn-warning"
                  >
                    Eliminar
                  </button>
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
@import '../../assets/estilos.css';
 
</style>
