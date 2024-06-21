import React, { useCallback, useContext, useEffect, useState } from 'react';
import { addUserData, getUsers, updateUsers } from '../../services/user';
import WarningToaster from '../common/Toaster';
import UserContext from '../../contexts/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createAppointment, updateAppointmentById } from '../../services/appointment';
import { capitalize } from '../../utils/CalculateAge';

const Form = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setIsVisible, loading, setLoading, setMessage, message, respType, setRespType } = useContext(UserContext);
    const [doctors, setDoctors] = useState([])
    const appointment = location?.state?.appointment || false;
    const data = location?.state?.data || {};
    const action = location?.state?.action;
    const role = location?.state?.role || data.role || "";
    // const [message, setMessage] = useState("");
    // const [respType, setRespType] = useState("");
    // const [dob, setDob] = useState();
    const [formData, setFormData] = useState({
        name: data.name || data?.userId?.name || "",
        phoneNumber: data.phoneNumber || data?.userId?.phoneNumber || "",
        address: data.address || data?.userId?.address || "",
        adhar: data.adhar || data?.userId?.adhar || "",
        role: role,
        age: (data.age) || (data?.userId?.age) || new Date(),
        availability: data.availability || "",
        qualification: data.qualification || "",
        _id: data._id || undefined,
        doctorId: data.doctorId || data?.doctorId?.name || "",
        appointmentTime: data.appointmentTime ? new Date(data.appointmentTime) : ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setIsVisible(false);
    };

    const handleDateChange = (date) => {
        // setDob(date);
        setFormData({ ...formData, age: (date) });
        setIsVisible(false);
    };

    const handleDateTimeChange = (date) => {
        setFormData({ ...formData, appointmentTime: date });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = action && !appointment ? await updateUsers(formData) : !action && appointment ? await createAppointment(formData) : !action && !appointment ? await addUserData(formData) : await updateAppointmentById(formData)
            handleResponse(res);
            if (appointment) {
                let msg = action && !appointment ? "User Updated Successfuly" : !action && appointment ? "Appointment Created Successfuly" : !action && !appointment ? "User Created Successfuly" : "Appointment Updated Successfuly"
                navigate("/home")
                setRespType("success");
                setMessage(msg);
                setIsVisible(true)
            }
            else if (role === "patient") {
                navigate("/patients")
            }
            else {
                navigate("/doctors")

            }
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


    const handleOnDropDownChange = (e) => {

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const getAllDoctors = useCallback(
        async () => {
            try {
                const res = await getUsers({ role: "doctor" })
                if (res.statusCode === 200) {
                    setDoctors(res.data)
                }

            }
            catch {

            }
        },
        [],
    )


    useEffect(() => {
        getAllDoctors()
    }, [getAllDoctors])

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

    const dropdown = ({ label, name, value, onChange, options }) => (


        < div className="mb-4" >
            <label className="block text-blue-700 text-sm font-bold mb-2">{label}</label>
            <select
                name={name}
                value={value._id}
                // value="ertyui"
                onChange={onChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                <option value="">Select a doctor</option>
                {options.doctors.map((option) => (
                    <option key={option._id} value={option._id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div >
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
            // value={formData.age}
            />
        </div>
    );

    const renderDateTimePicker = (label, name, selected, onChange) => (
        <div className="mb-4">

            <label className="block text-blue-700 text-sm font-bold mb-2">{label}</label>
            <DatePicker
                name={name}
                selected={selected}
                onChange={onChange}
                // dateFormat="yyyy-MM-dd"
                dateFormat="Pp"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholderText="Appointment Time"
                showYearDropdown
                showMonthDropdown
                dropdownMode='select'
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
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
            <h2 className="text-2xl font-bold text-blue-700 mb-4">{action ? "Update User" : !appointment ? "Add User" : "Create Appointment"}</h2>
            {message && <WarningToaster message={message} type={respType} />}
            <form onSubmit={onSubmit}>
                {renderInput("Name", "name", "text")}
                {renderInput("Phone Number", "phoneNumber", "tel")}
                {renderTextarea("Address", "address")}
                {renderInput("Aadhaar Details", "adhar", "text")}
                {!appointment ? renderInput("Role", "role", "text", true) : ""}
                {appointment ? dropdown({
                    label: "Select Doctor",
                    name: "doctorId",
                    value: formData.doctorId,
                    onChange: ((e) => { handleOnDropDownChange(e) }),
                    options: { doctors }
                }) : ""}
                {renderDatePicker("DOB", "age", formData.age ? formData.age : formData.userId.age, handleDateChange)}
                {appointment ? renderDateTimePicker("Appointment", "appointmentTime", formData.appointmentTime, handleDateTimeChange) : ""}
                {(role === "doctor" || data.role === "doctor") && renderDoctorFields()}
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {loading ? <Loader /> : action ? "Update User" : !appointment ? "Add User" : "Create Appointment"}
                </button>
            </form>
        </div>
    );

}

export default Form;