export function Progress({ value = 0, className = '' }) {
  const v = Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0))
  return (
    <div className={['h-2 w-full overflow-hidden rounded-full bg-slate-200', className].join(' ')}>
      <div
        className="h-full rounded-full bg-brand-yellow"
        style={{ width: `${v}%` }}
        aria-label="Progress"
        role="progressbar"
        aria-valuenow={v}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}

