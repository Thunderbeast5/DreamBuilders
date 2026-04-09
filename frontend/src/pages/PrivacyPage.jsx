import { Shield, Lock, Eye, Server, Cookie, Mail } from 'lucide-react'

const sections = [
  {
    icon: Eye,
    title: 'Information We Collect',
    color: 'from-blue-500 to-blue-600',
    content: `When you use our website or services, we may collect personal information such as your name, email address, phone number, and any messages you submit through our contact forms. We also automatically collect certain technical data including your IP address, browser type, and pages visited to improve our services.`,
  },
  {
    icon: Server,
    title: 'How We Use Your Information',
    color: 'from-emerald-500 to-emerald-600',
    content: `We use the information we collect to respond to your enquiries and service requests, communicate with you about our construction and labour management services, improve and optimize our website experience, send important updates about ongoing projects, and comply with legal obligations.`,
  },
  {
    icon: Lock,
    title: 'Data Protection & Security',
    color: 'from-violet-500 to-violet-600',
    content: `We implement industry-standard security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. All data transmissions are encrypted, and we restrict access to personal information to authorized personnel only.`,
  },
  {
    icon: Cookie,
    title: 'Cookies & Tracking',
    color: 'from-amber-500 to-amber-600',
    content: `Our website may use cookies and similar technologies to enhance your browsing experience. These cookies help us understand how you interact with our website and allow us to remember your preferences. You can control cookie settings through your browser preferences at any time.`,
  },
  {
    icon: Shield,
    title: 'Third-Party Sharing',
    color: 'from-rose-500 to-rose-600',
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your data with trusted service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements. We may also disclose information when required by law.`,
  },
  {
    icon: Mail,
    title: 'Your Rights & Contact',
    color: 'from-cyan-500 to-cyan-600',
    content: `You have the right to access, correct, or delete your personal data at any time. You may also opt out of any marketing communications. To exercise these rights or for any questions about this privacy policy, please contact us at dreambuilders13@gmail.com or call 9422252981.`,
  },
]

export function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg">
          <Shield className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-slate-500">
          Last updated: March 2026
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          At Dream Builders, we are committed to protecting your privacy and ensuring the security of your personal information. This policy explains how we collect, use, and safeguard your data.
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
          By using our website and services, you consent to this Privacy Policy.
          If you have any concerns, please reach out to us at{' '}
          <a href="mailto:dreambuilders13@gmail.com" className="font-semibold text-brand-dark hover:underline">
            dreambuilders13@gmail.com
          </a>
        </p>
      </div>
    </div>
  )
}
