import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
    const { backendUrl, token, user, setUser } = useContext(ShopContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError(null);
                
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get(`${backendUrl}/api/users/profile`, {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data?.success) {
                    setUser(response.data.user);
                } else {
                    throw new Error(response.data?.message || 'Failed to load profile');
                }
            } catch (err) {
                console.error("Profile fetch error:", err);
                setError(err.response?.data?.message || err.message || 'Error loading profile');
                
                // If unauthorized, redirect to login
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [backendUrl, token, navigate, setUser]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
                <button 
                    onClick={() => window.location.reload()}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">My Profile</h1>
            <div className="bg-white rounded-lg shadow p-6">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    <div className="mt-4 space-y-4">
                        <div>
                            <p className="text-gray-600">Name</p>
                            <p className="font-medium">{user?.name || 'Not provided'}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Email</p>
                            <p className="font-medium">{user?.email || 'Not provided'}</p>
                        </div>
                        {/* Add more fields as needed */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;