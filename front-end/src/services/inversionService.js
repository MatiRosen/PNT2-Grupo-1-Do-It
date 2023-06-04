import axios from "./axiosClient.js";

const apiClient = axios.getApiClient();

export default {
  obtenerInversiones(){
    return apiClient.get("/api/inversiones");
  },
  obtenerInversion(idIdea, idInversor){
    return apiClient.get(`/api/inversiones/${idIdea}/${idInversor}`);
  },
  obtenerInversionesPorCampo(campo, id){
    return apiClient.get(`/api/inversiones/filtro/${campo}/${id}`);
  },
  agregarInversion(inversion){
    return apiClient.post("/api/inversiones", inversion);
  },
  borrarInversion(idIdea, idInversor){
    return apiClient.delete(`/api/inversiones/${idIdea}/${idInversor}`);
  },
  modificarInversion(idIdea, idInversor, inversion){
    return apiClient.put(`/api/inversiones/${idIdea}/${idInversor}`, inversion);
  }   
};