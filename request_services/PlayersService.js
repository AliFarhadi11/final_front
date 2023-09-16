
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

export const requestPreData = () => {
    return request.get(
        `${config.localapi}/api/players/predata/`,

    );
};

export const requestPlayerRating = (data) => {
    return request.post(
        `${config.localapi}/api/players/player-rating-system/`,
        JSON.stringify(data),

    );
};
export const requestPlayerInfoSystem = (data) => {
    return request.post(
        `${config.localapi}/api/players/player-info-system/`,
        JSON.stringify(data),

    );
};

export const requestPlayerInformation = (data) => {
    return request.post(
        `${config.localapi}/api/players/player-information/`,
        JSON.stringify(data),

    );
};

export const requestPlayerSearching = (data) => {
    return request.post(
        `${config.localapi}/api/players/player-searching/`,
        JSON.stringify(data),

    );
};


export const requestPlayerFinding = (data) => {
    return request.post(
        `${config.localapi}/api/players/player-finding-system/`,
        JSON.stringify(data),

    );
};

export const requestSavePlayersData = (data, token) => {
    return request.post(
        `${config.localapi}/api/players/save-players/`,
        data,
        {
            headers: { 'Authorization': `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        },
        }
    );
};
export const requestEditPlayers = (data, token) => {
    return request.post(
        `${config.localapi}/api/players/edit-players/`,
        data,
        {
            headers: { 'Authorization': `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        },
        }
    );
};
