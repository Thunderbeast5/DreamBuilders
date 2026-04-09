import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

// Route imports
import authRoutes from './routes/auth.js';
import workerRoutes from './routes/workers.js';
import siteRoutes from './routes/sites.js';
import attendanceRoutes from './routes/attendance.js';
import paymentRoutes from './routes/payments.js';
import contactRoutes from './routes/contact.js';
import dashboardRoutes from './routes/dashboard.js';

// Middleware imports
import { errorHandler } from './middleware/errorHandler.js';
import { seedDatabase } from './seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───
app.use(cors());
app.use(express.json());

// ─── Root route ───
app.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Dream Builders API is running',
    endpoints: [
      '/api/auth',
      '/api/workers',
      '/api/sites',
      '/api/attendance',
      '/api/payments',
      '/api/contact',
      '/api/dashboard',
    ],
  });
});

// ─── API Routes ───
app.use('/api/auth', authRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ─── Serve frontend in production ───
if (process.env.NODE_ENV === 'production') {
  const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
  app.use(express.static(frontendDist));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

// ─── Error handler ───
app.use(errorHandler);

// ─── Start ───
connectDB().then(async () => {
  // Auto-seed when using in-memory DB
  if (process.env.USE_IN_MEMORY_DB === 'true') {
    await seedDatabase();
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
