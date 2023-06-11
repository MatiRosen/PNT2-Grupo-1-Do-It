<script>
import { useIdeasStore } from "../../stores/creador/ideas";
import ideaService from "../../services/ideaService";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const formData = new FormData();
    const { idea } = useIdeasStore();
    const imagen = `http://localhost:8080/images/${idea.imagen}`;

    const actualizarIdea = (vue) => {
      formData.append("imagen", idea.imagen);
      if (document.getElementById("imagen").files[0] !== undefined) {
        idea.imagen = document.getElementById("imagen").files[0];
        formData.append("imagen", idea.imagen);
      }
      Object.keys(idea).forEach((key) => {
        if (key !== "imagen") {
          formData.append(key, idea[key]);
        }
      });

      ideaService
        .actualizarImagenIdea(formData, idea.id)
        .then((response) => {
          router.push("/creador");
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    return {
      idea,
      imagen,
      actualizarIdea,
    };
  },
};
</script>

<template>
  <section id="RegistrarIdea">
    <div class="container">
      <div class="row top-separation">
        <div class="card shadow-lg">
          <div class="card-block position-relative">
            <div class="row text-center">
              <h2>Editar Idea</h2>
            </div>
            <div class="row">
              <div class="col-md-12 mt-3">
                <form
                  @submit.prevent="actualizarIdea(idea)"
                  enctype="multipart/form-data"
                >
                  <div>
                    <img :src="imagen" />
                    <input
                      type="file"
                      id="imagen"
                      name="imagen"
                      class="form-control shadow"
                      accept="image/*"
                      placeholder="Imagen"
                    />
                  </div>
                  <input
                    v-model="idea.titulo"
                    type="text"
                    class="form-control"
                    placeholder="Titulo"
                  />
                  <input
                    v-model="idea.categoria"
                    type="text"
                    class="form-control"
                    placeholder="Categoria"
                  />
                  <textarea
                    v-model="idea.descripcion"
                    type="text"
                    class="form-control"
                    placeholder="Descripcion"
                  >
                  </textarea>
                  <div class="descripcion-container">
                    <h4 class="precio ml-2 mt-1">Precio</h4>
                  </div>
                  <input
                    v-model="idea.precio"
                    type="text"
                    class="form-control"
                    placeholder="Precio"
                  />
                  <button type="submit" class="btn btn-primary">Guardar</button>
                </form>
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
.card {
  border-radius: 20px;
  border-color: white;
  width: auto;
  border: 2;
  padding-inline: 50px;
  padding-top: 30px;
}
.card-body {
  padding: 0;
  margin: 0;
}
.container {
  height: 70vh;
  display: flex;
  width: fit-content;
  flex-direction: column;
  justify-items: center;
  justify-content: flex-end;
}
@media(min-width:768px) and (max-width:1024px) {
  .container {
  height: 55vh;
}
}
</style>
