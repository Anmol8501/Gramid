"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from '@components/Navigation';
import Footer from '@components/Footer';

const Leaf = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPrediction(null);
      setError("");
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setError("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      setError("");
      
      const response = await fetch("/api/ai/classify", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setPrediction(data.prediction);
      } else {
        setError(data.error || "Failed to analyze image. Please try again.");
      }
    } catch (err) {
      setError("Error while analyzing the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Disease Detection</h1>
            <p className="text-lg text-gray-600">
              Upload a photo of your plant leaves to detect diseases and get treatment recommendations
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Plant Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
              </div>

              {imagePreview && (
                <div className="text-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-xs mx-auto rounded-lg shadow-md"
                  />
                </div>
              )}

              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading || !image}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </span>
                  ) : (
                    "Analyze Image"
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-center">{error}</p>
              </div>
            )}

            {prediction && (
              <div className="mt-8 space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Analysis Result</h3>
                  <div className="space-y-2">
                    <p className="text-lg">
                      <span className="font-medium">Detected:</span> {prediction.disease}
                    </p>
                    <p className="text-lg">
                      <span className="font-medium">Confidence:</span> {prediction.confidence}%
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">Message</h3>
                  <p className="text-blue-700">{prediction.message}</p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-yellow-800 mb-2">Treatment</h3>
                  <p className="text-yellow-700">{prediction.treatment}</p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">Prevention</h3>
                  <p className="text-purple-700">{prediction.prevention}</p>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-8">
            <Link href="/features" className="text-green-600 hover:text-green-700 font-semibold">
              ← Back to Features
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Leaf;
