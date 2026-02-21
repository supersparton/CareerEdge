import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const navItems = [
    { to: '/admin', label: 'Dashboard', icon: 'dashboard', end: true },
    { to: '/admin/students', label: 'Students', icon: 'group' },
    { to: '/admin/companies', label: 'Companies', icon: 'apartment' },
    { to: '/admin/drives', label: 'Drives', icon: 'work' },
    { to: '/admin/analytics', label: 'Analytics', icon: 'analytics' },
]

const headerConfig = {
    '/admin': { title: 'Coordinator Dashboard', badge: 'Academic Year 2025-26', badgeColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
    '/admin/students': { title: 'Student Master List', badge: '1,240 Students', badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    '/admin/companies': { title: 'Company Management', badge: '64 Companies', badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', actions: 'companies' },
    '/admin/drives': { title: 'Drive Management', badge: '23 Drives', badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    '/admin/analytics': { title: 'Placement Analytics', badge: 'LIVE: 2023-24', badgeColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', actions: 'analytics' },
}

export default function AdminLayout() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const currentHeader = headerConfig[location.pathname] || headerConfig['/admin']

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col shrink-0">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-primary size-10 rounded-lg flex items-center justify-center text-white">
                        <span className="material-symbols-outlined">school</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold leading-none">PlacementPortal</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-semibold">TPO Admin</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1 mt-4">
                    {navItems.map(item => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive
                                    ? 'bg-primary/10 text-primary font-semibold'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`
                            }
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                        <span className="material-symbols-outlined">logout</span>
                        <span>Logout</span>
                    </button>
                    <div className="mt-4 flex items-center gap-3 px-3">
                        <div className="size-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                            {user?.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{user?.name}</p>
                            <p className="text-xs text-slate-500 truncate">{user?.subtitle}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold">{currentHeader.title}</h2>
                        <span className={`px-2 py-1 ${currentHeader.badgeColor} text-xs font-bold rounded`}>{currentHeader.badge}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        {currentHeader.actions === 'companies' && (
                            <>
                                <button className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">download</span>
                                    Export
                                </button>
                                <button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">add</span>
                                    Add Company
                                </button>
                            </>
                        )}
                        {currentHeader.actions === 'analytics' && (
                            <button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">download</span>
                                Export Report
                            </button>
                        )}
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <input type="text" placeholder="Quick search..." className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 w-64" />
                        </div>
                        <button className="size-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 relative">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-background-dark"></span>
                        </button>
                    </div>
                </header>
                <div className="p-8 animate-fadeIn">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
