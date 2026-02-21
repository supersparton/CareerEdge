export default function DriveManagement() {
    const drives = [
        { company: 'Google', initials: 'G', bgClass: 'bg-blue-100 text-blue-600', role: 'SDE Intern', date: 'Feb 15, 2024', eligibility: 'CPI ≥ 8.0', applicants: 234, shortlisted: 45, status: 'Active', statusColor: 'bg-green-100 text-green-700' },
        { company: 'Goldman Sachs', initials: 'GS', bgClass: 'bg-gradient-to-br from-blue-500 to-purple-600 text-white', role: 'Analyst', date: 'Feb 12, 2024', eligibility: 'CPI ≥ 7.5', applicants: 187, shortlisted: 32, status: 'Active', statusColor: 'bg-green-100 text-green-700' },
        { company: 'Microsoft', initials: 'MS', bgClass: 'bg-blue-600 text-white', role: 'SDE-1', date: 'Feb 18, 2024', eligibility: 'CPI ≥ 8.5', applicants: 156, shortlisted: 0, status: 'Upcoming', statusColor: 'bg-blue-100 text-blue-700' },
        { company: 'Amazon', initials: 'A', bgClass: 'bg-orange-500 text-white', role: 'SDE-1', date: 'Feb 22, 2024', eligibility: 'CPI ≥ 7.0', applicants: 312, shortlisted: 0, status: 'Upcoming', statusColor: 'bg-blue-100 text-blue-700' },
        { company: 'TCS', initials: 'TCS', bgClass: 'bg-blue-800 text-white text-xs', role: 'Digital', date: 'Jan 28, 2024', eligibility: 'CPI ≥ 6.0', applicants: 456, shortlisted: 120, status: 'Completed', statusColor: 'bg-slate-100 text-slate-600' },
    ]

    return (
        <>
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Drive Management</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and schedule all placement drives for the 2024 cycle.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold hover:bg-slate-50 flex items-center gap-2 transition-colors">
                        <span className="material-symbols-outlined text-lg">calendar_month</span>
                        Calendar View
                    </button>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-700 flex items-center gap-2 transition-colors shadow-sm shadow-primary/20">
                        <span className="material-symbols-outlined text-lg">add</span>
                        Create New Drive
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[
                    { icon: 'work', iconBg: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600', value: '23', label: 'Total Drives' },
                    { icon: 'play_circle', iconBg: 'bg-green-50 dark:bg-green-900/20 text-green-600', value: '8', label: 'Active Drives' },
                    { icon: 'schedule', iconBg: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600', value: '5', label: 'Upcoming' },
                    { icon: 'check_circle', iconBg: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600', value: '10', label: 'Completed' },
                ].map(stat => (
                    <div key={stat.label} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center gap-3">
                            <span className={`p-2 ${stat.iconBg} rounded-lg`}>
                                <span className="material-symbols-outlined">{stat.icon}</span>
                            </span>
                            <div>
                                <p className="text-2xl font-bold">{stat.value}</p>
                                <p className="text-xs text-slate-500">{stat.label}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 mb-6">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex-1 min-w-64">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <input type="text" placeholder="Search drives by company, role..." className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20" />
                        </div>
                    </div>
                    <select className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Upcoming</option>
                        <option>Completed</option>
                    </select>
                    <select className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm">
                        <option>Sort by Date</option>
                        <option>Sort by Company</option>
                        <option>Sort by Applicants</option>
                    </select>
                </div>
            </div>

            {/* Drives Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Drive Date</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Eligibility</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Applicants</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Shortlisted</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {drives.map(d => (
                            <tr key={d.company + d.role} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`size-10 rounded-lg ${d.bgClass} flex items-center justify-center font-bold`}>{d.initials}</div>
                                        <span className="font-semibold">{d.company}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm">{d.role}</td>
                                <td className="px-6 py-4 text-sm text-slate-500">{d.date}</td>
                                <td className="px-6 py-4 text-sm font-medium">{d.eligibility}</td>
                                <td className="px-6 py-4 text-sm font-bold">{d.applicants}</td>
                                <td className="px-6 py-4 text-sm font-bold">{d.shortlisted || '-'}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 ${d.statusColor} text-xs font-bold rounded-full`}>{d.status}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="size-8 inline-flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
                                        <span className="material-symbols-outlined">more_vert</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Pagination */}
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <p className="text-sm text-slate-500">Showing 1-5 of 23 drives</p>
                    <div className="flex items-center gap-2">
                        <button disabled className="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 disabled:opacity-50">
                            <span className="material-symbols-outlined text-sm">chevron_left</span>
                        </button>
                        <button className="size-8 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-medium">1</button>
                        <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 text-sm font-medium hover:bg-slate-50">2</button>
                        <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 text-sm font-medium hover:bg-slate-50">3</button>
                        <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50">
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
