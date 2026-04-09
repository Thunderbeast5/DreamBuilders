import { Button } from '../components/ui/Button.jsx'
import { Card } from '../components/ui/Card.jsx'
import { ArrowRight, Sparkles } from 'lucide-react'
import { PROJECTS, getUnitsRemaining } from '../data/projects.js'
import { Badge } from '../components/ui/Badge.jsx'
import { Progress } from '../components/ui/Progress.jsx'
import { ProjectImage } from '../components/projects/ProjectImage.jsx'

export function ProjectsPage() {
  const projects = PROJECTS

  function statusColor(status) {
    if (status === 'Active') return 'emerald'
    if (status === 'Upcoming') return 'amber'
    if (status === 'Completed') return 'slate'
    return 'slate'
  }

  return (
    <div className="bg-slate-50">
      <div className="bg-page">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-inset ring-slate-200">
                <Sparkles className="h-4 w-4 text-brand-dark" />
                Interactive project details + availability
              </div>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                Projects
              </h1>
              <p className="mt-4 text-slate-600">
                Full, interactive project cards: sold vs remaining units, progress, amenities,
                and a proper detail page for each project.
              </p>
            </div>
            <Button variant="secondary" to="/contact">
              Request a quote
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {projects.map((p) => {
              const remaining = getUnitsRemaining(p)
              const soldPct = p.totalUnits ? Math.round((p.soldUnits / p.totalUnits) * 100) : 0
              return (
                <Card
                  key={p.slug}
                  to={`/projects/${p.slug}`}
                  title={p.name}
                  subtitle={p.desc}
                  icon={p.icon}
                  className="bg-white/85"
                  media={
                    <div className="h-32 w-full">
                      {p.coverImage ? (
                        <div className="relative h-full w-full">
                          <img
                            src={p.coverImage}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                        </div>
                      ) : (
                        <ProjectImage variant={p.gallery?.[0] || 'tower-1'} className="h-full w-full" />
                      )}
                    </div>
                  }
                >
                  <div className="mt-4 grid gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge color={statusColor(p.status)}>{p.status}</Badge>
                      <Badge color={remaining > 0 ? 'emerald' : 'slate'}>
                        {remaining > 0 ? `${remaining} remaining` : 'Sold out'}
                      </Badge>
                      <span className="ml-auto inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                        View details
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>

                    <div className="grid gap-2 rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center justify-between text-sm font-semibold text-slate-900">
                        <span>Construction progress</span>
                        <span>{p.progressPercent}%</span>
                      </div>
                      <Progress value={p.progressPercent} />

                      <div className="mt-2 flex items-center justify-between text-sm font-semibold text-slate-900">
                        <span>Units sold</span>
                        <span>{soldPct}%</span>
                      </div>
                      <Progress value={soldPct} />
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
