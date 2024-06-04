import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css" // Ensure this line is included to import Tailwind CSS
import { login } from "../../services/auth";
import UserContext from "../../contexts/UserContext";
export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        // console.log("hererrererererr")
        e.preventDefault();
        login({ email: email, password: password }).then((res) => {
            console.log("vhecllll", res)
            console.log(res, res.statusCode, "ressss")
            if (res.statusCode === 200) {
                console.log("reacheddddd")
                navigate("/home");
                setUser(res.data.user.name)
                localStorage.setItem("token", res.data.token)
            }
            else {
                navigate("/login");
            }

        }).catch((err) => {
            navigate("/login");
        })
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-4xl font-bold text-blue-700 text-center mb-6">Login</h1>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-blue-700 text-sm font-bold mb-2">Email</label>
                        <input
                            // type="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-blue-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};
