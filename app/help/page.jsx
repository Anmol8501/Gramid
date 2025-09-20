"use client"
import React from 'react'
import Link from 'next/link'
import Navbar from '@components/Navigation'
import Footer from '@components/Footer'

export default function HelpPage() {
    return (
        <>
            <Navbar />
            <div className="pt-20 min-h-screen bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Help & Support</h1>
                    
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-green-600">Frequently Asked Questions</h2>
                        
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800">How do I sign up?</h3>
                                <p className="text-gray-700">
                                    Click on the "Get Started" button on the homepage or go to the signup page. 
                                    You'll need to provide your email, create a password, and verify with OTP.
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800">How do I check market rates?</h3>
                                <p className="text-gray-700">
                                    Visit the Market section to see real-time rates for various agricultural products 
                                    in your area and across different districts.
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800">How do I sell my products?</h3>
                                <p className="text-gray-700">
                                    Go to the Bazaar section, create a seller account, and list your products. 
                                    Buyers can directly contact you through the platform.
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800">How does AI disease detection work?</h3>
                                <p className="text-gray-700">
                                    Upload a photo of your crop leaves to our AI system, and it will analyze 
                                    the image to detect potential diseases and provide treatment recommendations.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-green-600">Contact Us</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Email Support</h3>
                                <p className="text-gray-700">support@gramid.com</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
                                <p className="text-gray-700">+91-9876543210</p>
                            </div>
                        </div>
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
