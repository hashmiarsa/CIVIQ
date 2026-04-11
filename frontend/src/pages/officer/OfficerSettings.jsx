import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

function Card({ children, className = '' }) {
  return <div className={`bg-[#FFFFFF] dark:bg-[#1C1C1F] border border-[#E5E5E5] dark:border-[#27272A] rounded-[8px] p-5 ${className}`} style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>{children}</div>
}
function SL({ children }) { return <p className="text-[11px] font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-[0.06em] mb-4">{children}</p> }
const inputCls = "w-full h-10 px-3 text-[14px] rounded-[8px] border border-[#E2E8F0] dark:border-[#27272A] bg-[#FFFFFF] dark:bg-[#18181B] text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#5E6AD2] focus:ring-2 focus:ring-[#5E6AD2]/10 transition-all"
const labelCls = "block text-[13px] font-semibold text-[#0F172A] dark:text-[#F8FAFC] mb-1.5"
function getInitials(name) { return name ? name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '?' }

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

export default function OfficerSettings() {
  const { user } = useAuth()

  const [name,       setName]       = useState(user?.name || 'Anil Sharma')
  const [nameSaved,  setNameSaved]  = useState(false)
  const [currentPw,  setCurrentPw]  = useState('')
  const [newPw,      setNewPw]      = useState('')
  const [confirmPw,  setConfirmPw]  = useState('')
  const [pwError,    setPwError]    = useState('')
  const [pwSuccess,  setPwSuccess]  = useState(false)
  const [notifEmail, setNotifEmail] = useState(true)
  const [notifClash, setNotifClash] = useState(true)
  const [notifComp,  setNotifComp]  = useState(false)

  function handleSaveName() { setNameSaved(true); setTimeout(() => setNameSaved(false), 2500) }
  function handleChangePassword() {
    setPwError(''); setPwSuccess(false)
    if (!currentPw || !newPw || !confirmPw) { setPwError('All fields are required.'); return }
    if (newPw !== confirmPw) { setPwError('Passwords do not match.'); return }
    if (newPw.length < 6)   { setPwError('Minimum 6 characters.'); return }
    setPwSuccess(true); setCurrentPw(''); setNewPw(''); setConfirmPw('')
    setTimeout(() => setPwSuccess(false), 3000)
  }

  return (
    <div className="flex flex-col gap-5" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Profile */}
      <Card>
        <SL>Profile</SL>
        <div className="flex items-center gap-5 mb-6 pb-5 border-b border-[#F3F4F6] dark:border-[#27272A]">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-[20px] font-bold bg-[#EEF2FF] dark:bg-[#1E2260] text-[#5E6AD2] dark:text-[#9BA3F0] border-2 border-[#E0E7FF] dark:border-[#252870]">
              {getInitials(name)}
            </div>
          </div>
          <div>
            <p className="text-[16px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">{name}</p>
            <p className="text-[13px] text-[#6B7280] dark:text-[#9CA3AF]">{user?.roleLabel || 'Executive Engineer'}</p>
            <p className="text-[12px] text-[#9CA3AF] dark:text-[#6B7280] mt-0.5">{user?.departmentFull || 'Public Works Department'}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className={labelCls}>Display name</label>
            <input className={inputCls} value={name} onChange={e => setName(e.target.value)} />
            <p className="text-[12px] text-[#9CA3AF] mt-1.5">Shown in audit log and notifications</p>
          </div>
          <div>
            <label className={labelCls}>Work email</label>
            <input className={`${inputCls} opacity-60 cursor-not-allowed`} value={user?.email || 'officer.pwd@civiq.in'} readOnly />
            <p className="text-[12px] text-[#9CA3AF] mt-1.5">Contact admin to change email</p>
          </div>
          <div>
            <label className={labelCls}>Role</label>
            <input className={`${inputCls} opacity-60 cursor-not-allowed`} value={user?.roleLabel || 'Executive Engineer'} readOnly />
          </div>
          <div>
            <label className={labelCls}>Department</label>
            <input className={`${inputCls} opacity-60 cursor-not-allowed`} value={user?.departmentFull || 'Public Works Department'} readOnly />
          </div>
        </div>
        <div className="flex justify-end mt-5">
          {nameSaved && <span className="text-[13px] text-[#16A34A] dark:text-[#4ADE80] mr-4 flex items-center gap-1.5"><svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>Saved</span>}
          <button onClick={handleSaveName} className="h-9 px-5 text-[13px] font-medium text-white bg-[#5E6AD2] rounded-[6px] hover:bg-[#4A56C1] transition-colors">Save changes</button>
        </div>
      </Card>

      {/* Security */}
      <Card>
        <SL>Security</SL>
        <div className="grid grid-cols-3 gap-4">
          <div><label className={labelCls}>Current password</label><input className={inputCls} type="password" placeholder="••••••••" value={currentPw} onChange={e => setCurrentPw(e.target.value)} /></div>
          <div><label className={labelCls}>New password</label><input className={inputCls} type="password" placeholder="••••••••" value={newPw} onChange={e => setNewPw(e.target.value)} /></div>
          <div><label className={labelCls}>Confirm password</label><input className={inputCls} type="password" placeholder="••••••••" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} /></div>
        </div>
        {pwError   && <p className="text-[13px] text-[#DC2626] dark:text-[#F87171] mt-3">{pwError}</p>}
        {pwSuccess && <p className="text-[13px] text-[#16A34A] dark:text-[#4ADE80] mt-3">✓ Password updated successfully</p>}
        <div className="flex justify-end mt-4">
          <button onClick={handleChangePassword} className="h-9 px-5 text-[13px] font-medium text-white bg-[#5E6AD2] rounded-[6px] hover:bg-[#4A56C1] transition-colors">Update password</button>
        </div>
      </Card>

      {/* Preferences */}
      <Card>
        <SL>Preferences</SL>
        <div className="flex flex-col gap-4">
          {[
            { label: 'Email notifications',    sub: 'Receive email alerts for project approvals and rejections', checked: notifEmail, onChange: setNotifEmail },
            { label: 'Clash detection alerts', sub: 'Get notified immediately when your project has a clash',    checked: notifClash, onChange: setNotifClash },
            { label: 'Complaint updates',      sub: 'Daily summary of department complaint status changes',       checked: notifComp,  onChange: setNotifComp },
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