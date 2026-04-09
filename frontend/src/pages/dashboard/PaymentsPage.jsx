import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../lib/api'
import { Card } from '../../components/ui/Card.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { ArrowLeft, Plus, X, IndianRupee, CheckCircle2, Clock } from 'lucide-react'

function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="rounded-md p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export function PaymentsPage() {
  const [payments, setPayments] = useState([])
  const [workers, setWorkers] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [filter, setFilter] = useState('all') // 'all' | 'pending' | 'paid'
  const [form, setForm] = useState({ worker: '', amount: '', note: '', days: 6 })
  const [submitting, setSubmitting] = useState(false)

  async function fetchData() {
    try {
      const [paymentsRes, workersRes] = await Promise.all([
        api.get('/payments'),
        api.get('/workers'),
      ])
      setPayments(paymentsRes.data)
      setWorkers(workersRes.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  // Auto-calculate amount when worker or days changes
  function handleWorkerSelect(workerId) {
    const w = workers.find((w) => w._id === workerId)
    const days = form.days || 6
    const amount = w ? w.dailyWage * days : ''
    setForm((f) => ({ ...f, worker: workerId, amount: amount.toString() }))
  }

  function handleDaysChange(days) {
    const w = workers.find((w) => w._id === form.worker)
    const amount = w ? w.dailyWage * days : form.amount
    setForm((f) => ({ ...f, days, amount: amount.toString() }))
  }

  async function handleCreate(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.post('/payments', {
        worker: form.worker,
        amount: Number(form.amount),
        note: form.note,
        status: 'pending',
      })
      setModalOpen(false)
      setForm({ worker: '', amount: '', note: '', days: 6 })
      fetchData()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create payment')
    } finally {
      setSubmitting(false)
    }
  }

  async function markPaid(id) {
    try {
      await api.put(`/payments/${id}`, { status: 'paid' })
      fetchData()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update payment')
    }
  }

  const filtered = filter === 'all' ? payments : payments.filter((p) => p.status === filter)

  const totalPending = payments.filter((p) => p.status === 'pending').reduce((s, p) => s + p.amount, 0)
  const totalPaid = payments.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amount, 0)

  return (
    <div className="bg-slate-50 min-h-[80vh]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/labour" className="rounded-md p-2 text-slate-500 hover:bg-white hover:text-slate-900 transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Payments</h1>
            <p className="text-sm text-slate-600">Track wages and payment records</p>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
            <div className="text-sm font-semibold text-slate-500">Total Payments</div>
            <div className="mt-1 text-2xl font-black text-slate-900">{payments.length}</div>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-amber-700">
              <Clock className="h-4 w-4" /> Pending
            </div>
            <div className="mt-1 text-2xl font-black text-amber-700">₹{totalPending.toLocaleString()}</div>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
              <CheckCircle2 className="h-4 w-4" /> Paid
            </div>
            <div className="mt-1 text-2xl font-black text-emerald-700">₹{totalPaid.toLocaleString()}</div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex gap-2">
            {['all', 'pending', 'paid'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  filter === f
                    ? 'bg-brand-dark text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4" /> New Payment
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-brand-yellow" />
          </div>
        ) : filtered.length === 0 ? (
          <Card>
            <div className="py-10 text-center text-slate-500">
              {payments.length === 0 ? 'No payments yet. Create your first payment record!' : 'No payments match this filter.'}
            </div>
          </Card>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Worker</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Amount</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Note</th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700">Status</th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p._id} className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {p.worker?.name || 'Unknown'}
                        <div className="text-xs text-slate-400">{p.worker?.skill}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 font-semibold text-slate-900">
                          <IndianRupee className="h-3.5 w-3.5" />
                          {p.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {new Date(p.date).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-4 py-3 text-slate-600 max-w-[200px] truncate">
                        {p.note || '—'}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          p.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {p.status === 'pending' && (
                          <button
                            onClick={() => markPaid(p._id)}
                            className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-200"
                          >
                            <CheckCircle2 className="h-3 w-3" /> Mark Paid
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Create Payment Modal */}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Payment">
          <form onSubmit={handleCreate} className="grid gap-4">
            <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
              Worker
              <select required value={form.worker} onChange={(e) => setForm((f) => ({ ...f, worker: e.target.value }))}
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/20">
                <option value="">Select Worker</option>
                {workers.map((w) => (
                  <option key={w._id} value={w._id}>{w.name} — {w.skill} (₹{w.dailyWage}/day)</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
              Amount (₹)
              <input required type="number" min="1" value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/20"
                placeholder="5000" />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
              Note (optional)
              <input value={form.note} onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/20"
                placeholder="Weekly payment, overtime, etc." />
            </label>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Creating...' : 'Create Payment'}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  )
}
