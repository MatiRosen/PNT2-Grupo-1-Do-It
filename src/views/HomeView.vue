<template>
    <h1>{{ obtenerSucesionDeFibonacci(10) }}</h1>
</template>

<script setup>
const obtenerSucesionDeFibonacci = (n) => {
    let sucesion = [0, 1];
    for (let i = 2; i < n; i++) {
        sucesion[i] = sucesion[i - 2] + sucesion[i - 1];
    }
    return sucesion;
    
};
</script>
