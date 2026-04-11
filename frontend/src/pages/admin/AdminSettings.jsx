import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

function Card({ children, className = '' }) {
  return (
    <div className={`bg-[#FFFFFF] dark:bg-[#1C1C1F] border border-[#E5E5E5] dark:border-[#27272A] rounded-[8px] p-5 ${className}`}
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      {children}
    </div>
  )
}

function SectionLabel({ children }) {
  return <p className="text-[11px] font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-[0.06em] mb-4">{children}</p>
}

const inputCls = "w-full h-10 px-3 text-[14px] rounded-[8px] border border-[#E2E8F0] dark:border-[#27272A] bg-[#FFFFFF] dark:bg-[#18181B] text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#5E6AD2] focus:ring-2 focus:ring-[#5E6AD2]/10 transition-all"
const labelCls = "block text-[13px] font-semibold text-[#0F172A] dark:text-[#F8FAFC] mb-1.5"

function getInitials(name) {
  if (!name) return '?'
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export default function AdminSettings() {
  const { user } = useAuth()

  const [name,        setName]        = useState(user?.name || 'Rajesh Kumar')
  const [nameSaved,   setNameSaved]   = useState(false)
  const [currentPw,   setCurrentPw]   = useState('')
  const [newPw,       setNewPw]       = useState('')
  const [confirmPw,   setConfirmPw]   = useState('')
  const [pwError,     setPwError]     = useState('')
  const [pwSuccess,   setPwSuccess]   = useState(false)
  const [notifEmail,  setNotifEmail]  = useState(true)
  const [notifClash,  setNotifClash]  = useState(true)
  const [notifReport, setNotifReport] = useState(false)

  function handleSaveName() {
    if (!name.trim()) return
    setNameSaved(true)
    setTimeout(() => setNameSaved(false), 2500)
  }

  function handleChangePassword() {
    setPwError('')
    setPwSuccess(false)
    if (!currentPw || !newPw || !confirmPw) { setPwError('All fields are required.'); return }
    if (newPw !== confirmPw) { setPwError('New passwords do not match.'); return }
    if (newPw.length < 6)   { setPwError('Password must be at least 6 characters.'); return }
    setPwSuccess(true)
    setCurrentPw(''); setNewPw(''); setConfirmPw('')
    setTimeout(() => setPwSuccess(false), 3000)
  }

const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 ${checked ? 'bg-[#5E6AD2]' : 'bg-[#E2E8F0] dark:bg-[#27272A]'}`}
    style={{ minWidth: '40px' }}
  >
    <span
      className="absolute top-[3px] w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform duration-200"
      style={{ left: checked ? '19px' : '3px' }}
    />
  </button>
)
  return (
    <div className="flex flex-col gap-5" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Profile ── */}
      <Card>
        <SectionLabel>Profile</SectionLabel>
        <div className="flex items-center gap-5 mb-6 pb-5 border-b border-[#F3F4F6] dark:border-[#27272A]">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-[20px] font-bold bg-[#EEF2FF] dark:bg-[#1E2260] text-[#5E6AD2] dark:text-[#9BA3F0] border-2 border-[#E0E7FF] dark:border-[#252870]">
              {getInitials(name)}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#5E6AD2] border-2 border-white dark:border-[#1C1C1F] flex items-center justify-center cursor-pointer">
              <svg width="9" height="9" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </div>
          </div>
          <div>
            <p className="text-[16px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">{name}</p>
            <p className="text-[13px] text-[#6B7280] dark:text-[#9CA3AF]">{user?.roleLabel || 'Municipal Coordinator'}</p>
            <p className="text-[12px] text-[#9CA3AF] dark:text-[#6B7280] mt-0.5">{user?.email || 'admin@civiq.in'}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className={labelCls}>Display name</label>
            <input className={inputCls} value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
            <p className="text-[12px] text-[#9CA3AF] dark:text-[#6B7280] mt-1.5">This appears in the navbar and audit log</p>
          </div>
          <div>
            <label className={labelCls}>Work email</label>
            <input className={`${inputCls} opacity-60 cursor-not-allowed`} value={user?.email || 'admin@civiq.in'} readOnly />
            <p className="text-[12px] text-[#9CA3AF] dark:text-[#6B7280] mt-1.5">Email cannot be changed here</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 mt-4">
          <div>
            <label className={labelCls}>Role</label>
            <input className={`${inputCls} opacity-60 cursor-not-allowed`} value={user?.roleLabel || 'Municipal Coordinator'} readOnly />
          </div>
          <div>
            <label className={labelCls}>Department</label>
            <input className={`${inputCls} opacity-60 cursor-not-allowed`} value="Municipal Corporation" readOnly />
          </div>
        </div>

        <div className="flex justify-end mt-5">
          {nameSaved && (
            <span className="text-[13px] text-[#16A34A] dark:text-[#4ADE80] mr-4 flex items-center gap-1.5">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Changes saved
            </span>
          )}
          <button onClick={handleSaveName}
            className="h-9 px-5 text-[13px] font-medium text-white bg-[#5E6AD2] rounded-[6px] hover:bg-[#4A56C1] transition-colors">
            Save changes
          </button>
        </div>
      </Card>

      {/* ── Security ── */}
      <Card>
        <SectionLabel>Security</SectionLabel>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Current password</label>
            <input className={inputCls} type="password" placeholder="••••••••" value={currentPw} onChange={e => setCurrentPw(e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>New password</label>
            <input className={inputCls} type="password" placeholder="••••••••" value={newPw} onChange={e => setNewPw(e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Confirm new password</label>
            <input className={inputCls} type="password" placeholder="••••••••" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} />
          </div>
        </div>
        {pwError && <p className="text-[13px] text-[#DC2626] dark:text-[#F87171] mt-3">{pwError}</p>}
        {pwSuccess && (
          <p className="text-[13px] text-[#16A34A] dark:text-[#4ADE80] mt-3 flex items-center gap-1.5">
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Password updated successfully
          </p>
        )}
        <div className="flex justify-end mt-4">
          <button onClick={handleChangePassword}
            className="h-9 px-5 text-[13px] font-medium text-white bg-[#5E6AD2] rounded-[6px] hover:bg-[#4A56C1] transition-colors">
            Update password
          </button>
        </div>
      </Card>

      {/* ── Preferences ── */}
      <Card>
        <SectionLabel>Preferences</SectionLabel>
        <div className="flex flex-col gap-4">
          {[
            { label: 'Email notifications',        sub: 'Receive email alerts for approvals and rejections', checked: notifEmail,  onChange: setNotifEmail  },
            { label: 'Clash detection alerts',     sub: 'Get notified immediately when a new clash is detected', checked: notifClash,  onChange: setNotifClash  },
            { label: 'Citizen complaint reports',  sub: 'Weekly summary of new citizen complaints by department', checked: notifReport, onChange: setNotifReport },
          ].map(pref => (
            <div key={pref.label} className="flex items-center justify-between py-3 border-b border-[#F3F4F6] dark:border-[#27272A] last:border-0">
              <div className="min-w-0 mr-8">
                <p className="text-[14px] font-medium text-[#0F172A] dark:text-[#F8FAFC]">{pref.label}</p>
                <p className="text-[12px] text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">{pref.sub}</p>
              </div>
              <Toggle checked={pref.checked} onChange={pref.onChange} />
            </div>
          ))}
        </div>
      </Card>

    </div>
  )
}