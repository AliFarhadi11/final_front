// import request from "./httpService.js";
// "localapi": "https://apiserver-playerkit.fandogh.cloud"
// "localapi": "http://localhost:8000"

import config from "./config.json";


import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json"

axios.interceptors.response.use(null, error => {
    const expectedErrors =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
    if (!expectedErrors) {
    }
    return Promise.reject(error);
})

const request = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch ,
}



export const requestUserRegister = user => {
    return request.post(
        `${config.localapi}/api/accounts/user-register/`,
        user,

    );
};


export const requestUserLogin = user => {
    return request.post(
        `${config.localapi}/api/accounts/token-access/`,
        user,

    );
};

export const requestEditProfile = (profile, token) => {
    return request.patch(
        `${config.localapi}/api/accounts/user-edit-profile/`,
        profile,
        {
            headers: { 'Authorization': `Bearer ${token}` }

        }

    );
};

export const requestEditPassword = (data, token) => {
    return request.post(
        `${config.localapi}/api/accounts/user-edit-password/`,
        JSON.stringify(data),
        {
            headers: { 'Authorization': `Bearer ${token}` }

        }


    );
};


export const requestResetPassword = (email) => {
    return request.post(
        `${config.localapi}/api/accounts/user-reset-password/`,
        JSON.stringify(email),

    );
};
export const requestSetUserPublicMessage = (data) => {
    return request.post(
        `${config.localapi}/api/accounts/set-poblic-message/`,
        JSON.stringify(data),

    );
};

export const requestSendEmailChangeLink = (token) => {
    return request.get(
        `${config.localapi}/api/accounts/send-email-change-link/`,
        {
            headers: { 'Authorization': `Bearer ${token}` }

        }

    );
};


