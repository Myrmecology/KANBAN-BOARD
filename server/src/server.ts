const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import routes from './routes/index.js';
import { sequelize, User } from './models/index.js';

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002; // Changed from 3001 to 3002

// For static file serving in production
const staticPath = path.join(__dirname, '../../client/dist');
app.use(express.static(staticPath));

app.use(express.json());
app.use(routes);

// For client-side routing in production
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

// Connect to database, seed if needed, and start server
sequelize.sync({force: forceDatabaseRefresh}).then(async () => {
  try {
    // Check if any users exist
    const userCount = await User.count();
    
    // If no users exist, create default admin user
    if (userCount === 0) {
      console.log('No users found, creating default admin user');
      await User.create({
        username: 'admin',
        password: await bcrypt.hash('password123', 10)
      });
      console.log('Default admin user created successfully');
    } else {
      console.log(`Found ${userCount} existing users in database`);
    }
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error during startup:', error);
  }
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});