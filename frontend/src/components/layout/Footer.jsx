import { NavLink } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-lg font-semibold text-slate-900">
              Dream Builders
            </div>
            <p className="mt-2 text-sm text-slate-600">
              We build your dreams — and help you manage labour, sites,
              attendance, and payments from one place.
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-900">Quick links</div>
            <div className="mt-3 grid gap-2 text-sm">
              <NavLink className="text-slate-600 hover:text-slate-900" to="/about">
                About
              </NavLink>
              <NavLink
                className="text-slate-600 hover:text-slate-900"
                to="/services"
              >
                Services
              </NavLink>
              <NavLink
                className="text-slate-600 hover:text-slate-900"
                to="/projects"
              >
                Projects
              </NavLink>
              <NavLink
                className="text-slate-600 hover:text-slate-900"
                to="/labour"
              >
                Labour Management
              </NavLink>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-900">Contact</div>
            <div className="mt-3 grid gap-2 text-sm text-slate-600">
              <div>Phone: 9422252981</div>
              <div>Email: dreambuilders13@gmail.com</div>
              <NavLink className="mt-2 text-slate-900 underline" to="/contact">
                Contact form
              </NavLink>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <div>© Dream Builders 2026. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <NavLink className="hover:text-slate-900" to="/privacy">
              Privacy
            </NavLink>
            <NavLink className="hover:text-slate-900" to="/terms">
              Terms
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  )
}

