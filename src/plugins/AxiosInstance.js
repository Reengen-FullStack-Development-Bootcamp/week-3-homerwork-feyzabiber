import axios from "axios"

//create new axios instance..
const axiosInstance = axios.create();

//getting values from .env..
const {
    VUE_APP_API_URL: API_URL,
    VUE_APP_API_KEY: API_KEY
} = process.env

//set default values of axios instance to use API calls

axiosInstance.defaults.baseURL = API_URL;
axiosInstance.defaults.params = {}
axiosInstance.defaults.params['apikey'] = API_KEY

export default axiosInstance;
