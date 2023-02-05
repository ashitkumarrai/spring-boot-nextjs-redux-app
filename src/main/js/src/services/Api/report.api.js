import { apiInstance } from "../ApiHandler";
import { GET_MENTOR_REPORT, GET_BATCH_REPORT } from "@services/EndPoints";
import LocalStorageService from "../LocalStorageHandler";
const localStorage = LocalStorageService.getService();

export const postMentorReport = (data) =>
    apiInstance
        .post(GET_MENTOR_REPORT, data, {
            headers: {
                Authorization: `Token ` + localStorage.getAccessToken(),
            },
            params: param,
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response;
        });

export const postBatchReport = (data) =>
    apiInstance
        .post(GET_BATCH_REPORT, data, {
            headers: {
                Authorization: `Token ` + localStorage.getAccessToken(),
            },
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response;
        });
