import axios from "axios";

    const url = process.env.NEXT_PUBLIC_BASE_URL;

const apiInstance = axios.create({
    baseURL: url,
});

// confire axios instance
apiInstance.interceptors.request.use(
    async function (config) {
        config.baseURL = url;
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