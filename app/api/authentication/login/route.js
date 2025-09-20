import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { dbFind } from "@lib/dbConnect";

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        
        // Validation
        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required", status: 400, user: null },
                { status: 400 }
            );
        }

        if (!email.includes('@')) {
            return NextResponse.json(
                { message: "Please enter a valid email address", status: 400, user: null },
                { status: 400 }
            );
        }

        console.log('Login attempt for email:', email);
        
        const result = await dbFind("users", { email });
        
        if (result.ok === 0) {
            console.log('User not found:', email);
            return NextResponse.json(
                { message: "No user found with this email address", status: 404, user: null },
                { status: 404 }
            );
        }

        console.log('User found, checking password...');
        
        const match = await bcrypt.compare(password, result.result.password);
        
        if (!match) {
            console.log('Invalid password for user:', email);
            return NextResponse.json(
                { message: "Invalid password", status: 401, user: null },
                { status: 401 }
            );
        }

        console.log('Login successful for user:', email);
        
        // Remove password from user object before sending
        const { password: _, ...userWithoutPassword } = result.result;
        
        return NextResponse.json(
            { 
                message: "Login successful", 
                status: 200, 
                user: { result: userWithoutPassword } 
            },
            { status: 200 }
        );
        
    } catch (error) {
        console.error('Login API error:', error);
        return NextResponse.json(
            { message: "Internal server error", status: 500, user: null },
            { status: 500 }
        );
    }
}