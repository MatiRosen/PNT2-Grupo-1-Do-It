import axios from "./axiosClient.js";

const apiClient = axios.getApiClient();

export default {
    obtenerIdeas(idCreador) {
        return apiClient.get(`/api/ideas/${idCreador}`);
    },
    agregarIdea(idea) {
        return apiClient.post("/api/ideas", idea);
    },
    eliminarIdea(id) {
        return apiClient.delete(`/api/ideas/${id}`);
    },
    obtenerPorCampo(campo,valor){
        return apiClient.obtenerPorCampoValor(`/api/ideas/${campo}/${valor}`);
    },
    actualizarIdea(idea, id) {
        return apiClient.put(`/api/ideas/idea/` + id, idea);
    }
};
