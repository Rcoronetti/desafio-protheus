import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://brapi.dev',   

})

export default instance