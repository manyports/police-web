import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { createToken, createRefreshToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide email and password' },
        { status: 400 }
      );
    }
    
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    if (!user.isActive) {
      return NextResponse.json(
        { success: false, message: 'Your account has been deactivated. Please contact an administrator.' },
        { status: 403 }
      );
    }
    
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    const token = createToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    });
    
    const refreshToken = createRefreshToken(user._id.toString());
    
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };
    
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: userData,
      token
    });
    
    response.cookies.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    });
    
    response.cookies.set({
      name: 'refreshToken',
      value: refreshToken,
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    });
    
    return response;
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during login' },
      { status: 500 }
    );
  }
} 