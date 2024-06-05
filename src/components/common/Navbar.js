import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faChevronDown } from '@fortawesome/free-solid-svg-icons';
// import { useState } from 'react';
const Navbar = () => {
    // const [onClickProfile, setOnClickProfile] = useState(false)
    // const handleProfileClick = () => {
    //     setOnClickProfile(!onClickProfile)
    // }
    // const handleLogout = () => {
    //     localStorage.removeItem("token")
    // }
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    <Link to="/home">Medical Bros</Link>
                </div>
                <div className="flex space-x-4 ">
                    <Link to="/home" className="text-white hover:scale-125 transform transition-transform duration-300 px-3">Home</Link>
                    <Link to="/doctors" className="text-white hover:scale-125 transform transition-transform duration-300 px-3">Doctors</Link>
                    <Link to="/patients" className="text-white hover:scale-125 transform transition-transform duration-300 ">Patients</Link>
                    {/* <div className="relative">
                        <button
                            onClick={handleProfileClick}
                            className="flex items-center text-white hover:scale-125 transform transition-transform duration-300"
                        >
                            <FontAwesomeIcon icon={faUser} className="h-6 w-6" />
                            <FontAwesomeIcon icon={faChevronDown} className="h-5 w-5 ml-1" />
                        </button>
                        {onClickProfile && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div> */}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
