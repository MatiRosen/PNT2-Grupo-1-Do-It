import axiosClient from './axiosClient.js';
const apiClient = axiosClient.getApiClient();

export default {
    login(usuario) {
        return apiClient.post('/api/usuarios/login', usuario);
    },
    register(usuario){
        return apiClient.post('/api/usuarios', usuario);
    },
    sumarDinero(usuario, email){
        return apiClient.put('/api/usuarios/' + email, usuario);
    }
}