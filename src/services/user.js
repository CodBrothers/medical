import axios from 'axios';
const base_url = `${process.env.REACT_APP_BACKEND_BASE_API}/docpat`


export const addUserData = async (data) => {
    try {
        const response = await axios.post(`${base_url}/save-doc-pat-data`, data);

        return response.data;
    } catch (error) {
        console.error('Error during adding user:', error);
        throw error;  // Re-throw the error so it can be handled by the caller
    }
};