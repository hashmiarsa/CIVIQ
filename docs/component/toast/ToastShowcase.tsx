import { useState } from 'react'
import { ToastContainer, useToast } from './Toast'

const Section = ({ title, subtitle, children }: {
  title: string; subtitle?: string; children: React.ReactNode
}) => (
  <div className="mb-10">
    <div className="mb-5 pb-2 border-b border-[#E4E4E7] dark:border-[#27272A]">
      <p className="text-[11px] font-medium uppercase tracking-[0.07em] text-[#71717A]">{title}</p>
      {subtitle && <p className="text-[11px] text-[#A1A1AA] mt-0.5">{subtitle}</p>}
    </div>
    {children}
  </div>
)

export default function ToastShowcase() {
  const [darkMode, setDarkMode] = useState(false)
  const { toast } = useToast()

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#141414] transition-colors duration-200">
        <div className="max-w-2xl mx-auto px-8 py-12">

          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-2xl font-semibold text-[#09090B] dark:text-[#FAFAFA] tracking-tight">
                Toast
              </h1>
              <p className="text-sm text-[#71717A] mt-1">
                CIVIQ component · solid icon · plain ✕ · progress bar
              </p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-[6px] text-xs font-medium border border-[#E4E4E7] dark:border-[#27272A] text-[#3F3F46] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#1C1C1F] transition-colors"
            >
              {darkMode ? '☀ Light' : '⏾ Dark'}
            </button>
          </div>

          {/* Basic types */}
          <Section title="All types" subtitle="Click to fire — appears bottom-right">
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Success',  fn: () => toast.success('Project approved successfully') },
                { label: 'Error',    fn: () => toast.error('Clash detected — review required') },
                { label: 'Warning',  fn: () => toast.warning('Project pending Admin review') },
                { label: 'Info',     fn: () => toast.info('Supervisor assigned to project') },
              ].map(b => (
                <button
                  key={b.label}
                  onClick={b.fn}
                  className="px-4 py-2 rounded-[6px] text-[13px] font-medium border border-[#E4E4E7] dark:border-[#27272A] text-[#3F3F46] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#1C1C1F] transition-colors"
                >
                  {b.label}
                </button>
              ))}
            </div>
          </Section>

          {/* With description */}
          <Section title="With description">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => toast.error('Clash Detected', {
                  description: 'MG Road overlaps Sector 5 Pipeline · Ward 12',
                })}
                className="px-4 py-2 rounded-[6px] text-[13px] font-medium border border-[#E4E4E7] dark:border-[#27272A] text-[#3F3F46] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#1C1C1F] transition-colors"
              >
                Error + description
              </button>
              <button
                onClick={() => toast.success('Project Approved', {
                  description: 'MG Road Resurfacing is now active',
                })}
                className="px-4 py-2 rounded-[6px] text-[13px] font-medium border border-[#E4E4E7] dark:border-[#27272A] text-[#3F3F46] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#1C1C1F] transition-colors"
              >
                Success + description
              </button>
            </div>
          </Section>

          {/* With action */}
          <Section title="With action button">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => toast.error('MG Road clashes with Sector 5', {
                  action: { label: 'Review', onClick: () => alert('Go to conflict') },
                })}
                className="px-4 py-2 rounded-[6px] text-[13px] font-medium border border-[#E4E4E7] dark:border-[#27272A] text-[#3F3F46] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#1C1C1F] transition-colors"
              >
                Clash + action
              </button>
              <button
                onClick={() => toast.warning('Awaiting Admin review', {
                  action: { label: 'View Project', onClick: () => alert('Go to project') },
                })}
                className="px-4 py-2 rounded-[6px] text-[13px] font-medium border border-[#E4E4E7] dark:border-[#27272A] text-[#3F3F46] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#1C1C1F] transition-colors"
              >
                Warning + action
              </button>
            </div>
          </Section>

          {/* Real CIVIQ scenarios */}
          <Section title="Real CIVIQ scenarios">
            <div className="flex flex-wrap gap-3">
              {[
                {
                  label: 'Officer submits project',
                  fn: () => toast.success('Project submitted', {
                    description: 'MCDM score: 82.7 · Pending Admin review',
                  }),
                },
                {
                  label: 'Clash detected',
                  fn: () => toast.error('Clash detected', {
                    description: 'MG Road ↔ Sector 5 Pipeline · Ward 12',
                    action: { label: 'Resolve', onClick: () => {} },
                  }),
                },
                {
                  label: 'Admin approves',
                  fn: () => toast.success('Project approved', {
                    description: 'MG Road Resurfacing is now active',
                  }),
                },
                {
                  label: 'Supervisor updates',
                  fn: () => toast.info('Progress updated', {
                    description: 'MG Road Resurfacing · 65% complete',
                  }),
                },
                {
                  label: 'Complaint overdue',
                  fn: () => toast.warning('Complaint unresolved', {
                    description: 'CNR-482910 · 7 days since filing',
                    action: { label: 'View', onClick: () => {} },
                  }),
                },
              ].map(b => (
                <button
                  key={b.label}
                  onClick={b.fn}
                  className="px-4 py-2 rounded-[6px] text-[13px] font-medium border border-[#E4E4E7] dark:border-[#27272A] text-[#3F3F46] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#1C1C1F] transition-colors"
                >
                  {b.label}
                </button>
              ))}
            </div>
          </Section>

        </div>
      </div>

      {/* Toast container — fixed bottom-right */}
      <ToastContainer />
    </div>
  )
}
