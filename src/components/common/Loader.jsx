import React from 'react';

function Loader({ table }) {

    let blue;
    let height;
    let width;
    if (table) {
        blue = "border-blue-300"
        height = 14
        width = 14
    }
    return (
        <div className="flex justify-center items-center">
            <div className={`animate-spin rounded-full h-${table ? height : 6} w-${table ? width : 6} border-t-4 border-b-4 ${table ? blue : "border-white"} `}></div>
            {/* <div className={`animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 "border-blue-300" `}></div> */}

        </div>
    );
}

export default Loader;
