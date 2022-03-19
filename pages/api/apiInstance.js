import axios from "axios";

const apiInstance = axios.create({
    baseURL: "http://localhost:5000/api",
});

// confire axios instance
apiInstance.interceptors.request.use(
    async function (config) {
        config.baseURL = "http://localhost:5000/api";
        config.headers = {
            Authorization: "Bearer " + localStorage.getItem("token"),
        };
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

//export apiInstance
export default apiInstance;