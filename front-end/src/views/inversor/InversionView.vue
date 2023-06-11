<template>
    <div class="container">
        <div class="card shadow-lg">
            <div>
                <img :src="imagen" />
            </div>
            <h2 class="titulosgrises">{{ inversion.titulo }}</h2>
            <h3 class="subtituloRojo">{{ inversion.categoria }}</h3>
            <p class="texto">{{ inversion.descripcion }}</p>
            <p class="texto">Idea de {{ creador }}</p>
            <p class="precio">Dinero invertido: ${{ inversion.dineroInvertido }}</p>
            <div>
                <button class="btn btn-secondary">
                    <RouterLink to="">Chat</RouterLink>
                </button>
                <button class="btn btn-secondary">
                    <RouterLink to="/inversor/inversiones">Volver</RouterLink>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useInversionesStore } from "../../stores/inversor/inversiones"
import usuarioService from "../../services/userService";
import { ref, onMounted } from "vue";

const { inversion } = useInversionesStore();
const imagen = `../src/assets/${inversion.imagen}`;
const creador = ref();

const getCreador = async () => {
  creador.value = (await usuarioService.obtenerCreadores(inversion.idCreador)).data.nombre;
}

onMounted(getCreador);
</script>

<style>

</style>
