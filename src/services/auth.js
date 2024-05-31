import axios from 'axios';
const base_url = `${process.env.REACT_APP_BACKEND_BASE_API}/auth`
console.log(base_url, "naseurllllll")
export const login = async (data) => {
    await axios.post(`${base_url}/login`, data)
        .then((res) => {
            console.log('Post created:', res.data);
            return res.data
        })
        .catch((err) => {
            console.log('Error:', err);
            return err
        })
}