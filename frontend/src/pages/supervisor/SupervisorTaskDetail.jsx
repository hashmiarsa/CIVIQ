import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import DashboardLayout from "../../components/DashboardLayout"
import PlaceholderPage from "../../components/PlaceholderPage"

function useSupervisorNav() {
  const navigate = useNavigate()
  return (id) => { const r = { dashboard:"/supervisor/dashboard", tasks:"/supervisor/tasks", settings:"/supervisor/settings" }; if (r[id]) navigate(r[id]) }
}

export default function SupervisorTaskDetail() {
  const { user } = useAuth(); const nav = useSupervisorNav()
  return (
    <DashboardLayout role="supervisor" activeItem="tasks" onNavigate={nav} pageTitle="Task Detail" userName={user?.name} userInitials={user?.initials} userRole={user?.roleLabel} notificationCount={0}>
      <PlaceholderPage title="Task Detail" phase={5} />
    </DashboardLayout>
  )
}
