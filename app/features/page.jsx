"use client"
import React from 'react'
import Link from 'next/link'
import Navbar from '@components/Navigation'
import Footer from '@components/Footer'

export default function FeaturesPage() {
    return (
        <>
            <Navbar />
            <div className="pt-20 min-h-screen bg-gray-50">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Our Features</h1>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Market Rates */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold mb-3 text-green-600">Real-time Market Rates</h3>
                            <p className="text-gray-700 mb-4">
                                Get live market rates for agricultural products across different districts and mandis.
                            </p>
                            <Link href="/market" className="text-green-600 hover:text-green-700 font-semibold">
                                View Market Rates →
                            </Link>
                        </div>
                        
                        {/* AI Disease Detection */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="text-4xl mb-4">🤖</div>
                            <h3 className="text-xl font-semibold mb-3 text-green-600">AI Disease Detection</h3>
                            <p className="text-gray-700 mb-4">
                                Upload photos of your crops to detect diseases early and get treatment recommendations.
                            </p>
                            <Link href="/ai/leaf" className="text-green-600 hover:text-green-700 font-semibold">
                                Try AI Detection →
                            </Link>
                        </div>
                        
                        {/* Weather Forecast */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="text-4xl mb-4">🌤️</div>
                            <h3 className="text-xl font-semibold mb-3 text-green-600">Weather Forecast</h3>
                            <p className="text-gray-700 mb-4">
                                Get accurate weather forecasts to plan your farming activities effectively.
                            </p>
                            <Link href="/ai/weather" className="text-green-600 hover:text-green-700 font-semibold">
                                Check Weather →
                            </Link>
                        </div>
                        
                        {/* Bazaar */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="text-4xl mb-4">🛒</div>
                            <h3 className="text-xl font-semibold mb-3 text-green-600">Digital Bazaar</h3>
                            <p className="text-gray-700 mb-4">
                                Buy and sell agricultural products directly with other farmers and sellers.
                            </p>
                            <Link href="/bazzar" className="text-green-600 hover:text-green-700 font-semibold">
                                Visit Bazaar →
                            </Link>
                        </div>
                        
                        {/* Blog & Knowledge */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="text-4xl mb-4">📚</div>
                            <h3 className="text-xl font-semibold mb-3 text-green-600">Agricultural Blog</h3>
                            <p className="text-gray-700 mb-4">
                                Read the latest articles, tips, and insights from agricultural experts.
                            </p>
                            <Link href="/blog" className="text-green-600 hover:text-green-700 font-semibold">
                                Read Blog →
                            </Link>
                        </div>
                        
                        {/* Reels */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="text-4xl mb-4">🎬</div>
                            <h3 className="text-xl font-semibold mb-3 text-green-600">Educational Reels</h3>
                            <p className="text-gray-700 mb-4">
                                Watch short, informative videos about farming techniques and agricultural practices.
                            </p>
                            <Link href="/reel" className="text-green-600 hover:text-green-700 font-semibold">
                                Watch Reels →
                            </Link>
                        </div>
                    </div>
                    
                    <div className="text-center mt-12">
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
