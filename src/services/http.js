import axios from 'axios';

class HttpClient {
    constructor() {
        this.client = axios.create({
            baseURL: 'http://localhost:8000',
        });

        this.accessToken = localStorage.getItem('accessToken');
    }

    async getHeaders() {
        return {
            "Authorization": (this.accessToken) ? `Bearer ${this.accessToken}` : null
        }
    }

    async get(url) {
        const response = await this.client.get(
            url,
            { headers: await this.getHeaders() },
            url
        );
        return response.data;
    }

    async post(url, data) {
        const response = await this.client.post(
            url,
            data,
            { headers: await this.getHeaders() }
        );
        return response.data;
    }

    async put(url, data) {
        const response = await this.client.put(
            url,
            data,
            { headers: await this.getHeaders() }
        );
        return response.data;
    }

    async delete(url) {
        const response = await this.client.delete(
            url,
            { headers: await this.getHeaders() }
        );
        return response.data;
    }

    async patch(url, data) {
        const response = await this.client.patch(
            url,
            data,
            { headers: await this.getHeaders() }
        );
        return response.data;
    }

    setAccessToken(accessToken) {
        this.accessToken = accessToken;
        localStorage.setItem('accessToken', accessToken);
    }

    removeAccessToken() {
        this.accessToken = null;
        localStorage.removeItem('accessToken');
    }
}

const client = new HttpClient();
export default client;