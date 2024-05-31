import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    <Link to="/">Medical Bros</Link>
                </div>
                <div className="flex space-x-4 ">
                    <Link to="/home" className="text-white hover:scale-125 transform transition-transform duration-300 px-3">Home</Link>
                    <Link to="/doctors" className="text-white hover:scale-125 transform transition-transform duration-300 px-3">Doctors</Link>
                    <Link to="/patients" className="text-white hover:scale-125 transform transition-transform duration-300 ">Patients</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
