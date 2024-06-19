import axios from 'axios';
const base_url = `${process.env.REACT_APP_BACKEND_BASE_API}/appoint`


export const createAppointment = async (data) => {
    try {
        const response = await axios.post(`${base_url}/create-new-appoint`, data);

        return response.data;
    } catch (error) {
        console.error('Error during creating appointment:', error);
        throw error;  // Re-throw the error so it can be handled by the caller
    }
};


export const getAppointmentById = async (data) => {
    try {
        const response = await axios.post(`${base_url}/find-user-by-id`, data);

        return response.data;
    } catch (error) {
        console.error('Error during getting appointment by ID:', error);
        throw error;  // Re-throw the error so it can be handled by the caller
    }
};

export const getAllAppointments = async () => {
    try {
        const response = await axios.get(`${base_url}/find-all-data`);

        return response.data;
    } catch (error) {
        console.error('Error during getting all appointments', error);
        throw error;  // Re-throw the error so it can be handled by the caller
    }
};

export const updateAppointmentById = async (data) => {
    try {
        const response = await axios.post(`${base_url}/update-by-id`, data);

        return response.data;
    } catch (error) {
        console.error('Error during updating appointment', error);
        throw error;  // Re-throw the error so it can be handled by the caller
    }
};

export const deleteAppointmentById = async (data) => {
    try {
        const response = await axios.post(`${base_url}/delete-by-id`, data);

        return response.data;
    } catch (error) {
        console.error('Error during deleting appointment', error);
        throw error;  // Re-throw the error so it can be handled by the caller
    }
};