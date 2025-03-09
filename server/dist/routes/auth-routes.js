import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import dotenv from 'dotenv';
// Initialize environment variables
dotenv.config();
const router = express.Router();
/**
 * Login route
 * POST /auth/login
 */
router.post('/login', async (req, res) => {
    try {
        // Add debug log
        console.log('Login attempt:', req.body);
        const { username, password } = req.body;
        // Validate request
        if (!username || !password) {
            console.log('Missing username or password');
            return res.status(400).json({ message: 'Username and password are required' });
        }
        // Find user by username
        const user = await User.findOne({ where: { username } });
        // Debug log
        console.log('User found:', user ? 'yes' : 'no');
        // Check if user exists
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        // Compare passwords
        const validPassword = await bcrypt.compare(password, user.password);
        // Debug log
        console.log('Password valid:', validPassword ? 'yes' : 'no');
        if (!validPassword) {
            console.log('Invalid password');
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        // Create and sign JWT
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'default_secret_key', { expiresIn: '1h' } // Token expires in 1 hour
        );
        console.log('Login successful, token generated');
        // Send the token
        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username
            }
        });
    }
    catch (error) {
        // Detailed error logging
        console.error('Login error details:', error);
        return res.status(500).json({ message: 'Internal server error during login' });
    }
});
export default router;
