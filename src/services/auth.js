import client from './http';

export function login(credentials) {
    return new Promise((resolve, reject) => {
        client.post('/auth/login', credentials
        ).then((response) => {
            client.setAccessToken(response["access_token"]);
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
}

export function register(credentials) {
    return new Promise((resolve, reject) => {
        client.post('/auth/register', credentials
        ).then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
}

export function logout() {
    return new Promise((resolve, reject) => {
        client.removeAccessToken();
        resolve();
    });
}

export function me() {
    return new Promise((resolve, reject) => {
        client.get('/auth/me').then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
}