import React, { useCallback, useContext, useEffect, useState } from 'react';
import { calculateAge, capitalize, formatDate } from '../../utils/CalculateAge';
import UserContext from '../../contexts/UserContext';
import Loader from '../common/Loader';
import { useNavigate } from 'react-router-dom';
import { deleteAppointmentById, getAllAppointments, updateAppointmentById } from '../../services/appointment';
import { deleteUserById, getUsers } from '../../services/user';
import WarningToaster from '../common/Toaster';
import "../../styles/Table.css"
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from '../common/Confirmation';
import "../../styles/Confirmation.css"

const Table = ({ title, initialData }) => {
    const { loading, setLoading, setRespType, setMessage, setIsVisible, message, respType, isOpen, setIsOpen } = useContext(UserContext)
    const [data, setData] = useState(initialData)
    const [editCellId, setEditCellId] = useState(null);
    const [editTimeCellId, setEditTimeCellId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const [statusValue, setStatusValue] = useState("pending");
    const [aptTime, setAptTime] = useState(new Date())
    const navigate = useNavigate()
    let patient = false;
    let apppointment;
    if (title === "Patients Table") {
        patient = true
    }
    if (title === "Upcoming Appointments Table") {
        apppointment = true
    }
    const columns = patient ? 7 : 12;

    const onEdit = (data) => {
        if (!apppointment) {
            navigate("/form", { state: { role: data.role, data: data, action: true } })
        }
        else {

            navigate("/form", { state: { appointment: true, data: data, action: true } })

        }
    }
    const getStatusClass = (status) => {
        switch (status) {
            case 'pending':
                return 'status-pending';
            case 'accepted':
                return 'status-accepted';
            case 'done':
                return 'status-done';
            default:
                return '';
        }
    };
    const handleCellClick = (item) => {
        setEditCellId(item._id);

    };

    const handleTimeCellClick = (item) => {
        setEditTimeCellId(item._id);

    };

    const handleStatusChange = async (event) => {
        let send = {
            _id: editCellId,
        }
        if (event?.target) {
            event.preventDefault();
            send.status = event.target.value;
        } else {
            send._id = editTimeCellId
            send.appointmentTime = event;
        }


        await handleSaveStatus(send)
        if (event.target) {
            setStatusValue(event.target.value)
        }
        else {
            setAptTime(event)
        }

        setEditCellId(null);
    };

    const handleSaveStatus = async (item) => {
        setLoading(true);
        try {
            const res = await updateAppointmentById(item); // Assuming you have this endpoint
            if (res.statusCode === 200) {
                setRespType("success");
                setMessage("Status updated successfully");
                setIsVisible(true);
                setData(prevData =>
                    prevData.map(dataItem =>
                        dataItem._id === item._id ? { ...dataItem, status: statusValue } : dataItem
                    )
                );
            } else {
                setRespType("error");
                setMessage("Something went wrong");
                setIsVisible(true);
            }
        } catch (error) {
            setRespType("error");
            setMessage("Something went wrong");
            setIsVisible(true);
        } finally {
            setLoading(false);
            setEditCellId(null);
            setEditTimeCellId(null);
            setStatusValue('');
        }
    };

    const handleDeleteClick = (item) => {
        setItemToDelete(item);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        setIsModalOpen(false);
        onDelete(itemToDelete)
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false);
        setItemToDelete(null);
    };

    const onDelete = async (data) => {
        setLoading(true)
        try {
            const res = apppointment ? await deleteAppointmentById({ _id: data._id }) : await deleteUserById({ _id: data._id })
            if (res.statusCode === 200) {
                setIsVisible(true)
                setRespType("success");
                setMessage(res.data);


            }
            else {
                setRespType("error")
                setMessage("Something went wrong")
                setIsVisible(true)
            }
        }
        catch {
            setRespType("error")
            setMessage("Something went wrong")
            setIsVisible(true)
        }
        finally {
            setLoading(false)
            AllAppointments()

        }
    }


    const AllAppointments = useCallback(async () => {
        setLoading(true)
        try {
            const res = apppointment ? await getAllAppointments() : patient ? await getUsers({ role: "patient" }) : await getUsers({ role: "doctor" })
            if (res.statusCode === 200) {
                setData(res.data)

            }
            else {
                setRespType("error")
                setMessage("Something went wrong")
            }
        } catch (error) {
            setRespType("error")
            setMessage("Something went wrong")
        }
        finally {
            setLoading(false)
        }
    }, [setLoading, setRespType, setMessage, apppointment, patient])

    useEffect(() => {
        AllAppointments()
    }, [AllAppointments, apppointment, statusValue, aptTime])


    return (
        <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            {message && <WarningToaster message={message} type={respType} />}

            <div className="bg-blue-200 text-blue-800 text-xl font-semibold uppercase tracking-wider p-4">
                {title}
                {/* Patient */}
            </div>
            <div className='overflow-x-auto'>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>

                            <th className="py-2 px-4 bg-blue-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Name
                            </th>

                            <th className="py-2 px-4 bg-blue-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Phone Number
                            </th>
                            <th className="py-2 px-4 bg-blue-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Address
                            </th>

                            <th className="py-2 px-4 bg-blue-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Adhaar Details
                            </th>
                            <th className="py-2 px-4 bg-blue-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Age
                            </th>
                            {!patient && !apppointment ? <>
                                <th className="py-2 px-4 bg-blue-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Avalability
                                </th>
                                <th className="py-2 px-4 bg-blue-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Qualification
                                </th></> : ""}

                            {apppointment ? <>
                                <th className="py-2 px-4 bg-blue-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Doctor
                                </th>
                                <th className="py-2 px-4 bg-blue-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Appointment Time
                                </th>
                                <th className="py-2 px-4 bg-blue-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th></> : ""}
                            <th className="py-2 px-4 bg-blue-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    {!loading ? (
                        <tbody>

                            {data.length === 0 || data === "No Data Found"
                                ? <tr >
                                    < td colSpan={columns} className="bg-blue-100 py-4 text-center"> No Data Found </td>
                                </tr> :
                                data.map((item) => (
                                    <tr key={item._id} className="bg-blue-100 border-b border-gray-200">
                                        <td className="py-2 px-4">{!apppointment ? item.name : item.userId?.name || "-"}</td>
                                        <td className="py-2 px-4">{!apppointment ? item.phoneNumber : item.userId?.phoneNumber || "-"}</td>
                                        <td className="py-2 px-4">{!apppointment ? item.address : item.userId?.address || "-"}</td>

                                        <td className="py-2 px-4">{!apppointment ? item.adhar : item.userId?.adhar || "-"}</td>
                                        <td className="py-2 px-4">{!apppointment ? calculateAge(item.age) !== undefined && calculateAge(item.age) : calculateAge(item.userId?.age) || "-"}</td>
                                        {apppointment ? <>
                                            <td className="py-2 px-4">
                                                {item?.doctorId?.name || "-"}
                                            </td>
                                            <td className="py-2 px-4">
                                                {editTimeCellId === item._id ? (

                                                    <DatePicker
                                                        name="appointmentTime"
                                                        selected={new Date(item.appointmentTime)}
                                                        onChange={(e) => handleStatusChange(e, item)}
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
                                                        minDate={new Date()}
                                                    />
                                                ) : (
                                                    <button
                                                        onClick={() => handleTimeCellClick(item)}
                                                        className="editable-button"

                                                    >
                                                        {item?.appointmentTime ? formatDate(item?.appointmentTime) : "-"}
                                                        <span><FontAwesomeIcon icon={faEdit} /></span>

                                                    </button>
                                                )}
                                            </td>
                                            <td className="py-2 px-4">
                                                {editCellId === item._id ? (
                                                    <select
                                                        value={statusValue}
                                                        onChange={(e) => handleStatusChange(e, item)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="accepted">Accepted</option>
                                                        <option value="done">Done</option>
                                                    </select>
                                                ) : (
                                                    <button
                                                        onClick={() => handleCellClick(item)}
                                                        className={`editable-button ${getStatusClass(item.status)}`}

                                                    >
                                                        {capitalize(item.status) || "-"}
                                                        <span><FontAwesomeIcon icon={faEdit} /></span>
                                                    </button>
                                                )}
                                            </td></> : ""}

                                        {!patient && !apppointment ? <>     <td className="py-2 px-4">{item.availability || "-"}</td> <td className="py-2 px-4">{item.qualification || "-"}</td>  </> : ""}
                                        <td className="py-2 px-4 flex">
                                            {!apppointment ? <button
                                                key={`${item._id}-edit`}
                                                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2 my-2"
                                                onClick={() => onEdit(item)}
                                            >
                                                Edit
                                            </button> : ""}
                                            <button
                                                key={`${item._id}-delete`}
                                                className="bg-blue-700 hover:bg-blue-800 text-white py-1 px-2 rounded my-2"
                                                onClick={() => handleDeleteClick(item)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="9" className="py-4">
                                    <div className="flex justify-center items-center">
                                        <Loader table="table" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onRequestClose={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                    message="Are you sure you want to delete this item?"
                />
            </div >
        </div >
    );
};

export default Table;
