import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.controller';
import { createWSServer } from './ws/wsServer';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.listen(3001, () => {
  console.log('HTTP server running on http://localhost:3001');
});

createWSServer();
