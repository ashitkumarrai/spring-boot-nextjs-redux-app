import { apiInstance } from "../ApiHandler";
import { LOGIN } from "@services/EndPoints";
export const postLogin = (data) =>
    apiInstance
        .post(LOGIN, data)
        .then(function (response) {
            console.log(response);
            return response;
        })
        .catch(function (error) {
            return error.response;
        });
