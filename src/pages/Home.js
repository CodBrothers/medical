
import { useCallback, useContext, useState, useEffect } from "react"
import UserContext from "../contexts/UserContext"
import Table from "../components/User/Tables"
import { getAllAppointments } from "../services/appointment"
import { useNavigate } from "react-router-dom"
import WarningToaster from "../components/common/Toaster"
export const Home = () => {
    const { setLoading, setRespType, setMessage, message, respType } = useContext(UserContext)
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const handleButtonClick = () => {
        navigate("/form", { state: { appointment: true } })
    }
    const AllAppointments = useCallback(async () => {
        setLoading(true)
        try {
            const res = await getAllAppointments()
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
    }, [setLoading, setRespType, setMessage])

    useEffect(() => {
        AllAppointments()
    }, [AllAppointments])


    return (<>
        {message && <WarningToaster message={message} type={respType} />}

        <div className="flex flex-col min-h-screen bg-blue-50 p-4">
            <header className="p-4 mb-8">
                <div className="container mx-auto flex justify-end items-center">
                    <button onClick={handleButtonClick} className="bg-white text-blue-500 hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded">
                        Add Appointment
                    </button>
                </div>
            </header>
            <div className="space-y-8 w-full">
                <div className="p-4 bg-white shadow-lg rounded-lg">
                    <Table title="Upcoming Appointments Table" initialData={data} />
                </div>
            </div>
        </div>
    </>)
}