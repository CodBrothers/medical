import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css" // Ensure this line is included to import Tailwind CSS
import { login } from "../../services/auth";
import UserContext from "../../contexts/UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Loader from "../common/Loader";
export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(UserContext)
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const { loading, setLoading } = useContext(UserContext)
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        setLoading(true)

        login({ email: email, password: password }).then((res) => {
            if (res.statusCode === 200) {
                navigate("/home");
                setUser(res.data.user.name)
                localStorage.setItem("token", res.data.token)
            }

            else {
                navigate("/login");
            }
        }).catch((err) => {
            if (err.response.status === 401) {
                setError("Invalid email or password")
            }

            navigate("/login");
        }).finally(() => {
            setLoading(false)
        })
    };

    const onToggle = () => {
        setShowPassword(!showPassword)
    }

    useEffect(() => {
        setError("")
    }, [email, password])

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-4xl font-bold text-blue-700 text-center mb-6">Login</h1>
                {error ? <div className="text-red-500 mb-4">{error}</div> : ""}
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-blue-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-blue-700 text-sm font-bold mb-2">Password</label>
                        <div className="relative w-full">
                            <input
                                type={!showPassword ? "password" : "text"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={onToggle}>
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-blue-700" />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        {loading ? <Loader /> : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};
