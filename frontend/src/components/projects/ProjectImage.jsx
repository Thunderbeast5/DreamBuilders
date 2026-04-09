const gradients = {
  'tower-1': ['#FACC15', '#111827'],
  'tower-2': ['#60A5FA', '#111827'],
  'tower-3': ['#34D399', '#111827'],
  'villas-1': ['#FACC15', '#065F46'],
  'villas-2': ['#A78BFA', '#064E3B'],
  'villas-3': ['#FB7185', '#064E3B'],
  'mall-1': ['#F59E0B', '#1F2937'],
  'mall-2': ['#38BDF8', '#1F2937'],
  'mall-3': ['#22C55E', '#1F2937'],
  'bridge-1': ['#94A3B8', '#0F172A'],
  'bridge-2': ['#FACC15', '#0F172A'],
  'bridge-3': ['#60A5FA', '#0F172A'],
}

export function ProjectImage({ variant = 'tower-1', className = '' }) {
  const images = {
    'tower-1': '/images/projects/active-site.jpg',
    'tower-2': '/images/projects/active-site.jpg',
    'tower-3': '/images/projects/active-site.jpg',
    'villas-1': '/images/projects/villas.jpg',
    'villas-2': '/images/projects/villas.jpg',
    'villas-3': '/images/projects/villas.jpg',
    'mall-1': '/images/projects/upcoming-planning.jpg',
    'mall-2': '/images/projects/upcoming-planning.jpg',
    'mall-3': '/images/projects/upcoming-planning.jpg',
    'bridge-1': '/images/projects/completed-bridge.jpg',
    'bridge-2': '/images/projects/completed-bridge.jpg',
    'bridge-3': '/images/projects/completed-bridge.jpg',
  }

  const image = images[variant]
  const [a, b] = gradients[variant] || gradients['tower-1']

  if (image) {
    return (
      <div className={['relative h-full w-full', className].join(' ')}>
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(135deg, ${a}cc, ${b}e6)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>
    )
  }

  return (
    <svg
      viewBox="0 0 1200 800"
      className={['h-full w-full', className].join(' ')}
      role="img"
      aria-label="Project image"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`g-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} stopOpacity="0.9" />
          <stop offset="1" stopColor={b} stopOpacity="0.95" />
        </linearGradient>
        <radialGradient id={`r-${variant}`} cx="30%" cy="20%" r="70%">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.22" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <pattern id={`p-${variant}`} width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M0 36V0h36" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="2" />
        </pattern>
      </defs>

      <rect width="1200" height="800" fill={`url(#g-${variant})`} />
      <rect width="1200" height="800" fill={`url(#p-${variant})`} opacity="0.9" />
      <rect width="1200" height="800" fill={`url(#r-${variant})`} />

      {/* simple skyline */}
      <g opacity="0.55">
        <rect x="120" y="370" width="120" height="330" fill="rgba(255,255,255,0.18)" />
        <rect x="260" y="300" width="170" height="400" fill="rgba(255,255,255,0.14)" />
        <rect x="460" y="420" width="140" height="280" fill="rgba(255,255,255,0.12)" />
        <rect x="620" y="260" width="220" height="440" fill="rgba(255,255,255,0.16)" />
        <rect x="870" y="390" width="160" height="310" fill="rgba(255,255,255,0.12)" />
      </g>

      {/* foreground */}
      <path
        d="M0 660c120-60 240-80 360-60s240 90 360 110 240-10 360-80v170H0V660Z"
        fill="rgba(255,255,255,0.12)"
      />
    </svg>
  )
}

