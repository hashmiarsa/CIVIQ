import { useState } from 'react'
import Avatar, { AvatarGroup, AvatarWithName } from './Avatar'

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

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex items-center gap-4 flex-wrap mb-4">
    <span className="text-[11px] text-[#A1A1AA] w-24 shrink-0">{label}</span>
    <div className="flex items-center gap-3 flex-wrap">{children}</div>
  </div>
)

export default function AvatarShowcase() {
  const [darkMode, setDarkMode] = useState(false)

  const users = [
    { initials: 'RK', name: 'Rajesh Kumar',  subtitle: 'Municipal Coordinator' },
    { initials: 'AS', name: 'Amit Sharma',   subtitle: 'PWD Officer'           },
    { initials: 'MK', name: 'Mohan Kumar',   subtitle: 'Jal Nigam Officer'     },
    { initials: 'VP', name: 'Vinay Pandey',  subtitle: 'PVVNL Officer'         },
    { initials: 'SS', name: 'Suresh Singh',  subtitle: 'Field Supervisor'      },
  ]

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#141414] transition-colors duration-200">
        <div className="max-w-2xl mx-auto px-8 py-12">

          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-2xl font-semibold text-[#09090B] dark:text-[#FAFAFA] tracking-tight">Avatar</h1>
              <p className="text-sm text-[#71717A] mt-1">CIVIQ component · Railway minimal style</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-[6px] text-xs font-medium border border-[#E4E4E7] dark:border-[#27272A] text-[#3F3F46] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#1C1C1F] transition-colors"
            >
              {darkMode ? '☀ Light' : '⏾ Dark'}
            </button>
          </div>

          {/* Sizes */}
          <Section title="Sizes">
            <Row label="all sizes">
              <Avatar initials="RK" size="sm" />
              <Avatar initials="RK" size="md" />
              <Avatar initials="RK" size="lg" />
              <Avatar initials="RK" size="xl" />
            </Row>
            <Row label="sm 24px">
              <Avatar initials="RK" size="sm" />
              <Avatar initials="AS" size="sm" />
              <Avatar initials="MK" size="sm" />
            </Row>
            <Row label="md 32px">
              <Avatar initials="RK" size="md" />
              <Avatar initials="AS" size="md" />
              <Avatar initials="MK" size="md" />
            </Row>
            <Row label="lg 40px">
              <Avatar initials="RK" size="lg" />
              <Avatar initials="AS" size="lg" />
              <Avatar initials="MK" size="lg" />
            </Row>
            <Row label="xl 52px">
              <Avatar initials="RK" size="xl" />
              <Avatar initials="AS" size="xl" />
            </Row>
          </Section>

          {/* Online indicator */}
          <Section title="Online indicator">
            <Row label="online">
              <Avatar initials="RK" size="sm" online />
              <Avatar initials="RK" size="md" online />
              <Avatar initials="RK" size="lg" online />
              <Avatar initials="RK" size="xl" online />
            </Row>
            <Row label="offline">
              <Avatar initials="AS" size="sm" />
              <Avatar initials="AS" size="md" />
              <Avatar initials="AS" size="lg" />
            </Row>
          </Section>

          {/* Avatar with name */}
          <Section title="Avatar with name" subtitle="Used in sidebars, user lists, conflict detail">
            <div className="flex flex-col gap-3 max-w-xs">
              <AvatarWithName initials="RK" name="Rajesh Kumar" subtitle="Municipal Coordinator" size="sm" online />
              <AvatarWithName initials="AS" name="Amit Sharma" subtitle="PWD Officer" size="md" />
              <AvatarWithName initials="MK" name="Mohan Kumar" subtitle="Jal Nigam Officer" size="md" online />
              <AvatarWithName initials="VP" name="Vinay Pandey" subtitle="PVVNL Officer" size="lg" />
            </div>
          </Section>

          {/* Avatar group */}
          <Section title="Avatar group" subtitle="Stacked — for project members, assigned supervisors">
            <Row label="sm stack">
              <AvatarGroup
                avatars={users.map(u => ({ initials: u.initials }))}
                max={3}
                size="sm"
              />
              <AvatarGroup
                avatars={users.map(u => ({ initials: u.initials }))}
                max={4}
                size="sm"
              />
            </Row>
            <Row label="md stack">
              <AvatarGroup
                avatars={users.map(u => ({ initials: u.initials }))}
                max={3}
                size="md"
              />
            </Row>
            <Row label="lg stack">
              <AvatarGroup
                avatars={users.map(u => ({ initials: u.initials }))}
                max={2}
                size="lg"
              />
            </Row>
          </Section>

          {/* Real CIVIQ usage */}
          <Section title="Real CIVIQ usage">

            {/* Navbar */}
            <div className="mb-4">
              <p className="text-[11px] text-[#A1A1AA] mb-2">Navbar — right side</p>
              <div className="bg-[#FFFFFF] dark:bg-[#141414] border border-[#E4E4E7] dark:border-[#27272A] rounded-lg px-4 h-14 flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#09090B] dark:text-[#FAFAFA]">CiViQ</span>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 text-[#71717A]">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                  </div>
                  <Avatar initials="RK" size="sm" online />
                </div>
              </div>
            </div>

            {/* Conflict detail — two officers */}
            <div className="mb-4">
              <p className="text-[11px] text-[#A1A1AA] mb-2">Conflict Detail — two officers side by side</p>
              <div className="bg-[#FFFFFF] dark:bg-[#232326] border border-[#E4E4E7] dark:border-[#27272A] rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.06em] text-[#A1A1AA] mb-2">Project A</p>
                    <AvatarWithName initials="AS" name="Amit Sharma" subtitle="PWD Officer" size="md" />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.06em] text-[#A1A1AA] mb-2">Project B</p>
                    <AvatarWithName initials="MK" name="Mohan Kumar" subtitle="Jal Nigam Officer" size="md" />
                  </div>
                </div>
              </div>
            </div>

            {/* User management list */}
            <div>
              <p className="text-[11px] text-[#A1A1AA] mb-2">User Management — list</p>
              <div className="bg-[#FFFFFF] dark:bg-[#232326] border border-[#E4E4E7] dark:border-[#27272A] rounded-lg overflow-hidden">
                <div className="grid grid-cols-3 px-4 py-2 border-b border-[#E4E4E7] dark:border-[#27272A]">
                  <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#71717A]">User</span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#71717A]">Role</span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#71717A]">Status</span>
                </div>
                {users.slice(0, 4).map((user) => (
                  <div key={user.initials} className="grid grid-cols-3 px-4 py-3 border-b border-[#E4E4E7] dark:border-[#27272A] last:border-0 items-center">
                    <AvatarWithName initials={user.initials} name={user.name} size="sm" online={Math.random() > 0.5} />
                    <span className="text-[12px] text-[#71717A]">{user.subtitle}</span>
                    <span className="text-[12px] text-[#16A34A]">Active</span>
                  </div>
                ))}
              </div>
            </div>

          </Section>

        </div>
      </div>
    </div>
  )
}
