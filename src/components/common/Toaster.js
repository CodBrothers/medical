import React, { useContext, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import "../../index.css"
const WarningToaster = ({ message, type }) => {
    // const [isVisible, setIsVisible] = useState(true);
    const { isVisible, setIsVisible } = useContext(UserContext)

    const handleClose = () => {
        setIsVisible(false);
    };
    useEffect(() => {
        if (isVisible) {
            const handleClickOutside = () => {
                setIsVisible(false);
            };

            document.addEventListener('click', handleClickOutside);

            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }
    }, [isVisible, setIsVisible]);

    const getClassName = () => {
        if (type === 'error') {
            return 'bg-red-200 border-l-4 border-red-500 text-red-700';
        } else if (type === 'success') {
            return 'bg-green-200 border-l-4 border-green-500 text-green-700';
        }
        return '';
    };

    return (
        <>
            {isVisible && (
                <div className={`fixed top-10 right-5 z-50 p-4 transition-transform transform ${getClassName()} ${isVisible ? 'slide-in' : 'slide-out'}`}>
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            {type === 'error' && <div className="text-lg font-bold mr-2">Error:</div>}
                            {type === 'success' && <div className="text-lg font-bold mr-2">Success:</div>}
                            <div>{message}</div>
                        </div>
                        <button onClick={handleClose} className={`${type === 'error' ? 'text-red-700 hover:text-red-800' : 'text-green-700 hover:text-green-800'}`}>
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4.70711 4.70711C4.31658 5.09763 4.31658 5.73078 4.70711 6.12132L9.58579 11L4.70711 15.8787C4.31658 16.2692 4.31658 16.9024 4.70711 17.2929C5.09763 17.6834 5.73078 17.6834 6.12132 17.2929L11 12.4142L15.8787 17.2929C16.2692 17.6834 16.9024 17.6834 17.2929 17.2929C17.6834 16.9024 17.6834 16.2692 17.2929 15.8787L12.4142 11L17.2929 6.12132C17.6834 5.73078 17.6834 5.09763 17.2929 4.70711C16.9024 4.31658 16.2692 4.31658 15.8787 4.70711L11 9.58579L6.12132 4.70711C5.73078 4.31658 5.09763 4.31658 4.70711 4.70711Z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default WarningToaster;
