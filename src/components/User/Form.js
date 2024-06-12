import React, { useContext, useState } from 'react';
import { addUserData, updateUsers } from '../../services/user';
import WarningToaster from '../common/Toaster';
import UserContext from '../../contexts/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Form = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setIsVisible, loading, setLoading } = useContext(UserContext);

    const data = location?.state?.data || {};
    const action = location?.state?.action;
    const role = location?.state?.role || data.role || "";

    const [message, setMessage] = useState("");
    const [respType, setRespType] = useState("");
    const [dob, setDob] = useState(new Date());
    const [formData, setFormData] = useState({
        name: data.name || "",
        email: data.email || "",
        phoneNumber: data.phoneNumber || "",
        address: data.address || "",
        adhar: data.adhar || "",
        role: role,
        age: data.age || "",
        availability: data.availability || "",
        qualification: data.qualification || "",
        _id: data._id || undefined
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setIsVisible(false);
    };

    const handleDateChange = (date) => {
        setDob(date);
        setFormData({ ...formData, age: date });
        setIsVisible(false);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = action ? await updateUsers(formData) : await addUserData(formData);
            handleResponse(res);
        } catch (err) {
            handleError();
        } finally {
            setLoading(false);
        }
    };

    const handleResponse = (res) => {
        setIsVisible(true);
        if (res.statusCode === 200) {
            setRespType("success");
            setMessage(`${capitalize(formData.role)} ${action ? "Updated Successfully" : "Added Successfully"}`);
            navigate(`/${role === "patient" ? "patients" : "doctors"}`);
        } else {
            setRespType("error");
            setMessage("Something went wrong");
        }
    };

    const handleError = () => {
        setIsVisible(true);
        setRespType("error");
        setMessage("Something went wrong");
    };

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const renderInput = (label, name, type, disabled = false) => (
        <div className="mb-4">
            <label className="block text-blue-700 text-sm font-bold mb-2">{label}</label>
            <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                disabled={disabled}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>
    );

    const renderTextarea = (label, name) => (
        <div className="mb-4">
            <label className="block text-blue-700 text-sm font-bold mb-2">{label}</label>
            <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>
    );

    const renderDatePicker = (label, name, selected, onChange) => (
        <div className="mb-4">
            <label className="block text-blue-700 text-sm font-bold mb-2">{label}</label>
            <DatePicker
                name={name}
                selected={selected}
                onChange={onChange}
                dateFormat="yyyy-MM-dd"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholderText="Select date of birth"
                showYearDropdown
                showMonthDropdown
                dropdownMode='select'
            />
        </div>
    );

    const renderDoctorFields = () => (
        <>
            {renderInput("Availability", "availability", "text")}
            {renderInput("Qualification", "qualification", "text")}
        </>
    );
    return (
        <div className="mx-auto bg-blue-100 p-8 rounded-lg mt-16 mb-16" style={{ width: '90%' }}>
            <h2 className="text-2xl font-bold text-blue-700 mb-4">{action ? "Update User" : "Add User"}</h2>
            {message && <WarningToaster message={message} type={respType} />}
            {console.log(role === "doctor", data.role === "doctor")}
            <form onSubmit={onSubmit}>
                {renderInput("Name", "name", "text")}
                {renderInput("Email", "email", "email")}
                {renderInput("Phone Number", "phoneNumber", "tel")}
                {renderTextarea("Address", "address")}
                {renderInput("Aadhaar Details", "adhar", "text")}
                {renderInput("Role", "role", "text", true)}
                {renderDatePicker("Age", "age", dob, handleDateChange)}
                {(role === "doctor" || data.role === "doctor") && renderDoctorFields()}
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {loading ? <Loader /> : action ? "Update User" : "Add User"}
                </button>
            </form>
        </div>
    );

}

export default Form;