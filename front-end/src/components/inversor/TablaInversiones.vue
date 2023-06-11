<template>
  <div class="container">
    <div class="row top-separation">
      <div class="col-md-12 text-center">
        <h2>Ideas mas vistas</h2>
      </div>
    </div>
    <div> 
      <form @submit.prevent="buscar(busqueda)" name="form">
        <input v-model="busqueda" type="text" name="query" placeholder="Ingresa tu búsqueda">
        <input type="submit" value="Buscar">
  </form>
</div>
    <div class="row">
      <div class="col-md-4" v-for="idea in ideasTop" :key="idea.id">
        <div class="card shadow-lg topIdeas">
          <div class="card-block position-relative">
            <div class="row p-4">            
              <div class="col-md-11">
                <img class="img-fluid" :src="getImageUrl(idea.imagen)" />   
                <h2 class="titulosgrises">{{ idea.titulo }}</h2>
                <h3 class="subtituloRojo">{{ idea.categoria }}</h3>
                <h4 class="descripcion">Descripcion</h4>
                <p>{{ limitarTexto(idea.descripcion, 200) }}</p>
              </div>
            </div>
            <div class="row justify-content-right mb-2">
              <div class="col-md-2 offset-md-8">
                <button class="btn btn-success" @click="invertirIdea(idea)">
                  Invertir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="card shadow-lg filtro w-100">
          <div class="card-block position-relative">
            <div class="row ">
              <div class="col-md-12 text-center mt-4">
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
        <div class="row" v-for="idea in ideas" :key="idea.id">
          <div class="card shadow-lg">
            <div class="card-block position-relative">
              <div class="row px-4 pt-4">
                <div class="col-md-5">                 
                  <img class="img-fluid justify-content-center" :src="getImageUrl(idea.imagen)" />  
                </div>
                <div class="col-md-7">
                  <h2 class="titulosgrises">{{ idea.titulo }}</h2>
                  <h3 class="subtituloRojo">{{ idea.categoria }}</h3>
                  <h4 class="descripcion">Descripcion</h4>
                  <p>
                    {{ limitarTexto(idea.descripcion, 250) }}
                  </p>
                </div>
              </div>
              <div class="row justify-content-right mb-2">
                <div class="col-md-2 offset-md-8">
                  <button class="btn btn-success" @click="invertirIdea(idea)">
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
</template>

<script>
import { ref, onMounted } from "vue";
import ideaService from "../../services/ideaService";
import usuarioService from "../../services/userService";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/user";
import { useIdeasStore } from "../../stores/creador/ideas";
import inversionService from "../../services/inversionService";
import { useInversionesStore } from "../../stores/inversor/inversiones";
const imagen = `http://localhost:8080/images/`;
export default {
  computed: {
    limitarTexto() {
      return (value, limite) => {
        if (typeof value !== "string") {
          value = String(value);
          console.log(value, limite);
        }

        if (value.length <= limite) {
          return value;
        } else {
          return value.slice(0, limite) + " ...";
        }
      };
    },
  },
  methods:{
    getImageUrl(imageName) {
      return `http://localhost:8080/images/${imageName}`;
    }
  },
  setup() {
    const router = useRouter();
    const ideas = ref([]);
    const ideasTop = ref([]);
    const usuarios = ref([]);
    const { user } = useUserStore();
    const { setIdea } = useIdeasStore();
    const { setInversion } = useInversionesStore();
    const categoriaSeleccionada = ref("");
    const getIdeas = async () => {
      ideas.value = (await ideaService.obtenerIdeas("")).data;
      usuarios.value = (await usuarioService.obtenerCreadores("")).data;
      ideasTop.value = (await ideaService.obtenerTop()).data;
      processIdeas();
    };

    const busqueda = ref("");

    const buscar = async (busqueda) => {
      ideas.value = (await ideaService.obtenerIdeasPorCampo("titulo",busqueda)).data;
    };

    onMounted(getIdeas);

    const invertirIdea = async (idea) => {
      let inversion = (
        await inversionService.obtenerInversion(idea.id, user.id)
      ).data;
      if (inversion) {
        setInversion(inversion);
      } else {
        idea.vecesVisto = Number(idea.vecesVisto) + 1;
        await ideaService.actualizarIdea(idea.id, idea);
      }

      setIdea(idea);
      router.push(`/invertirIdea/${idea.id}`);
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
        if (!campos.value[0].opciones.some((e) => e.valores === val.valores)) {
          campos.value[0].opciones.push(val);
        }
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
      busqueda,
      buscar,
      ideasTop,
      imagen,
    };
  },
};
</script>

<style scoped>
#filtro {
  width: 26rem;
}
.lista-col {
  padding-left: 24px;
  padding-right: 24px;
}
.topIdeas {
  height: fit-content;  
}
img { 
  max-width: 380px;
  max-height: 220px;

}
.filtro-seleccionado {
  font-weight: bold;
  font-style: italic;
}

input[type="text"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
}
input[type="submit"] {
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
input[type="submit"]:hover {
  background-color: #45a049;
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
.filtro {
  display: flex;
  justify-items: center;
  margin-top: 40px;
  border: 0;
  border-radius: 20px;
  align-items:normal;
  min-height: 310px;
  justify-content: flex-start;
}
</style>
