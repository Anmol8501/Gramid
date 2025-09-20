"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { useAuth } from '@hook/authContext';

export default function Page() {
    const { logIn, onAuth, user } = useAuth();
    const route = useRouter();
    
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            route.push('/client');
        }
    }, [user, route]);

    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value 
        });
        // Clear message when user starts typing
        if (message) {
            setMessage('');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.email || !formData.password) {
            setMessage('Please fill in all fields');
            return;
        }

        if (!formData.email.includes('@')) {
            setMessage('Please enter a valid email address');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const result = await logIn(formData);
            if (result.status === 200) {
                setMessage('Login successful! Redirecting...');
                onAuth(result.user.result);
                setTimeout(() => {
                    route.push('/client');
                }, 1000);
            } else {
                setMessage(result.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage('Network error. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-xs w-full p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h1>
                
                {message && (
                    <div className={`p-3 rounded mb-4 ${
                        message.includes('successful') 
                            ? 'bg-green-100 text-green-700 border border-green-300' 
                            : 'bg-red-100 text-red-700 border border-red-300'
                    }`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <fieldset disabled={loading}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Enter your email" 
                                required 
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                onChange={handleChange} 
                                value={formData.email}
                                disabled={loading}
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Enter your password" 
                                required 
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                onChange={handleChange} 
                                value={formData.password}
                                disabled={loading}
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </fieldset>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/auth/signup" className="text-blue-500 hover:underline font-medium">
                            Sign up
                        </Link>
                    </p>
                </div>

                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded text-sm">
                        <strong>Development Mode:</strong> Using in-memory database
                    </div>
                )}
            </div>
        </main>
    )
}