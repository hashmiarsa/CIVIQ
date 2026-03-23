import { useState } from 'react'
import DashboardLayout from './DashboardLayout'
import { StatCard, ProjectCard } from './Card'
import Badge from './Badge'

const projects = [
  { id: 1, title: 'MG Road Resurfacing',    meta: 'PWD · Ward 12 · 2.3km',     type: 'road'        as const, status: 'ongoing'   as const, progress: 45,  date: '15 Mar–30 Jun', clash: true  },
  { id: 2, title: 'Sector 5 Pipeline',      meta: 'Jal Nigam · Ward 8 · 850m', type: 'water'       as const, status: 'approved'  as const, progress: 0,   date: '1 Apr–15 May',  clash: false },
  { id: 3, title: 'Vijay Nagar Substation', meta: 'PVVNL · Ward 5 · 1.1km',    type: 'electricity' as const, status: 'ongoing'   as const, progress: 72,  date: '10 Feb–20 Apr', clash: false },
  { id: 4, title: 'Central Park Planting',  meta: 'Parks Dept · Ward 3',        type: 'parks'       as const, status: 'completed' as const, progress: 100, date: '1 Jan–28 Feb',  clash: false },
]

const NewProjectButton = () => (
  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#5E6AD2] hover:bg-[#4A56C1] text-white text-[12px] font-medium rounded-[6px] transition-colors">
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
    New Project
  </button>
)

export default function DashboardShellShowcase() {
  const [activeItem, setActiveItem] = useState('dashboard')

  const pageMeta: Record<string, { title: string; action?: boolean }> = {
    dashboard:  { title: 'Dashboard' },
    projects:   { title: 'Projects',   action: true },
    conflicts:  { title: 'Conflicts' },
    map:        { title: 'City Map' },
    complaints: { title: 'Complaints' },
    audit:      { title: 'Audit Log' },
    users:      { title: 'Users' },
    settings:   { title: 'Settings' },
  }

  const meta = pageMeta[activeItem] || { title: activeItem }

  const renderContent = () => {
    if (activeItem === 'dashboard') return (
      <div className="flex flex-col gap-9">

        {/* Stat cards — single accent border, only clashes red */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
          <StatCard label="Total Projects" value="24"  subLabel="↑ 3 this week"    subLabelColor="muted"   />
          <StatCard label="Active Clashes" value="3"   valueColor="danger"  subLabel="Needs resolution" subLabelColor="danger"  />
          <StatCard label="Pending Review" value="7"   subLabel="Awaiting Admin"   subLabelColor="muted"   />
          <StatCard label="Resolved Today" value="2"   subLabel="Good progress"    subLabelColor="muted"   />
        </div>

        {/* Recent Projects — 2 col full width */}
        <div>
          <p className="text-[13px] font-bold uppercase tracking-[0.06em] text-[#0F172A] dark:text-[#F8FAFC] mb-4">
            Recent Projects
          </p>
          <div className="grid grid-cols-2 gap-4">
            {projects.map(p => (
              <ProjectCard
                key={p.id}
                title={p.title}
                meta={p.meta}
                projectType={p.type}
                progress={p.progress}
                date={p.date}
                onClick={() => {}}
                status={<Badge variant={p.status} size="sm" />}
                typeBadge={<Badge variant={p.type} size="sm" />}
                extraBadges={p.clash ? <Badge variant="clash" size="sm" /> : undefined}
              />
            ))}
          </div>
        </div>

        {/* Clash Alerts */}
        <div>
          <p className="text-[13px] font-bold uppercase tracking-[0.06em] text-[#0F172A] dark:text-[#F8FAFC] mb-4">
            Clash Alerts
          </p>
          <div className="bg-[#FEF2F2] dark:bg-[#1A0707] border border-[#FECACA] dark:border-[#7F1D1D] rounded-[8px] px-6 py-5 flex items-center justify-between">
            <div>
              <p className="text-[14px] font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                MG Road Resurfacing ↔ Sector 5 Pipeline
              </p>
              <p className="text-[13px] text-[#64748B] dark:text-[#475569] mt-1.5">
                Geographic + timeline overlap · Ward 12 · 3 days unresolved
              </p>
            </div>
            <Badge variant="clash" size="md" />
          </div>
        </div>

      </div>
    )

    if (activeItem === 'projects') return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {projects.map(p => (
          <ProjectCard
            key={p.id}
            title={p.title}
            meta={p.meta}
            projectType={p.type}
            progress={p.progress}
            date={p.date}
            onClick={() => {}}
            status={<Badge variant={p.status} size="sm" />}
            typeBadge={<Badge variant={p.type} size="sm" />}
            extraBadges={p.clash ? <Badge variant="clash" size="sm" /> : undefined}
          />
        ))}
      </div>
    )

    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-[13px] text-[#71717A]">{meta.title} — coming soon</p>
      </div>
    )
  }

  return (
    <DashboardLayout
      role="admin"
      activeItem={activeItem}
      onNavigate={setActiveItem}
      userName="Rajesh Kumar"
      userInitials="RK"
      userRole="Municipal Coordinator"
      notificationCount={2}
      pageTitle={meta.title}
      pageAction={meta.action ? <NewProjectButton /> : undefined}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
