import { apiInstance } from "../ApiHandler";
import {
    GET_COURSE_FLOW,
    SAVE_POOL,
    FINAL_SAVE_POOL,
    GET_POOL_LIST,
    GET_BATCH_LIST_FOR_POOL,
    GET_POOL_INFO,
    GET_POOL_MENTOR_AVAILABLE,
    GET_POOL_CLASSROOM_AVAILABLE,
    GET_MENTOR_BY_POOL,
    GET_CLASSROOM_BY_POOL,
    DISCARD_POOL,
    DELETE_POOL,
    EDIT_POOL,
} from "@services/EndPoints";
import LocalStorageService from "../LocalStorageHandler";
const localStorage = LocalStorageService.getService();

export const getCourseFlow = (data) =>
    apiInstance
        .post(GET_COURSE_FLOW, data, {
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

export const getMentorAvailability = (data) =>
    apiInstance
        .post(GET_POOL_MENTOR_AVAILABLE, data, {
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
export const getClassroomAvailability = (data) =>
    apiInstance
        .post(GET_POOL_CLASSROOM_AVAILABLE, data, {
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

export const postPoolDraft = (data) =>
    apiInstance
        .post(SAVE_POOL, data, {
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
export const postPoolFinal = (data) =>
    apiInstance
        .post(FINAL_SAVE_POOL, data, {
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

export const getPools = (param) =>
    apiInstance
        .get(GET_POOL_LIST, {
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

export const getBatchList = () =>
    apiInstance
        .get(GET_BATCH_LIST_FOR_POOL, {
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

export const getPoolDetails = (batch_pool_id) =>
    apiInstance
        .get(GET_POOL_INFO + "/" + batch_pool_id, {
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

export const getMentorByPool = (data) =>
    apiInstance
        .post(GET_MENTOR_BY_POOL, data, {
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

export const getClassroomByPool = (data) =>
    apiInstance
        .post(GET_CLASSROOM_BY_POOL, data, {
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
export const postDiscardPool = (batch_id) =>
    apiInstance
        .post(
            DISCARD_POOL,
            {
                batch_id: batch_id,
            },
            {
                headers: {
                    Authorization: `Token ` + localStorage.getAccessToken(),
                },
            }
        )
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response;
        });

export const postDeletePool = (batch_id) =>
    apiInstance
        .post(
            DELETE_POOL,
            {
                batch_id: batch_id,
            },
            {
                headers: {
                    Authorization: `Token ` + localStorage.getAccessToken(),
                },
            }
        )
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response;
        });
export const postEditPool = (data) =>
    apiInstance
        .post(EDIT_POOL, data, {
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
