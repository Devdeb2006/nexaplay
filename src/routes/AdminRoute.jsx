import { Outlet } from 'react-router-dom'

// Gate placeholder for admin-only routes. Role-based auth lands in the
// auth phase of the build plan; this will redirect non-admin users to
// /admin/login then.
function AdminRoute() {
  return <Outlet />
}

export default AdminRoute
