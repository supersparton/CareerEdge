import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const navItems = [
    { to: '/student', label: 'Dashboard', icon: 'dashboard', end: true },
    { to: '/student/drives', label: 'Job Drives', icon: 'work' },
    { to: '/student/applications', label: 'Applications', icon: 'description' },
    { to: '/student/interviews', label: 'Interviews', icon: 'event' },
    { to: '/student/profile', label: 'Profile', icon: 'person' },
]

export default function StudentLayout() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
                    {/* Logo */}
                    <NavLink to="/student" className="flex items-center gap-2 shrink-0">
                        <div className="bg-primary p-1.5 rounded-lg text-white">
                            <span className="material-symbols-outlined !text-2xl">school</span>
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-primary">PlacementPortal</h1>
                    </NavLink>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map(item => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.end}
                                className={({ isActive }) =>
                                    `flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                                        ? 'bg-primary/10 text-primary font-bold'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`
                                }
                            >
                                <span className="material-symbols-outlined !text-[18px]">{item.icon}</span>
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* User Actions */}
                    <div className="flex items-center gap-3 shrink-0">
                        <NavLink
                            to="/student/notifications"
                            className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                        >
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                        </NavLink>
                        <NavLink
                            to="/student/settings"
                            className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                        >
                            <span className="material-symbols-outlined">settings</span>
                        </NavLink>
                        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-semibold">{user?.name}</p>
                                <p className="text-[10px] text-slate-500">{user?.subtitle}</p>
                            </div>
                            <button onClick={handleLogout} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white font-bold text-sm" title="Logout">
                                {user?.avatar}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Page Content */}
            <main className="max-w-[1440px] mx-auto px-6 py-8 animate-fadeIn">
                <Outlet />
            </main>
        </div>
    )
}
