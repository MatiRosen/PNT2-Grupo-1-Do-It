import axios from "./axiosClient.js"

const apiClient = axios.getApiClient()

export default {
    obtenerIdeas(email) {
        return apiClient.get("/api/ideas/" + email)
    }
}