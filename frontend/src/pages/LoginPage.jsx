import { createElement, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Eye,
  EyeOff,
  HardHat,
  Lock,
  Mail,
  ArrowRight,
  Building2,
  Users,
  ShieldCheck,
  AlertCircle,
  Shield,
  Briefcase,
  ChevronDown,
} from 'lucide-react'
import { useAuth } from '../context/useAuth'
import { Logo } from '../components/brand/Logo.jsx'

const ROLES = [
  {
    value: 'admin',
    label: 'Admin',
    desc: 'Construction Owner — full project control',
    icon: Shield,
    color: 'border-red-200 bg-red-50 text-red-700',
    activeColor: 'border-red-400 bg-red-50 ring-4 ring-red-100',
    iconColor: 'text-red-500',
  },
  {
    value: 'supervisor',
    label: 'Supervisor',
    desc: 'Site Manager — manage sites & attendance',
    icon: Building2,
    color: 'border-blue-200 bg-blue-50 text-blue-700',
    activeColor: 'border-blue-400 bg-blue-50 ring-4 ring-blue-100',
    iconColor: 'text-blue-500',
  },
  {
    value: 'contractor',
    label: 'Contractor',
    desc: 'Labour Contractor — manage workers & payments',
    icon: Briefcase,
    color: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    activeColor: 'border-emerald-400 bg-emerald-50 ring-4 ring-emerald-100',
    iconColor: 'text-emerald-500',
  },
]

export function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '', role: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.role) {
      setError('Please select your role to continue.')
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
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* ─── Left brand panel ─── */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        {/* gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-slate-800 to-slate-900" />

        {/* animated floating shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-72 w-72 animate-pulse rounded-full bg-brand-yellow/10 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-56 w-56 animate-pulse rounded-full bg-brand-yellow/15 blur-3xl" style={{ animationDelay: '1s' }} />
          <div className="absolute left-1/3 top-1/2 h-40 w-40 animate-pulse rounded-full bg-white/5 blur-2xl" style={{ animationDelay: '2s' }} />
        </div>

        {/* decorative grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* content */}
        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          {/* logo */}
          <Link to="/" className="inline-flex items-center gap-3">
            <Logo size={44} className="bg-white ring-white/15 shadow-lg" />
            <div className="leading-tight">
              <div className="text-base font-bold text-white">Dream Builders</div>
              <div className="text-xs text-slate-400">Construction &amp; Labour</div>
            </div>
          </Link>

          {/* hero copy */}
          <div className="max-w-md">
            <h2 className="text-3xl font-black leading-tight text-white">
              Manage your workforce
              <span className="text-brand-yellow"> smarter.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Track attendance, assign workers, manage sites, and process payments — all from one powerful dashboard.
            </p>

            {/* feature pills */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { icon: Users, text: '128+ Workers' },
                { icon: Building2, text: '6 Active Sites' },
                { icon: ShieldCheck, text: 'Secure Access' },
                { icon: HardHat, text: 'Smart Dashboard' },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-medium text-slate-200 backdrop-blur transition hover:bg-white/10"
                >
                  {Icon ? createElement(Icon, { className: 'h-4 w-4 text-brand-yellow' }) : null}
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* bottom testimonial */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <p className="text-sm italic text-slate-300">
              &ldquo;Dream Builders transformed the way we manage our construction sites. Attendance and payment tracking is effortless now.&rdquo;
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-brand-yellow/20 grid place-items-center text-xs font-bold text-brand-yellow">
                RS
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Rajesh Sharma</div>
                <div className="text-xs text-slate-400">Site Supervisor</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Right form panel ─── */}
      <div className="flex w-full flex-col lg:w-1/2">
        {/* mobile header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 lg:hidden">
          <Link to="/" className="inline-flex items-center gap-2">
            <Logo size={36} />
            <span className="text-sm font-semibold text-slate-900">Dream Builders</span>
          </Link>
          <Link
            to="/signup"
            className="text-xs font-semibold text-brand-dark hover:underline underline-offset-2"
          >
            Create account
          </Link>
        </div>

        {/* form area */}
        <div className="flex flex-1 items-center justify-center bg-slate-50/50 px-6 py-12">
          <div className="w-full max-w-md">
            {/* heading */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                <Lock className="h-3.5 w-3.5 text-brand-yellow" />
                <span>Secure Login</span>
              </div>
              <h1 className="mt-4 text-2xl font-black text-slate-900">Welcome back</h1>
              <p className="mt-1.5 text-sm text-slate-500">
                Select your role and sign in to access your dashboard.
              </p>
            </div>

            {/* error alert */}
            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* form card */}
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-soft"
            >
              {/* ── Role selector ── */}
              <div className="mb-5">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Select your role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {ROLES.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => { setForm((f) => ({ ...f, role: r.value })); setError(''); }}
                      className={`group relative flex flex-col items-center rounded-xl border-2 px-2 py-3 text-center transition-all duration-200 cursor-pointer ${
                        form.role === r.value
                          ? r.activeColor
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <r.icon className={`h-5 w-5 mb-1.5 ${form.role === r.value ? r.iconColor : 'text-slate-400 group-hover:text-slate-600'}`} />
                      <span className={`text-xs font-bold ${form.role === r.value ? '' : 'text-slate-700'}`}>{r.label}</span>
                      <span className="mt-0.5 text-[10px] leading-tight text-slate-500 hidden sm:block">{r.desc.split('—')[0]}</span>
                    </button>
                  ))}
                </div>
                {form.role === 'admin' && (
                  <div className="mt-2.5 flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                    <span><strong>Admin panel is restricted.</strong> Only authorized personnel can log in.</span>
                  </div>
                )}
              </div>

              {/* email */}
              <div className="mb-5">
                <label
                  htmlFor="login-email"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="w-full rounded-lg border border-slate-300 bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-yellow focus:bg-white focus:ring-4 focus:ring-brand-yellow/20"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* password */}
              <div className="mb-5">
                <div className="mb-1.5 flex items-center justify-between">
                  <label
                    htmlFor="login-password"
                    className="text-xs font-semibold uppercase tracking-wide text-slate-500"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={form.password}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, password: e.target.value }))
                    }
                    className="w-full rounded-lg border border-slate-300 bg-slate-50/60 py-2.5 pl-10 pr-10 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-yellow focus:bg-white focus:ring-4 focus:ring-brand-yellow/20"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* remember me */}
              <label className="mb-6 flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 accent-brand-yellow"
                />
                <span>Remember me for 30 days</span>
              </label>

              {/* submit */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-brand-yellow px-5 py-3 text-sm font-bold text-brand-dark shadow-soft transition hover:brightness-95 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:pointer-events-none"
              >
                {loading ? (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-brand-dark/30 border-t-brand-dark" />
                ) : (
                  <>
                    <span>Sign in</span>
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>

            {/* footer link */}
            <p className="mt-6 text-center text-sm text-slate-500">
              Don&apos;t have an account?{' '}
              <Link
                to="/signup"
                className="font-semibold text-brand-dark hover:underline underline-offset-2"
              >
                Create one for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
