import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../lib/api'
import { Card } from '../../components/ui/Card.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { ArrowLeft, CalendarCheck2, Check, X, Minus } from 'lucide-react'

export function AttendancePage() {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
  const [workers, setWorkers] = useState([])
  const [sites, setSites] = useState([])
  const [attendance, setAttendance] = useState({}) // { workerId: { status, site } }
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      setSaved(false)
      try {
        const [workersRes, sitesRes, attendanceRes] = await Promise.all([
          api.get('/workers'),
          api.get('/sites'),
          api.get(`/attendance?date=${date}`),
        ])
        setWorkers(workersRes.data)
        setSites(sitesRes.data)

        // Build attendance map from existing records
        const map = {}
        for (const r of attendanceRes.data) {
          map[r.worker._id || r.worker] = {
            status: r.status,
            site: r.site?._id || r.site || '',
          }
        }
        // Pre-fill remaining workers as absent
        for (const w of workersRes.data) {
          if (!map[w._id]) {
            map[w._id] = {
              status: 'absent',
              site: w.site?._id || w.site || '',
            }
          }
        }
        setAttendance(map)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [date])

  function toggleStatus(workerId) {
    setAttendance((prev) => {
      const current = prev[workerId]?.status || 'absent'
      const next =
        current === 'absent' ? 'present' : current === 'present' ? 'half-day' : 'absent'
      return { ...prev, [workerId]: { ...prev[workerId], status: next } }
    })
    setSaved(false)
  }

  function setSite(workerId, siteId) {
    setAttendance((prev) => ({
      ...prev,
      [workerId]: { ...prev[workerId], site: siteId },
    }))
    setSaved(false)
  }

  async function handleSave() {
    setSubmitting(true)
    try {
      const records = Object.entries(attendance).map(([workerId, data]) => ({
        worker: workerId,
        site: data.site,
        date,
        status: data.status,
      })).filter((r) => r.site) // Only submit those with a site assigned

      await api.post('/attendance', { records })
      setSaved(true)
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save attendance')
    } finally {
      setSubmitting(false)
    }
  }

  const statusIcon = {
    present: <Check className="h-4 w-4" />,
    absent: <X className="h-4 w-4" />,
    'half-day': <Minus className="h-4 w-4" />,
  }
  const statusStyle = {
    present: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    absent: 'bg-red-100 text-red-700 border-red-200',
    'half-day': 'bg-amber-100 text-amber-700 border-amber-200',
  }

  return (
    <div className="bg-slate-50 min-h-[80vh]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/labour" className="rounded-md p-2 text-slate-500 hover:bg-white hover:text-slate-900 transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Attendance</h1>
            <p className="text-sm text-slate-600">Mark daily worker attendance</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-center gap-3">
            <CalendarCheck2 className="h-5 w-5 text-brand-dark" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/20"
            />
          </div>
          <div className="flex items-center gap-3">
            {saved && <span className="text-sm font-medium text-emerald-600">✓ Saved!</span>}
            <Button onClick={handleSave} disabled={submitting}>
              {submitting ? 'Saving...' : 'Save Attendance'}
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-brand-yellow" />
          </div>
        ) : workers.length === 0 ? (
          <Card>
            <div className="py-10 text-center text-slate-500">
              No workers registered yet. <Link to="/labour/workers" className="text-brand-dark underline">Add workers first</Link>.
            </div>
          </Card>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Worker</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Skill</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Site</th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {workers.map((w) => {
                    const a = attendance[w._id] || { status: 'absent', site: '' }
                    return (
                      <tr key={w._id} className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-medium text-slate-900">{w.name}</td>
                        <td className="px-4 py-3 text-slate-600">{w.skill}</td>
                        <td className="px-4 py-3">
                          <select
                            value={a.site}
                            onChange={(e) => setSite(w._id, e.target.value)}
                            className="rounded border border-slate-200 px-2 py-1 text-xs outline-none focus:border-brand-yellow"
                          >
                            <option value="">Select site</option>
                            {sites.map((s) => (
                              <option key={s._id} value={s._id}>{s.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => toggleStatus(w._id)}
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition ${statusStyle[a.status]}`}
                          >
                            {statusIcon[a.status]}
                            {a.status}
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
