import React, { useState, useEffect } from "react";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            setUser(data);
        } catch (err) {
            setError(`Failed to fetch user data: ${err.message || err}`);
        } finally {
            setLoading(false);
        }
        };
        
        fetchUserData();
    }, []);

    if (loading) return <p>Loading user data...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="user-profiles grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            <h2 className="text-3xl font-bold mb-8 text-black text-center col-span-full">User Profiles</h2>
            {user?.map((userItem) => (
                <div key={userItem.id} className="user-profile bg-linear-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                            {userItem.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">{userItem.name}</h3>
                            <p className="text-sm text-gray-500">@{userItem.username}</p>
                        </div>
                    </div>
                    <div className="space-y-2 text-gray-700">
                        <div className="flex items-center">
                            <span className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            </span>
                            <p className="text-sm"><strong>ID:</strong> {userItem.id}</p>
                        </div>
                        <div className="flex items-center">
                            <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center mr-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            </span>
                            <p className="text-sm"><strong>Email:</strong> {userItem.email}</p>
                        </div>
                        <div className="flex items-center">
                            <span className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            </span>
                            <p className="text-sm"><strong>Phone:</strong> {userItem.phone}</p>
                        </div>
                        <div className="flex items-center">
                            <span className="w-4 h-4 bg-orange-100 rounded-full flex items-center justify-center mr-2">
                                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                            </span>
                            <p className="text-sm"><strong>Website:</strong> 
                                <a href={`http://${userItem.website}`} className="text-blue-600 hover:text-blue-800 ml-1" target="_blank" rel="noopener noreferrer">
                                    {userItem.website}
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <button className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-medium">
                            View Profile
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserProfile;