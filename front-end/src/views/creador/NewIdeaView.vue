<script>
import ideaService from "../../services/ideaService";
import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/user";

export default {
  setup() {
    const formData = new FormData();
    const storeUser = useUserStore();
    const { user } = storeToRefs(storeUser);
    return {
      user,
      ideaService,
      formData,
    };
  },
  data() {
    return {
      idea: {
        id: 0,
        titulo: "",
        descripcion: "",
        imagen: "",
        categoria: "",
        precio: "",
        idCreador: "",
        vecesVisto: 0,
        cantidadInversiones: 0,
      },
      vue: this,
    };
  },
  methods: {
    agregarIdea(vue, idea) {
      idea.idCreador = this.user.id;
      idea.imagen = document.getElementById("imagen").files[0];
      this.formData.append("imagen", idea.imagen);
      Object.keys(idea).forEach((key) => {
        if (key !== "imagen") {
          this.formData.append(key, idea[key]);
        }
      });
      ideaService
        .agregarIdea(this.formData)
        .then(function (response) {
          vue.$router.push("/creador");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<template>
  <section id="RegistrarIdea">
    <div class="container">
      <div class="row">
        <div class="card shadow-lg">
          <div class="card-block position-relative">
            <div class="row text-center">
              <h2>Nueva Idea</h2>
            </div>
            <div class="row">
              <div class="col-md-12 mt-3">
                <form
                  @submit.prevent="agregarIdea(vue, idea)"
                  enctype="multipart/form-data"
                >
                  <div class="mb-md-3 mt-3 form-group">
                    <input
                      v-model="idea.titulo"
                      type="text"
                      id="txtTitulo"
                      name="txtTitulo"
                      class="form-control shadow"
                      placeholder="Título"
                      required
                    />
                  </div>
                  <div class="mb-md-3 form-group">
                    <input
                      v-model="idea.descripcion"
                      type="text"
                      id="txtDescripcion"
                      name="txtDescripcion"
                      class="form-control shadow"
                      placeholder="Descripción"
                      required
                    />
                  </div>
                  <div class="mb-md-3 form-group">
                    <input
                      type="file"
                      id="imagen"
                      name="imagen"
                      class="form-control shadow"
                      accept="image/*"
                      placeholder="Imagen"
                      required
                    />
                  </div>
                  <div class="mb-md-3 form-group">
                    <input
                      v-model="idea.categoria"
                      type="text"
                      id="txtCategoria"
                      name="txtCategoria"
                      class="form-control shadow"
                      placeholder="Categoría"
                      required
                    />
                  </div>
                  <div class="mb-md-3 form-group">
                    <input
                      v-model="idea.precio"
                      type="number"
                      id="txtPrecio"
                      name="txtPrecio"
                      class="form-control shadow"
                      placeholder="Precio"
                      required
                    />
                  </div>
                  <div class="mb-md-3 form-group text-right">
                    <button class="btn btn-primary">Guardar</button>
                  </div>
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
h2 {
  color: #e20000;
}
.btn {
  background-color: #e20000;
  border-color: #e20000;
}
.form-check-input:checked {
  background-color: #e20000;
  border-color: #e20000;
}
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
  height: 60vh;
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
