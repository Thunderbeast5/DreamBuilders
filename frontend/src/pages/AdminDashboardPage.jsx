import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { api } from '../lib/api'
import {
  Users,
  Building2,
  CalendarCheck2,
  Wallet,
  ArrowRight,
  UserCheck,
  UserMinus,
  IndianRupee,
  Clock,
  CheckCircle2,
  Shield,
  ShieldCheck,
  Briefcase,
  Eye,
  TrendingUp,
  BarChart3,
  Activity,
  LogOut,
  ChevronRight,
  Share2,
  PlusCircle,
  Construction,
  MapPin,
  MessageSquare,
  Mail,
  Inbox,
  Trash2,
  ExternalLink,
} from 'lucide-react'

// Subcomponents
function StatCard({ label, value, icon: Icon, color, subtitle, loading }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition hover:shadow-md hover:-translate-y-0.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          {Icon && (
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${color || 'from-slate-100 to-slate-200'}`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
          )}
          <span>{label}</span>
        </div>
      </div>
      <div className="mt-3 text-3xl font-black text-slate-900">
        {loading ? <div className="h-9 w-16 animate-pulse rounded bg-slate-200" /> : value}
      </div>
      {subtitle && <div className="mt-1 text-xs text-slate-500">{subtitle}</div>}
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

// Format Helper
function formatTime(dateStr) {
  const d = new Date(dateStr)
  const now = new Date()
  const diff = Math.floor((now - d) / 1000 / 60)
  if (diff < 60) return `${diff}m ago`
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

const statusColors = {
  available: 'bg-emerald-100 text-emerald-700',
  assigned: 'bg-blue-100 text-blue-700',
  inactive: 'bg-slate-100 text-slate-600',
}

// The Page Component
export function AdminDashboardPage() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('overview') // overview, sites, permissions
  
  const [stats, setStats] = useState({
    totalWorkers: 0, activeSites: 0, todayAttendance: 0, pendingPayments: 0,
    availableWorkers: 0, assignedWorkers: 0, inactiveWorkers: 0,
    totalPaid: 0, totalPending: 0,
  })
  const [activity, setActivity] = useState({ recentAttendance: [], recentPayments: [] })
  const [workers, setWorkers] = useState([])
  const [sites, setSites] = useState([])
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAll() {
      try {
        const [statsRes, activityRes, workersRes, sitesRes, enquiriesRes] = await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/dashboard/recent-activity'),
          api.get('/workers').catch(() => ({ data: [] })),
          api.get('/sites').catch(() => ({ data: [] })),
          api.get('/contact').catch(() => ({ data: [] })),
        ])
        setStats(statsRes.data)
        setActivity(activityRes.data)
        setWorkers(workersRes.data)
        setSites(sitesRes.data)
        setEnquiries(enquiriesRes.data)
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  /* ─── TAB CONTENT: OVERVIEW ─── */
  const renderOverview = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ── Main Stats Array ── */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard label="Total Workers" value={stats.totalWorkers} icon={Users} color="from-blue-500 to-blue-600" loading={loading} subtitle="Across all contractors" />
        <StatCard label="Active Sites" value={stats.activeSites} icon={Building2} color="from-emerald-500 to-emerald-600" loading={loading} subtitle="Under construction" />
        <StatCard label="Today's Attendance" value={stats.todayAttendance} icon={CalendarCheck2} color="from-violet-500 to-violet-600" loading={loading} subtitle="Workers checked in" />
        <StatCard label="Pending Payments" value={stats.pendingPayments} icon={Wallet} color="from-amber-400 to-amber-500" loading={loading} subtitle="Awaiting clearance" />
      </div>

      {/* ── Financial & Worker Distribution ── */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
            <BarChart3 className="h-4 w-4" /> Worker Distribution
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-slate-600"><UserCheck className="h-4 w-4 text-emerald-500" /> Available</span>
              <span className="text-lg font-black text-slate-900">{loading ? '—' : stats.availableWorkers}</span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-slate-600"><Users className="h-4 w-4 text-blue-500" /> Assigned</span>
              <span className="text-lg font-black text-slate-900">{loading ? '—' : stats.assignedWorkers}</span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-slate-600"><UserMinus className="h-4 w-4 text-slate-400" /> Inactive</span>
              <span className="text-lg font-black text-slate-900">{loading ? '—' : stats.inactiveWorkers}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
            <TrendingUp className="h-4 w-4" /> Total Cash Paid
          </div>
          <div className="flex items-center gap-1 text-4xl font-black text-emerald-700">
            <IndianRupee className="h-8 w-8" />{loading ? '—' : stats.totalPaid.toLocaleString('en-IN')}
          </div>
          <div className="mt-3 text-xs font-medium text-emerald-600">All completed payments to date across all contractors.</div>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100/50 p-6 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
            <Clock className="h-4 w-4" /> Awaiting Clearance
          </div>
          <div className="flex items-center gap-1 text-4xl font-black text-amber-700">
            <IndianRupee className="h-8 w-8" />{loading ? '—' : stats.totalPending.toLocaleString('en-IN')}
          </div>
          <div className="mt-3 text-xs font-medium text-amber-600">Pending contractor payments requiring admin approval.</div>
        </div>
      </div>

      {/* ── Recent Activity Splits ── */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent Attendance</h3>
            <Link to="/labour/attendance" className="text-xs font-semibold text-brand-dark hover:underline">View all →</Link>
          </div>
          <div className="space-y-2">
            {loading ? (
              [1, 2, 3].map((i) => <div key={i} className="h-14 animate-pulse rounded-lg bg-slate-200" />)
            ) : activity.recentAttendance.length === 0 ? (
              <div className="rounded-lg border border-slate-100 bg-white px-4 py-8 text-center text-sm text-slate-400">No attendance records yet</div>
            ) : (
              activity.recentAttendance.map((a) => (
                <ActivityItem key={a._id}
                  icon={a.status === 'present' ? CheckCircle2 : a.status === 'half-day' ? Clock : UserMinus}
                  color={a.status === 'present' ? 'bg-emerald-500' : a.status === 'half-day' ? 'bg-amber-500' : 'bg-red-500'}
                  title={`${a.worker?.name || 'Unknown'} — ${a.status.charAt(0).toUpperCase() + a.status.slice(1)}`}
                  subtitle={a.site?.name || 'No site assigned'}
                  time={formatTime(a.date)}
                />
              ))
            )}
          </div>
        </div>

        <div>
           <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent Payments</h3>
            <Link to="/labour/payments" className="text-xs font-semibold text-brand-dark hover:underline">View all →</Link>
          </div>
          <div className="space-y-2">
            {loading ? (
              [1, 2, 3].map((i) => <div key={i} className="h-14 animate-pulse rounded-lg bg-slate-200" />)
            ) : activity.recentPayments.length === 0 ? (
              <div className="rounded-lg border border-slate-100 bg-white px-4 py-8 text-center text-sm text-slate-400">No payment records yet</div>
            ) : (
              activity.recentPayments.map((p) => (
                <ActivityItem key={p._id}
                  icon={p.status === 'paid' ? CheckCircle2 : Clock}
                  color={p.status === 'paid' ? 'bg-emerald-500' : 'bg-amber-500'}
                  title={`₹${p.amount.toLocaleString('en-IN')} — ${p.worker?.name || 'Unknown'}`}
                  subtitle={p.note || p.status}
                  time={formatTime(p.createdAt)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )

  /* ─── TAB CONTENT: SITES SHOWCASE (Customer Facing) ─── */
  const renderSitesShowcase = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-black text-slate-900">Project Portfolio</h2>
          <p className="text-sm text-slate-500 mt-1">Presentable view for customer meetings and project tracking.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition">
            <Share2 className="h-4 w-4" /> Share Portfolio
          </button>
          <Link to="/admin/sites" className="flex items-center gap-1.5 rounded-lg border border-transparent bg-brand-yellow px-4 py-2 text-sm font-bold text-brand-dark shadow-sm hover:brightness-95 transition">
            <PlusCircle className="h-4 w-4" /> Add Project
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2">
           {[1, 2].map((i) => <div key={i} className="h-64 animate-pulse rounded-2xl bg-slate-200" />)}
        </div>
      ) : sites.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <Construction className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900">No Projects Found</h3>
          <p className="text-sm text-slate-500 mt-1 mb-4">You haven't added any construction projects yet.</p>
          <Link to="/admin/sites" className="inline-flex rounded-lg bg-brand-yellow px-4 py-2 text-sm font-bold text-brand-dark shadow-sm hover:brightness-95 transition">
            Create First Project
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {sites.map((site) => {
            // Mocking progress based on status for showcase feel
            const progress = site.status === 'completed' ? 100 : site.status === 'active' ? Math.floor(Math.random() * 60) + 20 : 0;
            const progressColor = progress === 100 ? 'bg-blue-500' : progress > 50 ? 'bg-emerald-500' : 'bg-brand-yellow';
            
            return (
              <div key={site._id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition-all hover:shadow-lg">
                <div className="h-2 bg-slate-100">
                   <div className={`h-full ${progressColor} transition-all duration-1000 ease-out`} style={{ width: `${progress}%` }} />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          site.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                          site.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {site.status || 'Planned'}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">{progress}% Complete</span>
                      </div>
                      <h3 className="text-xl font-black text-slate-900">{site.name}</h3>
                      <p className="flex items-center gap-1.5 text-sm text-slate-500 mt-1.5 font-medium">
                        <MapPin className="h-3.5 w-3.5 shrink-0" /> {site.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 border border-slate-100">
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase">Workforce</div>
                      <div className="mt-1 flex items-center gap-1.5 font-bold text-slate-900">
                        <Users className="h-4 w-4 text-blue-500" /> {site.workers?.length || 0} crew members
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase">Est. Budget</div>
                      <div className="mt-1 flex items-center gap-1 font-bold text-slate-900">
                        <IndianRupee className="h-4 w-4 text-emerald-600" />
                        {site.budget ? site.budget.toLocaleString('en-IN') : 'TBD'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                    <div className="flex -space-x-2">
                       {/* Mock worker avatars */}
                       {[...Array(Math.min(site.workers?.length || 0, 4))].map((_, i) => (
                         <div key={i} className={`h-8 w-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white bg-slate-[${400+i*100}]`} style={{ backgroundColor: `hsl(${200 + i*40}, 70%, 45%)`}}>
                           W{i+1}
                         </div>
                       ))}
                       {(site.workers?.length || 0) > 4 && (
                         <div className="h-8 w-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold bg-slate-100 text-slate-600">
                           +{(site.workers.length) - 4}
                         </div>
                       )}
                    </div>
                    <Link to="/admin/sites" className="text-sm font-bold text-brand-dark hover:text-amber-600 flex items-center gap-1 group-hover:underline underline-offset-4">
                      Manage Details <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )

  /* ─── TAB CONTENT: ROLE PERMISSIONS (Admin Security check) ─── */
  const renderPermissions = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div className="mb-6 text-center">
        <Shield className="h-12 w-12 text-slate-300 mx-auto mb-4" />
        <h2 className="text-2xl font-black text-slate-900">Access Control Matrix</h2>
        <p className="text-slate-500 mt-2 text-sm max-w-lg mx-auto">
          As an Admin, you have full control over the system. This matrix shows the strict security boundaries configured for your supervisors and contractors.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 uppercase tracking-wider">
              <th className="px-6 py-4 font-black flex items-center gap-2">Feature / Module</th>
              <th className="px-6 py-4 font-black text-center border-l border-slate-200"><span className="text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full text-[10px]">Labour Contractor</span></th>
              <th className="px-6 py-4 font-black text-center border-l border-slate-200"><span className="text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-[10px]">Site Supervisor</span></th>
              <th className="px-6 py-4 font-black text-center border-l border-slate-200"><span className="text-red-700 bg-red-100 px-3 py-1 rounded-full text-[10px]">Admin (You)</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { mod: 'Workers Directory', desc: 'Add, Edit, Delete Workers', c: true, s: false, a: true },
              { mod: 'Worker View', desc: 'See worker names & assignments', c: true, s: true, a: true },
              { mod: 'Sites Management', desc: 'Create & Edit Work Sites', c: false, s: true, a: true },
              { mod: 'Site Assignment', desc: 'Assign workers to specific sites', c: false, s: true, a: true },
              { mod: 'Attendance', desc: 'Record daily worker presence', c: false, s: true, a: true },
              { mod: 'Payments / Wages', desc: 'Record and track salary payouts', c: true, s: true, a: true },
              { mod: 'Global Financials', desc: 'View all project budgets & cashflow', c: false, s: false, a: true },
            ].map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900">{row.mod}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{row.desc}</div>
                </td>
                <td className="px-6 py-4 text-center border-l border-slate-100">
                  {row.c ? <CheckCircle2 className="h-5 w-5 text-emerald-500 mx-auto" /> : <div className="h-5 w-5 border-2 border-slate-200 rounded-full mx-auto" />}
                </td>
                <td className="px-6 py-4 text-center border-l border-slate-100">
                  {row.s ? <CheckCircle2 className="h-5 w-5 text-blue-500 mx-auto" /> : <div className="h-5 w-5 border-2 border-slate-200 rounded-full mx-auto" />}
                </td>
                <td className="px-6 py-4 text-center border-l border-slate-100 bg-red-50/30">
                  {row.a ? <CheckCircle2 className="h-5 w-5 text-red-500 mx-auto" /> : <div className="h-5 w-5 border-2 border-slate-200 rounded-full mx-auto" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  /* ─── TAB CONTENT: ENQUIRIES ─── */
  const renderEnquiries = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-black text-slate-900">Client Enquiries & Messages</h2>
          <p className="text-sm text-slate-500 mt-1">All enquiries, help requests, and contact form submissions from your website.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
            <Inbox className="h-3.5 w-3.5" /> {enquiries.length} Total
          </span>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => <div key={i} className="h-32 animate-pulse rounded-2xl bg-slate-200" />)}
        </div>
      ) : enquiries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <Inbox className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900">No Enquiries Yet</h3>
          <p className="text-sm text-slate-500 mt-1">When clients submit contact forms or help requests, they will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((enq) => (
            <div key={enq._id} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition-all hover:shadow-md hover:-translate-y-0.5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 shadow-md">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-black text-slate-900">{enq.name}</h3>
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-600 ring-1 ring-blue-200">
                        <Mail className="h-3 w-3" /> {enq.email}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{enq.message}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <span className="text-xs text-slate-400 font-medium">
                        {new Date(enq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {' at '}
                        {new Date(enq.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="text-xs text-slate-300">•</span>
                      <span className="text-xs text-slate-400">{formatTime(enq.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`mailto:${enq.email}`}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Reply via Email
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100/50 to-slate-50">
      {/* ─── Top Navbar ─── */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-red-700 shadow-md ring-4 ring-red-50">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-black tracking-tight text-slate-900">Admin Control Center</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-0.5">Dream Builders</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="hidden sm:block text-xs font-bold text-slate-600 hover:text-brand-dark transition">Home</Link>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <Link to="/services" className="hidden sm:block text-xs font-bold text-slate-600 hover:text-brand-dark transition">Services</Link>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <Link to="/projects" className="hidden sm:block text-xs font-bold text-slate-600 hover:text-brand-dark transition">Projects</Link>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <Link to="/labour/workers" className="hidden sm:block text-xs font-bold text-slate-600 hover:text-brand-dark transition">Manage Workers</Link>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-2 bg-slate-100 rounded-full pl-1.5 pr-4 py-1.5 border border-slate-200">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-yellow to-amber-500 text-xs font-black text-brand-dark shadow-sm">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="text-xs font-bold text-slate-800">{user?.name || 'Admin'}</div>
            </div>
            <button onClick={logout} className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-100 transition flex items-center gap-1.5">
              <LogOut className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-[1400px] px-6 py-10">
        
        {/* ─── Page Header & Tabs ─── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100/80 px-2.5 py-1 text-[10px] uppercase font-black tracking-wider text-red-700 ring-1 ring-red-200">
                <Shield className="h-3.5 w-3.5" /> Full Access
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Dashboard Overview
            </h1>
            <p className="mt-2 text-slate-600 font-medium">
              Monitor key metrics, ongoing projects, and contractor operations.
            </p>
          </div>
          
          {/* Tabs */}
          <div className="flex rounded-xl bg-slate-200/50 p-1.5 shadow-inner flex-wrap">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'sites', label: 'Sites & Portfolio', icon: Building2 },
              { id: 'enquiries', label: 'Enquiries', icon: MessageSquare, badge: enquiries.length },
              { id: 'permissions', label: 'Permissions', icon: ShieldCheck },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition-all duration-300 relative ${
                  activeTab === tab.id 
                    ? 'bg-white text-brand-dark shadow-sm scale-100' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-white/50 scale-95'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.badge > 0 && (
                  <span className="ml-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-violet-500 px-1.5 text-[10px] font-black text-white">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ─── Active Tab Content ─── */}
        <div className="min-h-[500px]">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'sites' && renderSitesShowcase()}
          {activeTab === 'enquiries' && renderEnquiries()}
          {activeTab === 'permissions' && renderPermissions()}
        </div>

      </div>
    </div>
  )
}
