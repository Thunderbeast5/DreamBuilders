import { FileText, Briefcase, AlertTriangle, Scale, UserCheck, Hammer } from 'lucide-react'

const sections = [
  {
    icon: Briefcase,
    title: 'Services Overview',
    color: 'from-blue-500 to-blue-600',
    content: `Dream Builders provides construction management, labour supply, project planning, and site supervision services. Our platform also offers a digital labour management system including worker tracking, attendance management, and payment processing. All services are subject to the terms outlined in individual project agreements.`,
  },
  {
    icon: UserCheck,
    title: 'User Responsibilities',
    color: 'from-emerald-500 to-emerald-600',
    content: `Users are responsible for providing accurate information when registering, submitting contact forms, or using our labour management platform. You agree not to misuse the platform, attempt unauthorized access, or use the system for any unlawful purpose. Account credentials must be kept confidential.`,
  },
  {
    icon: Hammer,
    title: 'Project & Service Terms',
    color: 'from-amber-500 to-amber-600',
    content: `Construction project timelines, budgets, and scope are defined in individual project contracts. Dream Builders will make reasonable efforts to meet agreed-upon deadlines but is not liable for delays caused by weather, regulatory changes, supply chain disruptions, or other circumstances beyond our control.`,
  },
  {
    icon: Scale,
    title: 'Intellectual Property',
    color: 'from-violet-500 to-violet-600',
    content: `All content on this website—including text, graphics, logos, images, and software—is the property of Dream Builders and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from any content without prior written permission.`,
  },
  {
    icon: AlertTriangle,
    title: 'Limitation of Liability',
    color: 'from-rose-500 to-rose-600',
    content: `Dream Builders shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or services. Our total liability for any claim shall not exceed the amount paid by you for the specific service giving rise to the claim. The platform is provided "as is" without warranties of any kind.`,
  },
  {
    icon: FileText,
    title: 'Changes & Governing Law',
    color: 'from-cyan-500 to-cyan-600',
    content: `We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date. Continued use of our services after changes constitutes acceptance of the new terms. These terms are governed by the laws of India, and any disputes shall be resolved in the courts of Maharashtra.`,
  },
]

export function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
          <FileText className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-3 text-slate-500">
          Last updated: March 2026
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          Please read these terms carefully before using our website or engaging our construction and labour management services. By accessing our platform, you agree to be bound by these terms.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map((section, idx) => (
          <div
            key={idx}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-start gap-4">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${section.color} shadow-md transition-transform duration-300 group-hover:scale-110`}>
                <section.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">{section.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{section.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
        <p className="text-sm text-slate-600">
          For questions about these terms, contact us at{' '}
          <a href="mailto:dreambuilders13@gmail.com" className="font-semibold text-brand-dark hover:underline">
            dreambuilders13@gmail.com
          </a>{' '}
          or call <span className="font-semibold">9422252981</span>.
        </p>
      </div>
    </div>
  )
}
