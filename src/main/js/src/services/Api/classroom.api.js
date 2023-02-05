import { apiInstance } from "../ApiHandler";
import {
    GET_CLASSROOM_LIST,
    CREATE_CLASSROOM,
    UPDATE_CLASSROOM,
    GET_CLASSROOM_DETAILS,
} from "@services/EndPoints";
import LocalStorageService from "../LocalStorageHandler";
const localStorage = LocalStorageService.getService();

export const getClassroomList = (params) =>
    apiInstance
        .get(GET_CLASSROOM_LIST, {
            headers: {
                Authorization: `Token ` + localStorage.getAccessToken(),
            },
            params: params,
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response;
        });

export const postCreateClassroom = (data) =>
    apiInstance
        .post(CREATE_CLASSROOM, data, {
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

export const postUpdateClassroom = (data) =>
    apiInstance
        .post(UPDATE_CLASSROOM, data, {
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

export const getClassroomDetails = (id) =>
    apiInstance
        .get(GET_CLASSROOM_DETAILS + id, {
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
