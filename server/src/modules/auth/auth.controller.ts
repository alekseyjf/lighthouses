import { Router } from 'express';
import { login, refresh } from './auth.service';

const router = Router();

router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    const tokens = login(username, password);
    res.json(tokens);
  } catch {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

router.post('/refresh', (req, res) => {
  try {
    const { refreshToken } = req.body;
    const token = refresh(refreshToken);
    res.json(token);
  } catch {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
});

export default router;
