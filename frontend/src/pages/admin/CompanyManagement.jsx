export default function CompanyManagement() {
    const companies = [
        { initials: 'G', bgClass: 'bg-blue-100 text-blue-600', name: 'Google', location: 'Mountain View, CA', industry: 'Technology', packageRange: '₹35-56 LPA', drives: '8', hired: '45', status: 'Verified', pending: false },
        { initials: 'GS', bgClass: 'bg-gradient-to-br from-blue-500 to-purple-600 text-white', name: 'Goldman Sachs', location: 'New York, USA', industry: 'Finance', packageRange: '₹22-30 LPA', drives: '5', hired: '32', status: 'Verified', pending: false },
        { initials: 'MS', bgClass: 'bg-blue-600 text-white', name: 'Microsoft', location: 'Redmond, WA', industry: 'Technology', packageRange: '₹38-50 LPA', drives: '-', hired: '-', status: 'Pending', pending: true },
        { initials: 'A', bgClass: 'bg-orange-500 text-white', name: 'Amazon', location: 'Seattle, WA', industry: 'Technology', packageRange: '₹28-45 LPA', drives: '6', hired: '38', status: 'Verified', pending: false },
        { initials: 'O', bgClass: 'bg-red-100 text-red-600', name: 'Oracle', location: 'Austin, TX', industry: 'Technology', packageRange: '₹18-28 LPA', drives: '4', hired: '24', status: 'Verified', pending: false },
        { initials: 'TCS', bgClass: 'bg-blue-800 text-white text-sm', name: 'TCS', location: 'Mumbai, India', industry: 'IT Services', packageRange: '₹7-12 LPA', drives: '3', hired: '89', status: 'Verified', pending: false },
    ]

    return (
        <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[
                    { icon: 'apartment', iconBg: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600', value: '64', label: 'Total Companies' },
                    { icon: 'verified', iconBg: 'bg-green-50 dark:bg-green-900/20 text-green-600', value: '56', label: 'Verified Partners' },
                    { icon: 'pending', iconBg: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600', value: '8', label: 'Pending Approval' },
                    { icon: 'work', iconBg: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600', value: '23', label: 'Active Drives' },
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

            {/* Filters & Search */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 mb-6">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex-1 min-w-64">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <input type="text" placeholder="Search companies by name, industry..." className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20" />
                        </div>
                    </div>
                    <select className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20">
                        <option>All Status</option>
                        <option>Verified</option>
                        <option>Pending</option>
                        <option>Inactive</option>
                    </select>
                    <select className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20">
                        <option>All Industries</option>
                        <option>Technology</option>
                        <option>Finance</option>
                        <option>Consulting</option>
                        <option>Manufacturing</option>
                    </select>
                    <select className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20">
                        <option>All Package Ranges</option>
                        <option>Above 20 LPA</option>
                        <option>10-20 LPA</option>
                        <option>5-10 LPA</option>
                        <option>Below 5 LPA</option>
                    </select>
                </div>
            </div>

            {/* Pending Approvals Banner */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-amber-600">pending_actions</span>
                    <div>
                        <p className="font-bold text-amber-800 dark:text-amber-300">3 Companies Awaiting Approval</p>
                        <p className="text-sm text-amber-600 dark:text-amber-400">Microsoft, Adobe, Stripe have requested to register</p>
                    </div>
                </div>
                <button className="px-4 py-2 bg-amber-600 text-white text-sm font-bold rounded-lg hover:bg-amber-700">Review Now</button>
            </div>

            {/* Companies Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Industry</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Package Range</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Drives</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Hired</th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {companies.map(c => (
                            <tr key={c.name} className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${c.pending ? 'bg-amber-50/50 dark:bg-amber-900/10' : ''}`}>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`size-10 rounded-lg ${c.bgClass} flex items-center justify-center font-bold`}>{c.initials}</div>
                                        <div>
                                            <p className="font-semibold">{c.name}</p>
                                            <p className="text-xs text-slate-500">{c.location}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm">{c.industry}</td>
                                <td className="px-6 py-4 text-sm font-semibold">{c.packageRange}</td>
                                <td className="px-6 py-4 text-sm">{c.drives}</td>
                                <td className="px-6 py-4 text-sm font-semibold text-green-600">{c.hired}</td>
                                <td className="px-6 py-4">
                                    {c.status === 'Verified' ? (
                                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1 w-fit">
                                            <span className="material-symbols-outlined text-sm">verified</span> Verified
                                        </span>
                                    ) : (
                                        <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">Pending</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {c.pending ? (
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700">Approve</button>
                                            <button className="px-3 py-1 border border-red-300 text-red-600 text-xs font-bold rounded hover:bg-red-50">Reject</button>
                                        </div>
                                    ) : (
                                        <button className="size-8 inline-flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Pagination */}
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <p className="text-sm text-slate-500">Showing 1-6 of 64 companies</p>
                    <div className="flex items-center gap-2">
                        <button disabled className="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 disabled:opacity-50">
                            <span className="material-symbols-outlined text-sm">chevron_left</span>
                        </button>
                        <button className="size-8 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-medium">1</button>
                        <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 text-sm font-medium hover:bg-slate-50">2</button>
                        <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 text-sm font-medium hover:bg-slate-50">3</button>
                        <span className="text-slate-400">...</span>
                        <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 text-sm font-medium hover:bg-slate-50">11</button>
                        <button className="size-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50">
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
