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
};
