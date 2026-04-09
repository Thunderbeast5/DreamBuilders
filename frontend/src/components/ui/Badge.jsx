export function Badge({ children, color = 'slate', className = '' }) {
  const colors = {
    slate: 'bg-slate-100 text-slate-700 ring-slate-200',
    emerald: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
    amber: 'bg-amber-100 text-amber-700 ring-amber-200',
    sky: 'bg-sky-100 text-sky-700 ring-sky-200',
    rose: 'bg-rose-100 text-rose-700 ring-rose-200',
  }

  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset',
        colors[color] || colors.slate,
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}

