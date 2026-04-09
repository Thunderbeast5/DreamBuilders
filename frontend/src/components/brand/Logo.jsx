export function Logo({ size = 40, className = '', alt = 'Dream Builders logo' }) {
  const px = typeof size === 'number' ? `${size}px` : size
  return (
    <div
      className={[
        'grid place-items-center overflow-hidden rounded-lg bg-white ring-1 ring-inset ring-slate-200 shadow-soft',
        className,
      ].join(' ')}
      style={{ width: px, height: px }}
      aria-label={alt}
    >
      <picture className="h-full w-full">
        <source srcSet="/images/logo.svg" type="image/svg+xml" />
        <img
          src="/images/logo.png"
          alt={alt}
          className="h-full w-full object-contain p-1"
          loading="eager"
          decoding="async"
        />
      </picture>
    </div>
  )
}

