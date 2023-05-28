<script>    
import ideaService from "../../services/ideaService";

export default {
    setup() {
        return {
            ideaService,
        };
    },
    data() {        
        return {
            idea: {
                titulo: "",
                descripcion: "",
                imagen: "",
                categoria: "",
                precio: "",
                creador: "valdo@gmail.com"
            },
            vue: this,
        };
    },
    methods: {
        agregarIdea(vue, idea) {
            ideaService
                .agregarIdea(idea)
                .then(function (response) {
                    vue.agregarIdea(
                        response.data.titulo,
                        response.data.descripcion,
                        response.data.imagen,
                        response.data.categoria,
                        response.data.precio,
                        response.data.creador
                    );
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
    <section id="Registrar">
        <div class="container"> 
            <div class="row">
                <div class="card-block position-relative">
                    <div class="row text-center">
                        <h2>Nueva Idea</h2>
                    </div>
                    <div class="row">
                        <div class="col-md-12 mt-3">
                            <form @submit.prevent="agregarIdea(vue, idea)">
                                <div class="mb-md-3 mt-3 form-group">
                                    <input
                                        v-model="idea.titulo"
                                        type="text"
                                        id="txtTitulo"
                                        name="txtTitulo"
                                        class="form-control shadow"
                                        placeholder="Título"
                                        required
                                    >
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
                                    >
                                </div>
                                <div class="mb-md-3 form-group">
                                    <input
                                        v-model="idea.imagen"
                                        type="text"
                                        id="txtImagen"
                                        name="txtImagen"
                                        class="form-control shadow"
                                        placeholder="Imagen"
                                        required
                                    >
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
                                    >
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
                                    >
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
    </section>
</template>

<style scoped>
h2 {
    color: #E20000;
}
.btn{
    background-color:#E20000;
    border-color:#E20000;
}
.form-check-input:checked {
    background-color:#E20000;
    border-color: #E20000;
}
#Registrar {
  background: url("../assets/fondo-contacto.png");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
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
  height: 85vh;
  display: flex;
  width: fit-content;
  flex-direction: column;
  justify-items: center;
  justify-content: flex-end;
}
.tooltip {
      position: relative;
      display: inline-block;
    }
    
    .tooltip .tooltiptext {
      visibility: hidden;
      width: 120px;
      background-color: #000;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px;
      position: absolute;
      z-index: 1;
      bottom: 125%;
      left: 50%;
      margin-left: -60px;
      opacity: 0;
      transition: opacity 0.3s;
    }
    
    .tooltip:hover .tooltiptext {
      visibility: visible;
      opacity: 1;
    }
</style>
