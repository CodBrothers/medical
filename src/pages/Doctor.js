import React, { useContext } from 'react'
import Table from '../components/common/Tables'
import UserContext from '../contexts/UserContext'


export default function Doctor() {
    const { user } = useContext(UserContext)

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
                <div className="mb-8 text-2xl font-semibold text-gray-700">
                    Welcome {user}
                </div>
                <div className="space-y-8 w-full">
                    <div className="p-4 bg-white shadow-lg rounded-lg">

                        <Table title="Doctors Table" />
                    </div>
                </div>
            </div>
        </>
    )
}
