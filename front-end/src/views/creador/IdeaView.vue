<script>
import { useIdeasStore } from "../../stores/creador/ideas";
import { useRouter } from "vue-router";
import ideaService from "../../services/ideaService";
import inversionService from "../../services/inversionService";
import userService from "../../services/userService";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const router = useRouter();
    const { idea } = useIdeasStore();
    const imagen = `http://localhost:8080/images/${idea.imagen}`;
    let { tieneInversores } = useIdeasStore();
    let usuarios = ref ([])

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

    const obtenerInversores = async () => {
      const inversores = await inversionService.obtenerInversiones();
      const inversoresFiltrados = inversores.data.filter(
        (inversion) => inversion.idIdea === idea.id
      );
      for (let i = 0; i < inversoresFiltrados.length; i++) {
        const inversor = await userService.obtenerUsuario(
          inversoresFiltrados[i].idInversor
        );
        inversoresFiltrados[i].nombre = inversor.data.nombre;
      }
      const nombresInversores = inversoresFiltrados.map((inversor) => {
         return inversor.nombre;
      });
      usuarios.value = nombresInversores;
    };

    onMounted(obtenerInversores)

    return {
      idea,
      tieneInversores,
      editarIdea,
      ideaService,
      eliminarIdea,
      imagen,
      obtenerInversores,
      usuarios,
      userService
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
                  <h4 v-if="tieneInversores" class="precio">Inversores:</h4>
                  <p class="nombres" v-for="usuario in usuarios">{{ usuario }}</p>
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
.nombres {
  display: inline-block;
  margin-right: 10px;
}
</style>
