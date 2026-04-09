import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout.jsx'
import { ProtectedRoute } from './components/layout/ProtectedRoute.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { AboutPage } from './pages/AboutPage.jsx'
import { ServicesPage } from './pages/ServicesPage.jsx'
import { ProjectsPage } from './pages/ProjectsPage.jsx'
import { ServiceDetailPage } from './pages/ServiceDetailPage.jsx'
import { ProjectDetailPage } from './pages/ProjectDetailPage.jsx'
import { LabourDashboardPage } from './pages/LabourDashboardPage.jsx'
import { AdminDashboardPage } from './pages/AdminDashboardPage.jsx'
import { ContactPage } from './pages/ContactPage.jsx'
import { PrivacyPage } from './pages/PrivacyPage.jsx'
import { TermsPage } from './pages/TermsPage.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { SignupPage } from './pages/SignupPage.jsx'
import { WorkersPage } from './pages/dashboard/WorkersPage.jsx'
import { SitesPage } from './pages/dashboard/SitesPage.jsx'
import { AttendancePage } from './pages/dashboard/AttendancePage.jsx'
import { PaymentsPage } from './pages/dashboard/PaymentsPage.jsx'

export default function App() {
  return (
    <Routes>
      {/* Auth pages — full-screen, no shared Navbar/Footer */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Admin dashboard — full-screen, admin only */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Main app with shared layout */}
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />

        {/* Admin exact routes */}
        <Route
          path="/admin/sites"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <SitesPage />
            </ProtectedRoute>
          }
        />

        {/* Protected dashboard routes */}
        <Route
          path="/labour"
          element={
            <ProtectedRoute allowedRoles={['admin', 'supervisor', 'contractor']}>
              <LabourDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/labour/workers"
          element={
            <ProtectedRoute allowedRoles={['admin', 'contractor']}>
              <WorkersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/labour/sites"
          element={
            <ProtectedRoute allowedRoles={['admin', 'supervisor']}>
              <SitesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/labour/attendance"
          element={
            <ProtectedRoute allowedRoles={['admin', 'supervisor']}>
              <AttendancePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/labour/payments"
          element={
            <ProtectedRoute allowedRoles={['admin', 'supervisor', 'contractor']}>
              <PaymentsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
