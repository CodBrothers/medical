import React from 'react';

const Table = ({ title, datas }) => {

    const data = [
        { id: 1, name: 'John Doe', age: 28, email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', age: 32, email: 'jane@example.com' },
        { id: 3, name: 'Alice Johnson', age: 24, email: 'alice@example.com' },
    ];
    return (
        <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <div className="bg-blue-200 text-gray-600 text-xs font-semibold uppercase tracking-wider p-4">
                {title}
                {/* Patient */}
            </div>
            <div className='overflow-x-auto'>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 bg-blue-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="py-2 px-4 bg-blue-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="py-2 px-4 bg-blue-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Age
                            </th>
                            <th className="py-2 px-4 bg-blue-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="py-2 px-4 bg-blue-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id} className="bg-blue-100 border-b border-gray-200">
                                <td className="py-2 px-4">{item.id}</td>
                                <td className="py-2 px-4">{item.name}</td>
                                <td className="py-2 px-4">{item.age}</td>
                                <td className="py-2 px-4">{item.email} </td>
                                <td className="py-2 px-4 flex">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2 my-2"
                                    // onClick={() => onEdit(item.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-blue-700 hover:bg-blue-800 text-white py-1 px-2 rounded my-2"
                                    // onClick={() => onDelete(item.id)}
                                    >
                                        Delete
                                    </button></td>

                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
