import { useState } from 'react'
import Card, {
  ProjectCard,
  StatCard,
  CardHeader,
  CardTitle,
  CardMeta,
  CardFooter,
  CardDivider,
} from './Card'
import Badge from './Badge'

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

export default function CardShowcase() {
  const [darkMode, setDarkMode] = useState(false)
  const [selected, setSelected] = useState<number | null>(1)

  const projects = [
    { id: 1, title: 'MG Road Resurfacing', meta: 'PWD · Ward 12 · 2.3km', type: 'road' as const,        status: 'ongoing' as const,   progress: 45,  date: '15 Mar–30 Jun', clash: true },
    { id: 2, title: 'Sector 5 Pipeline',   meta: 'Jal Nigam · Ward 8 · 850m', type: 'water' as const,   status: 'approved' as const,  progress: 0,   date: '1 Apr–15 May',  clash: false },
    { id: 3, title: 'Vijay Nagar Sub.',    meta: 'PVVNL · Ward 5 · 1.1km',    type: 'electricity' as const, status: 'ongoing' as const, progress: 72, date: '10 Feb–20 Apr', clash: false },
    { id: 4, title: 'Central Park Plant.', meta: 'Parks Dept · Ward 3',        type: 'parks' as const,   status: 'completed' as const, progress: 100, date: '1 Jan–28 Feb',  clash: false },
    { id: 5, title: 'Central Sewage Line', meta: 'Sewage Dept · Ward 6 · 1.1km', type: 'sewage' as const, status: 'pending' as const, progress: 0,  date: '20 Apr–10 Jul', clash: false },
    { id: 6, title: 'Kamal Sub Station',   meta: 'PVVNL · Ward 12 · overlaps MG Road', type: 'clash' as const, status: 'clash' as const, progress: 0, date: '15 Mar–1 May', clash: true },
  ]

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#141414] transition-colors duration-200">
        <div className="max-w-3xl mx-auto px-8 py-12">

          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-2xl font-semibold text-[#09090B] dark:text-[#FAFAFA] tracking-tight">Card</h1>
              <p className="text-sm text-[#71717A] mt-1">CIVIQ component · left border + progress + stat top accent</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-[6px] text-xs font-medium border border-[#E4E4E7] dark:border-[#27272A] text-[#3F3F46] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#1C1C1F] transition-colors"
            >
              {darkMode ? '☀ Light' : '⏾ Dark'}
            </button>
          </div>

          {/* Stat Cards */}
          <Section title="Stat cards" subtitle="Top border = value meaning · gray bg · big number · sub label">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard label="Total Projects"  value="24"   valueColor="default" subLabel="↑ 3 this week"   subLabelColor="success" />
              <StatCard label="Active Clashes"  value="3"    valueColor="danger"  subLabel="Needs resolution" subLabelColor="danger"  />
              <StatCard label="MCDM Score"      value="82.7" valueColor="accent"  subLabel="Top priority"     subLabelColor="muted"   />
              <StatCard label="Pending Review"  value="7"    valueColor="warning" subLabel="Awaiting Admin"   subLabelColor="warning" />
            </div>
          </Section>

          {/* Project Cards */}
          <Section title="Project cards" subtitle="Left border = type color · bottom bar = progress · click to select">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {projects.map((p) => (
                <ProjectCard
                  key={p.id}
                  title={p.title}
                  meta={p.meta}
                  projectType={p.type}
                  progress={p.progress}
                  date={p.date}
                  selected={selected === p.id}
                  onClick={() => setSelected(selected === p.id ? null : p.id)}
                  status={<Badge variant={p.status} size="sm" />}
                  typeBadge={p.type !== 'clash' ? <Badge variant={p.type} size="sm" /> : undefined}
                  extraBadges={p.clash && p.type !== 'clash' ? <Badge variant="clash" size="sm" /> : undefined}
                />
              ))}
            </div>
          </Section>

          {/* Default / Danger / Wrapper */}
          <Section title="Other variants">
            <div className="flex flex-col gap-3">

              {/* Danger */}
              <Card variant="danger">
                <CardHeader>
                  <CardTitle>Clash Alert — Ward 12</CardTitle>
                  <Badge variant="clash" size="md" />
                </CardHeader>
                <CardMeta className="mb-2">MG Road Resurfacing ↔ Sector 5 Pipeline · 45 day overlap</CardMeta>
                <CardFooter>
                  <span className="text-[11px] text-[#DC2626]">Action required · 3 days unresolved</span>
                </CardFooter>
              </Card>

              {/* Wrapper */}
              <Card variant="wrapper">
                <p className="text-[13px] font-semibold text-[#09090B] dark:text-[#FAFAFA] mb-4">
                  Section 1 — Basic Identity
                </p>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div><p className="text-[11px] text-[#71717A] mb-1">Department</p><p className="text-[13px] font-medium text-[#09090B] dark:text-[#FAFAFA]">PWD</p></div>
                  <div><p className="text-[11px] text-[#71717A] mb-1">Ward</p><p className="text-[13px] font-medium text-[#09090B] dark:text-[#FAFAFA]">Ward 12</p></div>
                  <div><p className="text-[11px] text-[#71717A] mb-1">Type</p><Badge variant="road" size="sm" /></div>
                  <div><p className="text-[11px] text-[#71717A] mb-1">Status</p><Badge variant="pending" size="sm" /></div>
                </div>
                <CardDivider />
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-[#71717A]">Submitted 2 days ago</p>
                  <p className="text-[11px] font-medium text-[#5E6AD2]">MCDM Score: 82.7</p>
                </div>
              </Card>

            </div>
          </Section>

          {/* Full Admin Dashboard simulation */}
          <Section title="Real CIVIQ — Admin dashboard">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatCard label="Total Projects"  value="24"  subLabel="↑ 3 this week"   subLabelColor="success" />
                <StatCard label="Active Clashes"  value="3"   valueColor="danger"  subLabel="Needs resolution" subLabelColor="danger"  />
                <StatCard label="Pending Review"  value="7"   valueColor="warning" subLabel="Awaiting Admin"   subLabelColor="warning" />
                <StatCard label="Resolved Today"  value="2"   valueColor="success" subLabel="Good progress"    subLabelColor="success" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {projects.slice(0, 4).map((p) => (
                  <ProjectCard
                    key={p.id}
                    title={p.title}
                    meta={p.meta}
                    projectType={p.type}
                    progress={p.progress}
                    date={p.date}
                    onClick={() => {}}
                    status={<Badge variant={p.status} size="sm" />}
                    typeBadge={p.type !== 'clash' ? <Badge variant={p.type} size="sm" /> : undefined}
                    extraBadges={p.clash && p.type !== 'clash' ? <Badge variant="clash" size="sm" /> : undefined}
                  />
                ))}
              </div>
            </div>
          </Section>

        </div>
      </div>
    </div>
  )
}