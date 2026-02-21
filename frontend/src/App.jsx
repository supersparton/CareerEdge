import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './context/AuthContext'

// Layouts
import StudentLayout from './components/layouts/StudentLayout'
import AdminLayout from './components/layouts/AdminLayout'
import RecruiterLayout from './components/layouts/RecruiterLayout'

// Auth Pages
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

// Student Pages
import StudentDashboard from './pages/student/Dashboard'
import JobDrives from './pages/student/JobDrives'
import StudentApplications from './pages/student/Applications'
import StudentInterviews from './pages/student/Interviews'
import StudentProfile from './pages/student/Profile'
import StudentSettings from './pages/student/Settings'
import StudentNotifications from './pages/student/Notifications'
import ResumeBuilder from './pages/student/ResumeBuilder'

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard'
import StudentList from './pages/admin/StudentList'
import CompanyManagement from './pages/admin/CompanyManagement'
import DriveManagement from './pages/admin/DriveManagement'
import Analytics from './pages/admin/Analytics'

// Recruiter Pages
import RecruiterDashboard from './pages/recruiter/Dashboard'
import CreateDrive from './pages/recruiter/CreateDrive'
import ApplicationReview from './pages/recruiter/ApplicationReview'
import CompanyProfile from './pages/recruiter/CompanyProfile'

function ProtectedRoute({ children, allowedRole }) {
    const { role } = useAuth()
    if (!role) return <Navigate to="/login" replace />
    if (role !== allowedRole) return <Navigate to={`/${role}`} replace />
    return children
}

export default function App() {
    const { role } = useAuth()

    return (
        <>
            <Toaster position="top-right" toastOptions={{
                style: { fontFamily: 'Inter', fontSize: '14px', fontWeight: 500 },
                duration: 3000,
            }} />
            <Routes>
                {/* Auth Routes */}
                <Route path="/login" element={role ? <Navigate to={`/${role}`} replace /> : <LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Student Routes */}
                <Route path="/student" element={<ProtectedRoute allowedRole="student"><StudentLayout /></ProtectedRoute>}>
                    <Route index element={<StudentDashboard />} />
                    <Route path="drives" element={<JobDrives />} />
                    <Route path="applications" element={<StudentApplications />} />
                    <Route path="interviews" element={<StudentInterviews />} />
                    <Route path="profile" element={<StudentProfile />} />
                    <Route path="settings" element={<StudentSettings />} />
                    <Route path="notifications" element={<StudentNotifications />} />
                    <Route path="resume-builder" element={<ResumeBuilder />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminLayout /></ProtectedRoute>}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="students" element={<StudentList />} />
                    <Route path="companies" element={<CompanyManagement />} />
                    <Route path="drives" element={<DriveManagement />} />
                    <Route path="analytics" element={<Analytics />} />
                </Route>

                {/* Recruiter Routes */}
                <Route path="/recruiter" element={<ProtectedRoute allowedRole="recruiter"><RecruiterLayout /></ProtectedRoute>}>
                    <Route index element={<RecruiterDashboard />} />
                    <Route path="create-drive" element={<CreateDrive />} />
                    <Route path="applications" element={<ApplicationReview />} />
                    <Route path="company-profile" element={<CompanyProfile />} />
                </Route>

                {/* Default */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </>
    )
}
