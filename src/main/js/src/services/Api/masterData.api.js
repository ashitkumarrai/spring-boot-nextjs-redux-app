import { apiInstance } from "../ApiHandler";
import { MASTER_DATA } from "@services/EndPoints";
import LocalStorageService from "../LocalStorageHandler";
const localStorage = LocalStorageService.getService();

export const getMasterData = () =>
    apiInstance
        .get(MASTER_DATA, {
            headers: {
                Authorization: `Token ` + localStorage.getAccessToken(),
            },
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                localStorage.clear();
            }
            return error.response;
        });
