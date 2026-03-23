import { useState } from 'react'
import Sidebar from './Sidebar'

export default function SidebarShowcase() {
  const [darkMode, setDarkMode] = useState(false)
  const [adminActive, setAdminActive] = useState('dashboard')
  const [officerActive, setOfficerActive] = useState('projects')
  const [supervisorActive, setSupervisorActive] = useState('tasks')

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#141414] transition-colors duration-200 p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-10 max-w-5xl">
          <div>
            <h1 className="text-2xl font-semibold text-[#09090B] dark:text-[#FAFAFA] tracking-tight">Sidebar</h1>
            <p className="text-sm text-[#71717A] mt-1">CIVIQ component · Supabase + Railway inspired · 3 roles</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-[6px] text-xs font-medium border border-[#E4E4E7] dark:border-[#27272A] text-[#3F3F46] dark:text-[#A1A1AA] hover:bg-[#F4F4F5] dark:hover:bg-[#1C1C1F] transition-colors"
          >
            {darkMode ? '☀ Light' : '⏾ Dark'}
          </button>
        </div>

        {/* 3 sidebars side by side */}
        <div className="flex gap-6 max-w-5xl">

          {/* Admin */}
          <div className="flex flex-col gap-2 flex-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.07em] text-[#71717A]">Admin — 8 items</p>
            <div className="h-[520px] rounded-[10px] overflow-hidden border border-[#E4E4E7] dark:border-[#27272A]">
              <Sidebar
                role="admin"
                activeItem={adminActive}
                onNavigate={setAdminActive}
                darkMode={darkMode}
                onToggleDark={() => setDarkMode(!darkMode)}
                userName="Rajesh Kumar"
                userRole="Municipal Coordinator"
                userInitials="RK"
              />
            </div>
          </div>

          {/* Officer */}
          <div className="flex flex-col gap-2 flex-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.07em] text-[#71717A]">Officer — 6 items</p>
            <div className="h-[520px] rounded-[10px] overflow-hidden border border-[#E4E4E7] dark:border-[#27272A]">
              <Sidebar
                role="officer"
                activeItem={officerActive}
                onNavigate={setOfficerActive}
                darkMode={darkMode}
                onToggleDark={() => setDarkMode(!darkMode)}
                userName="Amit Sharma"
                userRole="PWD Department"
                userInitials="AS"
              />
            </div>
          </div>

          {/* Supervisor */}
          <div className="flex flex-col gap-2 flex-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.07em] text-[#71717A]">Supervisor — 3 items</p>
            <div className="h-[520px] rounded-[10px] overflow-hidden border border-[#E4E4E7] dark:border-[#27272A]">
              <Sidebar
                role="supervisor"
                activeItem={supervisorActive}
                onNavigate={setSupervisorActive}
                darkMode={darkMode}
                onToggleDark={() => setDarkMode(!darkMode)}
                userName="Suresh Singh"
                userRole="Field Supervisor"
                userInitials="SS"
              />
            </div>
          </div>

        </div>

        {/* Notes */}
        <div className="mt-8 max-w-5xl grid grid-cols-3 gap-4">
          {[
            { title: 'Count colors', desc: 'Conflicts = red · Complaints = amber · Projects = gray · No pill, no bg' },
            { title: 'Active state', desc: 'Left 2px accent border + tinted bg. Icon and label turn accent color.' },
            { title: 'Dark toggle', desc: 'Pinned at bottom. Pill switch animates. Icon changes sun ↔ moon.' },
          ].map((note) => (
            <div key={note.title} className="bg-[#F4F4F5] dark:bg-[#1C1C1F] rounded-[8px] p-3">
              <p className="text-[11px] font-medium text-[#09090B] dark:text-[#FAFAFA] mb-1">{note.title}</p>
              <p className="text-[11px] text-[#71717A] leading-relaxed">{note.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
