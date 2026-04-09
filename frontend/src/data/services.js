import {
  HardHat,
  UsersRound,
  ClipboardList,
  Eye,
  ShieldCheck,
  BadgeCheck,
  Wrench,
  ClipboardCheck,
  Timer,
  FileText,
  Truck,
  Handshake,
} from 'lucide-react'

export const SERVICES = [
  {
    slug: 'construction-management',
    title: 'Construction Management',
    desc: 'Coordinate teams, schedules, vendors, and delivery with clear, accountable oversight.',
    icon: HardHat,
    heroImage: '/images/projects/active-site.jpg',
    highlights: [
      { label: 'Site readiness', icon: ShieldCheck },
      { label: 'QA & compliance', icon: BadgeCheck },
      { label: 'Cost control', icon: FileText },
    ],
    types: [
      {
        title: 'End-to-end delivery',
        points: ['Scope & estimation', 'Weekly reporting', 'Milestone tracking', 'Risk register'],
      },
      {
        title: 'Contractor coordination',
        points: ['Trade sequencing', 'Vendor onboarding', 'RFI handling', 'Material scheduling'],
      },
    ],
    outcomes: [
      'Reduced delays with weekly look-ahead planning',
      'Clear ownership with role-based checklists',
      'Better transparency for clients and stakeholders',
    ],
  },
  {
    slug: 'labour-supply',
    title: 'Labour Supply',
    desc: 'Keep the right workers on the right site—availability, skills, shifts, and compliance in one place.',
    icon: UsersRound,
    heroImage: '/images/services/labour-supply.jpg',
    highlights: [
      { label: 'Skill-based allocation', icon: Wrench },
      { label: 'Attendance tracking', icon: ClipboardCheck },
      { label: 'Fast mobilization', icon: Timer },
    ],
    types: [
      {
        title: 'Skilled trades',
        points: ['Masons', 'Carpenters', 'Electricians', 'Plumbers', 'Welders'],
      },
      {
        title: 'General workforce',
        points: ['Helpers', 'Loaders', 'Cleaning crew', 'Material handling', 'Safety spotters'],
      },
      {
        title: 'Shift & payroll ready',
        points: ['Daily check-in/out', 'Overtime rules', 'Rate cards', 'Payment tracking'],
      },
    ],
    outcomes: [
      'Fewer no-shows via roster confirmation',
      'Faster assignment using skill tags',
      'Clear records for audits and disputes',
    ],
  },
  {
    slug: 'project-planning',
    title: 'Project Planning',
    desc: 'Structure milestones, tasks, and resources so every team knows what’s next and what’s blocked.',
    icon: ClipboardList,
    heroImage: '/images/projects/upcoming-planning.jpg',
    highlights: [
      { label: 'Milestone plans', icon: ClipboardCheck },
      { label: 'Documentation', icon: FileText },
      { label: 'Logistics', icon: Truck },
    ],
    types: [
      {
        title: 'Planning toolkit',
        points: ['WBS & milestones', 'Resource plans', 'Procurement timeline', 'Critical path review'],
      },
      {
        title: 'Controls & reporting',
        points: ['Weekly progress', 'Blockers & dependencies', 'Variations tracking', 'Client updates'],
      },
    ],
    outcomes: [
      'Better predictability with structured sequencing',
      'Less waste by aligning procurement with schedule',
      'Faster decisions with consistent reporting',
    ],
  },
  {
    slug: 'site-supervision',
    title: 'Site Supervision',
    desc: 'Daily site activity, safety checks, and attendance—captured with confidence and shared instantly.',
    icon: Eye,
    heroImage: '/images/projects/active-site.jpg',
    highlights: [
      { label: 'Daily logs', icon: FileText },
      { label: 'Safety checks', icon: ShieldCheck },
      { label: 'Coordination', icon: Handshake },
    ],
    types: [
      {
        title: 'Daily supervision',
        points: ['Daily diary', 'Work permits', 'Toolbox talks', 'Incident reporting'],
      },
      {
        title: 'Quality assurance',
        points: ['Inspection checklists', 'Photo evidence', 'Snag lists', 'Sign-offs'],
      },
    ],
    outcomes: [
      'Higher accountability with audit-ready logs',
      'Improved safety through routine checks',
      'Less rework via on-time quality inspections',
    ],
  },
]

export function getServiceBySlug(slug) {
  return SERVICES.find((s) => s.slug === slug) || null
}

