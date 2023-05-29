<script>
import { useIdeasStore } from '../../stores/creador/ideas';
import { useRouter } from 'vue-router';
import ideaService from '../../services/ideaService';

export default {
  setup() {
    const router = useRouter();
    const { idea } = useIdeasStore();
    let { tieneInversores } = useIdeasStore();

    const editarIdea = () => {
      router.push({ name: 'editarIdea' });
    };

    const eliminarIdea = () => {
      ideaService.eliminarIdea(idea.id)
        .then(() => {
          router.push({ name: 'creador' });
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
      eliminarIdea
    };
  }
}
</script>

<template>
    <h1>{{ this.idea.titulo }}</h1>
    <div>
        {{ this.idea.imagen }}
    </div>
    <div>        
        Descripcion: {{ this.idea.descripcion }}           
    </div>    
    <div>
        Categoria: {{ this.idea.categoria }}
    </div>
    <div>
        Precio: ${{ this.idea.precio }}
    </div>
    <button v-if="!tieneInversores" @click="editarIdea" class="btn btn-secondary">Editar</button>
    <button v-if="!tieneInversores" @click="eliminarIdea" class="btn btn-warning">Eliminar</button>
</template>