import axios from "./axiosClient.js";

const apiClient = axios.getApiClient();

export default {
    obtenerIdeas(idCreador) {
        return apiClient.get(`/api/ideas/creador/${idCreador}`);
    },
    obtenerTop() {
        return apiClient.get(`/api/ideas/obtenerTop`);
    },
    agregarIdea(formData) {
        return apiClient.post("/api/ideas", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    eliminarIdea(id) {
        return apiClient.delete(`/api/ideas/${id}`);
    },
    obtenerIdeasPorCampo(campo, valor) {
        return apiClient.get(`/api/ideas/filtro/${campo}/${valor}`);
    },
    actualizarIdea(id, idea) {
        return apiClient.put(`/api/ideas/idea/${id}`, idea);
    },
    actualizarImagenIdea(formData, id) {
        return apiClient.put(`/api/ideas/idea/imagen/` + id, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};
