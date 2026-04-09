# Dream Builders - Quick & Simple Guide

## 🏗️ What Is This?

Dream Builders is a **construction labour management system**. It helps companies:
- Track workers (their skills, wages)
- Manage construction sites
- Record daily attendance
- Track wage payments
- Handle customer enquiries

Think of it as a **dashboard to manage construction workers and projects**.

---

## 🎯 Three User Types

| Role | What They Do |
|------|------------|
| **Admin** | Controls everything (full access) |
| **Supervisor** | Manages sites and worker attendance |
| **Contractor** | Manages workers and payments |

---

## 🛠️ Technology Stack (Simple Version)

### Frontend (What users see)
- **React** → Basic web page framework
- **Tailwind CSS** → Makes things look pretty
- **Vite** → Fast build tool
- **Axios** → Sends requests to backend

### Backend (What makes it work)
- **Node.js + Express** → Web server
- **MongoDB** → Database (stores all data)
- **JWT** → Security tokens (keeps users logged in)
- **Mongoose** → Talk to database

### Database
MongoDB stores 6 types of data:
1. **Users** - Login accounts
2. **Workers** - Labour information
3. **Sites** - Construction projects
4. **Attendance** - Daily check-ins
5. **Payments** - Wage records
6. **Contacts** - Customer enquiries

---

## 📁 Project Structure (Very Simple)

```
Dream-Builders/
│
├── backend/                    # The server (handles logic)
│   ├── models/                # Database structure
│   ├── controllers/           # Business logic
│   ├── routes/                # API endpoints (/api/workers, etc.)
│   ├── middleware/            # Security & error handling
│   └── server.js              # Main server file
│
└── frontend/                  # The website (what users see)
    ├── src/
    │   ├── pages/            # Different page screens
    │   ├── components/       # UI building blocks
    │   ├── context/          # Shared data (login user info)
    │   └── lib/              # Helper functions
    └── index.html            # Main HTML file
```

---

## 🔄 How It Works (Simple Flow)

```
1. User opens website → sees login page
   ↓
2. Enters email, password, and selects role
   ↓
3. Clicks login → sends to backend
   ↓
4. Backend checks password → creates security token
   ↓
5. Frontend stores token → shows dashboard
   ↓
6. All future requests include token (proof you're logged in)
   ↓
7. Backend verifies token → allows action
```

---

## 🚀 Running the Project

### Start Backend
```bash
cd backend
npm install          # Install dependencies
npm start           # Run server on port 5001
```

### Start Frontend (in another terminal)
```bash
cd frontend
npm install          # Install dependencies
npm run dev         # Run on port 5173
```

### Visit Website
Open browser → `http://localhost:5173`

---

## 🔐 How Login Works

**Frontend:**
```javascript
User types email & password
  ↓
Click login button
  ↓
Send to backend: POST /api/auth/login
```

**Backend:**
```javascript
Find user in database
  ↓
Check password matches (using bcrypt encryption)
  ↓
Create JWT token (security pass)
  ↓
Send back: { token, user }
```

**Frontend:**
```javascript
Receive token & user
  ↓
Store token in browser memory
  ↓
Add token to every future request
  ↓
Redirect to dashboard
```

---

## 📊 Main Features Explained

### 1. **Workers Management**
- Add/edit/delete workers
- Track skills, phone, daily wage
- Mark as available, assigned, or inactive

### 2. **Sites Management**
- Create construction sites
- Assign workers to sites
- Remove workers from sites

### 3. **Attendance Tracking**
- Pick a date
- Click worker → select: Present, Absent, Half-day
- Save to database

### 4. **Payment Tracking**
- Record wage payments
- Mark as "pending" or "paid"
- Filter by status

### 5. **Dashboard Analytics**
- See total workers
- Count active sites
- Check today's attendance
- Calculate pending payments

### 6. **Contact Form**
- Customers submit enquiries
- Messages saved to database
- Admin reviews them

---

## 🔗 API Endpoints (What frontend talks to)

```
Auth Routes:
  POST   /api/auth/login           - Login user
  POST   /api/auth/register        - Create account
  GET    /api/auth/me              - Get current user

Worker Routes:
  GET    /api/workers              - Get all workers
  POST   /api/workers              - Add worker
  PUT    /api/workers/:id          - Edit worker
  DELETE /api/workers/:id          - Delete worker

Site Routes:
  GET    /api/sites                - Get all sites
  POST   /api/sites                - Add site
  PUT    /api/sites/:id            - Edit site
  POST   /api/sites/:id/assign     - Assign worker to site
  POST   /api/sites/:id/unassign   - Remove worker

Attendance Routes:
  POST   /api/attendance           - Mark attendance
  GET    /api/attendance?date=...  - Get daily attendance

Payment Routes:
  GET    /api/payments             - Get all payments
  POST   /api/payments             - Create payment
  PUT    /api/payments/:id         - Update payment

Others:
  POST   /api/contact              - Submit contact form
  GET    /api/dashboard/stats      - Get statistics
```

---

## 🎨 Important Concepts in Simple Words

### **JWT Token**
Think of it like a **movie ticket**:
- You buy ticket (login) → get proof you're authorized
- You show ticket (provide token) → they let you in (access API)
- Ticket expires after 30 days → must login again

### **Roles (Admin, Supervisor, Contractor)**
Different permission levels:
- Admin can do EVERYTHING
- Supervisor can manage sites & attendance
- Contractor manages workers & payments

### **Database References**
Workers belong to Sites:
```
Site: "Skyline Tower"
  ├─ Worker 1: Ramesh (Mason)
  ├─ Worker 2: Suresh (Carpenter)
  └─ Worker 3: Manoj (Electrician)
```

### **Upsert Operation**
"Update if exists, insert if doesn't":
```
Marking attendance:
  If worker already marked today → update status
  If worker not marked yet → create new record
```

---

## 📝 Sample Login Credentials (After Seeding)

```
Admin:
  Email: arinjay@dreambuilders.com
  Password: Admin@123

Supervisor:
  Email: rajesh@dreambuilders.com
  Password: Supervisor@123

Worker:
  Email: amit@dreambuilders.com
  Password: Worker@123
```

---

## ⚙️ Environment Variables (Backend Config)

Create `.env` file in `backend/` folder:

```
PORT=5001
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/
JWT_SECRET=your_secret_key_here
USE_IN_MEMORY_DB=false
```

- **PORT** - What port server runs on
- **MONGO_URI** - MongoDB connection
- **JWT_SECRET** - Code to sign security tokens
- **USE_IN_MEMORY_DB** - Use fake database for testing (true/false)

---

## 🔍 How Data Flows (Example: Adding Worker)

```
1. USER CLICKS "ADD WORKER"
   ↓
2. FORM OPENS (Name, Phone, Skill, Daily Wage)
   ↓
3. USER FILLS & SUBMITS
   ↓
4. AXIOS SENDS: POST /api/workers
   { name: "Ramesh", phone: "9876543210", skill: "Mason", dailyWage: 900 }
   ↓
5. BACKEND RECEIVES REQUEST
   ↓
6. CONTROLLER VALIDATES DATA
   ↓
7. MONGOOSE SAVES TO MONGODB
   ↓
8. MONGODB RETURNS NEW WORKER (with auto-generated ID)
   ↓
9. BACKEND SENDS BACK WORKER OBJECT
   ↓
10. FRONTEND UPDATES LIST
    ↓
11. USER SEES NEW WORKER IN TABLE
```

---

## 🛡️ Security Features

1. **Password Hashing** → Passwords encrypted (can't read raw password)
2. **JWT Tokens** → Can't fake login
3. **Role Checks** → Admin can do more than supervisor
4. **CORS** → Only trusted origins can access API
5. **Input Validation** → Bad data rejected before saving

---

## 🐛 Common Issues & Solutions

### Backend won't start?
```bash
# Check port is free
lsof -i :5001

# Install dependencies
npm install

# Check .env file exists with MONGO_URI
```

### Frontend can't reach backend?
```bash
# Check backend is running on :5000 or :5001
# Check vite.config.js has proxy configured
```

### Can't login?
```bash
# Check database has sample data
# Run: npm run seed (in backend folder)
# Try demo credentials above
```

---

## 📚 File Purposes (Quick Reference)

| File | Purpose |
|------|---------|
| `server.js` | Main Express server |
| `models/*.js` | Database structure |
| `controllers/*.js` | Core business logic |
| `routes/*.js` | API endpoint definitions |
| `middleware/auth.js` | Login verification |
| `seed.js` | Create sample data |
| `App.jsx` | Main React routes |
| `main.jsx` | React app entry |
| `pages/*.jsx` | Full page screens |
| `components/*.jsx` | Reusable UI parts |
| `context/AuthContext.jsx` | Shared login state |

---

## ✅ Success Indicators

Backend running:
```
✅ MongoDB connected: localhost
✅ Server running on http://localhost:5001
```

Frontend running:
```
✅ VITE v4.0.0 ready in 120 ms
✅ Local: http://localhost:5173
```

Can login:
```
✅ Credentials accepted
✅ Redirected to dashboard
✅ Can see worker list
```

---

## 🎓 Learning Path

1. **First**: Understand what each folder does (models, controllers, routes)
2. **Second**: Follow one feature (e.g., login) from frontend to backend
3. **Third**: Try adding a simple new field (e.g., worker address)
4. **Fourth**: Create a new endpoint (GET, POST)
5. **Expert**: Build new feature end-to-end

---

## 📖 More Details

For **detailed code explanations**, read: `implementation.md`

This file has:
- Line-by-line code breakdowns
- All functions explained
- Data flow diagrams
- Advanced concepts

---

## 🚀 Next Steps

1. Start backend: `npm start` (in backend folder)
2. Start frontend: `npm run dev` (in frontend folder)
3. Login at `http://localhost:5173`
4. Try: Add a worker → Assign to site → Mark attendance → Create payment
5. Check AdminDashboard to see stats update in real-time

**Happy Building! 🏗️**

