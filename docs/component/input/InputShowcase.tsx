import { useState } from 'react'
import Input, { Textarea, SearchInput } from './Input'

// ─── Icons ─────────────────────────────────────
const MapPinIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const UserIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

const MailIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

// ─── Section wrapper ───────────────────────────
const Section = ({ title, subtitle, children }: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) => (
  <div className="mb-10">
    <div className="mb-5 pb-2 border-b border-[#E4E4E7] dark:border-[#27272A]">
      <p className="text-[11px] font-medium uppercase tracking-[0.07em] text-[#71717A]">{title}</p>
      {subtitle && <p className="text-[11px] text-[#A1A1AA] mt-0.5">{subtitle}</p>}
    </div>
    {children}
  </div>
)

// ─── Showcase ──────────────────────────────────
export default function InputShowcase() {
  const [darkMode, setDarkMode] = useState(false)
  const [password, setPassword] = useState('')
  const [searchVal, setSearchVal] = useState('')

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#141414] transition-colors duration-200">
        <div className="max-w-2xl mx-auto px-8 py-12">

          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-2xl font-semibold text-[#09090B] dark:text-[#FAFAFA] tracking-tight">Input</h1>
              <p className="text-sm text-[#71717A] mt-1">CIVIQ component · shadcn/ui inspired</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-[6px] text-xs font-medium border border-[#E4E4E7] dark:border-[#27272A] text-[#3F3F46] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#1C1C1F] transition-colors"
            >
              {darkMode ? '☀ Light' : '⏾ Dark'}
            </button>
          </div>

          {/* All states */}
          <Section title="All states" subtitle="Click inside each input to see focus">
            <div className="flex flex-col gap-5 max-w-sm">
              <Input label="Default" placeholder="Enter project title" />
              <Input label="With value" value="MG Road Resurfacing Phase 1" onChange={() => {}} />
              <Input label="With hint" placeholder="Enter tender number" hint="Leave blank if not yet assigned" />
              <Input label="Required field" placeholder="Enter project title" required hint="This field is required to submit" />
              <Input label="Invalid Input" placeholder="Error" error="This field contains validation errors." value="mg" onChange={() => {}} />
              <Input label="Email" placeholder="name@example.com" disabled hint="This field is currently disabled." />
            </div>
          </Section>

          {/* With icons */}
          <Section title="With icons">
            <div className="flex flex-col gap-5 max-w-sm">
              <Input
                label="Search Location"
                placeholder="Search by road or area..."
                iconLeft={<MapPinIcon />}
              />
              <Input
                label="Officer Name"
                placeholder="Enter your name"
                iconLeft={<UserIcon />}
              />
              <Input
                label="Email Address"
                placeholder="name@example.com"
                iconLeft={<MailIcon />}
                type="email"
              />
            </div>
          </Section>

          {/* Password */}
          <Section title="Password" subtitle="Click eye icon to toggle visibility">
            <div className="flex flex-col gap-5 max-w-sm">
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                label="Current Password"
                type="password"
                placeholder="Enter current password"
                hint="Must be at least 8 characters"
              />
            </div>
          </Section>

          {/* Search */}
          <Section title="Search input">
            <div className="flex flex-col gap-5 max-w-sm">
              <SearchInput
                placeholder="Search projects, wards, departments..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
              />
              <SearchInput
                label="Find Location"
                placeholder="Type address or road name..."
              />
            </div>
          </Section>

          {/* Textarea */}
          <Section title="Textarea">
            <div className="flex flex-col gap-5 max-w-sm">
              <Textarea
                label="Project Description"
                placeholder="Describe the scope of work, affected area, and any special requirements..."
                required
                hint="Minimum 50 characters"
                rows={4}
              />
              <Textarea
                label="Rejection Reason"
                placeholder="Explain why this project is being rejected..."
                error="Reason must be at least 100 characters"
                rows={3}
              />
              <Textarea
                label="Admin Notes"
                placeholder="Internal notes (not visible to officer)"
                disabled
                hint="This field is currently disabled"
                rows={3}
              />
            </div>
          </Section>

          {/* Real CIVIQ form */}
          <Section title="Real CIVIQ — Login form">
            <div className="bg-white dark:bg-[#232326] border border-[#E4E4E7] dark:border-[#27272A] rounded-xl p-6 max-w-sm">
              <h2 className="text-[16px] font-semibold text-[#09090B] dark:text-[#FAFAFA] mb-1">Sign in to CIVIQ</h2>
              <p className="text-[13px] text-[#71717A] mb-6">Enter your credentials to continue</p>
              <div className="flex flex-col gap-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="name@example.com"
                  iconLeft={<MailIcon />}
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
                <button className="w-full h-10 bg-[#5E6AD2] hover:bg-[#4A56C1] text-white text-[14px] font-medium rounded-[10px] transition-colors mt-1">
                  Sign In
                </button>
              </div>
            </div>
          </Section>

          {/* Real CIVIQ — Project form section */}
          <Section title="Real CIVIQ — Project submission form section">
            <div className="bg-white dark:bg-[#232326] border border-[#E4E4E7] dark:border-[#27272A] rounded-xl p-6 max-w-sm">
              <h2 className="text-[14px] font-semibold text-[#09090B] dark:text-[#FAFAFA] mb-5">Section 1 — Basic Identity</h2>
              <div className="flex flex-col gap-4">
                <Input
                  label="Project Title"
                  placeholder="e.g. MG Road Resurfacing Phase 1"
                  required
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Ward" placeholder="Ward 12" disabled hint="Auto detected" />
                  <Input label="Zone" placeholder="East Zone" disabled hint="Auto detected" />
                </div>
                <Textarea
                  label="Project Description"
                  placeholder="Describe the scope of work..."
                  required
                  hint="Minimum 50 characters"
                  rows={3}
                />
                <Input
                  label="Tender Number"
                  placeholder="Optional"
                  hint="Leave blank if not yet assigned"
                />
              </div>
            </div>
          </Section>

        </div>
      </div>
    </div>
  )
}
