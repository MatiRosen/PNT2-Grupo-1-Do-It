<template>
  <section id="ideas">
    <div class="container">
      <div class="row top-separation">
        <div class="col-md-12 text-center">
          <h4>Ideas mas vistas</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4" v-for="idea in ideasTop" :key="idea.id">
          <div class="card shadow-lg topIdeas">
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
                  <p>{{ limitarTexto(idea.descripcion, 110) }}</p>           
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row top-separation">
        <div class="col-md-4 my-2">         
            <div class="card shadow-lg w-100 h-50" >
              <div class="card-block position-relative">
                <div class="row">
                  <div class="col-md-8 text-center mt-4">
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
        <div class="col-md-8 lista-col">
          <div class="row mt-2 mb-4 " v-for="idea in ideas" :key="idea.id">
            <div class="card shadow-lg">
              <div class="card-block position-relative">
                <div class="row my-2">
                  <div class="col-md-3">
                    <!-- <img class="img-fluid" :src="idea.imagen" /> -->
                    <img class="img-fluid" src="../../assets/ideas.jpg" />
                  </div>
                  <div class="col-md-7 offset-md-1">
                    <h2 class="titulosgrises">{{ idea.titulo }}</h2>
                    <h3 class="subtituloRojo">{{ idea.categoria }}</h3>
                    <h4 class="descripcion">Descripcion</h4>
                    <p>{{ limitarTexto(idea.descripcion, 250) }}</p> 
                    <RouterLink to="/invertirIdea/${idea.id}" @click="invertirIdea(idea)"><button                    
                      class="btn btn-success"
                    >
                      Invertir
                    </button></RouterLink>
                  
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
import { useIdeasStore } from '../../stores/creador/ideas';

export default {
  computed: {
    limitarTexto() {
      return (value, limite) => {
        if (typeof value !== 'string') {
          value = String(value);
        }
        
        if (value.length <= limite) {
          return value;
        } else {
          return value.slice(0, limite) + ' ...';
        }
      };
    }
  },
  setup() {
    const router = useRouter();
    const ideas = ref([]);
    const ideasTop = ref([]);
    const usuarios = ref([]);
    const { user } = useUserStore();
    const { setIdea } = useIdeasStore();
    const categoriaSeleccionada = ref("");
    const getIdeas = async () => {
      ideas.value = (await ideaService.obtenerIdeas("")).data;
      usuarios.value = (await usuarioService.obtenerCreadores("")).data;
      ideasTop.value = (await ideaService.obtenerTop()).data;
      processIdeas();
    };

    onMounted(getIdeas);

    const invertirIdea = (idea) => {
      // REHACER
      setIdea(idea);
    };

    const filtrarIdeas = async (campo, opcionSeleccionada) => {
      if (categoriaSeleccionada.value === opcionSeleccionada.valores) {
        // Si la opción seleccionada es la misma, deseleccionarla
        categoriaSeleccionada.value = "";
        ideas.value = (await ideaService.obtenerIdeas("")).data; // Obtener todas las ideas nuevamente
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
      ideasTop,
    };
  },
};
</script>

<style>
#filtro {
  width: 26rem;
}
.lista-col{
  padding-left: 24px;
  padding-right: 24px;
}
.topIdeas{  
  height: 300px;
}
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
