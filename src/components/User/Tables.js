import React, { useContext } from 'react';
import { calculateAge } from '../../utils/CalculateAge';
import UserContext from '../../contexts/UserContext';
import Loader from '../common/Loader';
import { useNavigate } from 'react-router-dom';

const Table = ({ title, data }) => {
    const { loading } = useContext(UserContext)
    const navigate = useNavigate()
    let patient;
    if (title === "Patients Table") {
        patient = true
    }
    const columns = patient ? 7 : 12;

    const onEdit = (data) => {
        navigate("/form", { state: { role: data.role, data: data, action: true } })
    }
    const onDelete = () => {

    }

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
                                Email
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
                            {!patient ? <>
                                <th className="py-2 px-4 bg-blue-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Avalability
                                </th>
                                <th className="py-2 px-4 bg-blue-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Qualification
                                </th></> : ""}
                            <th className="py-2 px-4 bg-blue-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    {!loading ? (
                        <tbody>
                            {data.length === 0 ? <tr >
                                <td colSpan={columns} className="bg-blue-100 py-4 text-center"> No Data Found </td>
                            </tr> :
                                data.map((item) => (
                                    <tr key={item._id} className="bg-blue-100 border-b border-gray-200">
                                        <td className="py-2 px-4">{item.name || "-"}</td>
                                        <td className="py-2 px-4">{item.phoneNumber || "-"}</td>
                                        <td className="py-2 px-4">{item.email || "-"}</td>
                                        <td className="py-2 px-4">{item.address || "-"}</td>

                                        <td className="py-2 px-4">{item.adhar || "-"}</td>
                                        <td className="py-2 px-4">{calculateAge(item.age) !== undefined ? calculateAge(item.age) : "-"}</td>
                                        {title !== "Patients Table" ? <>   <td className="py-2 px-4">{item.qualification || "-"}</td>    <td className="py-2 px-4">{item.availability || "-"}</td></> : ""}
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
            </div>
        </div>
    );
};

export default Table;
