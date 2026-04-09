# Dream Builders - Complete Implementation Guide

This is a detailed, line-by-line explanation of the entire Dream Builders codebase — a construction labour management system covering both frontend and backend.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Overall Architecture](#overall-architecture)
4. [Folder Structure](#folder-structure)
5. [Backend - File-by-File Explanation](#backend-file-by-file-explanation)
6. [Frontend - File-by-File Explanation](#frontend-file-by-file-explanation)
7. [Data Flow & API Lifecycle](#data-flow--api-lifecycle)
8. [Important Concepts](#important-concepts)
9. [Execution Flow](#execution-flow)
10. [Environment Variables](#environment-variables)
11. [Diagrams](#diagrams)

---

## Project Overview

### What is Dream Builders?

**Dream Builders** is a full-stack web application designed to manage construction sites and labour workers. It helps construction companies (contractors, supervisors, and owners) to:

- **Track Workers**: Register and manage construction workers with skills and daily wages
- **Manage Sites**: Create and manage construction sites, assign workers to sites
- **Mark Attendance**: Record daily attendance (present, absent, half-day) for workers
- **Process Payments**: Record wage payments for workers
- **Handle Enquiries**: Capture contact form submissions from interested clients
- **Dashboard Analytics**: View real-time statistics about workers, sites, attendance, and payments

### Target Users

The application serves **three user roles**:

1. **Admin** (Owner/Manager) - Full control over entire system
2. **Supervisor** (Site Manager) - Manages sites, attendance, and payments
3. **Contractor** (Labour Contractor) - Manages workers and payments

---

## Tech Stack

### Backend
- **Runtime**: Node.js (using ES Modules)
- **Framework**: Express.js (web server + routing)
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs
- **Validation**: express-validator
- **CORS**: For cross-origin requests
- **Development**: dotenv

### Frontend
- **Framework**: React 19.2.4 (UI library)
- **Build Tool**: Vite (fast bundler)
- **Routing**: React Router v7 (client-side navigation)
- **HTTP Client**: Axios (API requests)
- **Styling**: Tailwind CSS (utility-first CSS)
- **Icons**: Lucide React (UI icons)
- **State Management**: React Context API + hooks (Auth)

### Database
- **MongoDB Atlas** (Cloud) or **In-Memory MongoDB** (Development)
- **Mongoose** for schema validation and ODM

---

## Overall Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  Frontend (React + Vite + Tailwind)                         │
│  - Components, Pages, UI                                    │
│  - React Context for Auth State                             │
│  - Axios API Client                                         │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/HTTPS
                    /api endpoints
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   Node.js Server                             │
│  Backend (Express + Mongoose)                               │
│  - Routes: /api/auth, /api/workers, /api/sites, etc.        │
│  - Controllers: Business logic for each route                │
│  - Middleware: Auth, Error handling, CORS                   │
│  - Models: Database schemas                                 │
└────────────────────────┬────────────────────────────────────┘
                         │ Mongoose
                    MongoDB Protocol
                         │
┌────────────────────────▼────────────────────────────────────┐
│              MongoDB Database                                │
│  Collections:                                               │
│  - users (authentication)                                   │
│  - workers (labour data)                                    │
│  - sites (construction sites)                               │
│  - attendance (daily check-ins)                             │
│  - payments (wage records)                                  │
│  - contacts (enquiry form submissions)                      │
└─────────────────────────────────────────────────────────────┘
```

### High-Level Flow

```
User visits frontend → Browser loads React app
             ↓
User logs in → AuthContext (React) stores JWT token
             ↓
Frontend sends requests with Bearer token
             ↓
Backend verifies JWT → Identifies user & role
             ↓
Route handler executes → Controller logic runs
             ↓
Mongoose queries MongoDB → Data returned
             ↓
Response formatted as JSON → Sent to frontend
             ↓
Frontend updates state & re-renders components
```

---

## Folder Structure

```
Dream-Builders/
├── backend/                    # Node.js Express API server
│   ├── config/                # Database & connection setup
│   │   └── db.js             # MongoDB connection logic
│   ├── models/               # Mongoose schemas
│   │   ├── User.js           # User schema with password hashing
│   │   ├── Worker.js         # Labour worker schema
│   │   ├── Site.js           # Construction site schema
│   │   ├── Attendance.js      # Attendance records schema
│   │   ├── Payment.js         # Payment records schema
│   │   └── Contact.js         # Contact form submissions schema
│   ├── controllers/          # Business logic for routes
│   │   ├── authController.js     # Login, signup, auth logic
│   │   ├── workerController.js   # CRUD for workers
│   │   ├── siteController.js     # CRUD for sites, assignments
│   │   ├── attendanceController.js  # Attendance marking
│   │   ├── paymentController.js     # Payment tracking
│   │   ├── contactController.js     # Contact form handling
│   │   └── dashboardController.js   # Analytics & statistics
│   ├── routes/              # API endpoints definition
│   │   ├── auth.js          # Auth routes
│   │   ├── workers.js       # Worker routes
│   │   ├── sites.js         # Site routes
│   │   ├── attendance.js    # Attendance routes
│   │   ├── payments.js      # Payment routes
│   │   ├── contact.js       # Contact routes
│   │   └── dashboard.js     # Dashboard routes
│   ├── middleware/          # Express middleware
│   │   ├── auth.js          # JWT verification, role auth
│   │   └── errorHandler.js  # Global error handling
│   ├── seed.js             # Database seeding script
│   ├── server.js           # Main Express app entry point
│   ├── .env                # Environment variables
│   └── package.json        # Dependencies for backend
│
└── frontend/                # React + Vite frontend
    ├── public/             # Static assets
    │   └── images/         # Project & service images
    ├── src/
    │   ├── components/     # Reusable React components
    │   │   ├── brand/      # Logo component
    │   │   ├── layout/     # Layout components
    │   │   │   ├── AppLayout.jsx       # Main layout wrapper
    │   │   │   ├── Navbar.jsx          # Top navigation
    │   │   │   ├── Footer.jsx          # Footer
    │   │   │   └── ProtectedRoute.jsx  # Role-based access
    │   │   ├── projects/   # Project-related components
    │   │   └── ui/         # Reusable UI components
    │   │       ├── Button.jsx   # Custom button
    │   │       ├── Card.jsx     # Card container
    │   │       ├── Badge.jsx    # Status badge
    │   │       └── Progress.jsx # Progress bar
    │   ├── context/        # React Context for state
    │   │   ├── AuthContext.jsx      # Auth context implementation
    │   │   ├── AuthContextInstance.js # Context creation
    │   │   └── useAuth.js           # Custom hook for auth
    │   ├── lib/           # Utility functions
    │   │   └── api.js     # Axios instance for API calls
    │   ├── pages/         # Page components (routes)
    │   │   ├── HomePage.jsx
    │   │   ├── AboutPage.jsx
    │   │   ├── ContactPage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── SignupPage.jsx
    │   │   ├── AdminDashboardPage.jsx
    │   │   ├── LabourDashboardPage.jsx
    │   │   └── dashboard/      # Protected dashboard pages
    │   │       ├── WorkersPage.jsx
    │   │       ├── SitesPage.jsx
    │   │       ├── AttendancePage.jsx
    │   │       └── PaymentsPage.jsx
    │   ├── data/          # Static data
    │   │   ├── projects.js   # Project data
    │   │   └── services.js   # Service offerings data
    │   ├── App.jsx        # Main routing component
    │   ├── main.jsx       # React entry point
    │   ├── index.css      # Global styles
    │   └── App.css        # App-specific styles
    ├── vite.config.js     # Vite build configuration
    ├── tailwind.config.js # Tailwind CSS configuration
    ├── package.json       # Frontend dependencies
    └── index.html         # HTML entry point
```

### Why This Folder Structure?

- **Separation of Concerns**: Backend and frontend are completely separate
- **Backend Organization**: Models, Controllers, Routes follow MVC pattern
- **Frontend Organization**: Pages, Components, Context follow React best practices
- **Scalability**: Easy to add new models, controllers, routes, or pages
- **Maintainability**: Each file has a single responsibility

---

## Backend File-by-File Explanation

### `/backend/package.json` - Dependencies Definition

**Purpose**: Lists all Node.js packages needed for the backend

```json
{
  "type": "module",           // Use ES6 import/export syntax
  "scripts": {
    "start": "node server.js",        // Run production server
    "dev": "node --watch server.js",  // Watch mode for development
    "seed": "node runSeedLocal.js"    // Populate database with sample data
  },
  "dependencies": {
    "express": "^4.21.2",             // Web framework
    "mongoose": "^8.12.1",            // MongoDB ODM
    "jsonwebtoken": "^9.0.2",         // JWT for auth
    "bcryptjs": "^2.4.3",             // Password hashing
    "cors": "^2.8.5",                 // Cross-origin requests
    "dotenv": "^16.4.7",              // Environment variables
    "express-validator": "^7.2.1",    // Input validation
    "mongodb-memory-server": "^11.0.1" // In-memory MongoDB for dev
  }
}
```

---

### `/backend/.env` - Configuration Variables

**Purpose**: Stores sensitive configuration outside of version control

```
PORT=5001                               # Port the server runs on
MONGO_URI=mongodb+srv://...            # MongoDB connection string
JWT_SECRET=dreambuilders_jwt_secret... # Secret for signing JWTs
USE_IN_MEMORY_DB=false                 # Use in-memory MongoDB?
```

---

### `/backend/config/db.js` - Database Connection

**Purpose**: Establishes connection to MongoDB and optionally uses in-memory database for development

```javascript
import mongoose from 'mongoose'

// Function to check if should use in-memory MongoDB
async function maybeUseInMemoryMongo() {
  const wantMemory =
    process.env.USE_IN_MEMORY_DB === 'true' ||
    (!process.env.MONGO_URI && process.env.NODE_ENV !== 'production')

  if (!wantMemory) return null

  // Import MongoDB Memory Server
  const { MongoMemoryServer } = await import('mongodb-memory-server')
  
  // Create in-memory instance
  const mongod = await MongoMemoryServer.create({
    instance: { dbName: process.env.MONGO_DB_NAME || 'dreambuilders' },
  })

  // Set MONGO_URI to point to in-memory instance
  const uri = mongod.getUri()
  process.env.MONGO_URI = uri
  console.log('🧪 Using in-memory MongoDB for development')
  return mongod
}

const connectDB = async () => {
  try {
    // Try to use in-memory MongoDB if enabled
    const mongod = await maybeUseInMemoryMongo()
    
    // Connect to MongoDB using Mongoose
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`✅ MongoDB connected: ${conn.connection.host}`)
    return mongod
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`)
    process.exit(1)  // Exit process if connection fails
  }
}

export default connectDB
```

**Why This Matters**: The database connection is centralized here, making it easy to switch between MongoDB Atlas (cloud) and in-memory database (development).

---

### `/backend/models/User.js` - User Schema & Password Hashing

**Purpose**: Defines the structure of user documents in MongoDB

```javascript
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    // User's full name
    name: { type: String, required: true, trim: true },
    
    // Email is unique (ensures no duplicate emails)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,  // Normalize to lowercase for comparison
      trim: true,
    },
    
    // Password must be at least 6 characters
    password: { type: String, required: true, minlength: 6 },
    
    // User role defines permissions
    role: {
      type: String,
      enum: ['admin', 'supervisor', 'contractor'],
      default: 'supervisor',
    },
  },
  { timestamps: true }  // Automatically adds createdAt & updatedAt
)

// Pre-save middleware: Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()  // Only hash if password changed
  this.password = await bcrypt.hash(this.password, 12)  // 12 salt rounds
  next()
})

// Method: Compare plain password with hashed password
userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password)
}

// Method: Remove password from JSON output (security)
userSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password  // Never send password over network
  return obj
}

export default mongoose.model('User', userSchema)
```

**Key Concepts**:
- **Password Hashing**: Passwords are hashed with bcrypt (one-way encryption) before saving
- **comparePassword**: Compares user input with hashed password during login
- **toJSON**: Ensures password is never accidentally sent to client

---

### `/backend/models/Worker.js` - Worker Schema

**Purpose**: Defines structure of worker documents

```javascript
const workerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    skill: { type: String, required: true, trim: true },  // e.g., Mason, Carpenter
    dailyWage: { type: Number, required: true },         // Daily rate in rupees
    
    // Worker status lifecycle
    status: {
      type: String,
      enum: ['available', 'assigned', 'inactive'],
      default: 'available',
    },
    
    // Reference to assigned Site (if any)
    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Site',
      default: null,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Worker', workerSchema)
```

**Status Meanings**:
- `available`: Not currently assigned to any site
- `assigned`: Currently working on a site
- `inactive`: Not available for work

---

### `/backend/models/Site.js` - Site Schema

**Purpose**: Defines structure of construction site documents

```javascript
const siteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },      // e.g., Skyline Tower
    location: { type: String, required: true, trim: true },  // e.g., Downtown District
    
    // Site progression status
    status: {
      type: String,
      enum: ['active', 'completed', 'upcoming'],
      default: 'active',
    },
    
    // Array of worker references assigned to this site
    workers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worker',
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model('Site', siteSchema)
```

**Note**: The `workers` array stores MongoDB ObjectIds, allowing bulk retrieval of workers at a site using `.populate('workers')`.

---

### `/backend/models/Attendance.js` - Attendance Schema

**Purpose**: Records daily attendance of workers

```javascript
const attendanceSchema = new mongoose.Schema(
  {
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worker',
      required: true,
    },
    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Site',
      required: true,
    },
    
    // Date of attendance
    date: { type: Date, required: true },
    
    // Attendance status for the day
    status: {
      type: String,
      enum: ['present', 'absent', 'half-day'],
      default: 'present',
    },
  },
  { timestamps: true }
)

// Prevent duplicate attendance entries for same worker on same date
attendanceSchema.index({ worker: 1, date: 1 }, { unique: true })

export default mongoose.model('Attendance', attendanceSchema)
```

**Why the Index?**: The `{ unique: true }` index ensures that each worker can only have one attendance record per day, preventing duplicates.

---

### `/backend/models/Payment.js` - Payment Schema

**Purpose**: Records wage payments to workers

```javascript
const paymentSchema = new mongoose.Schema(
  {
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worker',
      required: true,
    },
    
    // Amount paid in rupees
    amount: { type: Number, required: true },
    
    // Date of payment
    date: { type: Date, default: Date.now },
    
    // Payment status
    status: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending',
    },
    
    // Optional note (e.g., "Weekly salary - Skyline Tower")
    note: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
)

export default mongoose.model('Payment', paymentSchema)
```

---

### `/backend/models/Contact.js` - Contact Schema

**Purpose**: Stores contact form submissions from website visitors

```javascript
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    service: { type: String, trim: true },  // e.g., "Labour Supply"
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
)

export default mongoose.model('Contact', contactSchema)
```

---

### `/backend/middleware/auth.js` - Authentication & Authorization

**Purpose**: JWT verification and role-based access control

```javascript
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Middleware: Check if user has required role(s)
export const authorize = (...roles) => {
  return (req, res, next) => {
    // req.user is set by protect() middleware
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Not authorized for this action' })
    }
    next()
  }
}

// Middleware: Verify JWT token and attach user to request
export const protect = async (req, res, next) => {
  try {
    let token

    // Extract token from "Authorization: Bearer <token>" header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]  // Get token after "Bearer "
    }

    // If no token, return 401 (not authenticated)
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' })
    }

    // Verify JWT signature and expiration
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Fetch user from database (without password)
    req.user = await User.findById(decoded.id).select('-password')

    if (!req.user) {
      return res.status(401).json({ message: 'User not found' })
    }

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token invalid' })
  }
}
```

**How It Works**:
1. Frontend sends request with header: `Authorization: Bearer <token>`
2. `protect()` extracts token, verifies signature
3. Decoded JWT contains user ID
4. User document is fetched from database
5. `req.user` is set for use in controllers
6. `authorize()` checks if user's role is in allowed roles

---

### `/backend/middleware/errorHandler.js` - Error Handling

**Purpose**: Centralized error handling for all routes

```javascript
export const errorHandler = (err, _req, res, _next) => {
  console.error(err.stack)

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message)
    return res.status(400).json({ message: messages.join(', ') })
  }

  // Handle Mongoose duplicate key errors (e.g., duplicate email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    return res.status(400).json({ message: `${field} already exists` })
  }

  // Handle bad ObjectId format
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format' })
  }

  // Generic error response
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal server error',
  })
}
```

**Benefits**: Instead of repeating error handling in each route, this middleware catches all errors and formats consistent responses.

---

### `/backend/controllers/authController.js` - Authentication Logic

**Purpose**: Handles user login, signup, and profile endpoints

```javascript
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const ADMIN_EMAIL = 'rushabh@dreambuilders.com'  // Only admin who can log in as admin

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })

// POST /api/auth/register
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' })
    }

    // Only supervisors and contractors can self-register (admin is restricted)
    const allowedRoles = ['supervisor', 'contractor']
    if (role && !allowedRoles.includes(role)) {
      return res.status(400).json({
        message: 'Only supervisors and contractors can register. Admin access is restricted.',
      })
    }

    // Check if email already exists
    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    // Create new user (password auto-hashed by pre-save hook)
    const user = await User.create({ name, email, password, role })
    
    // Generate JWT token valid for 30 days
    const token = signToken(user._id)

    res.status(201).json({ token, user })
  } catch (error) {
    next(error)
  }
}

// POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' })
    }

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Compare provided password with hashed password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Verify role matches user's actual role
    if (role && user.role !== role) {
      if (role === 'admin') {
        return res.status(403).json({
          message: 'Admin access denied. Only authorized personnel can access the Admin panel.',
        })
      }
      return res.status(403).json({
        message: `Access denied. Your account is registered as "${user.role}", not "${role}".`,
      })
    }

    // Extra security: Only designated admin email can have admin role
    if (user.role === 'admin' && user.email !== ADMIN_EMAIL) {
      return res.status(403).json({
        message: 'Admin access denied. This account does not have admin privileges.',
      })
    }

    // Generate JWT token
    const token = signToken(user._id)
    res.json({ token, user })
  } catch (error) {
    next(error)
  }
}

// GET /api/auth/me (protected)
export const getMe = async (req, res) => {
  res.json(req.user)  // req.user set by protect middleware
}
```

**Security Features**:
- Passwords are hashed with bcrypt
- Admin role restricted to one specific email
- Tokens expire after 30 days
- Role verification on every login

---

### `/backend/controllers/workerController.js` - Worker Management

**Purpose**: CRUD operations for workers

```javascript
import Worker from '../models/Worker.js'

// GET /api/workers
export const getWorkers = async (req, res, next) => {
  try {
    // Fetch all workers, populate site reference, sort by newest first
    const workers = await Worker.find()
      .populate('site', 'name location')  // Include site name & location
      .sort('-createdAt')
    res.json(workers)
  } catch (error) {
    next(error)
  }
}

// GET /api/workers/:id
export const getWorker = async (req, res, next) => {
  try {
    const worker = await Worker.findById(req.params.id)
      .populate('site', 'name location')
    if (!worker) return res.status(404).json({ message: 'Worker not found' })
    res.json(worker)
  } catch (error) {
    next(error)
  }
}

// POST /api/workers
export const createWorker = async (req, res, next) => {
  try {
    const { name, phone, skill, dailyWage, status, site } = req.body
    
    // Create worker with provided fields
    const worker = await Worker.create({
      name,
      phone,
      skill,
      dailyWage,
      status,
      site,
    })
    res.status(201).json(worker)
  } catch (error) {
    next(error)
  }
}

// PUT /api/workers/:id
export const updateWorker = async (req, res, next) => {
  try {
    // Update worker and run validators, return new document
    const worker = await Worker.findByIdAndUpdate(req.params.id, req.body, {
      new: true,            // Return updated document
      runValidators: true,  // Validate before update
    }).populate('site', 'name location')
    
    if (!worker) return res.status(404).json({ message: 'Worker not found' })
    res.json(worker)
  } catch (error) {
    next(error)
  }
}

// DELETE /api/workers/:id
export const deleteWorker = async (req, res, next) => {
  try {
    const worker = await Worker.findByIdAndDelete(req.params.id)
    if (!worker) return res.status(404).json({ message: 'Worker not found' })
    res.json({ message: 'Worker deleted' })
  } catch (error) {
    next(error)
  }
}
```

**Explanation**:
- `.populate()` replaces the site ObjectId with actual site data
- `.sort('-createdAt')` sorts by creation date (newest first)
- `findByIdAndUpdate()` with `new: true` returns updated document
- Error handling delegates to middleware

---

### `/backend/controllers/siteController.js` - Site Management

**Purpose**: CRUD for sites + worker assignment/unassignment

```javascript
import Site from '../models/Site.js'
import Worker from '../models/Worker.js'

// GET /api/sites
export const getSites = async (req, res, next) => {
  try {
    const sites = await Site.find()
      .populate('workers', 'name skill status phone dailyWage')
      .sort('-createdAt')
    res.json(sites)
  } catch (error) {
    next(error)
  }
}

// GET /api/sites/:id
export const getSite = async (req, res, next) => {
  try {
    const site = await Site.findById(req.params.id)
      .populate('workers', 'name skill status phone dailyWage')
    if (!site) return res.status(404).json({ message: 'Site not found' })
    res.json(site)
  } catch (error) {
    next(error)
  }
}

// POST /api/sites/:id/assign — Assign worker to site
export const assignWorker = async (req, res, next) => {
  try {
    const { workerId } = req.body
    const site = await Site.findById(req.params.id)
    if (!site) return res.status(404).json({ message: 'Site not found' })

    const worker = await Worker.findById(workerId)
    if (!worker) return res.status(404).json({ message: 'Worker not found' })

    // Add worker to site's workers array if not already there
    if (!site.workers.includes(workerId)) {
      site.workers.push(workerId)
      await site.save()
    }

    // Update worker's site reference and status
    worker.site = site._id
    worker.status = 'assigned'
    await worker.save()

    // Return site with populated workers
    const populated = await site.populate('workers', 'name skill status')
    res.json(populated)
  } catch (error) {
    next(error)
  }
}

// POST /api/sites/:id/unassign — Remove worker from site
export const unassignWorker = async (req, res, next) => {
  try {
    const { workerId } = req.body
    const site = await Site.findById(req.params.id)
    if (!site) return res.status(404).json({ message: 'Site not found' })

    // Remove worker from site's array
    site.workers = site.workers.filter((w) => w.toString() !== workerId)
    await site.save()

    // Update worker to have no site and available status
    await Worker.findByIdAndUpdate(workerId, {
      site: null,
      status: 'available',
    })

    // Return updated site
    const populated = await site.populate('workers', 'name skill status')
    res.json(populated)
  } catch (error) {
    next(error)
  }
}

// Similar CRUD methods: createSite, updateSite, deleteSite...
```

**Key Concept**: When assigning a worker to a site:
1. Add worker's ObjectId to site's `workers` array
2. Update worker's `site` field with site's ObjectId
3. Change worker's status from "available" to "assigned"

---

### `/backend/controllers/attendanceController.js` - Attendance Tracking

**Purpose**: Mark and retrieve attendance records

```javascript
import Attendance from '../models/Attendance.js'

// POST /api/attendance — Mark attendance
export const markAttendance = async (req, res, next) => {
  try {
    const { records } = req.body  // [{ worker, site, date, status }]

    if (Array.isArray(records)) {
      // Bulk mark attendance (multiple workers at once)
      const results = []
      for (const record of records) {
        // findOneAndUpdate with upsert: create if doesn't exist, update if does
        const existing = await Attendance.findOneAndUpdate(
          { worker: record.worker, date: record.date },  // Find condition
          { ...record },                                   // Update data
          {
            upsert: true,      // Insert if not found
            new: true,         // Return updated document
            runValidators: true,
          }
        )
        results.push(existing)
      }
      return res.status(201).json(results)
    }

    // Single mark (one worker)
    const { worker, site, date, status } = req.body
    const attendance = await Attendance.findOneAndUpdate(
      { worker, date },
      { worker, site, date, status },
      { upsert: true, new: true, runValidators: true }
    )
    res.status(201).json(attendance)
  } catch (error) {
    next(error)
  }
}

// GET /api/attendance?date=YYYY-MM-DD — Get daily attendance
export const getDailyAttendance = async (req, res, next) => {
  try {
    const { date } = req.query
    const query = {}

    if (date) {
      // Convert date string to date range (00:00:00 to 23:59:59)
      const start = new Date(date)
      start.setHours(0, 0, 0, 0)
      const end = new Date(date)
      end.setHours(23, 59, 59, 999)
      query.date = { $gte: start, $lte: end }
    }

    const records = await Attendance.find(query)
      .populate('worker', 'name skill phone')
      .populate('site', 'name')
      .sort('-date')
    res.json(records)
  } catch (error) {
    next(error)
  }
}

// GET /api/attendance/worker/:workerId — Get worker's attendance history
export const getWorkerAttendance = async (req, res, next) => {
  try {
    const records = await Attendance.find({ worker: req.params.workerId })
      .populate('site', 'name')
      .sort('-date')
    res.json(records)
  } catch (error) {
    next(error)
  }
}
```

**MongoDB Operators Used**:
- `$gte`: Greater than or equal
- `$lte`: Less than or equal
- These create a date range query

---

### `/backend/controllers/paymentController.js` - Payment Processing

**Purpose**: Manage wage payment records

```javascript
import Payment from '../models/Payment.js'

// GET /api/payments?status=pending&worker=ID
export const getPayments = async (req, res, next) => {
  try {
    const filter = {}
    if (req.query.status) filter.status = req.query.status
    if (req.query.worker) filter.worker = req.query.worker

    const payments = await Payment.find(filter)
      .populate('worker', 'name skill phone')
      .sort('-createdAt')
    res.json(payments)
  } catch (error) {
    next(error)
  }
}

// POST /api/payments — Record new payment
export const createPayment = async (req, res, next) => {
  try {
    const { worker, amount, date, status, note } = req.body
    const payment = await Payment.create({
      worker,
      amount,
      date,
      status,
      note,
    })
    const populated = await payment.populate('worker', 'name skill phone')
    res.status(201).json(populated)
  } catch (error) {
    next(error)
  }
}

// PUT /api/payments/:id — Update payment status
export const updatePayment = async (req, res, next) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('worker', 'name skill phone')
    
    if (!payment) return res.status(404).json({ message: 'Payment not found' })
    res.json(payment)
  } catch (error) {
    next(error)
  }
}
```

---

### `/backend/controllers/dashboardController.js` - Analytics & Statistics

**Purpose**: Provides real-time statistics for dashboards

```javascript
import Worker from '../models/Worker.js'
import Site from '../models/Site.js'
import Attendance from '../models/Attendance.js'
import Payment from '../models/Payment.js'

// GET /api/dashboard/stats (protected)
export const getStats = async (req, res, next) => {
  try {
    // Count total workers
    const totalWorkers = await Worker.countDocuments()
    
    // Count active sites
    const activeSites = await Site.countDocuments({ status: 'active' })

    // Count today's attendance (present only)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const todayAttendance = await Attendance.countDocuments({
      date: { $gte: today, $lt: tomorrow },
      status: 'present',
    })

    // Count pending payments
    const pendingPayments = await Payment.countDocuments({ status: 'pending' })

    // Worker breakdown by status
    const availableWorkers = await Worker.countDocuments({ status: 'available' })
    const assignedWorkers = await Worker.countDocuments({ status: 'assigned' })
    const inactiveWorkers = await Worker.countDocuments({ status: 'inactive' })

    // Calculate total paid amount using aggregation pipeline
    const paidAgg = await Payment.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ])
    
    // Calculate total pending amount
    const pendingAgg = await Payment.aggregate([
      { $match: { status: 'pending' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ])

    res.json({
      totalWorkers,
      activeSites,
      todayAttendance,
      pendingPayments,
      availableWorkers,
      assignedWorkers,
      inactiveWorkers,
      totalPaid: paidAgg[0]?.total || 0,
      totalPending: pendingAgg[0]?.total || 0,
    })
  } catch (error) {
    next(error)
  }
}

// GET /api/dashboard/public-stats (no auth)
export const getPublicStats = async (_req, res, next) => {
  try {
    // Public statistics shown on homepage
    const totalWorkers = await Worker.countDocuments()
    const activeSites = await Site.countDocuments({ status: 'active' })
    const completedProjects = await Site.countDocuments({ status: 'completed' })

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const todayPresent = await Attendance.countDocuments({
      date: { $gte: today, $lt: tomorrow },
      status: 'present',
    })

    const pendingPayments = await Payment.countDocuments({ status: 'pending' })

    res.json({
      totalWorkers,
      activeSites,
      completedProjects,
      todayPresent,
      pendingPayments,
    })
  } catch (error) {
    next(error)
  }
}
```

**MongoDB Aggregation Pipeline**: The `$group` operator sums payment amounts for statistics.

---

### `/backend/routes/auth.js`, `/backend/routes/workers.js`, etc. - API Routes

**Purpose**: Define API endpoints and bind them to controllers with authorization

```javascript
// routes/auth.js
import { Router } from 'express'
import { register, login, getMe } from '../controllers/authController.js'
import { protect } from '../middleware/auth.js'

const router = Router()

router.post('/register', register)          // Public
router.post('/login', login)                // Public
router.get('/me', protect, getMe)           // Protected

export default router
```

```javascript
// routes/workers.js
import { Router } from 'express'
import { getWorkers, getWorker, createWorker, updateWorker, deleteWorker } from '../controllers/workerController.js'
import { protect, authorize } from '../middleware/auth.js'

const router = Router()

// All routes require authentication
router.use(protect)

// All roles can READ
router.get('/', authorize('admin', 'supervisor', 'contractor'), getWorkers)
router.get('/:id', authorize('admin', 'supervisor', 'contractor'), getWorker)

// Only admin & contractor can CREATE/UPDATE/DELETE
router.post('/', authorize('admin', 'contractor'), createWorker)
router.put('/:id', authorize('admin', 'contractor'), updateWorker)
router.delete('/:id', authorize('admin', 'contractor'), deleteWorker)

export default router
```

**Authorization Pattern**:
- `router.use(protect)` — All routes need authentication
- `authorize('role1', 'role2')` — Only these roles can access
- Different endpoints have different role restrictions

---

### `/backend/server.js` - Express App Entry Point

**Purpose**: Main server setup and route registration

```javascript
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import connectDB from './config/db.js'

// Route imports
import authRoutes from './routes/auth.js'
import workerRoutes from './routes/workers.js'
import siteRoutes from './routes/sites.js'
import attendanceRoutes from './routes/attendance.js'
import paymentRoutes from './routes/payments.js'
import contactRoutes from './routes/contact.js'
import dashboardRoutes from './routes/dashboard.js'

// Middleware imports
import { errorHandler } from './middleware/errorHandler.js'
import { seedDatabase } from './seed.js'

// Setup __dirname in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// ─── Middleware ───
app.use(cors())                  // Enable cross-origin requests
app.use(express.json())          // Parse JSON request bodies

// ─── Root endpoint (info)───
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
  })
})

// ─── API Routes ───
app.use('/api/auth', authRoutes)
app.use('/api/workers', workerRoutes)
app.use('/api/sites', siteRoutes)
app.use('/api/attendance', attendanceRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/dashboard', dashboardRoutes)

// ─── Serve frontend in production ───
if (process.env.NODE_ENV === 'production') {
  // Serve built React frontend
  const frontendDist = path.join(__dirname, '..', 'frontend', 'dist')
  app.use(express.static(frontendDist))
  
  // SPA fallback: all routes serve index.html
  app.get('*', (_req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'))
  })
}

// ─── Error handler (must be last) ───
app.use(errorHandler)

// ─── Start server ───
connectDB().then(async () => {
  // Auto-seed database if using in-memory DB
  if (process.env.USE_IN_MEMORY_DB === 'true') {
    await seedDatabase()
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  })
})
```

**Execution Order**:
1. Load environment variables
2. Connect to database
3. Auto-seed if in-memory mode
4. Start server on port 5000/5001

---

### `/backend/seed.js` - Sample Data Initialization

**Purpose**: Populates database with realistic test data

```javascript
export async function seedDatabase() {
  // Skip if data exists (prevents duplicates)
  const existingWorkers = await Worker.countDocuments()
  if (existingWorkers > 0) {
    console.log('📦 Database already has data — skipping seed.')
    return
  }

  // 1. Create sample users
  const users = await User.create([
    {
      name: 'Arinjay (Admin)',
      email: 'arinjay@dreambuilders.com',
      password: 'Admin@123',
      role: 'admin',
    },
    // ... more users
  ])

  // 2. Create sample sites
  const sites = await Site.create([
    { name: 'Skyline Tower', location: 'Downtown', status: 'active' },
    // ... more sites
  ])

  // 3. Create sample workers with site assignments
  const workers = await Worker.create([
    {
      name: 'Ramesh Yadav',
      phone: '9876543210',
      skill: 'Mason',
      dailyWage: 900,
      status: 'assigned',
      site: sites[0]._id,
    },
    // ... more workers
  ])

  // 4. Assign workers to sites
  sites[0].workers = workers.slice(0, 4).map((w) => w._id)
  await sites[0].save()

  // 5. Create attendance records (last 10 days)
  for (let day = 0; day < 10; day++) {
    const date = daysAgo(day)
    for (const worker of assignedWorkers) {
      attendanceRecords.push({
        worker: worker._id,
        site: worker.site,
        date,
        status: pick(['present', 'absent', 'half-day']),
      })
    }
  }

  // 6. Create payment records (mix of paid & pending)
  // ... payment creation

  console.log('✅ Database seeded successfully')
}
```

**Why Seeding?**: Makes development easier by providing instant test data without manual entry.

---

## Frontend File-by-File Explanation

### `/frontend/package.json` - Frontend Dependencies

```json
{
  "type": "module",
  "scripts": {
    "dev": "vite",                  // Start dev server
    "build": "vite build",          // Build for production
    "lint": "eslint .",             // Check code style
    "preview": "vite preview"       // Preview production build
  },
  "dependencies": {
    "react": "^19.2.4",             // UI library
    "react-dom": "^19.2.4",         // React DOM rendering
    "react-router-dom": "^7.13.1",  // Client-side routing
    "axios": "^1.13.6",             // HTTP client
    "lucide-react": "^0.577.0"      // Icon library
  },
  "devDependencies": {
    "vite": "^8.0.0",               // Build tool
    "@vitejs/plugin-react": "^6.0.0", // React support for Vite
    "tailwindcss": "^3.4.17",       // CSS framework
    "eslint": "^9.39.4"             // Code linter
  }
}
```

---

### `/frontend/vite.config.js` - Build Configuration

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirect /api/* requests to backend
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
```

**Why the Proxy?**: During development, frontend runs on Vite (port 5173) and backend on Express (port 5000). The proxy makes API calls from frontend appear to come from same origin, bypassing CORS issues.

---

### `/frontend/src/lib/api.js` - Axios HTTP Client

```javascript
import axios from 'axios'

// Create an Axios instance with baseURL
export const api = axios.create({
  baseURL: '/api',      // All requests go to /api/...
  timeout: 20000,       // 20 second timeout
})

// Token is added dynamically in AuthContext
```

**Benefits**:
- Centralized API configuration
- Token automatically included in Authorization header
- Consistent error handling

---

### `/frontend/src/context/AuthContextInstance.js` - Context Creation

```javascript
import { createContext } from 'react'

export const AuthContext = createContext()
```

This just creates the context object. The actual logic is in `AuthContext.jsx`.

---

### `/frontend/src/context/AuthContext.jsx` - State Management

```javascript
import { useState, useEffect } from 'react'
import { api } from '../lib/api'
import { AuthContext } from './AuthContextInstance'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))  // Persist token
  const [loading, setLoading] = useState(true)

  // Attach token to every API request
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      localStorage.setItem('token', token)
    } else {
      delete api.defaults.headers.common['Authorization']
      localStorage.removeItem('token')
    }
  }, [token])

  // Fetch current user on app load
  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setLoading(false)
        return
      }
      try {
        const { data } = await api.get('/auth/me')
        setUser(data)
      } catch {
        setToken(null)      // Invalid token
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [])

  const login = async (email, password, role) => {
    const { data } = await api.post('/auth/login', { email, password, role })
    setToken(data.token)
    setUser(data.user)
    return data
  }

  const signup = async (name, email, password, role) => {
    const { data } = await api.post('/auth/register', { name, email, password, role })
    setToken(data.token)
    setUser(data.user)
    return data
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
```

**State Persistence**:
- Token stored in `localStorage` so user stays logged in after refresh
- On app load, token is retrieved from `localStorage`
- `useEffect` fetches user info from backend using token

---

### `/frontend/src/context/useAuth.js` - Custom Hook

```javascript
import { useContext } from 'react'
import { AuthContext } from './AuthContextInstance'

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
```

**Usage**: Components use `const { user, login, logout } = useAuth()` to access auth state.

---

### `/frontend/src/main.jsx` - React Entry Point

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>             {/* Enable client-side routing */}
      <AuthProvider>            {/* Provide auth context */}
        <App />                 {/* Main app component */}
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
```

**Provider Nesting**:
1. `BrowserRouter` — Enables React Router
2. `AuthProvider` — Provides auth context
3. `App` — Main component with routes

This nesting ensures all components can access auth state and routing.

---

### `/frontend/src/App.jsx` - Main Routes

```javascript
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout.jsx'
import { ProtectedRoute } from './components/layout/ProtectedRoute.jsx'
// ... page imports

export default function App() {
  return (
    <Routes>
      {/* Auth pages — no shared layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Admin dashboard — full-screen */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Main app with shared layout */}
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Protected routes with role checks */}
        <Route
          path="/labour"
          element={
            <ProtectedRoute allowedRoles={['admin', 'supervisor', 'contractor']}>
              <LabourDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/labour/workers"
          element={
            <ProtectedRoute allowedRoles={['admin', 'contractor']}>
              <WorkersPage />
            </ProtectedRoute>
          }
        />
        {/* More routes... */}
      </Route>
    </Routes>
  )
}
```

**Routing Structure**:
- **Full-screen routes**: `/login`, `/signup`, `/admin` (no navbar/footer)
- **Shared layout routes**: Everything wrapped in `<AppLayout/>` (navbar/footer)
- **Protected routes**: Wrapped in `<ProtectedRoute>` with role validation

---

### `/frontend/src/components/layout/ProtectedRoute.jsx` - Role-Based Access

```javascript
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

export function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-brand-yellow" />
      </div>
    )
  }

  // Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // User's role not allowed → redirect
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const fallback = user.role === 'admin' ? '/admin' : '/'
    return <Navigate to={fallback} replace />
  }

  return children
}
```

**How It Works**:
1. Check if token is loading
2. If no user, redirect to login
3. If user role not in `allowedRoles`, redirect to appropriate fallback
4. Otherwise, render the protected page

---

### `/frontend/src/components/layout/AppLayout.jsx` - Shared Layout

```javascript
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar.jsx'
import { Footer } from './Footer.jsx'

export function AppLayout() {
  return (
    <div className="min-h-dvh bg-slate-50 bg-grid-soft">
      <Navbar />
      <main>
        <Outlet />      {/* Renders current page */}
      </main>
      <Footer />
    </div>
  )
}
```

**`<Outlet/>`**: Renders whichever route is currently active within this layout.

---

### `/frontend/src/pages/LoginPage.jsx` - Authentication UI

**Purpose**: Allows users to log in with role selection

```javascript
export function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '', role: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.role) {
      setError('Please select your role')
      return
    }
    setError('')
    setLoading(true)
    try {
      const data = await login(form.email, form.password, form.role)
      
      // Route based on role
      if (data.user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/labour')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    // Form with email, password, role selection
    // Left panel: branding
    // Right panel: login form
  )
}
```

**Features**:
- Role selection before login (admin, supervisor, contractor)
- Different styling for each role
- Redirects to appropriate dashboard after login

---

### `/frontend/src/pages/HomePage.jsx` - Landing Page

**Purpose**: Displays public information and live statistics

```javascript
export function HomePage() {
  const [liveStats, setLiveStats] = useState(null)

  useEffect(() => {
    // Fetch public statistics (no auth required)
    api.get('/dashboard/public-stats')
      .then(({ data }) => setLiveStats(data))
      .catch(() => {})
  }, [])

  return (
    <div>
      {/* Hero section with call-to-action */}
      {/* Features section */}
      {/* Live statistics from database */}
      {/* Services section */}
      {/* Projects showcase */}
      {/* Contact CTA */}
    </div>
  )
}
```

**Dynamic Stats**: Uses `liveStats` from API showing:
- Total workers
- Active sites
- Today's attendance
- Pending payments

---

### `/frontend/src/pages/AdminDashboardPage.jsx` - Admin Dashboard

**Purpose**: Comprehensive admin view with all system data

```javascript
export function AdminDashboardPage() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  
  const [stats, setStats] = useState({...})
  const [workers, setWorkers] = useState([])
  const [sites, setSites] = useState([])
  const [enquiries, setEnquiries] = useState([])

  useEffect(() => {
    async function fetchAll() {
      try {
        const [statsRes, workersRes, sitesRes, enquiriesRes] = await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/workers'),
          api.get('/sites'),
          api.get('/contact'),
        ])
        setStats(statsRes.data)
        setWorkers(workersRes.data)
        setSites(sitesRes.data)
        setEnquiries(enquiriesRes.data)
      } catch (err) {
        console.error('Failed to fetch:', err)
      }
    }
    fetchAll()
  }, [])

  // Three tabs: overview, sites/workers, contact enquiries
  // Shows comprehensive statistics and data tables
}
```

**Queries**: Fetches all data in parallel using `Promise.all()` for performance.

---

### `/frontend/src/pages/LabourDashboardPage.jsx` - Supervisor Dashboard

**Purpose**: Limited view for supervisors and contractors

```javascript
export function LabourDashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({...})
  const [activity, setActivity] = useState({...})

  useEffect(() => {
    // Fetch protected stats
    api.get('/dashboard/stats')
      .then(({ data }) => setStats(data))
  }, [])

  // Show role-specific action links
  const quickActions = allActions.filter(
    (a) => user?.role === 'admin' || a.roles.includes(user?.role)
  )

  return (
    <div>
      {/* Role badge */}
      {/* Key statistics cards */}
      {/* Role-specific action links */}
      {/* Recent activity */}
    </div>
  )
}
```

**Role-Specific Actions**: Only shows relevant sections based on user role.

---

### `/frontend/src/pages/dashboard/WorkersPage.jsx` - Worker Management

**Purpose**: CRUD interface for workers

```javascript
export function WorkersPage() {
  const [workers, setWorkers] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', skill: '', dailyWage: '' })
  const [editing, setEditing] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if (editing) {
        await api.put(`/workers/${editing._id}`, form)
      } else {
        await api.post('/workers', form)
      }
      fetchWorkers()
      setModalOpen(false)
    } catch (err) {
      alert(err.response?.data?.message)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this worker?')) return
    try {
      await api.delete(`/workers/${id}`)
      fetchWorkers()
    } catch (err) {
      alert(err.response?.data?.message)
    }
  }

  return (
    <div>
      {/* Search input */}
      {/* Worker cards with actions */}
      {/* Modal for add/edit form */}
    </div>
  )
}
```

**CRUD Operations**:
- **Create**: `api.post('/workers', form)`
- **Read**: `api.get('/workers')`
- **Update**: `api.put('/workers/:id', form)`
- **Delete**: `api.delete('/workers/:id')`

---

### `/frontend/src/pages/dashboard/SitesPage.jsx` - Site Management

**Purpose**: Manage sites and assign workers

```javascript
export function SitesPage() {
  const [sites, setSites] = useState([])
  const [workers, setWorkers] = useState([])
  const [assignModal, setAssignModal] = useState(null)
  const [selectedWorker, setSelectedWorker] = useState('')

  async function handleAssign() {
    try {
      await api.post(`/sites/${assignModal._id}/assign`, {
        workerId: selectedWorker,
      })
      fetchData()
      setAssignModal(null)
    } catch (err) {
      alert(err.response?.data?.message)
    }
  }

  async function handleUnassign(siteId, workerId) {
    try {
      await api.post(`/sites/${siteId}/unassign`, {
        workerId,
      })
      fetchData()
    } catch (err) {
      alert(err.response?.data?.message)
    }
  }

  return (
    <div>
      {/* Site cards */}
      {/* Worker list for each site */}
      {/* Assign/unassign actions */}
    </div>
  )
}
```

**Key Endpoints**:
- `POST /api/sites/:id/assign` — Assign worker to site
- `POST /api/sites/:id/unassign` — Remove worker from site

---

### `/frontend/src/pages/dashboard/AttendancePage.jsx` - Attendance Marking

**Purpose**: Daily attendance tracking interface

```javascript
export function AttendancePage() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [workers, setWorkers] = useState([])
  const [attendance, setAttendance] = useState({})

  useEffect(() => {
    async function load() {
      const [workersRes, attendanceRes] = await Promise.all([
        api.get('/workers'),
        api.get(`/attendance?date=${date}`),
      ])
      
      // Build attendance map: { workerId: { status, site } }
      const map = {}
      for (const r of attendanceRes.data) {
        map[r.worker._id] = { status: r.status, site: r.site._id }
      }
      setAttendance(map)
    }
    load()
  }, [date])

  function toggleStatus(workerId) {
    // Cycle: absent → present → half-day → absent
    const current = attendance[workerId]?.status || 'absent'
    const next = current === 'absent' ? 'present' : 
                 current === 'present' ? 'half-day' : 'absent'
    
    setAttendance(prev => ({
      ...prev,
      [workerId]: { ...prev[workerId], status: next }
    }))
  }

  async function handleSave() {
    const records = Object.entries(attendance).map(([workerId, data]) => ({
      worker: workerId,
      site: data.site,
      date,
      status: data.status,
    }))
    
    await api.post('/attendance', { records })
  }

  return (
    // Date picker
    // Table: Worker name, 3 status buttons (Present/Absent/Half-day), Site
    // Save button
  )
}
```

**Status Toggle Logic**: Cycles through three states with each click.

---

### `/frontend/src/pages/ContactPage.jsx` - Contact Form

**Purpose**: Public contact form for enquiries

```javascript
export function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/contact', form)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', service: '', message: '' })
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    // Form with fields: name, email, phone, service dropdown, message
    // Success/error messages
    // Contact info sidebar
  )
}
```

**Form Submission**: Sends to `/api/contact` endpoint (no auth required).

---

### `/frontend/src/components/ui/*.jsx` - Reusable Components

**Button.jsx**:
```javascript
export function Button({ to, variant = 'primary', children, ...props }) {
  if (to) {
    return <Link to={to} className="btn btn-{variant}">{children}</Link>
  }
  return <button className="btn btn-{variant}" {...props}>{children}</button>
}
```

**Card.jsx**:
```javascript
export function Card({ title, children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
      {title && <h3 className="text-lg font-bold">{title}</h3>}
      {children}
    </div>
  )
}
```

These are simple, reusable UI components used throughout the application.

---

## Data Flow & API Lifecycle

### Complete Flow Example: Logging In

```
┌─────────────────────────────┐
│ User enters email & password│
└──────────────┬──────────────┘
               │
               ▼
    ┌──────────────────────┐
    │ Frontend (LoginPage) │
    │ Calls: login(email, password, role)
    │ (from AuthContext)
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ Axios sends POST request │
    │ POST /api/auth/login     │
    │ Body: { email, password, role }
    │ No Authorization header  │
    │ (not logged in yet)
    └──────────┬───────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ Express receives request │
    │ Routes to authController │
    └──────────┬───────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ authController.login()   │
    │ 1. Find user by email    │
    │ 2. Compare password      │
    │       (bcrypt)
    │ 3. Verify role matches   │
    │ 4. Generate JWT token    │
    │    jwt.sign({ id }, ...) │
    │ 5. Return { token, user }│
    └──────────┬───────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ Frontend receives response
    │ Stores token in localStorage
    │ Sets Authorization header
    │ Sets user state
    └──────────┬───────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ User navigated to        │
    │ /labour or /admin        │
    │ (based on role)
    └──────────────────────────┘
```

### API Request with Authentication

```
Frontend sends:
  GET /api/dashboard/stats
  Authorization: Bearer <token>

Backend receives & validates:
  1. Extract token: "Bearer <token>" → "<token>"
  2. verify(token, JWT_SECRET) → { id: userId }
  3. User.findById(userId) → get user object
  4. Attach to req.user
  5. Continue to next middleware

Controller executes:
  getStats() → Query MongoDB
                ↓
  Return compiled stats as JSON

Frontend receives & updates:
  Save data in state (setStats)
  Re-render components
  Display updated UI
```

---

## Important Concepts

### 1. Authentication (JWT)

**What is JWT?**
- Token-based authentication
- No server-side session storage
- Stateless and scalable

**How it works**:
```javascript
// Backend generates:
const token = jwt.sign({ id: user._id }, secret, { expiresIn: '30d' })
// Token: header.payload.signature

// Frontend stores:
localStorage.setItem('token', token)

// Frontend sends on each request:
Authorization: Bearer <token>

// Backend verifies:
jwt.verify(token, secret) → { id: userId }
```

**Benefits**:
- User stays logged in across page refreshes (localStorage)
- No cookies needed (good for APIs)
- Different domains can use same token (CORS-friendly)

---

### 2. Role-Based Access Control (RBAC)

**Three Roles**:

| Role | Permissions |
|------|------------|
| **Admin** | Everything. Manage all workers, sites, payments, contacts. |
| **Supervisor** | Manage sites, mark attendance, manage payments. |
| **Contractor** | Manage own workers, manage payments. |

**Implementation**:
```javascript
// In routes:
router.post('/workers', authorize('admin', 'contractor'), createWorker)
// Only admin and contractor can create workers

// In frontend:
<Route
  path="/labour/workers"
  element={
    <ProtectedRoute allowedRoles={['admin', 'contractor']}>
      <WorkersPage />
    </ProtectedRoute>
  }
/>
```

---

### 3. State Management (React Context)

**Why Context?**
- Simple global state without Redux
- Perfect for auth state
- Accessed via `useAuth()` hook

**Pattern**:
```javascript
// Provider wraps app
<AuthProvider>
  <App />
</AuthProvider>

// Components consume
const { user, token, login, logout } = useAuth()
```

---

### 4. Database Schema & Relationships

```
User (1) ──→ (many) Worker
User (1) ──→ (many) Payment
User (1) ──→ (many) Attendance

Site (1) ──→ (many) Worker
Site (1) ──→ (many) Attendance

Worker (1) ──→ (many) Attendance
Worker (1) ──→ (many) Payment
```

**MongoDB References**:
```javascript
// In Worker model:
site: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Site'
}

// Usage:
const worker = await Worker.findById(id).populate('site')
// Replaces site ID with full site object
```

---

### 5. Error Handling

**Backend**:
```javascript
try {
  const worker = await Worker.findById(id)
  if (!worker) {
    return res.status(404).json({ message: 'Worker not found' })
  }
  res.json(worker)
} catch (error) {
  next(error)  // Pass to error handler middleware
}

// Error handler:
export const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: '...' })
  }
  // ... more error types
}
```

**Frontend**:
```javascript
try {
  await api.post('/workers', form)
} catch (err) {
  // Error from status code >= 400
  const message = err.response?.data?.message || 'Failed'
  alert(message)
}
```

---

## Execution Flow

### Application Startup

```
1. npm start (backend)
   └─ Load .env variables
   └─ import 'dotenv/config'
   └─ Call connectDB()
      └─ Check USE_IN_MEMORY_DB
      └─ If true, use mongodb-memory-server
      └─ If false, connect to MONGO_URI (MongoDB Atlas)
   └─ If in-memory, call seedDatabase()
      └─ Create sample users, workers, sites, etc.
   └─ app.listen(PORT)
      └─ Server ready to accept requests

2. npm run dev (frontend)
   └─ Vite starts on localhost:5173
   └─ Proxy /api to localhost:5000
```

### User Session Lifecycle

```
1. Page Load
   └─ BrowserRouter wraps App
   └─ AuthProvider initializes
   └─ Check if token in localStorage
   └─ If yes, call GET /api/auth/me
   └─ Fetch current user object
   └─ Render app

2. User visits /login
   └─ No auth needed
   └─ User enters credentials
   └─ Call POST /api/auth/login
   └─ Backend returns { token, user }
   └─ Frontend stores token + user in state
   └─ Redirect to /labour or /admin

3. User navigates to protected page
   └─ ProtectedRoute checks:
      └─ Is loading?
      └─ Is user logged in?
      └─ Does user have correct role?
   └─ If all checks pass, render page
   └─ If fails, redirect to fallback

4. User makes API request
   └─ Axios adds: Authorization: Bearer <token>
   └─ Backend's protect() middleware:
      └─ Extracts token
      └─ Verifies JWT signature
      └─ Gets user ID from token
      └─ Fetches user from DB
      └─ Attaches to req.user
   └─ Controller executes with req.user
   └─ Response returned

5. User logs out
   └─ Call logout() from AuthContext
   └─ Clear token from localStorage
   └─ Clear user from state
   └─ Remove Authorization header
   └─ Redirect to home page
```

---

## Environment Variables

### `/backend/.env`

```bash
# Server port
PORT=5001

# MongoDB connection string (MongoDB Atlas cloud)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=...

# JWT secret key for signing tokens
JWT_SECRET=dreambuilders_jwt_secret_key_2026_change_in_production

# Use in-memory MongoDB for development (no need for cloud DB)
USE_IN_MEMORY_DB=false

# Optional: Database name for in-memory DB
MONGO_DB_NAME=dreambuilders

# Optional: Node environment
NODE_ENV=development
```

### Why These Variables?

- **PORT**: Allows deployment on different ports
- **MONGO_URI**: Database URL (different for dev/prod)
- **JWT_SECRET**: Signing key (keep secret!)
- **USE_IN_MEMORY_DB**: Development flag (fast, no setup)

---

## Diagrams

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     USER BROWSER                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │          React Web Application                    │  │
│  │  - Routes (React Router)                          │  │
│  │  - Components (Pages, UI)                         │  │
│  │  - State: auth Context, local useState            │  │
│  │  - API client: Axios                              │  │
│  └──────────────────┬────────────────────────────────┘  │
└─────────────────────┼──────────────────────────────────┘
                      │
            HTTP/HTTPS │ /api
                      │
┌─────────────────────▼──────────────────────────────────┐
│                 NODE.JS SERVER                          │
│  ┌────────────────────────────────────────────────┐   │
│  │        Express.js Web Framework                │   │
│  │  - Route handlers                              │   │
│  │  - Middleware (auth, CORS, error)              │   │
│  │  - CRUD controllers                            │   │
│  └──────────────────┬─────────────────────────────┘   │
│  ┌──────────────────▼─────────────────────────────┐   │
│  │     Mongoose (ODM Layer)                       │   │
│  │  - Schema validation                           │   │
│  │  - Data relationships                          │   │
│  │  - Query builders                              │   │
│  └──────────────────┬─────────────────────────────┘   │
└─────────────────────┼──────────────────────────────────┘
                      │
                Mongoose │ wire protocol
                      │
┌─────────────────────▼──────────────────────────────────┐
│              MONGODB DATABASE                           │
│  Collections:                                          │
│  - users                                               │
│  - workers                                             │
│  - sites                                               │
│  - attendance                                          │
│  - payments                                            │
│  - contacts                                            │
└────────────────────────────────────────────────────────┘
```

### User Role Access Control

```
┌─────────────────────────────────────────────────────┐
│           LOGIN PAGE                                │
│  Select Role:                                       │
│  [Admin] [Supervisor] [Contractor] [Signup]         │
└──────────┬──────────────────────────────────────────┘
           │
           ├─ Admin ────────→ /admin (AdminDashboardPage)
           │                   Full control panel
           │
           ├─ Supervisor ───→ /labour (LabourDashboardPage)
           │                   ├─ Site management
           │                   ├─ Attendance marking
           │                   └─ Payments
           │
           └─ Contractor ───→ /labour (LabourDashboardPage)
                               ├─ Worker management
                               └─ Payments
```

### Data Update Flow Example: Mark Attendance

```
1. AttendancePage component loads
   ┌─────────────────────┐
   │ Select date         │
   │ Fetch workers       │
   │ Fetch today's marks │
   │ Build attendance map│
   └────────────┬────────┘
                │
2. User clicks status buttons
   ┌─────────────────────┐
   │ toggleStatus()      │
   │ Updates local state │
   │ "absent" → "present"│
   └────────────┬────────┘
                │
3. User clicks "Save"
   ┌──────────────────────────────┐
   │ Build records array:         │
   │ [{ worker, site, date, status}
   │  { worker, site, date, status}
   │  ...]
   │ POST /api/attendance         │
   │ Body: { records }            │
   └────────────┬─────────────────┘
                │
4. Backend receives
   ┌──────────────────────────────┐
   │ attendanceController.mark()  │
   │ For each record:             │
   │   findOneAndUpdate() with    │
   │   upsert: true               │
   │ (create if new, update if ex)│
   └────────────┬─────────────────┘
                │
5. MongoDB stores
   ┌──────────────────────────────┐
   │ Attendance collection        │
   │ Insert/update documents      │
   └────────────┬─────────────────┘
                │
6. Frontend receives response
   ┌──────────────────────────────┐
   │ Show "✓ Saved!" message      │
   │ Optionally refetch to confirm│
   └──────────────────────────────┘
```

### Authentication Middleware Chain

```
Request comes in
│
├─ Middleware 1: cors()
│  └─ Allows cross-origin
│
├─ Middleware 2: express.json()
│  └─ Parse JSON body
│
├─ Router selection: /api/workers
│  │
│  └─ Middleware 3: protect
│     │
│     ├─ Extract Bearer token from header
│     ├─ Verify JWT signature
│     ├─ Get user ID from token
│     ├─ Fetch user from DB
│     ├─ Attach user to req.user
│     └─ Continue
│
│  └─ Middleware 4: authorize('admin', 'contractor')
│     │
│     ├─ Check req.user exists
│     ├─ Check req.user.role in ['admin', 'contractor']
│     └─ Either continue or return 403 Forbidden
│
│  └─ Route Handler: getWorkers()
│     │
│     └─ Execute controller logic
│
└─ Error Handler: errorHandler()
   └─ Catch any errors, format response
```

---

## Summary

This Dream Builders application demonstrates:

1. **Full-Stack Architecture**: React frontend, Node/Express backend, MongoDB database
2. **Authentication**: JWT tokens + role-based access control
3. **REST API**: Proper HTTP methods (GET, POST, PUT, DELETE)
4. **Data Relationships**: MongoDB references and population
5. **State Management**: React Context for global auth state
6. **Error Handling**: Centralized middleware-based approach
7. **Component Structure**: Reusable components + pages pattern
8. **Security**: Password hashing, token verification, role checks

The codebase follows clean, maintainable patterns that scale well. Adding new features (like payment processing APIs or report generation) would follow the same established patterns.

