import axiosClient from './axiosClient.js';
const apiClient = axiosClient.getApiClient();

export default {
    login(usuario) {
        return apiClient.post('/api/login', usuario);
    },
    register(usuario){
        return apiClient.post('/api/usuarios', usuario);
    }
}