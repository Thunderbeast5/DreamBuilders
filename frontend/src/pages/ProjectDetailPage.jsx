import { Link, useParams } from 'react-router-dom'
import { ChevronRight, CheckCircle2, MapPin, Calendar, Building2, PieChart, PhoneCall } from 'lucide-react'
import { getProjectBySlug, getUnitsRemaining } from '../data/projects.js'
import { Card } from '../components/ui/Card.jsx'
import { Button } from '../components/ui/Button.jsx'
import { Badge } from '../components/ui/Badge.jsx'
import { Progress } from '../components/ui/Progress.jsx'
import { ProjectImage } from '../components/projects/ProjectImage.jsx'

function statusColor(status) {
  if (status === 'Active') return 'emerald'
  if (status === 'Upcoming') return 'amber'
  if (status === 'Completed') return 'slate'
  return 'slate'
}

function Stat({ label, value, icon: Icon }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white/85 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
        {Icon ? <Icon className="h-4 w-4 text-brand-dark" /> : null}
        <span>{label}</span>
      </div>
      <div className="mt-2 text-2xl font-black text-slate-900">{value}</div>
    </div>
  )
}

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) {
    return (
      <div className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h1 className="text-2xl font-black text-slate-900">Project not found</h1>
          <p className="mt-2 text-slate-600">Please go back to Projects and select a valid project.</p>
          <div className="mt-6">
            <Button variant="secondary" to="/projects">
              Back to Projects
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const remaining = getUnitsRemaining(project)
  const Icon = project.icon
  const soldPct = project.totalUnits ? Math.round((project.soldUnits / project.totalUnits) * 100) : 0

  return (
    <div className="bg-slate-50">
      <div className="relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0">
          {project.coverImage ? (
            <div className="relative h-full w-full">
              <img
                src={project.coverImage}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-95"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
            </div>
          ) : (
            <ProjectImage variant={project.gallery?.[0] || 'tower-1'} className="h-full w-full opacity-95" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/75 to-slate-50" />

        <div className="relative mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-700">
            <Link to="/" className="hover:text-slate-900">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/projects" className="hover:text-slate-900">
              Projects
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-semibold text-slate-900">{project.name}</span>
          </div>

          <div className="mt-6 grid items-end gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-yellow text-brand-dark shadow-soft">
                  <Icon className="h-6 w-6" />
                </div>
                <Badge color={statusColor(project.status)}>{project.status}</Badge>
              </div>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                {project.name}
              </h1>
              <p className="mt-3 text-slate-700">{project.desc}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-700">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 ring-1 ring-inset ring-slate-200">
                  <MapPin className="h-4 w-4 text-brand-dark" />
                  {project.location}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 ring-1 ring-inset ring-slate-200">
                  <Calendar className="h-4 w-4 text-brand-dark" />
                  {project.completion}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <Button to="/contact" className="w-full">
                <PhoneCall className="h-4 w-4" />
                Request a quote
              </Button>
              <Button variant="secondary" to="/services" className="w-full">
                Explore services
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <section className="grid gap-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <Stat label="Total units" value={project.totalUnits} icon={Building2} />
              <Stat label="Sold" value={project.soldUnits} icon={PieChart} />
              <Stat label="Remaining" value={remaining} icon={Building2} />
            </div>

            <Card className="bg-white/90" title="Availability & progress" subtitle="Real-time style overview (demo data).">
              <div className="grid gap-5">
                <div>
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-900">
                    <span>Construction progress</span>
                    <span>{project.progressPercent}%</span>
                  </div>
                  <div className="mt-2">
                    <Progress value={project.progressPercent} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-900">
                    <span>Units sold</span>
                    <span>{soldPct}%</span>
                  </div>
                  <div className="mt-2">
                    <Progress value={soldPct} className="bg-slate-200" />
                  </div>
                </div>
                <div className="grid gap-2 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">Booking status</span>
                    <Badge color={remaining > 0 ? 'emerald' : 'slate'}>{remaining > 0 ? 'Open' : 'Sold out'}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Remaining units</span>
                    <span className="font-semibold text-slate-900">{remaining}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Next milestone</span>
                    <span className="font-semibold text-slate-900">
                      {project.status === 'Completed' ? 'Handover' : 'Finishing & inspections'}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white/90" title="Highlights">
              <ul className="mt-1 grid gap-2 text-sm text-slate-700">
                {project.highlights?.map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          <aside className="grid gap-6 lg:sticky lg:top-24 lg:self-start">
            <Card className="bg-white/90" title="Amenities">
              <ul className="mt-1 grid gap-2 text-sm text-slate-700">
                {project.amenities?.map((a) => (
                  <li key={a} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card
              className="bg-white/90"
              title="Book a site visit"
              subtitle="Leave your details—we’ll share availability and floor plans."
            >
              <form
                className="grid gap-3"
                onSubmit={(e) => {
                  e.preventDefault()
                }}
              >
                <label className="grid gap-1 text-sm font-semibold text-slate-900">
                  Name
                  <input
                    className="h-11 rounded-md border border-slate-300 bg-white px-3 text-slate-900 shadow-soft focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    placeholder="Your full name"
                    required
                  />
                </label>
                <label className="grid gap-1 text-sm font-semibold text-slate-900">
                  Phone
                  <input
                    className="h-11 rounded-md border border-slate-300 bg-white px-3 text-slate-900 shadow-soft focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                    placeholder="+91 9xxxx xxxxx"
                    required
                  />
                </label>
                <label className="grid gap-1 text-sm font-semibold text-slate-900">
                  Interested in
                  <select className="h-11 rounded-md border border-slate-300 bg-white px-3 text-slate-900 shadow-soft focus:outline-none focus:ring-2 focus:ring-brand-yellow">
                    <option>2 BHK</option>
                    <option>3 BHK</option>
                    <option>Office / Retail</option>
                    <option>Other</option>
                  </select>
                </label>
                <Button className="w-full" type="submit">
                  Request call-back
                </Button>
              </form>
            </Card>
          </aside>
        </div>

        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900">Gallery</h2>
              <p className="mt-1 text-sm text-slate-600">Concept visuals (placeholder artwork).</p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {(project.gallery || []).slice(0, 3).map((g) => (
              <div key={g} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft">
                <div className="aspect-[4/3]">
                  <ProjectImage variant={g} className="h-full w-full" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

