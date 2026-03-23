import { useState } from 'react'
import DashboardLayout from './components/DashboardLayout'
import Card, { StatCard, ProjectCard, CardHeader, CardTitle, CardMeta, CardFooter, CardDivider } from './components/Card'
import Badge from './components/Badge'
import Avatar, { AvatarWithName, AvatarGroup } from './components/Avatar'
import { ToastContainer, useToast } from './components/Toast'

// ─── Mock data ─────────────────────────────────
const projects = [
  { id: 1, title: 'MG Road Resurfacing',    meta: 'PWD · Ward 12 · 2.3km',     type: 'road',        status: 'ongoing',   progress: 45,  date: '15 Mar–30 Jun', clash: true  },
  { id: 2, title: 'Sector 5 Pipeline',      meta: 'Jal Nigam · Ward 8 · 850m', type: 'water',       status: 'approved',  progress: 0,   date: '1 Apr–15 May',  clash: false },
  { id: 3, title: 'Vijay Nagar Substation', meta: 'PVVNL · Ward 5 · 1.1km',    type: 'electricity', status: 'ongoing',   progress: 72,  date: '10 Feb–20 Apr', clash: false },
  { id: 4, title: 'Central Park Planting',  meta: 'Parks Dept · Ward 3',        type: 'parks',       status: 'completed', progress: 100, date: '1 Jan–28 Feb',  clash: false },
]

const users = [
  { initials: 'RK', name: 'Rajesh Kumar',  subtitle: 'Municipal Coordinator' },
  { initials: 'AS', name: 'Amit Sharma',   subtitle: 'PWD Officer'           },
  { initials: 'MK', name: 'Mohan Kumar',   subtitle: 'Jal Nigam Officer'     },
  { initials: 'VP', name: 'Vinay Pandey',  subtitle: 'PVVNL Officer'         },
]

// ─── Page Action Button ─────────────────────────
function NewProjectButton() {
  return (
    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#5E6AD2] hover:bg-[#4A56C1] text-white text-[12px] font-medium rounded-[6px] transition-colors">
      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
      New Project
    </button>
  )
}

// ─── Section Label ──────────────────────────────
function SectionLabel({ children }) {
  return (
    <p className="text-[13px] font-bold uppercase tracking-[0.06em] text-[#0F172A] dark:text-[#F8FAFC] mb-4">
      {children}
    </p>
  )
}

// ─── Dashboard Content ──────────────────────────
function DashboardContent() {
  const { toast } = useToast()

  return (
    <div className="flex flex-col gap-9">

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard label="Total Projects" value="24"  subLabel="↑ 3 this week"    subLabelColor="muted"  />
        <StatCard label="Active Clashes" value="3"   valueColor="danger" subLabel="Needs resolution" subLabelColor="danger" />
        <StatCard label="Pending Review" value="7"   subLabel="Awaiting Admin"   subLabelColor="muted"  />
        <StatCard label="Resolved Today" value="2"   subLabel="Good progress"    subLabelColor="muted"  />
      </div>

      {/* ── Toast Triggers ── */}
      <div>
        <SectionLabel>Toast Notifications</SectionLabel>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => toast.success('Project approved successfully')}
            className="px-4 py-2 rounded-[6px] text-[13px] font-medium bg-[#F0FDF4] text-[#15803D] hover:bg-[#DCFCE7] transition-colors">
            Success Toast
          </button>
          <button onClick={() => toast.error('Clash detected — review required', { action: { label: 'Resolve', onClick: () => {} } })}
            className="px-4 py-2 rounded-[6px] text-[13px] font-medium bg-[#FEF2F2] text-[#B91C1C] hover:bg-[#FECACA] transition-colors">
            Error Toast
          </button>
          <button onClick={() => toast.warning('Project pending Admin review')}
            className="px-4 py-2 rounded-[6px] text-[13px] font-medium bg-[#FEFCE8] text-[#A16207] hover:bg-[#FEF08A] transition-colors">
            Warning Toast
          </button>
          <button onClick={() => toast.info('Supervisor assigned to project')}
            className="px-4 py-2 rounded-[6px] text-[13px] font-medium bg-[#EFF6FF] text-[#1D4ED8] hover:bg-[#DBEAFE] transition-colors">
            Info Toast
          </button>
        </div>
      </div>

      {/* ── Recent Projects ── */}
      <div>
        <SectionLabel>Recent Projects</SectionLabel>
        <div className="grid grid-cols-2 gap-4">
          {projects.map(p => (
            <ProjectCard
              key={p.id}
              title={p.title}
              meta={p.meta}
              projectType={p.type}
              progress={p.progress}
              date={p.date}
              onClick={() => toast.info(`Viewing: ${p.title}`)}
              status={<Badge variant={p.status} size="sm" />}
              typeBadge={<Badge variant={p.type} size="sm" />}
              extraBadges={p.clash ? <Badge variant="clash" size="sm" /> : undefined}
            />
          ))}
        </div>
      </div>

      {/* ── Clash Alert ── */}
      <div>
        <SectionLabel>Clash Alerts</SectionLabel>
        <div className="bg-[#FEF2F2] dark:bg-[#1A0707] border border-[#FECACA] dark:border-[#7F1D1D] rounded-[8px] px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-[14px] font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
              MG Road Resurfacing ↔ Sector 5 Pipeline
            </p>
            <p className="text-[13px] text-[#64748B] dark:text-[#9CA3AF] mt-1.5">
              Geographic + timeline overlap · Ward 12 · 3 days unresolved
            </p>
          </div>
          <Badge variant="clash" size="md" />
        </div>
      </div>

      {/* ── All Badge Variants ── */}
      <div>
        <SectionLabel>Badge Variants</SectionLabel>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-[11px] text-[#9CA3AF] mb-2 uppercase tracking-wide">Status</p>
            <div className="flex flex-wrap gap-2">
              {['approved','ongoing','pending','rejected','completed','clash'].map(v => (
                <Badge key={v} variant={v} size="md" />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] text-[#9CA3AF] mb-2 uppercase tracking-wide">Project Type</p>
            <div className="flex flex-wrap gap-2">
              {['road','water','electricity','sewage','parks','other'].map(v => (
                <Badge key={v} variant={v} size="md" />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] text-[#9CA3AF] mb-2 uppercase tracking-wide">Sizes</p>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="ongoing" size="sm" />
              <Badge variant="ongoing" size="md" />
              <Badge variant="ongoing" size="lg" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Avatar Variants ── */}
      <div>
        <SectionLabel>Avatar Variants</SectionLabel>
        <div className="flex flex-col gap-6">

          {/* Sizes */}
          <div>
            <p className="text-[11px] text-[#9CA3AF] mb-3 uppercase tracking-wide">Sizes</p>
            <div className="flex items-center gap-4">
              <Avatar initials="RK" size="sm" online />
              <Avatar initials="RK" size="md" online />
              <Avatar initials="RK" size="lg" online />
              <Avatar initials="RK" size="xl" />
            </div>
          </div>

          {/* With name */}
          <div>
            <p className="text-[11px] text-[#9CA3AF] mb-3 uppercase tracking-wide">With name</p>
            <div className="flex flex-col gap-3">
              {users.slice(0, 3).map(u => (
                <AvatarWithName key={u.initials} initials={u.initials} name={u.name} subtitle={u.subtitle} size="md" online />
              ))}
            </div>
          </div>

          {/* Group */}
          <div>
            <p className="text-[11px] text-[#9CA3AF] mb-3 uppercase tracking-wide">Stacked group</p>
            <div className="flex items-center gap-4">
              <AvatarGroup avatars={users.map(u => ({ initials: u.initials }))} max={3} size="sm" />
              <AvatarGroup avatars={users.map(u => ({ initials: u.initials }))} max={2} size="md" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Card Variants ── */}
      <div>
        <SectionLabel>Card Variants</SectionLabel>
        <div className="flex flex-col gap-3 max-w-lg">

          {/* Default */}
          <Card variant="default" padding="md">
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <Badge variant="ongoing" size="sm" />
            </CardHeader>
            <CardMeta>PWD · Ward 12 · 2.3km</CardMeta>
            <CardDivider />
            <CardFooter>
              <Badge variant="road" size="sm" />
              <Badge variant="clash" size="sm" />
            </CardFooter>
          </Card>

          {/* Selected */}
          <Card variant="selected" padding="md">
            <CardHeader>
              <CardTitle>Selected Card</CardTitle>
              <Badge variant="approved" size="sm" />
            </CardHeader>
            <CardMeta>Jal Nigam · Ward 8 · 850m</CardMeta>
          </Card>

          {/* Danger */}
          <Card variant="danger" padding="md">
            <CardHeader>
              <CardTitle>Danger Card — Clash Alert</CardTitle>
              <Badge variant="clash" size="sm" />
            </CardHeader>
            <CardMeta>MG Road ↔ Sector 5 · Ward 12 · 3 days unresolved</CardMeta>
          </Card>

        </div>
      </div>

      {/* ── User Management Table ── */}
      <div>
        <SectionLabel>User Management</SectionLabel>
        <Card variant="default" padding="none">
          <div className="grid grid-cols-3 px-5 py-3 border-b border-[#E2E8F0] dark:border-[#1E293B]">
            <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#9CA3AF]">User</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#9CA3AF]">Role</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#9CA3AF]">Status</span>
          </div>
          {users.map((user, i) => (
            <div key={user.initials} className={['grid grid-cols-3 px-5 py-3.5 items-center', i < users.length - 1 ? 'border-b border-[#E2E8F0] dark:border-[#1E293B]' : ''].join(' ')}>
              <AvatarWithName initials={user.initials} name={user.name} size="sm" online={i < 2} />
              <span className="text-[13px] text-[#6B7280] dark:text-[#9CA3AF]">{user.subtitle}</span>
              <Badge variant="active" size="sm" />
            </div>
          ))}
        </Card>
      </div>

    </div>
  )
}

// ─── App ────────────────────────────────────────
export default function App() {
  const [activeItem, setActiveItem] = useState('dashboard')

  const pageMeta = {
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
    if (activeItem === 'dashboard') return <DashboardContent />

    if (activeItem === 'projects') return (
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
    )

    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-[13px] text-[#9CA3AF]">{meta.title} — coming soon</p>
      </div>
    )
  }

  return (
    <>
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

      {/* Toast container — always at root */}
      <ToastContainer />
    </>
  )
}