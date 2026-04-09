import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  ArrowRight,
  Building2,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { useAuth } from '../context/useAuth'
import { Logo } from '../components/brand/Logo.jsx'

const SIGNUP_ROLES = [
  {
    value: 'supervisor',
    label: 'Site Supervisor',
    tagline: 'Manage construction sites & teams',
    icon: Building2,
    perms: ['Create & manage sites', 'Record attendance', 'View workers & payments'],
    color: 'border-blue-300 bg-blue-50',
    activeColor: 'border-blue-500 bg-blue-50 ring-4 ring-blue-100',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    badge: 'text-blue-700 bg-blue-100',
  },
  {
    value: 'contractor',
    label: 'Labour Contractor',
    tagline: 'Add & manage workers and wages',
    icon: Briefcase,
    perms: ['Add & manage workers', 'Track payments & wages', 'View site assignments'],
    color: 'border-emerald-300 bg-emerald-50',
    activeColor: 'border-emerald-500 bg-emerald-50 ring-4 ring-emerald-100',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    badge: 'text-emerald-700 bg-emerald-100',
  },
]

function getPasswordStrength(pw) {
  if (!pw) return { score: 0, label: '', color: '' }
  let s = 0
  if (pw.length >= 6) s++
  if (pw.length >= 10) s++
  if (/[A-Z]/.test(pw)) s++
  if (/[0-9]/.test(pw)) s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  if (s <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500' }
  if (s <= 3) return { score: 2, label: 'Medium', color: 'bg-amber-500' }
  return { score: 3, label: 'Strong', color: 'bg-emerald-500' }
}

export function SignupPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const navigate = useNavigate()

  const strength = useMemo(() => getPasswordStrength(form.password), [form.password])
  const passwordsMatch = !form.confirmPassword || form.password === form.confirmPassword

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.role) { setError('Please select a role to continue.'); return }
    if (!passwordsMatch) return
    setError('')
    setLoading(true)
    try {
      const data = await signup(form.name, form.email, form.password, form.role)
      if (data.user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/labour')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* ─── Left form panel ─── */}
      <div className="flex w-full flex-col lg:w-1/2">
        {/* mobile header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 lg:hidden">
          <Link to="/" className="inline-flex items-center gap-2">
            <Logo size={36} />
            <span className="text-sm font-semibold text-slate-900">Dream Builders</span>
          </Link>
          <Link to="/login" className="text-xs font-semibold text-brand-dark hover:underline underline-offset-2">
            Sign in
          </Link>
        </div>

        {/* form area */}
        <div className="flex flex-1 items-center justify-center bg-slate-50/50 px-6 py-12">
          <div className="w-full max-w-md">
            {/* heading */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-yellow" />
                <span>Create Account</span>
              </div>
              <h1 className="mt-4 text-2xl font-black text-slate-900">Get started today</h1>
              <p className="mt-1.5 text-sm text-slate-500">Sign up to manage labour, sites, and payments.</p>
            </div>

            {/* error alert */}
            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* form card */}
            <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-soft">

              {/* ── Role Selection Cards ── */}
              <div className="mb-6">
                <label className="mb-2.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Select your role
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {SIGNUP_ROLES.map((r) => {
                    const selected = form.role === r.value
                    return (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => { setForm((f) => ({ ...f, role: r.value })); setError('') }}
                        className={`group relative w-full rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                          selected ? r.activeColor : r.color + ' hover:brightness-95'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${r.iconBg}`}>
                            <r.icon className={`h-5 w-5 ${r.iconColor}`} />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900">{r.label}</div>
                            <div className="text-[11px] text-slate-500">{r.tagline}</div>
                          </div>
                        </div>
                        <ul className="space-y-1">
                          {r.perms.map((p) => (
                            <li key={p} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                              <CheckCircle2 className={`h-3 w-3 shrink-0 ${r.iconColor}`} />
                              {p}
                            </li>
                          ))}
                        </ul>
                        {selected && (
                          <span className={`absolute top-3 right-3 rounded-full px-2 py-0.5 text-[10px] font-bold ${r.badge}`}>
                            Selected
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* full name */}
              <div className="mb-5">
                <label htmlFor="signup-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Full name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    id="signup-name"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-yellow focus:bg-white focus:ring-4 focus:ring-brand-yellow/20"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              {/* email */}
              <div className="mb-5">
                <label htmlFor="signup-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    id="signup-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-yellow focus:bg-white focus:ring-4 focus:ring-brand-yellow/20"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* password */}
              <div className="mb-5">
                <label htmlFor="signup-password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={form.password}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 bg-slate-50/60 py-2.5 pl-10 pr-10 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-yellow focus:bg-white focus:ring-4 focus:ring-brand-yellow/20"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition" tabIndex={-1}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-2.5">
                    <div className="flex gap-1">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i <= strength.score ? strength.color : 'bg-slate-200'}`} />
                      ))}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      Password strength: <span className="font-semibold">{strength.label}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* confirm password */}
              <div className="mb-6">
                <label htmlFor="signup-confirm" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Confirm password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    id="signup-confirm"
                    type={showConfirm ? 'text' : 'password'}
                    required
                    value={form.confirmPassword}
                    onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                    className={`w-full rounded-lg border bg-slate-50/60 py-2.5 pl-10 pr-10 text-sm outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
                      !passwordsMatch ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-slate-300 focus:border-brand-yellow focus:ring-brand-yellow/20'
                    }`}
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition" tabIndex={-1}>
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {!passwordsMatch && <p className="mt-1.5 text-xs font-medium text-red-500">Passwords don&apos;t match</p>}
              </div>

              {/* submit */}
              <button
                type="submit"
                disabled={loading || !passwordsMatch}
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-brand-yellow px-5 py-3 text-sm font-bold text-brand-dark shadow-soft transition hover:brightness-95 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:pointer-events-none"
              >
                {loading ? (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-brand-dark/30 border-t-brand-dark" />
                ) : (
                  <>
                    <span>Create account</span>
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-brand-dark hover:underline underline-offset-2">Sign in</Link>
            </p>
          </div>
        </div>
      </div>

      {/* ─── Right brand panel ─── */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-bl from-brand-dark via-slate-800 to-slate-900" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-20 h-72 w-72 animate-pulse rounded-full bg-brand-yellow/10 blur-3xl" />
          <div className="absolute bottom-10 left-10 h-56 w-56 animate-pulse rounded-full bg-brand-yellow/15 blur-3xl" style={{ animationDelay: '1s' }} />
          <div className="absolute right-1/3 top-1/2 h-40 w-40 animate-pulse rounded-full bg-white/5 blur-2xl" style={{ animationDelay: '2s' }} />
        </div>
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />

        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          <div className="flex justify-end">
            <Link to="/" className="inline-flex items-center gap-3">
              <Logo size={44} className="bg-white ring-white/15 shadow-lg" />
              <div className="leading-tight">
                <div className="text-base font-bold text-white">Dream Builders</div>
                <div className="text-xs text-slate-400">Construction &amp; Labour</div>
              </div>
            </Link>
          </div>

          <div className="max-w-md ml-auto text-right">
            <h2 className="text-3xl font-black leading-tight text-white">
              The right role,<span className="text-brand-yellow"> the right access.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Dream Builders uses role-based access control so every team member sees exactly what they need — nothing more, nothing less.
            </p>
            <div className="mt-8 space-y-3">
              {[
                { role: 'Site Supervisor', desc: 'Creates sites, tracks attendance, oversees teams', color: 'bg-blue-500/20 border-blue-500/30 text-blue-200' },
                { role: 'Labour Contractor', desc: 'Adds workers, manages wages & payments', color: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-200' },
                { role: 'Admin (Owner)', desc: 'Full control — finance, projects, all teams', color: 'bg-red-500/20 border-red-500/30 text-red-200' },
              ].map((item) => (
                <div key={item.role} className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-left backdrop-blur ${item.color}`}>
                  <ShieldCheck className="h-4 w-4 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold">{item.role}</div>
                    <div className="text-[11px] opacity-80">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { value: '500+', label: 'Workers Managed' },
              { value: '6', label: 'Active Sites' },
              { value: '99%', label: 'Uptime' },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border border-white/10 bg-white/5 p-3 text-center backdrop-blur">
                <div className="text-xl font-black text-brand-yellow">{s.value}</div>
                <div className="mt-0.5 text-xs text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
