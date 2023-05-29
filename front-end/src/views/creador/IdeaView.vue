<script>
import { useIdeasStore } from '../../stores/creador/ideas';

export default {
  setup() {
    const { idea } = useIdeasStore();
    let { tieneInversores } = useIdeasStore();

    return {
      idea,
      tieneInversores
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
    <button v-if="!tieneInversores" class="btn btn-secondary">Editar</button>
    <button class="btn btn-warning">Eliminar</button>
</template>