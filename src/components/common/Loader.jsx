import React from 'react';

function Loader() {
    return (
        <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-b-4 border-white"></div>
        </div>
    );
}

export default Loader;
