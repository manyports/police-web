import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully'
  });
  
  response.cookies.set({
    name: 'auth-token',
    value: '',
    httpOnly: true,
    expires: new Date(0),
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });
  
  response.cookies.set({
    name: 'refreshToken',
    value: '',
    httpOnly: true,
    expires: new Date(0),
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });
  
  return response;
} 