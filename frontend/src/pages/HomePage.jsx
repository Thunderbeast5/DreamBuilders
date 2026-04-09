import { createElement, useState, useEffect, useRef } from 'react'
import { Button } from '../components/ui/Button.jsx'
import { api } from '../lib/api'
import {
  BadgeCheck,
  CheckCircle2,
  Layers,
  Users,
  Building2,
  CalendarCheck2,
  Wallet,
  HardHat,
  UsersRound,
  ClipboardList,
  Eye,
  FileSpreadsheet,
  UserPlus,
  MapPin,
  CreditCard,
  ArrowRight,
  Star,
  Shield,
  Clock,
  TrendingUp,
} from 'lucide-react'

/* ── Animated counter hook ── */
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            setCount(Math.floor(progress * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}

/* ── Service Card ── */
function ServiceCard({ icon: Icon, title, desc, gradient, delay }) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-7 transition-all duration-500 hover:border-transparent hover:shadow-2xl hover:-translate-y-2"
      style={{ animationDelay: delay }}
    >
      {/* Hover gradient bg */}
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${gradient}`}
      />
      <div className="relative z-10">
        <div
          className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl ${gradient} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
        >
          {Icon ? createElement(Icon, { className: 'h-7 w-7 text-white', strokeWidth: 2 }) : null}
        </div>
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-white transition-colors duration-500">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500 group-hover:text-white/80 transition-colors duration-500">
          {desc}
        </p>
        <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-yellow opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          Learn more <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}

/* ── Stat Card ── */
function StatCard({ icon: Icon, label, value, suffix = '', color }) {
  const { count, ref } = useCounter(value)
  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/30"
    >
      <div className="flex items-center gap-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
          {Icon ? createElement(Icon, { className: 'h-5 w-5 text-white' }) : null}
        </div>
        <div>
          <div className="text-3xl font-black text-white">
            {count}
            {suffix}
          </div>
          <div className="text-xs font-medium text-white/70">{label}</div>
        </div>
      </div>
    </div>
  )
}

/* ── Feature Card ── */
function FeatureCard({ icon: Icon, title, desc, gradient }) {
  return (
    <div className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-brand-yellow/30">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${gradient} shadow-md transition-transform duration-300 group-hover:scale-110`}
      >
        {Icon ? createElement(Icon, { className: 'h-6 w-6 text-white' }) : null}
      </div>
      <div>
        <h4 className="font-bold text-slate-900">{title}</h4>
        <p className="mt-1 text-sm text-slate-500">{desc}</p>
      </div>
    </div>
  )
}

export function HomePage() {
  const [isVisible] = useState(true)
  const [liveStats, setLiveStats] = useState(null)

  useEffect(() => {
    api.get('/dashboard/public-stats')
      .then(({ data }) => setLiveStats(data))
      .catch(() => {}) // fail silently on homepage
  }, [])

  return (
    <div className="overflow-hidden">
      {/* ═══════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/construction-bg.png')" }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

        {/* Animated accent blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-brand-yellow/10 blur-[120px] animate-pulse" />
          <div className="absolute -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left – Text */}
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-yellow/30 bg-brand-yellow/10 px-4 py-1.5 text-xs font-bold tracking-wide text-brand-yellow backdrop-blur-sm">
                <BadgeCheck className="h-4 w-4" />
                <span>CONSTRUCTION LABOUR MANAGEMENT</span>
              </div>

              <h1 className="mt-6 text-5xl font-black leading-[1.1] tracking-tight text-white lg:text-6xl">
                Dream{' '}
                <span className="bg-gradient-to-r from-brand-yellow to-amber-400 bg-clip-text text-transparent">
                  Builders
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-300">
                We build your dreams — and help you manage labour workers, sites,
                attendance, and wage payments with a powerful centralized
                dashboard.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button to="/labour">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="secondary" to="/projects">
                  View Projects
                </Button>
              </div>

              {/* Trust badges */}
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-400">
                {[
                  { icon: Shield, text: 'Secure & Reliable' },
                  { icon: Clock, text: 'Real-time Tracking' },
                  { icon: TrendingUp, text: 'Smart Analytics' },
                ].map((b) => (
                  <div key={b.text} className="flex items-center gap-2">
                    <b.icon className="h-4 w-4 text-brand-yellow" />
                    <span>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right – Stat cards */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="grid grid-cols-2 gap-4">
                <StatCard
                  icon={Users}
                  label="Total Workers"
                  value={liveStats?.totalWorkers ?? 15}
                  color="bg-blue-500"
                />
                <StatCard
                  icon={Building2}
                  label="Active Sites"
                  value={liveStats?.activeSites ?? 2}
                  color="bg-emerald-500"
                />
                <StatCard
                  icon={CalendarCheck2}
                  label="Present Today"
                  value={liveStats?.todayPresent ?? 0}
                  color="bg-violet-500"
                />
                <StatCard
                  icon={Wallet}
                  label="Pending Payments"
                  value={liveStats?.pendingPayments ?? 0}
                  color="bg-amber-500"
                />
              </div>
              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-center text-xs text-white/50 backdrop-blur">
                <Star className="mr-1 inline h-3 w-3 text-brand-yellow" />
                {liveStats ? 'Live data — connected to API' : 'Loading live stats...'}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 30C1440 30 1200 0 720 0C240 0 0 30 0 30L0 60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SERVICES SECTION
      ═══════════════════════════════════════════════ */}
      <section className="relative bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-yellow/10 px-4 py-1.5 text-xs font-bold tracking-wider text-brand-dark">
              <Layers className="h-4 w-4" />
              WHAT WE OFFER
            </div>
            <h2 className="mt-4 text-3xl font-black text-slate-900 lg:text-4xl">
              Our{' '}
              <span className="bg-gradient-to-r from-brand-dark to-slate-600 bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="mt-3 max-w-xl text-slate-500">
              Professional construction services with cutting-edge technology
              and a streamlined management platform.
            </p>
          </div>

          {/* Cards grid */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ServiceCard
              icon={HardHat}
              title="Construction Management"
              desc="Plan, coordinate, and deliver work on time with our complete project oversight tools."
              gradient="bg-gradient-to-br from-orange-500 to-red-500"
              delay="0ms"
            />
            <ServiceCard
              icon={UsersRound}
              title="Labour Supply"
              desc="Manage availability and assignments across multiple construction sites efficiently."
              gradient="bg-gradient-to-br from-blue-500 to-indigo-600"
              delay="100ms"
            />
            <ServiceCard
              icon={ClipboardList}
              title="Project Planning"
              desc="Track milestones, teams, and daily progress with visual dashboards and reports."
              gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
              delay="200ms"
            />
            <ServiceCard
              icon={Eye}
              title="Site Supervision"
              desc="Monitor activity and daily attendance with real-time notifications and alerts."
              gradient="bg-gradient-to-br from-violet-500 to-purple-600"
              delay="300ms"
            />
          </div>

          <div className="mt-10 text-center">
            <Button variant="secondary" to="/services">
              Explore All Services <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          LABOUR MANAGEMENT SECTION
      ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-slate-50 py-20">
        {/* Decorative bg */}
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-brand-yellow/5 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left – Text */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-yellow/10 px-4 py-1.5 text-xs font-bold tracking-wider text-brand-dark">
                <CheckCircle2 className="h-4 w-4" />
                POWERFUL DASHBOARD
              </div>
              <h2 className="mt-4 text-3xl font-black text-slate-900 lg:text-4xl">
                Labour{' '}
                <span className="bg-gradient-to-r from-brand-yellow to-amber-500 bg-clip-text text-transparent">
                  Management
                </span>
              </h2>
              <p className="mt-4 text-slate-500 leading-relaxed">
                Add workers, assign them to sites, mark daily attendance, and
                track wages and payment status — all from one centralized
                dashboard designed for efficiency.
              </p>
              <div className="mt-8 flex gap-4">
                <Button to="/labour">Open Dashboard</Button>
                <Button variant="secondary" to="/contact">
                  Contact Us
                </Button>
              </div>
            </div>

            {/* Right – Feature cards grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              <FeatureCard
                icon={FileSpreadsheet}
                title="Attendance"
                desc="Mark daily attendance and view detailed history reports."
                gradient="bg-gradient-to-br from-blue-500 to-blue-600"
              />
              <FeatureCard
                icon={UserPlus}
                title="Workers"
                desc="Add, edit, delete, and track worker availability."
                gradient="bg-gradient-to-br from-emerald-500 to-emerald-600"
              />
              <FeatureCard
                icon={MapPin}
                title="Projects / Sites"
                desc="Create construction sites and assign workers by location."
                gradient="bg-gradient-to-br from-violet-500 to-violet-600"
              />
              <FeatureCard
                icon={CreditCard}
                title="Payments"
                desc="Track wages and update real-time payment status."
                gradient="bg-gradient-to-br from-amber-500 to-orange-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-brand-yellow/5 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-black text-white lg:text-4xl">
            Ready to{' '}
            <span className="bg-gradient-to-r from-brand-yellow to-amber-400 bg-clip-text text-transparent">
              Streamline
            </span>{' '}
            Your Operations?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-400">
            Join Dream Builders and experience the most efficient way to manage
            your construction workforce, attendance, and payments.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/signup">
              Create Account <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="secondary" to="/contact">
              Talk to Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
