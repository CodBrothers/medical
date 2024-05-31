
import { useContext } from "react"
import UserContext from "../contexts/UserContext"
export const Home = () => {
    const { user } = useContext(UserContext)
    return <>
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
            {/* <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"> */}

            <h1>welcome to home page</h1> {user}
            {/* </div> */}
        </div>
    </>
}