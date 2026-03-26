import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../../configs/jwt';

const USER = {
  id: '1',
  username: 'admin',
  password: bcrypt.hashSync('123456', 5),
};

/**
 * Validates credentials against the mock user and returns JWT access + refresh tokens.
 * @throws If the password does not match.
 */
export function login(username: string, password: string) {
  const isMatch = bcrypt.compareSync(password, USER.password);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const accessToken = jwt.sign({ userId: USER.id }, JWT_ACCESS_SECRET, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign({ userId: USER.id }, JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });

  return { accessToken, refreshToken };
}

/** Issues a new access token from a valid refresh JWT. */
export function refresh(refreshToken: string) {
  const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as any;

  const accessToken = jwt.sign(
    { userId: payload.userId },
    JWT_ACCESS_SECRET,
    { expiresIn: '15m' }
  );

  return { accessToken };
}
