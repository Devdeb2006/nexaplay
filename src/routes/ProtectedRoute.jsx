import { Outlet } from 'react-router-dom'

// Gate placeholder for logged-in-only routes. AuthContext lands in the
// auth phase of the build plan; this will redirect unauthenticated users
// to /login then.
function ProtectedRoute() {
  return <Outlet />
}

export default ProtectedRoute
