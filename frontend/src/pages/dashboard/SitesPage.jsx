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
  MapPin,
  Users,
  UserPlus,
  UserMinus,
} from 'lucide-react'

function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
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

const emptyForm = { name: '', location: '', status: 'active' }

export function SitesPage() {
  const [sites, setSites] = useState([])
  const [workers, setWorkers] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [assignModal, setAssignModal] = useState(null) // site object
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState('')

  async function fetchData() {
    try {
      const [sitesRes, workersRes] = await Promise.all([
        api.get('/sites'),
        api.get('/workers'),
      ])
      setSites(sitesRes.data)
      setWorkers(workersRes.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  function openAdd() {
    setEditing(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  function openEdit(site) {
    setEditing(site)
    setForm({ name: site.name, location: site.location, status: site.status })
    setModalOpen(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (editing) {
        await api.put(`/sites/${editing._id}`, form)
      } else {
        await api.post('/sites', form)
      }
      setModalOpen(false)
      fetchData()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save site')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this site? Workers will be unassigned.')) return
    try {
      await api.delete(`/sites/${id}`)
      fetchData()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete site')
    }
  }

  async function handleAssign() {
    if (!selectedWorker || !assignModal) return
    try {
      await api.post(`/sites/${assignModal._id}/assign`, { workerId: selectedWorker })
      setSelectedWorker('')
      fetchData()
      setAssignModal(null)
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to assign worker')
    }
  }

  async function handleUnassign(siteId, workerId) {
    try {
      await api.post(`/sites/${siteId}/unassign`, { workerId })
      fetchData()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to unassign worker')
    }
  }

  const statusStyles = {
    active: 'bg-emerald-100 text-emerald-700',
    completed: 'bg-slate-100 text-slate-600',
    upcoming: 'bg-amber-100 text-amber-700',
  }

  const availableWorkers = workers.filter((w) => w.status === 'available')

  return (
    <div className="bg-slate-50 min-h-[80vh]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/labour" className="rounded-md p-2 text-slate-500 hover:bg-white hover:text-slate-900 transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Sites</h1>
            <p className="text-sm text-slate-600">Manage construction sites and worker assignments</p>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <Button onClick={openAdd}>
            <Plus className="h-4 w-4" /> Add Site
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-brand-yellow" />
          </div>
        ) : sites.length === 0 ? (
          <Card>
            <div className="py-10 text-center text-slate-500">No sites yet. Add your first site!</div>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {sites.map((site) => (
              <div key={site._id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-base font-bold text-slate-900">{site.name}</div>
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-600">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {site.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusStyles[site.status]}`}>
                      {site.status}
                    </span>
                    <button onClick={() => openEdit(site)} className="rounded-md p-1.5 text-slate-400 hover:text-brand-dark hover:bg-slate-100">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(site._id)} className="rounded-md p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                      <Users className="h-4 w-4" />
                      Workers ({site.workers?.length || 0})
                    </div>
                    <button
                      onClick={() => { setAssignModal(site); setSelectedWorker('') }}
                      className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
                    >
                      <UserPlus className="h-3 w-3" /> Assign
                    </button>
                  </div>
                  {site.workers?.length > 0 ? (
                    <div className="space-y-1.5">
                      {site.workers.map((w) => (
                        <div key={w._id} className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-1.5 text-sm">
                          <span className="text-slate-700">{w.name} <span className="text-slate-400">· {w.skill}</span></span>
                          <button onClick={() => handleUnassign(site._id, w._id)}
                            className="rounded p-1 text-slate-400 hover:text-red-600 hover:bg-red-50"
                            title="Unassign">
                            <UserMinus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 italic">No workers assigned</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Site Modal */}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Site' : 'Add Site'}>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
              Site Name
              <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/20"
                placeholder="Skyline Tower" />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
              Location
              <input required value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/20"
                placeholder="Mumbai, Maharashtra" />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
              Status
              <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/20">
                <option value="active">Active</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </label>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Saving...' : editing ? 'Update Site' : 'Add Site'}
              </Button>
            </div>
          </form>
        </Modal>

        {/* Assign Worker Modal */}
        <Modal open={!!assignModal} onClose={() => setAssignModal(null)} title={`Assign Worker to ${assignModal?.name || ''}`}>
          {availableWorkers.length === 0 ? (
            <p className="text-sm text-slate-500">No available workers. All workers are already assigned or inactive.</p>
          ) : (
            <div className="grid gap-4">
              <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
                Select Worker
                <select value={selectedWorker} onChange={(e) => setSelectedWorker(e.target.value)}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/20">
                  <option value="">Choose a worker...</option>
                  {availableWorkers.map((w) => (
                    <option key={w._id} value={w._id}>{w.name} — {w.skill}</option>
                  ))}
                </select>
              </label>
              <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={() => setAssignModal(null)}>Cancel</Button>
                <Button onClick={handleAssign} disabled={!selectedWorker}>Assign Worker</Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  )
}
