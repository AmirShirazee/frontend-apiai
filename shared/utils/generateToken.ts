import jwt from 'jsonwebtoken';
import getEnvVar from './getEnvVar';
import { v4 } from 'uuid';
import { randomBytes } from 'node:crypto';

export const generateToken = (id: string) => {
  return jwt.sign({ id }, getEnvVar('NEXTAUTH_SECRET'), {
    expiresIn: '30d',
  });
};

export const generateSecureToken = () => {
  const uuid = v4();
  const randomString = randomBytes(48).toString('hex');
  return `${uuid}${randomString}`;
};
