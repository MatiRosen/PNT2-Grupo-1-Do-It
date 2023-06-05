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
    },
    eliminar(id){
        return apiClient.delete('/api/usuarios/' + id);
    },
    obtenerCreadores(idCreador) {
        return apiClient.get(`/api/usuarios/${idCreador}`);
    },
    obtenerUsuario(id){
        return apiClient.get(`/api/usuarios/id/${id}`)
    }
}