import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChevronDown, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

const Navbar = () => {
    const navigate = useNavigate()
    const [onClickProfile, setOnClickProfile] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef(null)

    const handleProfileClick = () => {
        setOnClickProfile(!onClickProfile)
    }
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const closeMenu = () => {
        setTimeout(() => {
            setIsOpen(false)
        }, 50);

    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOnClickProfile(false);
        }
    };
    useEffect(() => {
        if (onClickProfile) {
            document.addEventListener("click", handleClickOutside)
        }
        else {
            document.removeEventListener("click", handleClickOutside)
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [onClickProfile])

    return (
        <nav className="bg-blue-500 p-4 relative">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    <Link to="/">Medical Bros</Link>
                </div>
                <div className="lg:hidden">
                    <button onClick={toggleMenu} className="text-white">
                        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="h-6 w-6" />
                    </button>
                </div>
                <div className={`absolute top-full left-0 mt-2 w-full bg-white rounded-md shadow-lg py-1 z-20  ${isOpen ? 'block' : 'hidden'} lg:hidden`}>
                    <Link to="/home" className="text-blue-500 hover:font-bold block px-4 py-2" onClick={closeMenu}>Home</Link>
                    <Link to="/doctors" className="text-blue-500 hover:font-bold  block px-4 py-2" onClick={closeMenu}>Doctors</Link>
                    <Link to="/patients" className="text-blue-500 hover:font-bold  block px-4 py-2" onClick={closeMenu}>Patients</Link>
                    <Link to="/login" className="text-blue-500 hover:font-bold  block px-4 py-2" onClick={handleLogout}>Logout</Link>

                </div>
                <div className="hidden lg:flex space-x-6">
                    <Link to="/home" className="text-white hover:scale-125 transform transition-transform duration-300">Home</Link>
                    <Link to="/doctors" className="text-white hover:scale-125 transform transition-transform duration-300">Doctors</Link>
                    <Link to="/patients" className="text-white hover:scale-125 transform transition-transform duration-300">Patients</Link>
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={handleProfileClick}
                            className="flex items-center text-white hover:scale-125 transform transition-transform duration-300"
                        >
                            <FontAwesomeIcon icon={faUser} className="h-6 w-6 ml-2 lg:ml-6" />
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
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
