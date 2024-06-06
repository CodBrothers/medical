import React, { useContext } from 'react'
import UserContext from '../contexts/UserContext'
import Table from '../components/User/Tables'
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';

export default function Patients() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/form", { state: { role: "doctor" } });
    };

    const { user } = useContext(UserContext);

    return (
        <>

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
                        <Table title="Doctors Table" />
                    </div>
                </main>
            </div>
        </>
    )
}
