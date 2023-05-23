import axios from 'axios'


const axiosClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        // configurar el token y pasarle user.token
    }
})

export default {
    getApiClient() {
        return axiosClient;
    }
}