import React, { useContext, useState } from 'react'
import { addUserData } from '../../services/auth'
import WarningToaster from '../common/Toaster'
import UserContext from '../../contexts/UserContext'
import { useLocation } from 'react-router-dom';

function Form() {
    const location = useLocation();
    const [message, setMessage] = useState("")
    const [respType, setRespType] = useState("")
    const { setIsVisible } = useContext(UserContext)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        aadhaarDetails: "",
        role: location.state.role,
        age: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {

            const res = await addUserData(formData)
            setIsVisible(true)
            if (res.statusCode === 200) {
                setRespType("success")
                setMessage("Something went wrong")
            }
            else {
                setRespType("error")
                setMessage("Added Succesfully")
            }
        }
        catch (err) {
            setIsVisible(true)
            setRespType("error")
            setMessage("Something went wrong")
        }

    }
    return (
        <>
            <div className="mx-auto bg-blue-100 p-8 rounded-lg mt-16 mb-16" style={{ width: '90%' }}>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">Add User</h2>
                {message && <WarningToaster message={message} type={respType} />}


                <form onSubmit={onSubmit} >
                    <div className="mb-4">
                        <label className="block text-blue-700 text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-blue-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-blue-700 text-sm font-bold mb-2">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-blue-700 text-sm font-bold mb-2">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-blue-700 text-sm font-bold mb-2">Aadhaar Details</label>
                        <input
                            type="text"
                            name="aadhaarDetails"
                            value={formData.aadhaarDetails}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-blue-700 text-sm font-bold mb-2">Role</label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-blue-700 text-sm font-bold mb-2">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add User
                    </button>
                </form>
            </div>


        </>
    )
}

export default Form