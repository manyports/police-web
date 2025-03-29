import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

if (!JWT_SECRET || JWT_SECRET === 'your-secret-key') {
  console.warn(
    'Warning: JWT_SECRET is not set or using default value. Set the JWT_SECRET environment variable for better security.'
  );
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export const createToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  });
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
};

export const getTokenFromHeader = (authHeader?: string): string | null => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.split(' ')[1];
};

export const createRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '30d',
  });
}; 