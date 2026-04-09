import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card.jsx'
import { Button } from '../components/ui/Button.jsx'
import { useAuth } from '../context/useAuth'
import { api } from '../lib/api'
import {
  Users,
  Building2,
  CalendarCheck2,
  Wallet,
  ArrowRight,
  UserCheck,
  UserX,
  UserMinus,
  IndianRupee,
  Clock,
  CheckCircle2,
  Shield,
  Briefcase,
  Eye,
} from 'lucide-react'

function Stat({ label, value, icon: Icon, color, loading }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft transition hover:shadow-md">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
        {Icon ? (
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${color || 'bg-slate-100'}`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
        ) : null}
        <span>{label}</span>
      </div>
      <div className="mt-3 text-3xl font-black text-slate-900">
        {loading ? (
          <div className="h-9 w-16 animate-pulse rounded bg-slate-200" />
        ) : (
          value
        )}
      </div>
    </div>
  )
}

function ActivityItem({ icon: Icon, color, title, subtitle, time }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-slate-100 bg-white px-4 py-3 transition hover:bg-slate-50">
      <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${color}`}>
        <Icon className="h-4 w-4 text-white" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-slate-900 truncate">{title}</div>
        <div className="text-xs text-slate-500">{subtitle}</div>
      </div>
      <div className="shrink-0 text-xs text-slate-400">{time}</div>
    </div>
  )
}

export function LabourDashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalWorkers: 0,
    activeSites: 0,
    todayAttendance: 0,
    pendingPayments: 0,
    availableWorkers: 0,
    assignedWorkers: 0,
    inactiveWorkers: 0,
    totalPaid: 0,
    totalPending: 0,
  })
  const [activity, setActivity] = useState({ recentAttendance: [], recentPayments: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAll() {
      try {
        const [statsRes, activityRes] = await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/dashboard/recent-activity'),
        ])
        setStats(statsRes.data)
        setActivity(activityRes.data)
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const roleBadge = {
    admin: { label: 'Admin (Owner)', color: 'bg-red-100 text-red-700', icon: Shield },
    supervisor: { label: 'Supervisor', color: 'bg-blue-100 text-blue-700', icon: Eye },
    contractor: { label: 'Contractor', color: 'bg-emerald-100 text-emerald-700', icon: Briefcase },
  }

  const badge = roleBadge[user?.role] || roleBadge.supervisor

  const allActions = [
    {
      title: 'Workers',
      desc: 'Add, edit, delete workers and view availability.',
      to: '/labour/workers',
      icon: Users,
      color: 'bg-blue-500',
      roles: ['contractor'],
    },
    {
      title: 'Sites',
      desc: 'Create construction sites and assign workers.',
      to: '/labour/sites',
      icon: Building2,
      color: 'bg-emerald-500',
      roles: ['supervisor'],
    },
    {
      title: 'Attendance',
      desc: 'Mark daily attendance and view history.',
      to: '/labour/attendance',
      icon: CalendarCheck2,
      color: 'bg-violet-500',
      roles: ['supervisor'],
    },
    {
      title: 'Payments',
      desc: 'Track wages, payment records, and statuses.',
      to: '/labour/payments',
      icon: Wallet,
      color: 'bg-amber-500',
      roles: ['supervisor', 'contractor'],
    },
  ]

  const quickActions = allActions.filter(
    (a) => user?.role === 'admin' || a.roles.includes(user?.role)
  )

  function formatTime(dateStr) {
    const d = new Date(dateStr)
    const now = new Date()
    const diff = Math.floor((now - d) / 1000 / 60)
    if (diff < 60) return `${diff}m ago`
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
  }

  return (
    <div className="bg-slate-50 min-h-[80vh]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* ─── Header with greeting ─── */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-yellow to-amber-500 text-lg font-black text-brand-dark shadow-soft">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
                  Welcome, {user?.name?.split(' ')[0] || 'Admin'}!
                </h1>
                <div className="mt-1 flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.color}`}>
                    <badge.icon className="h-3 w-3" />
                    {badge.label}
                  </span>
                  <span className="text-sm text-slate-500">
                    {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-slate-600">
              Central dashboard for workers, sites, attendance, and payments.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-soft ring-1 ring-slate-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Live — Connected to API
          </div>
        </div>

        {/* ─── Main Stats ─── */}
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Stat label="Total Workers" value={stats.totalWorkers} icon={Users} color="bg-blue-500" loading={loading} />
          <Stat label="Active Sites" value={stats.activeSites} icon={Building2} color="bg-emerald-500" loading={loading} />
          <Stat label="Today's Attendance" value={stats.todayAttendance} icon={CalendarCheck2} color="bg-violet-500" loading={loading} />
          <Stat label="Pending Payments" value={stats.pendingPayments} icon={Wallet} color="bg-amber-500" loading={loading} />
        </div>

        {/* ─── Worker Breakdown + Payment Summary ─── */}
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-soft">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Worker Status</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-600">
                  <UserCheck className="h-4 w-4 text-emerald-500" /> Available
                </span>
                <span className="font-bold text-slate-900">{loading ? '—' : stats.availableWorkers}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-600">
                  <Users className="h-4 w-4 text-blue-500" /> Assigned
                </span>
                <span className="font-bold text-slate-900">{loading ? '—' : stats.assignedWorkers}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-600">
                  <UserMinus className="h-4 w-4 text-slate-400" /> Inactive
                </span>
                <span className="font-bold text-slate-900">{loading ? '—' : stats.inactiveWorkers}</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-3">
              <CheckCircle2 className="h-4 w-4" /> Total Paid
            </div>
            <div className="flex items-center gap-1 text-2xl font-black text-emerald-700">
              <IndianRupee className="h-5 w-5" />
              {loading ? '—' : stats.totalPaid.toLocaleString()}
            </div>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-3">
              <Clock className="h-4 w-4" /> Total Pending
            </div>
            <div className="flex items-center gap-1 text-2xl font-black text-amber-700">
              <IndianRupee className="h-5 w-5" />
              {loading ? '—' : stats.totalPending.toLocaleString()}
            </div>
          </div>
        </div>

        {/* ─── Quick Actions ─── */}
        <div className="mt-8">
          <Card title="Quick Actions" subtitle="Manage your labour operations.">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  to={action.to}
                  className="group rounded-lg border border-slate-200 bg-white p-4 transition hover:border-brand-yellow hover:shadow-soft"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${action.color}`}>
                        <action.icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="font-semibold text-slate-900">{action.title}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:text-brand-dark group-hover:translate-x-0.5" />
                  </div>
                  <div className="mt-2 text-sm text-slate-600">
                    {action.desc}
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* ─── Recent Activity ─── */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Recent Attendance */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent Attendance</h3>
              <Link to="/labour/attendance" className="text-xs font-semibold text-brand-dark hover:underline">
                View all →
              </Link>
            </div>
            <div className="space-y-2">
              {loading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-14 animate-pulse rounded-lg bg-slate-200" />
                  ))}
                </div>
              ) : activity.recentAttendance.length === 0 ? (
                <div className="rounded-lg border border-slate-100 bg-white px-4 py-6 text-center text-sm text-slate-400">
                  No attendance records yet
                </div>
              ) : (
                activity.recentAttendance.map((a) => (
                  <ActivityItem
                    key={a._id}
                    icon={a.status === 'present' ? CheckCircle2 : a.status === 'half-day' ? Clock : UserX}
                    color={a.status === 'present' ? 'bg-emerald-500' : a.status === 'half-day' ? 'bg-amber-500' : 'bg-red-500'}
                    title={`${a.worker?.name || 'Unknown'} — ${a.status}`}
                    subtitle={a.site?.name || 'No site'}
                    time={formatTime(a.date)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Recent Payments */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent Payments</h3>
              <Link to="/labour/payments" className="text-xs font-semibold text-brand-dark hover:underline">
                View all →
              </Link>
            </div>
            <div className="space-y-2">
              {loading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-14 animate-pulse rounded-lg bg-slate-200" />
                  ))}
                </div>
              ) : activity.recentPayments.length === 0 ? (
                <div className="rounded-lg border border-slate-100 bg-white px-4 py-6 text-center text-sm text-slate-400">
                  No payment records yet
                </div>
              ) : (
                activity.recentPayments.map((p) => (
                  <ActivityItem
                    key={p._id}
                    icon={p.status === 'paid' ? CheckCircle2 : Clock}
                    color={p.status === 'paid' ? 'bg-emerald-500' : 'bg-amber-500'}
                    title={`₹${p.amount.toLocaleString()} — ${p.worker?.name || 'Unknown'}`}
                    subtitle={p.note || p.status}
                    time={formatTime(p.createdAt)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
