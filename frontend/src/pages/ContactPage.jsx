import { useState } from 'react'
import { Button } from '../components/ui/Button.jsx'
import { Card } from '../components/ui/Card.jsx'
import { api } from '../lib/api'
import { CheckCircle2, AlertCircle, Phone, Mail, Send } from 'lucide-react'

const serviceOptions = [
  'Construction Management',
  'Labour Supply',
  'Project Planning',
  'Site Supervision',
  'Other',
]

export function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [status, setStatus] = useState(null) // 'success' | 'error'
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      await api.post('/contact', form)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', service: '', message: '' })
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
          Contact
        </h1>
        <p className="mt-4 text-slate-600">
          Send an inquiry, request services, or ask about labour management.
        </p>
      </div>

      {status === 'success' && (
        <div className="mt-6 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Your message has been sent successfully! We&apos;ll get back to you soon.</span>
        </div>
      )}
      {status === 'error' && (
        <div className="mt-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>Failed to send message. Please try again.</span>
        </div>
      )}

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card title="Contact form" subtitle="We'll get back to you soon.">
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-slate-900">
                  Name
                  <input
                    className="rounded-md border border-slate-300 px-3 py-2 text-sm font-normal outline-none ring-brand-yellow/40 focus:ring-4"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-900">
                  Email
                  <input
                    className="rounded-md border border-slate-300 px-3 py-2 text-sm font-normal outline-none ring-brand-yellow/40 focus:ring-4"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="you@example.com"
                    type="email"
                    required
                  />
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-slate-900">
                  Phone Number
                  <input
                    className="rounded-md border border-slate-300 px-3 py-2 text-sm font-normal outline-none ring-brand-yellow/40 focus:ring-4"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="Your phone number"
                    type="tel"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-900">
                  Service Required
                  <select
                    className="rounded-md border border-slate-300 px-3 py-2 text-sm font-normal outline-none ring-brand-yellow/40 focus:ring-4 bg-white"
                    value={form.service}
                    onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="grid gap-2 text-sm font-semibold text-slate-900">
                Message
                <textarea
                  className="min-h-32 rounded-md border border-slate-300 px-3 py-2 text-sm font-normal outline-none ring-brand-yellow/40 focus:ring-4"
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  placeholder="How can we help?"
                  required
                />
              </label>
              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Sending...' : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" /> Send message
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        <div className="grid gap-4">
          <Card className="!bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-md">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Phone</div>
                <div className="text-sm font-bold text-slate-900">9422252981</div>
              </div>
            </div>
          </Card>
          <Card className="!bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-md">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Email</div>
                <div className="text-sm font-bold text-slate-900">dreambuilders13@gmail.com</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
