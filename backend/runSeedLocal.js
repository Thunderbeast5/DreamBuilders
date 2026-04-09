import 'dotenv/config';
import connectDB from './config/db.js';
import { seedDatabase } from './seed.js';

connectDB().then(async () => {
  await seedDatabase();
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
