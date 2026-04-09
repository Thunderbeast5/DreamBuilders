import { useMemo, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  Home,
  Info,
  Wrench,
  FolderKanban,
  HardHat,
  Mail,
  ArrowRight,
  LogIn,
  LogOut,
  User,
  Shield,
} from 'lucide-react'
import { useAuth } from '../../context/useAuth'
import { Logo } from '../brand/Logo.jsx'

function NavItem({ to, icon: Icon, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        [
          'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition',
          isActive
            ? 'bg-slate-100 text-slate-900'
            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
        ].join(' ')
      }
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
      <span>{children}</span>
    </NavLink>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const items = useMemo(
    () => [
      { to: '/', label: 'Home', icon: Home },
      { to: '/about', label: 'About', icon: Info },
      { to: '/services', label: 'Services', icon: Wrench },
      { to: '/projects', label: 'Projects', icon: FolderKanban },
      { to: '/labour', label: 'Labour Management', icon: HardHat },
      { to: '/contact', label: 'Contact', icon: Mail },
    ],
    [],
  )

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Logo size={40} className="bg-white" />
          <div className="leading-tight">
            <div className="text-base font-semibold text-slate-900">
              Dream Builders
            </div>
            <div className="text-xs text-slate-500">Construction & Labour</div>
          </div>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {items.map((it) => (
            <NavItem key={it.to} to={it.to} icon={it.icon}>
              {it.label}
            </NavItem>
          ))}

          {user ? (
            <>
              {user.role === 'admin' && (
                <NavLink
                  to="/admin"
                  className="ml-2 inline-flex items-center gap-2 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin Portal</span>
                </NavLink>
              )}
              <div className="ml-2 flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                <User className="h-4 w-4 text-brand-dark" />
                <span>{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="ml-1 inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <NavItem to="/login" icon={LogIn}>
                Login
              </NavItem>
              <NavLink
                to="/signup"
                className="ml-2 inline-flex items-center gap-2 rounded-md bg-brand-yellow px-4 py-2 text-sm font-semibold text-brand-dark shadow-soft transition hover:brightness-95 hover:-translate-y-0.5"
              >
                <span>Sign Up</span>
                <ArrowRight className="h-4 w-4" />
              </NavLink>
            </>
          )}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-slate-200 p-2 text-slate-700 hover:bg-slate-50 md:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h16v2H4v-2Z"
            />
          </svg>
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {items.map((it) => (
              <NavItem
                key={it.to}
                to={it.to}
                icon={it.icon}
                onClick={() => setOpen(false)}
              >
                {it.label}
              </NavItem>
            ))}

            {user ? (
              <>
                {user.role === 'admin' && (
                  <NavLink
                    to="/admin"
                    className="inline-flex items-center gap-2 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                    onClick={() => setOpen(false)}
                  >
                    <Shield className="h-4 w-4" />
                    <span>Admin Portal</span>
                  </NavLink>
                )}
                <div className="flex items-center gap-2 rounded-md bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                  <User className="h-4 w-4 text-brand-dark" />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout()
                    setOpen(false)
                  }}
                  className="mt-1 inline-flex items-center justify-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <NavItem
                  to="/login"
                  icon={LogIn}
                  onClick={() => setOpen(false)}
                >
                  Login
                </NavItem>
                <NavLink
                  to="/signup"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-brand-yellow px-4 py-2 text-sm font-semibold text-brand-dark shadow-soft transition hover:brightness-95 hover:-translate-y-0.5"
                  onClick={() => setOpen(false)}
                >
                  <span>Sign Up</span>
                  <ArrowRight className="h-4 w-4" />
                </NavLink>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
