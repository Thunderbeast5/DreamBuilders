import { NavLink } from 'react-router-dom'

const styles = {
  primary:
    'inline-flex items-center justify-center gap-2 rounded-md bg-brand-yellow px-5 py-2.5 text-sm font-semibold text-brand-dark shadow-soft transition hover:brightness-95 hover:-translate-y-0.5',
  secondary:
    'inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-soft transition hover:bg-slate-50 hover:-translate-y-0.5',
}

export function Button({ variant = 'primary', as, to, href, ...props }) {
  const className = [styles[variant], props.className].filter(Boolean).join(' ')

  if (as === 'a' || href) {
    return <a {...props} className={className} href={href} />
  }

  if (to) {
    return <NavLink {...props} className={className} to={to} />
  }

  return <button {...props} className={className} />
}

