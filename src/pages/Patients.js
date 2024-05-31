import React, { useContext } from 'react'
import UserContext from '../contexts/UserContext'


export default function Patients() {
    const { user } = useContext(UserContext)
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-blue-50">Patients {user}</div>
        </>
    )
}
