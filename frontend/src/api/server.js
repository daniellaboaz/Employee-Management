// fronted/src/api/server
import axios from 'axios';

const baseURL = 'http://localhost:8082';

//sends a request to the server side with specific router
export const register = async (values) => {
    try {
        const response = await axios.post(`${baseURL}/register`, values);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register2 = async (values) => {
    try {
        const response = await axios.post(`${baseURL}/register2`, values);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register3 = async (values) => {
    try {
        const response = await axios.post(`${baseURL}/register3`, values);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const task = async (values) => {
    try {
        const response = await axios.post(`${baseURL}/task`, values);
        return response.data;
    } catch (error) {
        throw error;
    }
};