import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { createToken, createRefreshToken } from '@/lib/jwt';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('refreshToken')?.value;
    
    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: 'No refresh token provided' },
        { status: 401 }
      );
    }
    
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, JWT_SECRET) as { userId: string };
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired refresh token' },
        { status: 401 }
      );
    }
    
    await connectToDatabase();
    const user = await User.findById(decoded.userId);
    
    if (!user || !user.isActive) {
      return NextResponse.json(
        { success: false, message: 'User not found or inactive' },
        { status: 401 }
      );
    }
    
    const newToken = createToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    });
    
    const newRefreshToken = createRefreshToken(user._id.toString());
    
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };
    
    const response = NextResponse.json({
      success: true,
      message: 'Token refreshed successfully',
      user: userData,
      token: newToken
    });
    
    response.cookies.set({
      name: 'auth-token',
      value: newToken,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    });
    
    response.cookies.set({
      name: 'refreshToken',
      value: newRefreshToken,
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    });
    
    return response;
  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during token refresh' },
      { status: 500 }
    );
  }
} 