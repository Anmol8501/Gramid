"use client"
import React from 'react'
import Link from 'next/link'
import Navbar from '@components/Navigation'
import Footer from '@components/Footer'

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <div className="pt-20 min-h-screen bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">About Gramid</h1>
                    
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-green-600">Our Mission</h2>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Gramid is revolutionizing agriculture in India by bridging the gap between farmers, 
                            sellers, and consumers. We provide a comprehensive platform that connects all 
                            stakeholders in the agricultural ecosystem.
                        </p>
                        
                        <h2 className="text-2xl font-semibold mb-4 text-green-600">What We Do</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                            <li>Provide real-time market rates for agricultural products</li>
                            <li>Connect farmers with buyers and sellers</li>
                            <li>Offer AI-powered disease detection for crops</li>
                            <li>Provide weather forecasting and agricultural advice</li>
                            <li>Enable direct trading through our bazaar platform</li>
                            <li>Share agricultural knowledge through blogs and reels</li>
                        </ul>
                        
                        <h2 className="text-2xl font-semibold mb-4 text-green-600">Our Vision</h2>
                        <p className="text-gray-700 leading-relaxed">
                            To create a sustainable and profitable agricultural ecosystem where every farmer 
                            has access to the best resources, fair prices, and modern technology to maximize 
                            their yield and income.
                        </p>
                    </div>
                    
                    <div className="text-center">
                        <Link href="/client" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
