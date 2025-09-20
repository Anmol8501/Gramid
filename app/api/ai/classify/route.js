import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const image = formData.get("image");

        if (!image) {
            return NextResponse.json(
                { error: "No image provided" },
                { status: 400 }
            );
        }

        // For demo purposes, we'll simulate AI classification
        // In a real implementation, you would integrate with a machine learning model
        const simulatedDiseases = [
            "Healthy Leaf",
            "Leaf Blight",
            "Powdery Mildew",
            "Rust Disease",
            "Bacterial Spot",
            "Virus Infection",
            "Nutrient Deficiency",
            "Pest Damage"
        ];

        const confidence = Math.random() * 0.4 + 0.6; // Random confidence between 60-100%
        const predictedDisease = simulatedDiseases[Math.floor(Math.random() * simulatedDiseases.length)];

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000));

        const recommendations = {
            "Healthy Leaf": {
                message: "Your plant appears to be healthy! Continue with regular care.",
                treatment: "No treatment needed. Maintain current watering and fertilizing schedule.",
                prevention: "Continue good practices: proper watering, adequate sunlight, and regular monitoring."
            },
            "Leaf Blight": {
                message: "Leaf blight detected. This is a fungal disease that can spread quickly.",
                treatment: "Remove affected leaves immediately. Apply fungicide containing copper or chlorothalonil.",
                prevention: "Improve air circulation, avoid overhead watering, and ensure proper plant spacing."
            },
            "Powdery Mildew": {
                message: "Powdery mildew identified. This fungal disease appears as white powdery spots.",
                treatment: "Apply fungicide with sulfur or potassium bicarbonate. Remove severely affected leaves.",
                prevention: "Ensure good air circulation, avoid overcrowding, and water at soil level."
            },
            "Rust Disease": {
                message: "Rust disease detected. This fungal infection causes orange or brown spots.",
                treatment: "Apply fungicide containing myclobutanil or propiconazole. Remove infected plant debris.",
                prevention: "Avoid overhead watering, improve drainage, and maintain proper plant spacing."
            },
            "Bacterial Spot": {
                message: "Bacterial spot identified. This disease causes dark spots on leaves.",
                treatment: "Apply copper-based bactericide. Remove and destroy infected plant material.",
                prevention: "Avoid working with wet plants, ensure good drainage, and rotate crops."
            },
            "Virus Infection": {
                message: "Virus infection detected. This can severely affect plant health and yield.",
                treatment: "Remove and destroy infected plants immediately. No cure available for viral diseases.",
                prevention: "Control insect vectors, use virus-free seeds, and practice good sanitation."
            },
            "Nutrient Deficiency": {
                message: "Nutrient deficiency identified. Your plant may be lacking essential nutrients.",
                treatment: "Apply appropriate fertilizer based on soil test results. Consider foliar feeding.",
                prevention: "Regular soil testing, balanced fertilization, and proper pH maintenance."
            },
            "Pest Damage": {
                message: "Pest damage detected. Insects or other pests are affecting your plant.",
                treatment: "Identify the specific pest and apply appropriate insecticide or organic control method.",
                prevention: "Regular monitoring, beneficial insects, and maintaining plant health."
            }
        };

        const recommendation = recommendations[predictedDisease] || recommendations["Healthy Leaf"];

        return NextResponse.json({
            success: true,
            prediction: {
                disease: predictedDisease,
                confidence: Math.round(confidence * 100),
                message: recommendation.message,
                treatment: recommendation.treatment,
                prevention: recommendation.prevention
            }
        });

    } catch (error) {
        console.error("Error in AI classification:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
