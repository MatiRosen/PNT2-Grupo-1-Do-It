<template>
  <section id="ideas">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h2>Ideas</h2>
        </div>
      </div>
      <div class="row top-separation">
        <div class="col-md-4" v-for="idea in ideas" :key="idea.id">
          <div class="card shadow-lg">
            <div class="card-block position-relative">
              <div class="row">
                <div class="col-md-3">
                  <!-- <img class="img-fluid" :src="idea.imagen" /> -->
                  <img class="img-fluid" src="../../assets/ideas.jpg" />
                </div>
                <div class="col-md-7 offset-md-1">
                  <h2 class="titulosgrises">{{ idea.titulo }}</h2>
                  <h3 class="subtituloRojo">{{ idea.categoria }}</h3>
                  <h4 class="descripcion">Descripcion</h4>
                  <p>{{ idea.descripcion }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row top-separation">
        <div class="col-md-4">
          <div class="row m-2">
            <div class="card shadow-lg">
              <div class="card-block position-relative">
                <div class="row">
                  <div class="col-md-12">
                    <h2>Filtros</h2>
                    <ul class="menu">
                      <li
                        class="has-submenu"
                        v-for="campo in campos"
                        :key="campo.campo"
                        @click="toggleSubmenu(campo)"
                      >
                        {{ campo.campo }}
                        <ul class="submenu" v-show="campo.showSubmenu">
                          <li
                            v-for="valor in campo.opciones"
                            :key="valor.id"
                            @click="filtrarIdeas(campo, valor)"
                          >
                            <span
                              v-if="categoriaSeleccionada === valor.valores"
                              class="filtro-seleccionado"
                              >{{ valor.valores }}
                              <span
                                class="quitar-filtro"
                                @click="filtrarIdeas(campo, valor)"
                                >x</span
                              ></span
                            >
                            <span v-else>{{ valor.valores }}</span>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="row my-2" v-for="idea in ideas" :key="idea.id">
            <div class="card shadow-lg">
              <div class="card-block position-relative">
                <div class="row">
                  <div class="col-md-3">
                    <!-- <img class="img-fluid" :src="idea.imagen" /> -->
                    <img class="img-fluid" src="../../assets/ideas.jpg" />
                  </div>
                  <div class="col-md-7 offset-md-1">
                    <h2 class="titulosgrises">{{ idea.titulo }}</h2>
                    <h3 class="subtituloRojo">{{ idea.categoria }}</h3>
                    <h4 class="descripcion">Descripcion</h4>
                    <p>{{ idea.descripcion }}</p>
                    <button
                      @click="invertirIdea(idea.id)"
                      class="btn btn-success"
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
    </div>
  </section>
</template>
<script>
import { ref, onMounted } from "vue";
import ideaService from "../../services/ideaService";
import usuarioService from "../../services/userService";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/user";

export default {
  setup() {
    const router = useRouter();
    const ideas = ref([]);
    const usuarios = ref([]);
    const { user } = useUserStore();
    const categoriaSeleccionada = ref("");
    const getIdeas = async () => {
      ideas.value = (await ideaService.obtenerIdeasPorCampo("", "")).data;
      usuarios.value = (await usuarioService.obtenerCreadores("")).data;
      processIdeas();
    };

    onMounted(getIdeas);

    const invertirIdea = (id) => {
      router.push({ name: "invertirIdea", params: { id } });
    };

    const filtrarIdeas = async (campo, opcionSeleccionada) => {
      if (categoriaSeleccionada.value === opcionSeleccionada.valores) {
        // Si la opción seleccionada es la misma, deseleccionarla
        categoriaSeleccionada.value = "";
        ideas.value = (await ideaService.obtenerIdeasPorCampo("", "")).data; // Obtener todas las ideas nuevamente
      } else {
        categoriaSeleccionada.value = opcionSeleccionada.valores;
        
        if (campo.categoria === "autor") {          
          ideas.value = (
            await ideaService.obtenerIdeasPorCampo(
              "idCreador",
              opcionSeleccionada.id.toString()
            )
          ).data;          
        } else {         
          ideas.value = (
            await ideaService.obtenerIdeasPorCampo(
              campo.categoria,
              opcionSeleccionada.valores
            )
          ).data;
        }
      }
    };

    const campos = ref([
      {
        campo: "Categorías",
        categoria: "categoria",
        showSubmenu: false,
        opciones: [],
      },
      {
        campo: "Autor",
        categoria: "autor",
        showSubmenu: false,
        opciones: [],
      },
      // ...otros campos
    ]);

    const toggleSubmenu = (campo) => {
      campo.showSubmenu = !campo.showSubmenu;
    };
    const processIdeas = () => {
      ideas.value.forEach((item) => {
        const val = {
          valores: item.categoria,
          id: item.id.toString(),
        };
        campos.value[0].opciones.push(val);
      });

      usuarios.value.forEach((usuario) => {
        const val = {
          valores: usuario.nombre + " " + usuario.apellido,
          id: usuario.id.toString(),
        };
        campos.value[1].opciones.push(val);
      });

      // Actualiza los valores de otros campos
    };
    return {
      ideas,
      usuarios,
      campos,
      categoriaSeleccionada,
      filtrarIdeas,
      toggleSubmenu,
      processIdeas,
      invertirIdea,
    };
  },
};
</script>

<style>
.filtro-seleccionado {
  font-weight: bold;
  font-style: italic;
}

.quitar-filtro {
  cursor: pointer;
}
.menu {
  list-style: none;
  padding: 0;
}

.has-submenu {
  cursor: pointer;
}

.submenu {
  display: none;
  list-style: none;
  padding: 0;
}

.submenu li {
  margin-left: 10px;
}

.has-submenu ul.submenu {
  display: block;
}
.titulosgrises {
  font-weight: bold;
  color: #6a6a6a;
  font-size: 20px;
  margin-top: 20px;
}
.subtitulovioleta {
  font-weight: bold;
  color: #370a6d;
  font-size: 17px;
}
.subtituloRojo {
  font-weight: bold;
  color: #e20000;
  font-size: 17px;
}
.descripcion {
  font-weight: normal;
  color: #6a6a6a;
  font-size: 15px;
}
.top-separation {
  margin-top: 30px;
}
.p {
  font-size: 12px;
}
.card {
  border-radius: 20px;
  border-color: white;
  width: fit-content;
  border: 0;
}

.card-body {
  padding: 0;
  margin: 0;
}

.card-text {
  padding: 10px;
  margin: 5px 5px;
}

.card-title {
  padding: 0;
  margin: 0;
}

.color-gradiente {
  color: white;
  padding: 15px;
  background: rgba(107, 35, 35, 1);
  background: -moz-linear-gradient(
    left,
    rgba(107, 35, 35, 1) 0%,
    rgba(231, 55, 39, 1) 69%,
    rgba(231, 55, 39, 1) 100%
  );
  background: -webkit-gradient(
    left top,
    right top,
    color-stop(0%, rgba(107, 35, 35, 1)),
    color-stop(69%, rgba(231, 55, 39, 1)),
    color-stop(100%, rgba(231, 55, 39, 1))
  );
  background: -webkit-linear-gradient(
    left,
    rgba(107, 35, 35, 1) 0%,
    rgba(231, 55, 39, 1) 69%,
    rgba(231, 55, 39, 1) 100%
  );
  background: -o-linear-gradient(
    left,
    rgba(107, 35, 35, 1) 0%,
    rgba(231, 55, 39, 1) 69%,
    rgba(231, 55, 39, 1) 100%
  );
  background: -ms-linear-gradient(
    left,
    rgba(107, 35, 35, 1) 0%,
    rgba(231, 55, 39, 1) 69%,
    rgba(231, 55, 39, 1) 100%
  );
  background: linear-gradient(
    to right,
    rgba(107, 35, 35, 1) 0%,
    rgba(231, 55, 39, 1) 69%,
    rgba(231, 55, 39, 1) 100%
  );
  filter: progid: DXImageTransform.Microsoft.gradient( startColorstr='#6b2323', endColorstr='#e73727', GradientType=1);
}
</style>
