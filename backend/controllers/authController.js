import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// The one and only admin account — matches the seeded admin user
const ADMIN_EMAIL = 'rushabh@dreambuilders.com';

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// POST /api/auth/register
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const allowedRoles = ['supervisor', 'contractor'];
    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Only supervisors and contractors can register. Admin access is restricted.' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = await User.create({ name, email, password, role });
    const token = signToken(user._id);

    res.status(201).json({ token, user });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Role verification: selected role must match the user's actual role
    if (role && user.role !== role) {
      if (role === 'admin') {
        return res.status(403).json({ message: 'Admin access denied. Only authorized personnel can access the Admin panel.' });
      }
      return res.status(403).json({ message: `Access denied. Your account is registered as "${user.role}", not "${role}".` });
    }

    // Extra guard: admin role is restricted to the designated admin account only
    if (user.role === 'admin' && user.email !== ADMIN_EMAIL) {
      return res.status(403).json({ message: 'Admin access denied. This account does not have admin privileges.' });
    }

    const token = signToken(user._id);
    res.json({ token, user });
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/me
export const getMe = async (req, res) => {
  res.json(req.user);
};
