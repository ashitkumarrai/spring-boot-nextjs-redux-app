import { apiInstance } from "../ApiHandler";
import {
    GET_BATCH_LIST,
    GET_COURSE_FLOW,
    SAVE_BATCH,
    FINAL_SAVE_BATCH,
    GET_MENTOR_AVAILABLE,
    GET_CLASSROOM_AVAILABLE,
    CREATE_BATCH,
    GET_BATCH_COURSE_FLOW,
    DELETE_BATCH,
    DISCARD_BATCH,
    SHARE_BATCH,
    GET_MENTOR_BY_BATCH,
    GET_CLASSROOM_BY_BATCH,
    POST_ADD_TO_POOL,
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
        .post(GET_MENTOR_AVAILABLE, data, {
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
        .post(GET_CLASSROOM_AVAILABLE, data, {
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

export const postBatchDraft = (data) =>
    apiInstance
        .post(SAVE_BATCH, data, {
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
export const postBatchFinal = (data) =>
    apiInstance
        .post(FINAL_SAVE_BATCH, data, {
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

export const getBatches = (param) =>
    apiInstance
        .get(GET_BATCH_LIST, {
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

export const getBatchDetails = (batch_id) =>
    apiInstance
        .get(CREATE_BATCH + "/" + batch_id, {
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

export const postDeleteBatch = (data) =>
    apiInstance
        .post(DELETE_BATCH, data, {
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

export const postDiscardBatch = (batch_id) =>
    apiInstance
        .post(
            DISCARD_BATCH,
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

export const getCourseFlowWBatchID = (params) =>
    apiInstance
        .get(GET_BATCH_COURSE_FLOW, {
            headers: {
                Authorization: `Token ` + localStorage.getAccessToken(),
            },
            params: {
                ...params,
            },
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response;
        });

export const postShareBatch = (data) =>
    apiInstance
        .post(SHARE_BATCH, data, {
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

export const getMentorByBatch = (data) =>
    apiInstance
        .post(GET_MENTOR_BY_BATCH, data, {
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

export const getClassroomByBatch = (data) =>
    apiInstance
        .post(GET_CLASSROOM_BY_BATCH, data, {
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

export const postAddToPool = (data) =>
    apiInstance
        .post(POST_ADD_TO_POOL, data, {
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
