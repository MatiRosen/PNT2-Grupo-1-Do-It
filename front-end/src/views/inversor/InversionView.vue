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

<style scoped>
.titulosgrises {
    font-weight: bold;
    color: #6a6a6a;
    font-size: 20px;
    margin-bottom: 10px;
}
.subtituloRojo {
    margin-top: 5px;
    font-weight: bold;
    color: #e20000;
    font-size: 17px;
}
.card {
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    border-color: white;
    border: 0;
    border-radius: 20px;
}
.texto {
    font-weight: normal;
    color: #6a6a6a;
    font-size: 15px;
    width: 600px;
    text-align: center;
}
.descripcion {
    font-weight: normal;
    color: #6a6a6a;
    font-size: 15px;
}
.precio {
    font-weight: bold;
    color: #16bd3a;
    font-size: 15px;
}
img {
    width: 100%;
    height: 100%;
    max-width: 400px;
    max-height: 400px;
    object-fit: contain;
    margin-top: 5px;
}
button {
    margin: 10px;
}
</style>
