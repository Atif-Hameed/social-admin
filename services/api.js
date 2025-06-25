import { backend_url } from "@/utils/config";
import axios from "axios"



//LOGIN ADMIN
export const adminLogin = async (email, password) => {
    try {
        const response = await axios.post(`${backend_url}/api/admin/login-admin`, { email, password });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during login.';
        throw new Error(errorMessage);
    }
};


//get user
export const getUser = async (id) => {
    try {
        const response = await axios.get(`${backend_url}/api/user/get-user/${id}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during user fetching.';
        throw new Error(errorMessage);
    }
};


//get all users
export const getAllUser = async (id) => {
    try {
        const response = await axios.get(`${backend_url}/api/admin/all-users`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during users fetching.';
        throw new Error(errorMessage);
    }
};


//update user
export const updateUser = async (id, data) => {
    
    try {
        const response = await axios.put(`${backend_url}/api/user/update-user/${id}`, data );
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during user updating.';
        throw new Error(errorMessage);
    }
};



//delete user
export const deleteUser = async (id, data) => {
    try {
        const response = await axios.post(`${backend_url}/api/user/delete-user/${id}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred during user deleting.';
        throw new Error(errorMessage);
    }
};
