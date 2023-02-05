import { apiInstance } from "../ApiHandler";
import {
    GET_SCHEDULER_DETAILS,
    GET_SCHEDULER_ADD_CLASS,
    GET_SCHEDULER_CANCEL_CLASS,
    GET_SCHEDULER_SWAP_CLASS,
    GET_SCHEDULER_EDIT_CLASS,
    GET_SCHEDULER_GET_REASONS,
    GET_CONFLICT_LIST,
    MARK_LEAVE,
    MARK_ATTENDANCE,
    GET_WARNING_LIST,
} from "@services/EndPoints";
import LocalStorageService from "../LocalStorageHandler";
const localStorage = LocalStorageService.getService();

export const getSchedule = (data) =>
    apiInstance
        .post(GET_SCHEDULER_DETAILS, data, {
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

/* ADD CLASS */
export const postAddClass = (data) =>
    apiInstance
        .post(GET_SCHEDULER_ADD_CLASS, data, {
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

/* CANCEL CLASS */
export const postCancelClass = (data) =>
    apiInstance
        .post(GET_SCHEDULER_CANCEL_CLASS, data, {
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

/* SWAP CLASS */
export const postSwapClass = (data) =>
    apiInstance
        .post(GET_SCHEDULER_SWAP_CLASS, data, {
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

/* EDIT CLASS */
export const postEditClass = (data) =>
    apiInstance
        .post(GET_SCHEDULER_EDIT_CLASS, data, {
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
/* EDIT CLASS */
export const getClassReasons = () =>
    apiInstance
        .get(GET_SCHEDULER_GET_REASONS, {
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

/* CONFLICT LIST */
export const getConflictList = (data) =>
    apiInstance
        .post(GET_CONFLICT_LIST, data, {
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
/* MARK LEAVE */
export const postMarkLeave = (data) =>
    apiInstance
        .post(MARK_LEAVE, data, {
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
/* MARK ATTENDANCE */
export const postMarkAttendance = (data) =>
    apiInstance
        .post(MARK_ATTENDANCE, data, {
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
/* Warning */
export const getWarnings = (data) =>
    apiInstance
        .post(GET_WARNING_LIST, data, {
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
