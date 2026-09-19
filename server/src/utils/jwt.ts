import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { ENV } from '../config/env';
import { UserRole } from '../constants';

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export const signAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, ENV.JWT_ACCESS_SECRET as Secret, {
    expiresIn: ENV.JWT_ACCESS_EXPIRES_IN,
  } as SignOptions);
};

export const signRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, ENV.JWT_REFRESH_SECRET as Secret, {
    expiresIn: ENV.JWT_REFRESH_EXPIRES_IN,
  } as SignOptions);
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, ENV.JWT_ACCESS_SECRET as Secret) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, ENV.JWT_REFRESH_SECRET as Secret) as JwtPayload;
};
