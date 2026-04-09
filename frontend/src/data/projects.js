import { Building, Home, ShoppingBag, Landmark } from 'lucide-react'

export const PROJECTS = [
  {
    slug: 'skyline-tower',
    name: 'Skyline Tower',
    desc: 'Multi-floor commercial building with phased delivery.',
    icon: Building,
    status: 'Active',
    coverImage: '/images/projects/active-site.jpg',
    location: 'Downtown District',
    totalUnits: 48,
    soldUnits: 31,
    progressPercent: 62,
    completion: 'Q4 2026',
    amenities: [
      '24/7 security & CCTV',
      'High-speed elevators',
      'Power backup (common areas)',
      'Dedicated loading bay',
      'Fire safety compliant systems',
    ],
    highlights: [
      'Retail-ready podium floors',
      'Flexible office layouts',
      'Premium façade & lighting',
    ],
    gallery: ['tower-1', 'tower-2', 'tower-3'],
  },
  {
    slug: 'greenwood-villas',
    name: 'Greenwood Villas',
    desc: 'Residential development with modern fit-out.',
    icon: Home,
    status: 'Active',
    coverImage: '/images/projects/villas.jpg',
    location: 'Greenwood Suburb',
    totalUnits: 120,
    soldUnits: 78,
    progressPercent: 55,
    completion: 'Q1 2027',
    amenities: [
      'Clubhouse & community hall',
      'Kids play zone',
      'Jogging track',
      'Landscaped gardens',
      'EV charging (select bays)',
      'Rainwater harvesting',
    ],
    highlights: [
      'Spacious 2/3 BHK plans',
      'Natural light & cross ventilation',
      'Secure gated community',
    ],
    gallery: ['villas-1', 'villas-2', 'villas-3'],
  },
  {
    slug: 'central-mall-renovation',
    name: 'Central Mall Renovation',
    desc: 'Live-site renovation and expansion.',
    icon: ShoppingBag,
    status: 'Upcoming',
    coverImage: '/images/projects/upcoming-planning.jpg',
    location: 'City Center',
    totalUnits: 18,
    soldUnits: 6,
    progressPercent: 10,
    completion: 'Q3 2027',
    amenities: [
      'Modernized food court',
      'Accessibility upgrades',
      'New escalators & elevators',
      'Improved parking flow',
      'High-efficiency HVAC',
    ],
    highlights: [
      'Phased work to keep operations running',
      'Upgraded utilities and interiors',
      'Brand-new storefronts',
    ],
    gallery: ['mall-1', 'mall-2', 'mall-3'],
  },
  {
    slug: 'river-bridge-works',
    name: 'River Bridge Works',
    desc: 'Infrastructure works with strict timelines.',
    icon: Landmark,
    status: 'Completed',
    coverImage: '/images/projects/completed-bridge.jpg',
    location: 'North River Corridor',
    totalUnits: 1,
    soldUnits: 1,
    progressPercent: 100,
    completion: 'Completed',
    amenities: [
      'Seismic-rated design',
      'Pedestrian walkway',
      'Drainage & flood mitigation',
      'New street lighting',
      'Traffic safety barriers',
    ],
    highlights: [
      'Delivered ahead of deadline',
      'Minimal traffic disruption',
      'Long-life corrosion protection',
    ],
    gallery: ['bridge-1', 'bridge-2', 'bridge-3'],
  },
]

export function getProjectBySlug(slug) {
  return PROJECTS.find((p) => p.slug === slug) || null
}

export function getUnitsRemaining(p) {
  return Math.max(0, (p?.totalUnits || 0) - (p?.soldUnits || 0))
}

