import axios from 'axios';
const base_url = `${process.env.REACT_APP_BACKEND_BASE_API}/auth`
export const login = async (data) => {
    try {
        const response = await axios.post(`${base_url}/login`, data);
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;  // Re-throw the error so it can be handled by the caller
    }
};
