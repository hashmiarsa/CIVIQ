import { useState } from 'react'
import Badge, {
  ApprovedBadge, PendingBadge, RejectedBadge,
  OngoingBadge, CompletedBadge, ActiveBadge, ClashBadge,
  RoadBadge, WaterBadge, ElectricityBadge,
  SewageBadge, ParksBadge, OtherBadge,
} from './Badge'

// ─── Section wrapper ───────────────────────────
const Section = ({ title, subtitle, children }: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) => (
  <div className="mb-10">
    <div className="mb-4 pb-2 border-b border-[#E4E4E7] dark:border-[#27272A]">
      <p className="text-[11px] font-medium uppercase tracking-[0.07em] text-[#71717A]">
        {title}
      </p>
      {subtitle && (
        <p className="text-[11px] text-[#A1A1AA] mt-0.5">{subtitle}</p>
      )}
    </div>
    {children}
  </div>
)

const Row = ({ label, children }: {
  label: string
  children: React.ReactNode
}) => (
  <div className="flex items-center gap-3 flex-wrap mb-4">
    <span className="text-[11px] text-[#A1A1AA] w-24 shrink-0">{label}</span>
    <div className="flex items-center gap-2 flex-wrap">{children}</div>
  </div>
)

// ─── Showcase ──────────────────────────────────
export default function BadgeShowcase() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#141414] transition-colors duration-200">
        <div className="max-w-3xl mx-auto px-8 py-12">

          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-2xl font-semibold text-[#09090B] dark:text-[#FAFAFA] tracking-tight">
                Badge
              </h1>
              <p className="text-sm text-[#71717A] mt-1">
                CIVIQ component · minimal fix color approach
              </p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-[6px] text-xs font-medium border border-[#E4E4E7] dark:border-[#27272A] text-[#3F3F46] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#1C1C1F] transition-colors"
            >
              {darkMode ? '☀ Light' : '⏾ Dark'}
            </button>
          </div>

          {/* Status Badges */}
          <Section
            title="Status badges"
            subtitle="Have dot indicator — communicates state"
          >
            <Row label="all variants">
              <ApprovedBadge />
              <PendingBadge />
              <RejectedBadge />
              <OngoingBadge />
              <CompletedBadge />
              <ActiveBadge />
              <ClashBadge />
            </Row>
          </Section>

          {/* Project Type Badges */}
          <Section
            title="Project type badges"
            subtitle="No dot — communicates category, not state"
          >
            <Row label="all variants">
              <RoadBadge />
              <WaterBadge />
              <ElectricityBadge />
              <SewageBadge />
              <ParksBadge />
              <OtherBadge />
            </Row>
          </Section>

          {/* Sizes */}
          <Section
            title="Sizes"
            subtitle="lg = detail pages · md = cards · sm = tables and dense lists"
          >
            <Row label="large">
              <ApprovedBadge size="lg" />
              <PendingBadge size="lg" />
              <ClashBadge size="lg" />
              <RoadBadge size="lg" />
            </Row>
            <Row label="medium">
              <ApprovedBadge size="md" />
              <PendingBadge size="md" />
              <ClashBadge size="md" />
              <RoadBadge size="md" />
            </Row>
            <Row label="small">
              <ApprovedBadge size="sm" />
              <PendingBadge size="sm" />
              <ClashBadge size="sm" />
              <RoadBadge size="sm" />
            </Row>
          </Section>

          {/* Custom Labels */}
          <Section
            title="Custom labels"
            subtitle="Override default text when needed"
          >
            <Row label="custom text">
              <Badge variant="approved" label="Project Approved" size="lg" />
              <Badge variant="clash" label="Clash Detected" size="lg" />
              <Badge variant="pending" label="Awaiting Review" />
            </Row>
          </Section>

          {/* Real CIVIQ Usage */}
          <Section
            title="Real CIVIQ usage"
            subtitle="How badges appear in actual screens"
          >

            {/* Project Detail hero */}
            <div className="mb-6">
              <p className="text-[11px] text-[#A1A1AA] mb-3">
                Project Detail page — hero status (large)
              </p>
              <div className="bg-white dark:bg-[#232326] border border-[#E4E4E7] dark:border-[#27272A] rounded-lg p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-[15px] font-semibold text-[#09090B] dark:text-[#FAFAFA]">
                      MG Road Resurfacing
                    </h3>
                    <p className="text-[12px] text-[#71717A] mt-0.5">
                      PWD · Ward 12 · Submitted 2 days ago
                    </p>
                  </div>
                  <PendingBadge size="lg" />
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-[#E4E4E7] dark:border-[#27272A]">
                  <RoadBadge size="sm" />
                  <ClashBadge size="sm" />
                </div>
              </div>
            </div>

            {/* Project list cards */}
            <div className="mb-6">
              <p className="text-[11px] text-[#A1A1AA] mb-3">
                Projects list — card view (medium status + small type)
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { title: 'MG Road Resurfacing', dept: 'PWD · Ward 12', status: 'pending' as const, type: 'road' as const, clash: true },
                  { title: 'Sector 5 Water Pipeline', dept: 'Jal Nigam · Ward 8', status: 'approved' as const, type: 'water' as const, clash: false },
                  { title: 'Vijay Nagar Substation', dept: 'PVVNL · Ward 5', status: 'ongoing' as const, type: 'electricity' as const, clash: false },
                ].map((project) => (
                  <div
                    key={project.title}
                    className="bg-white dark:bg-[#232326] border border-[#E4E4E7] dark:border-[#27272A] rounded-lg px-4 py-3 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-[13px] font-medium text-[#09090B] dark:text-[#FAFAFA]">
                        {project.title}
                      </p>
                      <p className="text-[11px] text-[#71717A] mt-0.5">{project.dept}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={project.type} size="sm" />
                      {project.clash && <ClashBadge size="sm" />}
                      <Badge variant={project.status} size="md" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Table row */}
            <div className="mb-6">
              <p className="text-[11px] text-[#A1A1AA] mb-3">
                Audit log / table row — small badges
              </p>
              <div className="bg-white dark:bg-[#232326] border border-[#E4E4E7] dark:border-[#27272A] rounded-lg overflow-hidden">
                <div className="grid grid-cols-4 px-4 py-2 border-b border-[#E4E4E7] dark:border-[#27272A]">
                  <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#71717A]">Project</span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#71717A]">Type</span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#71717A]">Status</span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#71717A]">Dept</span>
                </div>
                {[
                  { name: 'MG Road', type: 'road' as const, status: 'approved' as const, dept: 'PWD' },
                  { name: 'Sec 5 Pipeline', type: 'water' as const, status: 'clash' as const, dept: 'Jal Nigam' },
                  { name: 'Vijay Nagar Park', type: 'parks' as const, status: 'completed' as const, dept: 'Parks' },
                ].map((row) => (
                  <div key={row.name} className="grid grid-cols-4 px-4 py-2.5 border-b border-[#E4E4E7] dark:border-[#27272A] last:border-0 items-center">
                    <span className="text-[12px] text-[#3F3F46] dark:text-[#A1A1AA]">{row.name}</span>
                    <div><Badge variant={row.type} size="sm" /></div>
                    <div><Badge variant={row.status} size="sm" /></div>
                    <span className="text-[12px] text-[#71717A]">{row.dept}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Conflict Detail */}
            <div>
              <p className="text-[11px] text-[#A1A1AA] mb-3">
                Conflict Detail — clash alert (large)
              </p>
              <div className="bg-[#FFF5F5] dark:bg-[#2D0A0A] border border-[#FECACA] dark:border-[#7F1D1D] rounded-lg px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-medium text-[#991B1B] dark:text-[#FCA5A5]">
                    Geographic + timeline overlap detected
                  </p>
                  <p className="text-[11px] text-[#B91C1C] dark:text-[#FCA5A5] opacity-75 mt-0.5">
                    MG Road Resurfacing ↔ Sector 5 Pipeline
                  </p>
                </div>
                <ClashBadge size="lg" />
              </div>
            </div>

          </Section>

        </div>
      </div>
    </div>
  )
}
