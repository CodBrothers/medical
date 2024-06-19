import React, { useCallback, useContext } from 'react';
import { calculateAge } from '../../utils/CalculateAge';
import UserContext from '../../contexts/UserContext';
import Loader from '../common/Loader';
import { useNavigate } from 'react-router-dom';
import { deleteAppointmentById, getAllAppointments } from '../../services/appointment';
import { deleteUserById } from '../../services/user';

const Table = ({ title, data }) => {
    console.log(data.length, data, "data is")
    const { loading, setLoading, setRespType, setMessage, setIsVisible } = useContext(UserContext)
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
    const onDelete = async (data) => {
        setLoading(true)
        try {

            const res = apppointment ? await deleteAppointmentById({ _id: data._id }) : await deleteUserById({ _id: data._id })
            if (res.statusCode === 200) {
                setRespType("success");
                setMessage("Deleted successfully");
                setIsVisible(true)
                if (apppointment) {
                    AllAppointments()
                }



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


        }
    }


    const AllAppointments = useCallback(async () => {
        setLoading(true)
        try {
            const res = await getAllAppointments()
            if (res.statusCode === 200) {
                // data = (res.data)

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
    }, [setLoading, setRespType, setMessage])


    return (
        <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <div className="bg-blue-200 text-gray-600 text-xs font-semibold uppercase tracking-wider p-4">
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
                            {console.log(data, data.length)}

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
                                        {apppointment ? <>   <td className="py-2 px-4">{item?.doctorId?.name || "-"}</td>    <td className="py-2 px-4">{item?.appointmentTime || "-"}</td>  <td className="py-2 px-4">{item?.status || "-"}</td></> : ""}

                                        {!patient && !apppointment ? <>   <td className="py-2 px-4">{item.qualification || "-"}</td>    <td className="py-2 px-4">{item.availability || "-"}</td></> : ""}
                                        <td className="py-2 px-4 flex">
                                            <button
                                                key={`${item._id}-edit`}
                                                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2 my-2"
                                                onClick={() => onEdit(item)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                key={`${item._id}-delete`}
                                                className="bg-blue-700 hover:bg-blue-800 text-white py-1 px-2 rounded my-2"
                                                onClick={() => onDelete(item)}
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
            </div >
        </div >
    );
};

export default Table;
