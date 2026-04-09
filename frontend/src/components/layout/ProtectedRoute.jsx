import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

export function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-brand-yellow" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Role-based access control
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Admin users go to admin dashboard, others go home
    const fallback = user.role === 'admin' ? '/admin' : '/'
    return <Navigate to={fallback} replace />
  }

  return children
}
