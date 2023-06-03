import axios from "./axiosClient.js";

const apiClient = axios.getApiClient();

export default {
    obtenerIdeas(idCreador) {
        return apiClient.get(`/api/ideas/creador/${idCreador}`);
    },
    obtenerTop() {
        return apiClient.get(`/api/ideas/obtenerTop`);
    },
    agregarIdea(idea) {
        return apiClient.post("/api/ideas", idea);
    },
    eliminarIdea(id) {
        return apiClient.delete(`/api/ideas/${id}`);
    },
    obtenerIdeasPorCampo(campo,valor){
        return apiClient.get(`/api/ideas/filtro/${campo}/${valor}`);
    },
    actualizarIdea(idea, id) {
        return apiClient.put(`/api/ideas/idea/` + id, idea);
    }
};
