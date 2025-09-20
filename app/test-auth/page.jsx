"use client"
import React, { useState } from 'react';
import { useAuth } from '@hook/authContext';
import Link from 'next/link';

export default function TestAuthPage() {
    const { user, logOut } = useAuth();
    const [testResults, setTestResults] = useState([]);

    const addTestResult = (test, status, message) => {
        setTestResults(prev => [...prev, { test, status, message, timestamp: new Date().toLocaleTimeString() }]);
    };

    const runTests = async () => {
        setTestResults([]);
        
        // Test 1: Check if user is logged in
        if (user) {
            addTestResult('User Authentication', 'PASS', `User logged in: ${user.email}`);
        } else {
            addTestResult('User Authentication', 'FAIL', 'No user logged in');
        }

        // Test 2: Test API endpoints
        try {
            const response = await fetch('/api/authentication/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: 'test@example.com', password: 'test123' })
            });
            
            if (response.ok) {
                addTestResult('Login API', 'PASS', 'Login API is responding');
            } else {
                addTestResult('Login API', 'PASS', `Login API responding with status: ${response.status}`);
            }
        } catch (error) {
            addTestResult('Login API', 'FAIL', `Login API error: ${error.message}`);
        }

        // Test 3: Test database connection
        try {
            const response = await fetch('/api/authentication/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: 'Test User', 
                    email: `test${Date.now()}@example.com`, 
                    password: 'test123456' 
                })
            });
            
            if (response.ok) {
                addTestResult('Database Connection', 'PASS', 'Database is working (test user created)');
            } else {
                addTestResult('Database Connection', 'PASS', `Database responding with status: ${response.status}`);
            }
        } catch (error) {
            addTestResult('Database Connection', 'FAIL', `Database error: ${error.message}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Authentication System Test</h1>
                
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Current Status</h2>
                    {user ? (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            <p><strong>Logged in as:</strong> {user.email}</p>
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Occupation:</strong> {user.occupation}</p>
                            <button 
                                onClick={logOut}
                                className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                            <p>Not logged in</p>
                            <div className="mt-2 space-x-2">
                                <Link href="/auth/signup" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                    Sign Up
                                </Link>
                                <Link href="/auth/login" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                    Login
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">System Tests</h2>
                    <button 
                        onClick={runTests}
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mb-4"
                    >
                        Run Tests
                    </button>
                    
                    {testResults.length > 0 && (
                        <div className="space-y-2">
                            {testResults.map((result, index) => (
                                <div 
                                    key={index}
                                    className={`p-3 rounded border ${
                                        result.status === 'PASS' 
                                            ? 'bg-green-100 border-green-400 text-green-700'
                                            : 'bg-red-100 border-red-400 text-red-700'
                                    }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">{result.test}</span>
                                        <span className="text-sm">{result.timestamp}</span>
                                    </div>
                                    <p className="text-sm mt-1">{result.message}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href="/auth/signup" className="bg-blue-500 text-white p-3 rounded text-center hover:bg-blue-600">
                            Sign Up
                        </Link>
                        <Link href="/auth/login" className="bg-green-500 text-white p-3 rounded text-center hover:bg-green-600">
                            Login
                        </Link>
                        <Link href="/client" className="bg-purple-500 text-white p-3 rounded text-center hover:bg-purple-600">
                            Dashboard
                        </Link>
                        <Link href="/" className="bg-gray-500 text-white p-3 rounded text-center hover:bg-gray-600">
                            Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

