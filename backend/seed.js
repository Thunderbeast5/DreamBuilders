import mongoose from 'mongoose';
import User from './models/User.js';
import Site from './models/Site.js';
import Worker from './models/Worker.js';
import Attendance from './models/Attendance.js';
import Payment from './models/Payment.js';
import Contact from './models/Contact.js';

// ─── Helper ───
function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(8, 0, 0, 0);
  return d;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── Seed data ───
export async function seedDatabase() {
  // Skip if data already exists
  const existingWorkers = await Worker.countDocuments();
  if (existingWorkers > 0) {
    console.log('📦 Database already has data — skipping seed.');
    return;
  }

  console.log('🌱 Seeding database with sample data...');

  // ── 1. USERS ──
  const users = await User.create([
    {
      name: 'Arinjay (Admin)',
      email: 'arinjay@dreambuilders.com',
      password: 'Admin@123',
      role: 'admin',
    },
    {
      name: 'Rajesh Kumar',
      email: 'rajesh@dreambuilders.com',
      password: 'Supervisor@123',
      role: 'supervisor',
    },
    {
      name: 'Amit Singh',
      email: 'amit@dreambuilders.com',
      password: 'Worker@123',
      role: 'worker',
    },
  ]);
  console.log(`   ✅ ${users.length} users created`);

  // ── 2. SITES (matching frontend projects) ──
  const sites = await Site.create([
    {
      name: 'Skyline Tower',
      location: 'Downtown District, Sector 21',
      status: 'active',
    },
    {
      name: 'Greenwood Villas',
      location: 'Greenwood Suburb, NH-48',
      status: 'active',
    },
    {
      name: 'Central Mall Renovation',
      location: 'City Center, MG Road',
      status: 'upcoming',
    },
    {
      name: 'River Bridge Works',
      location: 'North River Corridor, GT Road',
      status: 'completed',
    },
  ]);
  console.log(`   ✅ ${sites.length} sites created`);

  // ── 3. WORKERS ──
  const workerData = [
    // Skyline Tower workers
    { name: 'Ramesh Yadav', phone: '9876543210', skill: 'Mason', dailyWage: 900, status: 'assigned', site: sites[0]._id },
    { name: 'Suresh Sharma', phone: '9876543211', skill: 'Carpenter', dailyWage: 850, status: 'assigned', site: sites[0]._id },
    { name: 'Manoj Kumar', phone: '9876543212', skill: 'Electrician', dailyWage: 1000, status: 'assigned', site: sites[0]._id },
    { name: 'Vikram Patel', phone: '9876543213', skill: 'Welder', dailyWage: 1100, status: 'assigned', site: sites[0]._id },

    // Greenwood Villas workers
    { name: 'Deepak Verma', phone: '9876543214', skill: 'Plumber', dailyWage: 950, status: 'assigned', site: sites[1]._id },
    { name: 'Sanjay Gupta', phone: '9876543215', skill: 'Mason', dailyWage: 900, status: 'assigned', site: sites[1]._id },
    { name: 'Anil Rajput', phone: '9876543216', skill: 'Painter', dailyWage: 800, status: 'assigned', site: sites[1]._id },
    { name: 'Ravi Meena', phone: '9876543217', skill: 'Helper', dailyWage: 550, status: 'assigned', site: sites[1]._id },
    { name: 'Gopal Singh', phone: '9876543218', skill: 'Carpenter', dailyWage: 850, status: 'assigned', site: sites[1]._id },

    // Central Mall workers (upcoming — available)
    { name: 'Pawan Tiwari', phone: '9876543219', skill: 'Electrician', dailyWage: 1000, status: 'available', site: null },
    { name: 'Bhola Nath', phone: '9876543220', skill: 'Helper', dailyWage: 500, status: 'available', site: null },

    // River Bridge workers (completed — available now)
    { name: 'Kishan Lal', phone: '9876543221', skill: 'Welder', dailyWage: 1200, status: 'available', site: null },
    { name: 'Mohan Das', phone: '9876543222', skill: 'Mason', dailyWage: 900, status: 'available', site: null },

    // Inactive workers
    { name: 'Hari Om', phone: '9876543223', skill: 'Painter', dailyWage: 750, status: 'inactive', site: null },
    { name: 'Jagdish Prasad', phone: '9876543224', skill: 'Helper', dailyWage: 500, status: 'inactive', site: null },
  ];

  const workers = await Worker.create(workerData);
  console.log(`   ✅ ${workers.length} workers created`);

  // ── Assign workers to sites ──
  // Skyline Tower: first 4 workers
  sites[0].workers = workers.slice(0, 4).map((w) => w._id);
  await sites[0].save();

  // Greenwood Villas: workers 4-8
  sites[1].workers = workers.slice(4, 9).map((w) => w._id);
  await sites[1].save();

  console.log('   ✅ Workers assigned to sites');

  // ── 4. ATTENDANCE (last 10 days for assigned workers) ──
  const assignedWorkers = workers.filter((w) => w.status === 'assigned');
  const attendanceRecords = [];
  const statuses = ['present', 'present', 'present', 'present', 'present', 'present', 'present', 'absent', 'half-day', 'present'];

  for (let day = 0; day < 10; day++) {
    const date = daysAgo(day);
    // Skip Sundays
    if (date.getDay() === 0) continue;

    for (const worker of assignedWorkers) {
      attendanceRecords.push({
        worker: worker._id,
        site: worker.site,
        date,
        status: pick(statuses),
      });
    }
  }

  const attendance = await Attendance.create(attendanceRecords);
  console.log(`   ✅ ${attendance.length} attendance records created`);

  // ── 5. PAYMENTS (mix of paid & pending for last 30 days) ──
  const paymentData = [
    // Paid salaries (last week)
    { worker: workers[0]._id, amount: 900 * 6, date: daysAgo(7), status: 'paid', note: 'Weekly salary – Skyline Tower' },
    { worker: workers[1]._id, amount: 850 * 6, date: daysAgo(7), status: 'paid', note: 'Weekly salary – Skyline Tower' },
    { worker: workers[2]._id, amount: 1000 * 6, date: daysAgo(7), status: 'paid', note: 'Weekly salary – Skyline Tower' },
    { worker: workers[3]._id, amount: 1100 * 6, date: daysAgo(7), status: 'paid', note: 'Weekly salary – Skyline Tower' },
    { worker: workers[4]._id, amount: 950 * 6, date: daysAgo(7), status: 'paid', note: 'Weekly salary – Greenwood Villas' },
    { worker: workers[5]._id, amount: 900 * 6, date: daysAgo(7), status: 'paid', note: 'Weekly salary – Greenwood Villas' },
    { worker: workers[6]._id, amount: 800 * 6, date: daysAgo(7), status: 'paid', note: 'Weekly salary – Greenwood Villas' },
    { worker: workers[7]._id, amount: 550 * 6, date: daysAgo(7), status: 'paid', note: 'Weekly salary – Greenwood Villas' },
    { worker: workers[8]._id, amount: 850 * 6, date: daysAgo(7), status: 'paid', note: 'Weekly salary – Greenwood Villas' },

    // Paid salaries (two weeks ago)
    { worker: workers[0]._id, amount: 900 * 6, date: daysAgo(14), status: 'paid', note: 'Weekly salary – Skyline Tower' },
    { worker: workers[1]._id, amount: 850 * 5, date: daysAgo(14), status: 'paid', note: 'Weekly salary (5 days) – Skyline Tower' },
    { worker: workers[4]._id, amount: 950 * 6, date: daysAgo(14), status: 'paid', note: 'Weekly salary – Greenwood Villas' },
    { worker: workers[5]._id, amount: 900 * 6, date: daysAgo(14), status: 'paid', note: 'Weekly salary – Greenwood Villas' },

    // Pending salaries (this week — not yet paid)
    { worker: workers[0]._id, amount: 900 * 4, date: daysAgo(0), status: 'pending', note: 'Current week pending – Skyline Tower' },
    { worker: workers[1]._id, amount: 850 * 4, date: daysAgo(0), status: 'pending', note: 'Current week pending – Skyline Tower' },
    { worker: workers[2]._id, amount: 1000 * 4, date: daysAgo(0), status: 'pending', note: 'Current week pending – Skyline Tower' },
    { worker: workers[3]._id, amount: 1100 * 3, date: daysAgo(0), status: 'pending', note: 'Current week pending – Skyline Tower' },
    { worker: workers[4]._id, amount: 950 * 4, date: daysAgo(0), status: 'pending', note: 'Current week pending – Greenwood Villas' },
    { worker: workers[5]._id, amount: 900 * 4, date: daysAgo(0), status: 'pending', note: 'Current week pending – Greenwood Villas' },
    { worker: workers[6]._id, amount: 800 * 4, date: daysAgo(0), status: 'pending', note: 'Current week pending – Greenwood Villas' },
    { worker: workers[7]._id, amount: 550 * 3, date: daysAgo(0), status: 'pending', note: 'Current week pending (3 days) – Greenwood Villas' },
    { worker: workers[8]._id, amount: 850 * 4, date: daysAgo(0), status: 'pending', note: 'Current week pending – Greenwood Villas' },

    // Overtime / bonus payments
    { worker: workers[2]._id, amount: 2000, date: daysAgo(5), status: 'paid', note: 'Overtime bonus – emergency wiring job' },
    { worker: workers[3]._id, amount: 3000, date: daysAgo(3), status: 'paid', note: 'Weekend overtime – welding work' },
  ];

  const payments = await Payment.create(paymentData);
  console.log(`   ✅ ${payments.length} payment records created`);

  // ── 6. CONTACTS (sample enquiries) ──
  const contacts = await Contact.create([
    {
      name: 'Priya Mehta',
      email: 'priya.mehta@gmail.com',
      message: 'Hi, I am interested in booking a 3BHK at Greenwood Villas. Can you share the floor plan and pricing?',
    },
    {
      name: 'Rahul Jain',
      email: 'rahul.jain@outlook.com',
      message: 'We need 25 skilled masons for our upcoming project in Gurugram. Can Dream Builders supply by next month?',
    },
    {
      name: 'Sneha Kapoor',
      email: 'sneha.kapoor@yahoo.com',
      message: 'I visited the Skyline Tower site last week. Impressed with the progress! When is the next milestone?',
    },
  ]);
  console.log(`   ✅ ${contacts.length} contact enquiries created`);

  console.log('');
  console.log('🎉 Seed complete! Here are the login credentials:');
  console.log('   ┌──────────────────────────────────────────────────┐');
  console.log('   │  Admin:      arinjay@dreambuilders.com           │');
  console.log('   │  Password:   Admin@123                           │');
  console.log('   │                                                  │');
  console.log('   │  Supervisor: rajesh@dreambuilders.com            │');
  console.log('   │  Password:   Supervisor@123                      │');
  console.log('   │                                                  │');
  console.log('   │  Worker:     amit@dreambuilders.com              │');
  console.log('   │  Password:   Worker@123                          │');
  console.log('   └──────────────────────────────────────────────────┘');
  console.log('');
}
