import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CheckCircle2, ChevronRight, PhoneCall, Send } from 'lucide-react'
import { getServiceBySlug } from '../data/services.js'
import { Card } from '../components/ui/Card.jsx'
import { Button } from '../components/ui/Button.jsx'
import { Badge } from '../components/ui/Badge.jsx'

function TabButton({ active, children, ...props }) {
  return (
    <button
      type="button"
      className={[
        'inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold transition',
        active ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100',
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}

export function ServiceDetailPage() {
  const { slug } = useParams()
  const service = useMemo(() => getServiceBySlug(slug), [slug])
  const [tab, setTab] = useState('overview')

  if (!service) {
    return (
      <div className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h1 className="text-2xl font-black text-slate-900">Service not found</h1>
          <p className="mt-2 text-slate-600">Please go back to Services and select a valid service.</p>
          <div className="mt-6">
            <Button variant="secondary" to="/services">
              Back to Services
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const Icon = service.icon

  return (
    <div className="bg-slate-50">
      <div className="bg-page">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
            <div className="absolute inset-0">
              {service.heroImage ? (
                <img
                  src={service.heroImage}
                  alt=""
                  className="h-full w-full object-cover opacity-90"
                  loading="lazy"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/40" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-transparent" />
            </div>

            <div className="relative p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                <Link to="/" className="hover:text-slate-900">
                  Home
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link to="/services" className="hover:text-slate-900">
                  Services
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="font-semibold text-slate-900">{service.title}</span>
              </div>

              <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1.4fr_0.9fr]">
                <div>
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-yellow text-brand-dark shadow-soft">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="max-w-2xl">
                      <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                        {service.title}
                      </h1>
                      <p className="mt-3 text-slate-700">{service.desc}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {service.highlights?.map((h) => (
                          <Badge key={h.label} color="sky" className="gap-1">
                            {h.icon ? <h.icon className="h-3.5 w-3.5" /> : null}
                            {h.label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <TabButton active={tab === 'overview'} onClick={() => setTab('overview')}>
                  Overview
                </TabButton>
                <TabButton active={tab === 'types'} onClick={() => setTab('types')}>
                  Types & scope
                </TabButton>
                <TabButton active={tab === 'outcomes'} onClick={() => setTab('outcomes')}>
                  Outcomes
                </TabButton>
              </div>

              <div className="mt-4">
                {tab === 'overview' ? (
                  <Card className="bg-white/80">
                    <div className="grid gap-4 md:grid-cols-3">
                      {service.highlights?.map((h) => (
                        <div key={h.label} className="rounded-lg border border-slate-200 bg-white p-4">
                          <div className="flex items-center gap-2 font-semibold text-slate-900">
                            {h.icon ? <h.icon className="h-5 w-5 text-brand-dark" /> : null}
                            <span>{h.label}</span>
                          </div>
                          <div className="mt-2 text-sm text-slate-600">
                            Built for real sites—clear steps, clear owners, and clear reporting.
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ) : null}

                {tab === 'types' ? (
                  <div className="grid gap-4">
                    {service.types?.map((t) => (
                      <Card key={t.title} title={t.title} className="bg-white/80">
                        <ul className="mt-1 grid gap-2 text-sm text-slate-700">
                          {t.points?.map((p) => (
                            <li key={p} className="flex items-start gap-2">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    ))}
                  </div>
                ) : null}

                {tab === 'outcomes' ? (
                  <Card className="bg-white/80" title="What you get">
                    <ul className="mt-1 grid gap-2 text-sm text-slate-700">
                      {service.outcomes?.map((o) => (
                        <li key={o} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ) : null}
              </div>
                </div>

                <aside className="lg:sticky lg:top-24">
                  <Card className="bg-white/90" title="Request this service" subtitle="Get a call-back within 24 hours.">
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
                        Service type
                        <select className="h-11 rounded-md border border-slate-300 bg-white px-3 text-slate-900 shadow-soft focus:outline-none focus:ring-2 focus:ring-brand-yellow">
                          {service.types?.map((t) => (
                            <option key={t.title} value={t.title}>
                              {t.title}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="grid gap-1 text-sm font-semibold text-slate-900">
                        Message
                        <textarea
                          rows={4}
                          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-soft focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                          placeholder="Tell us about your site, timeline, and location."
                        />
                      </label>
                      <Button className="w-full" type="submit">
                        <Send className="h-4 w-4" />
                        Send request
                      </Button>
                      <Button variant="secondary" className="w-full" to="/contact">
                        <PhoneCall className="h-4 w-4" />
                        Contact page
                      </Button>
                    </form>
                  </Card>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

