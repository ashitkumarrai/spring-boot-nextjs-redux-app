import { apiInstance } from "../ApiHandler";
import {
    GET_MENTOR_LIST,
    CREATE_MENTOR,
    UPDATE_MENTOR,
    GET_MENTOR_DETAILS,
} from "@services/EndPoints";
import LocalStorageService from "../LocalStorageHandler";
const localStorage = LocalStorageService.getService();

export const getMentorList = (param) =>
    apiInstance
        .get(GET_MENTOR_LIST, {
            headers: {
                Authorization: `Token ` + localStorage.getAccessToken(),
            },
            params: { ...param },
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response;
        });

export const postCreateMentor = (data) =>
    apiInstance
        .post(CREATE_MENTOR, data, {
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

export const postUpdateMentor = (data) =>
    apiInstance
        .post(UPDATE_MENTOR, data, {
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

export const getMentorDetails = (id) =>
    apiInstance
        .get(GET_MENTOR_DETAILS + id, {
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
