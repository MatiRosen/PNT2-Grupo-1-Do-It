import axiosClient from './axiosClient.js';
const apiClient = axiosClient.getApiClient();

export default {
    login(usuario) {
        return apiClient.post('/api/usuarios/login', usuario);
    },
    register(usuario){
        return apiClient.post('/api/usuarios', usuario);
    },
    sumarDinero(usuario, id){
        return apiClient.put('/api/usuarios/dinero/' + id, usuario);
    }
}