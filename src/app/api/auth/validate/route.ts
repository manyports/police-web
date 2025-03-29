import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken } from '@/lib/jwt';

export async function GET(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'No authentication token provided',
          authenticated: false 
        },
        { status: 401 }
      );
    }
    
    // Verify token
    const payload = verifyToken(token);
    
    if (!payload) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid or expired token',
          authenticated: false 
        },
        { status: 401 }
      );
    }
    
    // Get user from database to ensure it exists and is active
    await connectToDatabase();
    const user = await User.findById(payload.userId);
    
    if (!user || !user.isActive) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'User not found or inactive',
          authenticated: false 
        },
        { status: 401 }
      );
    }
    
    // Return user data
    return NextResponse.json({
      success: true,
      message: 'Authentication valid',
      authenticated: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('Authentication validation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred during validation',
        authenticated: false 
      },
      { status: 500 }
    );
  }
} 