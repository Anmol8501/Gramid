import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { dbFind, dbInsert } from "@lib/dbConnect";

export async function POST(req) {
    try {
        const { name, email, password, state, city, zip, occupation, phone, upi_id } = await req.json();
        
        // Validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Name, email, and password are required", status: 400 },
                { status: 400 }
            );
        }

        if (!email.includes('@')) {
            return NextResponse.json(
                { message: "Please enter a valid email address", status: 400 },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { message: "Password must be at least 6 characters long", status: 400 },
                { status: 400 }
            );
        }

        console.log('Signup attempt for email:', email);
        
        // Check if user already exists
        const existingUser = await dbFind("users", { email });
        if (existingUser.ok === 1) {
            console.log('User already exists:', email);
            return NextResponse.json(
                { message: "User already exists with this email address", status: 409 },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user object
        const userData = {
            name,
            email,
            password: hashedPassword,
            state: state || '',
            city: city || '',
            zip: zip || '',
            occupation: occupation || '',
            phone: phone || '',
            upi_id: upi_id || null,
            transactions: [],
            createdAt: new Date().toISOString()
        };

        console.log('Creating user:', email);
        
        // Insert user
        const result = await dbInsert("users", userData);
        
        if (result.ok === 1) {
            console.log('User created successfully:', email);
            return NextResponse.json(
                { message: "User created successfully", status: 200 },
                { status: 200 }
            );
        } else {
            console.error('Failed to create user:', result.error);
            return NextResponse.json(
                { message: "Failed to create user. Please try again.", status: 500 },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('Signup API error:', error);
        return NextResponse.json(
            { message: "Internal server error", status: 500 },
            { status: 500 }
        );
    }
}