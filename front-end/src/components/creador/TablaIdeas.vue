<script setup>
import { storeToRefs } from "pinia"
import { useIdeasStore } from "../../stores/creador/ideas.js"
const store = useIdeasStore()
const { ideas } = storeToRefs(store)
</script>

<template>    
    <table class="table table-striped">
        <tbody>
            <tr v-for="idea in ideas">
                <td>{{ idea.titulo }}</td>
                <td>{{ idea.descripcion }}</td>
                <td>{{ idea.imagen }}</td>
                <td>{{ idea.categoria }}</td>
            </tr>
        </tbody>
    </table>
</template>