<script>
import { useIdeasStore } from '../../stores/creador/ideas';

export default {
  setup() {
    const { idea } = useIdeasStore();

    return {
      idea
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
    <button class="btn btn-primary">Guardar</button>
</template>