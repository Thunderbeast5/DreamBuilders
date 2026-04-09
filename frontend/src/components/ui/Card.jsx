import { forwardRef } from 'react'
import { NavLink } from 'react-router-dom'

export const Card = forwardRef(function Card(
  {
    media,
    title,
    subtitle,
    icon: Icon,
    children,
    className = '',
    as,
    to,
    href,
    onClick,
    ...props
  },
  ref,
) {
  const base = [
    'overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft',
    onClick || to || href ? 'transition hover:-translate-y-0.5 hover:shadow-md' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const header = title ? (
    <div className="px-6 pt-6">
      <div className="flex items-center gap-2 text-base font-semibold text-slate-900">
        {Icon ? <Icon className="h-5 w-5 text-brand-dark" /> : null}
        <span>{title}</span>
      </div>
      {subtitle ? <div className="mt-1 text-sm text-slate-600">{subtitle}</div> : null}
    </div>
  ) : null

  const body = (
    <>
      {media ? <div className="relative">{media}</div> : null}
      {header}
      <div className="px-6 pb-6 pt-4">{children}</div>
    </>
  )

  if (as === 'a' || href) {
    return (
      <a ref={ref} className={base} href={href} {...props}>
        {body}
      </a>
    )
  }

  if (to) {
    return (
      <NavLink ref={ref} className={base} to={to} {...props}>
        {body}
      </NavLink>
    )
  }

  if (onClick || as === 'button') {
    return (
      <button
        ref={ref}
        type="button"
        className={[base, 'text-left'].join(' ')}
        onClick={onClick}
        {...props}
      >
        {body}
      </button>
    )
  }

  return (
    <div ref={ref} className={base} {...props}>
      {body}
    </div>
  )
})

