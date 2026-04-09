import { Card } from '../components/ui/Card.jsx'
import { Badge } from '../components/ui/Badge.jsx'
import { Building2, ShieldCheck, Users, Target, Sparkles, ClipboardCheck } from 'lucide-react'

export function AboutPage() {
  return (
    <div className="bg-slate-50">
      <div className="bg-page">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-inset ring-slate-200">
              <Sparkles className="h-4 w-4 text-brand-dark" />
              Built for real construction teams
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              About Dream Builders
            </h1>
            <p className="mt-4 text-slate-700">
              Dream Builders blends a professional construction company website with an
              integrated labour management workflow—so clients see credibility, and teams
              get day-to-day operational control.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge color="sky" className="gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                Safety-first
              </Badge>
              <Badge color="emerald" className="gap-1">
                <ClipboardCheck className="h-3.5 w-3.5" />
                Audit-ready logs
              </Badge>
              <Badge color="amber" className="gap-1">
                <Users className="h-3.5 w-3.5" />
                Workforce planning
              </Badge>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Card
              title="Experience"
              subtitle="Construction industry expertise with field-ready, repeatable processes."
              icon={Building2}
              className="bg-white/85"
            />
            <Card
              title="Mission"
              subtitle="Simplify labour operations with accurate digital tracking and clear ownership."
              icon={Target}
              className="bg-white/85"
            />
            <Card
              title="Vision"
              subtitle="A modern, centralized platform for construction teams—site to office."
              icon={ShieldCheck}
              className="bg-white/85"
            />
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <Card
              className="bg-white/85"
              title="What makes us different"
              subtitle="A full-fledge feel: modern UI + practical workflows."
            >
              <div className="grid gap-3 text-sm text-slate-700">
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="font-semibold text-slate-900">Client-ready presentation</div>
                  <div className="mt-1 text-slate-600">
                    Clean pages, strong typography, and consistent components that feel premium.
                  </div>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="font-semibold text-slate-900">Operations that actually map to sites</div>
                  <div className="mt-1 text-slate-600">
                    Attendance, workers, sites, and payments can live together with role-based access.
                  </div>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="font-semibold text-slate-900">Scales from small to large projects</div>
                  <div className="mt-1 text-slate-600">
                    Standardized services and project detail pages make expansion easy.
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white/85" title="At a glance">
              <div className="grid gap-3">
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="text-sm font-semibold text-slate-900">Projects tracked</div>
                  <div className="mt-1 text-2xl font-black text-slate-900">4+</div>
                  <div className="mt-1 text-xs text-slate-500">Demo content (extend with real data)</div>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="text-sm font-semibold text-slate-900">Core services</div>
                  <div className="mt-1 text-2xl font-black text-slate-900">4</div>
                  <div className="mt-1 text-xs text-slate-500">Interactive detail pages</div>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="text-sm font-semibold text-slate-900">Workflows</div>
                  <div className="mt-1 text-2xl font-black text-slate-900">Attendance • Payments</div>
                  <div className="mt-1 text-xs text-slate-500">Inside Labour Management</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

