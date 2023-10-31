import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000'
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = 'Bearer ' + localStorage['token']
    return config
})

export default api;