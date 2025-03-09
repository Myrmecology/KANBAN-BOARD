import jwt from 'jsonwebtoken';
// Make sure all code paths have a return value
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Access Denied, token is missing' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied, token is missing' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
        req.user = decoded;
        next();
        // Add explicit return for TypeScript
        return;
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
