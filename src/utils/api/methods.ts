/* eslint-disable */
import { api } from './index';
import { AxiosResponse } from 'axios';

// GET
export const getAsync = async (path: string, params = {}): Promise<AxiosResponse<any>> => {
    const query = new URLSearchParams(params).toString();
    if (query) {
        return await api.get(`${path}?${query}`);
    }
    return await api.get(`${path}`);
};

// POST
export const postAsync = async (path: string, data: any): Promise<AxiosResponse<any>> => {
    return await api.post(`${path}`, data);
};

// PUT
export const putAsync = async (path: string, data: any): Promise<AxiosResponse<any>>  => {
    return await api.put(`${path}`, data);
};

// DELETE
export const deleteAsync = async (path: string, data: any): Promise<AxiosResponse<any>> => {
    return await api.delete(`${path}`, data);
};