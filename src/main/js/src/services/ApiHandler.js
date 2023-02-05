import axios from "axios";
import LocalStorageService from "../services/LocalStorageHandler";
const localStorage = LocalStorageService.getService();
//Constants
const API_URL = process.env.base_url;
const CancelTokenn = axios.CancelToken;

//Instance
export const apiInstance = axios.create({
    baseURL: API_URL,
});
/*=========== Interceptor ================ */

apiInstance.interceptors.request.use(
    (request) => {
        const localStorage = LocalStorageService.getService();
        if (
            request.url.includes("batch") ||
            request.url.includes("mentor") ||
            request.url.includes("classroom") ||
            request.url.includes("report")
        ) {
            request.headers["Authorization"] =
                "Token " + localStorage.getAccessToken();
        }

        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    //redirecting to login page on following error codes
    function (error) {
        if (error.response.status === 401 || error.response.status === 403) {
            window.location.href = "/login";
        }
        console.log(error);

        return Promise.reject(error);
    }
);

/* _____Common APIs_____ */
export const postUploadImage = (data) =>
    axios
        .post(API_URL + `/master/save_image`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Token ` + localStorage.getAccessToken(),
            },
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response;
        });
