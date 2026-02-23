import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const handleExportData = () => {
    const csv = `Department,Total Students,Placed,Percentage\nComputer Science,320,272,85%\nInformation Technology,250,195,78%\nElectronics,200,124,62%\nMechanical,280,151,54%\nMBA,195,140,72%`
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'placement_data_export.csv'; a.click()
    URL.revokeObjectURL(url)
    toast.success('Data exported successfully!', { icon: '📊' })
}

export default function AdminDashboard() {
    return (
        <>
            {/* Welcome Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white shadow-xl mb-8">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black tracking-tight">Good Morning, Coordinator!</h2>
                        <p className="text-indigo-100 text-lg">Placement season is going well. 68% students placed so far.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link to="/admin/analytics" className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold text-sm hover:bg-opacity-90 transition-all shadow-lg">
                            View Analytics
                        </Link>
                    </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {/* Overview KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {[
                    { icon: 'group', iconBg: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600', label: 'Total Students', value: '1,245' },
                    { icon: 'how_to_reg', iconBg: 'bg-green-50 dark:bg-green-900/20 text-green-600', label: 'Placed', value: '847', badge: '68%', badgeColor: 'text-green-500' },
                    { icon: 'pending', iconBg: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600', label: 'Pending', value: '398' },
                    { icon: 'apartment', iconBg: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600', label: 'Companies', value: '64' },
                    { icon: 'currency_rupee', iconBg: 'bg-indigo-50 dark:bg-indigo-900/20 text-primary', label: 'Avg. Package', value: '₹12.4L' },
                ].map(stat => (
                    <div key={stat.label} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <span className={`p-2 ${stat.iconBg} rounded-lg`}>
                                <span className="material-symbols-outlined">{stat.icon}</span>
                            </span>
                            {stat.badge && <span className={`${stat.badgeColor} text-xs font-bold`}>{stat.badge}</span>}
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                        <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-12 gap-8">
                {/* Left Column */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    {/* Pending Actions */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <h4 className="text-lg font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-amber-500">warning</span>
                                Pending Actions
                            </h4>
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">8 Urgent</span>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <div className="flex items-center gap-4">
                                    <span className="size-10 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 flex items-center justify-center">
                                        <span className="material-symbols-outlined">verified_user</span>
                                    </span>
                                    <div>
                                        <p className="font-medium">12 Student Profiles Pending Verification</p>
                                        <p className="text-sm text-slate-500">Documents need review before they can apply</p>
                                    </div>
                                </div>
                                <Link to="/admin/students" className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg">Review</Link>
                            </div>
                            <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <div className="flex items-center gap-4">
                                    <span className="size-10 rounded-lg bg-amber-100 dark:bg-amber-900/20 text-amber-600 flex items-center justify-center">
                                        <span className="material-symbols-outlined">apartment</span>
                                    </span>
                                    <div>
                                        <p className="font-medium">3 New Company Registrations</p>
                                        <p className="text-sm text-slate-500">Microsoft, Adobe, Stripe want to register</p>
                                    </div>
                                </div>
                                <Link to="/admin/companies" className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg">Approve</Link>
                            </div>
                            <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <div className="flex items-center gap-4">
                                    <span className="size-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                                        <span className="material-symbols-outlined">event</span>
                                    </span>
                                    <div>
                                        <p className="font-medium">5 Drives Scheduled This Week</p>
                                        <p className="text-sm text-slate-500">Venue and logistics confirmation needed</p>
                                    </div>
                                </div>
                                <Link to="/admin/drives" className="px-4 py-2 border border-slate-300 text-slate-600 text-xs font-bold rounded-lg">View</Link>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Drives */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <h4 className="text-lg font-bold">Upcoming Drives This Week</h4>
                            <Link to="/admin/drives" className="text-sm text-primary font-bold hover:underline">View All</Link>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/10">
                                    <div className="text-center px-4 py-2 bg-primary text-white rounded-lg">
                                        <p className="text-xs font-medium uppercase">Mon</p>
                                        <p className="text-xl font-bold">12</p>
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="font-bold">Google - SDE Intern</h5>
                                        <p className="text-sm text-slate-500">9:00 AM • Seminar Hall • 89 Eligible</p>
                                    </div>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Confirmed</span>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                                    <div className="text-center px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                        <p className="text-xs font-medium uppercase text-slate-500">Tue</p>
                                        <p className="text-xl font-bold">13</p>
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="font-bold">Microsoft - SDE-1</h5>
                                        <p className="text-sm text-slate-500">10:00 AM • Main Auditorium • 156 Eligible</p>
                                    </div>
                                    <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">Pending Venue</span>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                                    <div className="text-center px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                        <p className="text-xs font-medium uppercase text-slate-500">Thu</p>
                                        <p className="text-xl font-bold">15</p>
                                    </div>
                                    <div className="flex-1">
                                        <h5 className="font-bold">Amazon - SDE + DS</h5>
                                        <p className="text-sm text-slate-500">9:30 AM • Lab Complex • 203 Eligible</p>
                                    </div>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Confirmed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Department-wise Progress */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                        <h4 className="text-lg font-bold mb-6">Department-wise Placement Progress</h4>
                        <div className="space-y-4">
                            {[
                                { dept: 'Computer Science', pct: 85, color: 'bg-green-500', textColor: 'text-green-600' },
                                { dept: 'Information Technology', pct: 78, color: 'bg-green-500', textColor: 'text-green-600' },
                                { dept: 'Electronics', pct: 62, color: 'bg-amber-500', textColor: 'text-amber-600' },
                                { dept: 'Mechanical', pct: 54, color: 'bg-amber-500', textColor: 'text-amber-600' },
                                { dept: 'MBA', pct: 72, color: 'bg-green-500', textColor: 'text-green-600' },
                            ].map(d => (
                                <div key={d.dept}>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-medium">{d.dept}</span>
                                        <span className={`text-sm font-bold ${d.textColor}`}>{d.pct}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className={`h-full ${d.color} rounded-full`} style={{ width: `${d.pct}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                        <h4 className="font-bold mb-4">Quick Actions</h4>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { icon: 'person_add', label: 'Add Student', to: '/admin/students' },
                                { icon: 'domain_add', label: 'Add Company', to: '/admin/companies' },
                                { icon: 'post_add', label: 'New Drive', to: '/admin/drives' },
                                { icon: 'download', label: 'Export Data', to: '#', onClick: handleExportData },
                            ].map(action => (
                                <Link key={action.label} to={action.to} onClick={action.onClick ? (e) => { e.preventDefault(); action.onClick() } : undefined} className="flex flex-col items-center gap-2 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-primary/5 hover:border-primary/30 transition-colors">
                                    <span className="material-symbols-outlined text-primary">{action.icon}</span>
                                    <span className="text-xs font-medium text-center">{action.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Today's Schedule */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                            <h4 className="font-bold">Today's Schedule</h4>
                            <p className="text-xs text-slate-500 mt-1">Sunday, Feb 9, 2026</p>
                        </div>
                        <div className="p-4 space-y-3">
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500">
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-green-800 dark:text-green-300">9:00 AM - Google Drive</p>
                                    <p className="text-xs text-green-600 dark:text-green-400">Seminar Hall • 89 Students</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500">
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-blue-800 dark:text-blue-300">2:00 PM - Pre-Placement Talk</p>
                                    <p className="text-xs text-blue-600 dark:text-blue-400">Adobe • Conference Room A</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/10 border-l-4 border-purple-500">
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-purple-800 dark:text-purple-300">4:30 PM - TPO Meeting</p>
                                    <p className="text-xs text-purple-600 dark:text-purple-400">Weekly Review • Director's Office</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                            <h4 className="font-bold">Recent Activity</h4>
                        </div>
                        <div className="p-4 space-y-4 max-h-64 overflow-y-auto">
                            {[
                                { color: 'bg-green-500', text: <><strong>Rahul Sharma</strong> got placed at Goldman Sachs</>, time: '5 minutes ago' },
                                { color: 'bg-blue-500', text: <><strong>Microsoft</strong> scheduled drive for Feb 13</>, time: '1 hour ago' },
                                { color: 'bg-amber-500', text: <><strong>15 students</strong> completed profile verification</>, time: '2 hours ago' },
                                { color: 'bg-purple-500', text: <><strong>Adobe</strong> registered as a new partner</>, time: '3 hours ago' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <span className={`size-2 mt-2 ${item.color} rounded-full`}></span>
                                    <div>
                                        <p className="text-sm">{item.text}</p>
                                        <p className="text-xs text-slate-500">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Placement Highlights */}
                    <div className="bg-gradient-to-br from-primary to-indigo-600 rounded-xl p-6 text-white">
                        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined">emoji_events</span>
                            Placement Highlights
                        </h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-indigo-100">Highest Package</span>
                                <span className="text-xl font-bold">₹56 LPA</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-indigo-100">Total Offers</span>
                                <span className="text-xl font-bold">892</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-indigo-100">PPO Conversions</span>
                                <span className="text-xl font-bold">156</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
