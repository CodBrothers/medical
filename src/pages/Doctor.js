import React, { useCallback, useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext'
import Table from '../components/User/Tables'
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../services/user';
import WarningToaster from '../components/common/Toaster';

export default function Patients() {
    const [data, setData] = useState([])
    const navigate = useNavigate();
    const { setLoading, message, setMessage, respType, setRespType } = useContext(UserContext)
    const handleButtonClick = () => {
        navigate("/form", { state: { role: "doctor" } });
    };

    const { user } = useContext(UserContext);
    const getAllUsers = useCallback(async () => {
        setLoading(true)
        try {
            const users = await getUsers({ role: "doctor" })
            if (users.statusCode === 200) {
                setData(users.data); // Assuming users.data is the array of users
            }
            else {
                setRespType("error")
                setMessage("Something went wrong")
            }
        } catch (error) {
            setRespType("error")
            setMessage("Something went wrong")
        } finally {
            setLoading(false);


        }
    }, [setLoading, setRespType, setMessage])

    useEffect(() => {
        getAllUsers()
    }, [getAllUsers])


    return (
        <>
            {message && <WarningToaster message={message} type={respType} />}

            <div className="flex flex-col min-h-screen bg-blue-50 p-4">
                <header className="p-4 mb-8">
                    <div className="container mx-auto flex justify-end items-center">
                        <span className="text-blue-50 mr-4">{user}</span>
                        <button onClick={handleButtonClick} className="bg-white text-blue-500 hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded">
                            Add User
                        </button>
                    </div>
                </header>
                <main className="container mx-auto">
                    <div className="p-4 bg-white shadow-lg rounded-lg">
                        <Table title="Doctors Table" data={data} />
                    </div>
                </main>
            </div>
        </>
    )
}
