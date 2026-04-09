import { ArrowRight, Sparkles } from 'lucide-react'
import { Card } from '../components/ui/Card.jsx'
import { Button } from '../components/ui/Button.jsx'
import { SERVICES } from '../data/services.js'
import { Badge } from '../components/ui/Badge.jsx'

export function ServicesPage() {
  return (
    <div className="bg-slate-50">
      <div className="bg-page">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-inset ring-slate-200">
                <Sparkles className="h-4 w-4 text-brand-dark" />
                Click any service for full details
              </div>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                Services
              </h1>
              <p className="mt-4 text-slate-600">
                Proper, full-fledge service pages with scope, types, and a request
                flow—built for a construction + labour platform.
              </p>
            </div>
            <Button variant="secondary" to="/contact">
              Talk to us
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <Card
                key={s.slug}
                to={`/services/${s.slug}`}
                title={s.title}
                subtitle={s.desc}
                icon={s.icon}
                className="bg-white/85"
              >
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {s.highlights?.slice(0, 2).map((h) => (
                    <Badge key={h.label} color="sky" className="gap-1">
                      {h.icon ? <h.icon className="h-3.5 w-3.5" /> : null}
                      {h.label}
                    </Badge>
                  ))}
                  <span className="ml-auto inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                    View
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
