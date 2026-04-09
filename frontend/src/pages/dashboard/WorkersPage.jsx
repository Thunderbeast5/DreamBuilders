import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../lib/api'
import { Card } from '../../components/ui/Card.jsx'
import { Button } from '../../components/ui/Button.jsx'
import {
  Plus,
  Pencil,
  Trash2,
  X,
  ArrowLeft,
  Phone,
  Wrench,
  IndianRupee,
  Search,
} from 'lucide-react'

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

const emptyForm = { name: '', phone: '', skill: '', dailyWage: '', status: 'available' }

export function WorkersPage() {
  const [workers, setWorkers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)

  async function fetchWorkers() {
    try {
      const { data } = await api.get('/workers')
      setWorkers(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchWorkers() }, [])

  function openAdd() {
    setEditing(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  function openEdit(worker) {
    setEditing(worker)
    setForm({
      name: worker.name,
      phone: worker.phone,
      skill: worker.skill,
      dailyWage: worker.dailyWage,
      status: worker.status,
    })
    setModalOpen(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const payload = { ...form, dailyWage: Number(form.dailyWage) }
      if (editing) {
        await api.put(`/workers/${editing._id}`, payload)
      } else {
        await api.post('/workers', payload)
      }
      setModalOpen(false)
      fetchWorkers()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save worker')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this worker?')) return
    try {
      await api.delete(`/workers/${id}`)
      fetchWorkers()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete worker')
    }
  }

  const filtered = workers.filter(
    (w) =>
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.skill.toLowerCase().includes(search.toLowerCase())
  )

  const statusStyles = {
    available: 'bg-emerald-100 text-emerald-700',
    assigned: 'bg-blue-100 text-blue-700',
    inactive: 'bg-slate-100 text-slate-600',
  }

  return (
    <div className="bg-slate-50 min-h-[80vh]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/labour" className="rounded-md p-2 text-slate-500 hover:bg-white hover:text-slate-900 transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Workers</h1>
            <p className="text-sm text-slate-600">Manage all registered workers</p>
          </div>
        </div>

        {/* ── Summary Stats ── */}
        <div className="grid grid-cols-2 gap-3 mb-6 md:grid-cols-4">
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="text-xs font-semibold text-slate-500">Total</div>
            <div className="text-xl font-black text-slate-900">{workers.length}</div>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
            <div className="text-xs font-semibold text-emerald-600">Available</div>
            <div className="text-xl font-black text-emerald-700">{workers.filter(w => w.status === 'available').length}</div>
          </div>
          <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
            <div className="text-xs font-semibold text-blue-600">Assigned</div>
            <div className="text-xl font-black text-blue-700">{workers.filter(w => w.status === 'assigned').length}</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="text-xs font-semibold text-slate-500">Inactive</div>
            <div className="text-xl font-black text-slate-600">{workers.filter(w => w.status === 'inactive').length}</div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/20"
            />
          </div>
          <Button onClick={openAdd}>
            <Plus className="h-4 w-4" /> Add Worker
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-brand-yellow" />
          </div>
        ) : filtered.length === 0 ? (
          <Card>
            <div className="py-10 text-center text-slate-500">
              {workers.length === 0 ? 'No workers yet. Add your first worker!' : 'No workers match your search.'}
            </div>
          </Card>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((w) => (
              <div key={w._id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft transition hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-base font-bold text-slate-900">{w.name}</div>
                    <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${statusStyles[w.status]}`}>
                      {w.status}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(w)} className="rounded-md p-1.5 text-slate-400 hover:text-brand-dark hover:bg-slate-100">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(w._id)} className="rounded-md p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 space-y-1.5 text-sm text-slate-600">
                  <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-slate-400" /> {w.phone}</div>
                  <div className="flex items-center gap-2"><Wrench className="h-3.5 w-3.5 text-slate-400" /> {w.skill}</div>
                  <div className="flex items-center gap-2"><IndianRupee className="h-3.5 w-3.5 text-slate-400" /> ₹{w.dailyWage}/day</div>
                </div>
                {w.site && (
                  <div className="mt-3 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                    Assigned to: {w.site.name}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Worker' : 'Add Worker'}>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
              Name
              <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/20"
                placeholder="Worker name" />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
              Phone
              <input required value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/20"
                placeholder="+91 9876543210" />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
                Skill
                <input required value={form.skill} onChange={(e) => setForm((f) => ({ ...f, skill: e.target.value }))}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/20"
                  placeholder="Mason, Plumber..." />
              </label>
              <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
                Daily Wage (₹)
                <input required type="number" min="0" value={form.dailyWage} onChange={(e) => setForm((f) => ({ ...f, dailyWage: e.target.value }))}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/20"
                  placeholder="500" />
              </label>
            </div>
            <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
              Status
              <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/20">
                <option value="available">Available</option>
                <option value="assigned">Assigned</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Saving...' : editing ? 'Update Worker' : 'Add Worker'}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  )
}
