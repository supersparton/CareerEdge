export default function Analytics() {
    const departments = [
        { name: 'CSE', percent: 95, opacity: '' },
        { name: 'ECE', percent: 82, opacity: '/80' },
        { name: 'IT', percent: 88, opacity: '/60' },
        { name: 'ME', percent: 64, opacity: '/40' },
        { name: 'CE', percent: 52, opacity: '/30' },
        { name: 'EE', percent: 48, opacity: '/20' },
        { name: 'BT', percent: 32, opacity: '/10' },
    ]

    return (
        <>
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                            <span className="material-symbols-outlined">school</span>
                        </span>
                        <span className="text-green-500 text-xs font-bold flex items-center">+5.2% <span className="material-symbols-outlined text-xs">trending_up</span></span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Students</p>
                    <h3 className="text-3xl font-bold mt-1">1,240</h3>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="p-2 bg-indigo-50 dark:bg-indigo-900/20 text-primary rounded-lg">
                            <span className="material-symbols-outlined">assignment_turned_in</span>
                        </span>
                        <span className="text-green-500 text-xs font-bold flex items-center">+12.4% <span className="material-symbols-outlined text-xs">trending_up</span></span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Placed Students</p>
                    <div className="flex items-baseline gap-2 mt-1">
                        <h3 className="text-3xl font-bold">856</h3>
                        <span className="text-slate-400 text-lg font-medium">(69%)</span>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-lg">
                            <span className="material-symbols-outlined">payments</span>
                        </span>
                        <span className="text-green-500 text-xs font-bold flex items-center">+8.1% <span className="material-symbols-outlined text-xs">trending_up</span></span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Avg. Package</p>
                    <h3 className="text-3xl font-bold mt-1">₹12.4 <span className="text-xl font-semibold">LPA</span></h3>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-lg">
                            <span className="material-symbols-outlined">apartment</span>
                        </span>
                        <span className="text-slate-400 text-xs font-bold flex items-center">Stable</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Active Companies</p>
                    <h3 className="text-3xl font-bold mt-1">42</h3>
                </div>
            </div>

            {/* Charts and Feed Grid */}
            <div className="grid grid-cols-12 gap-8">
                {/* Analytics Column */}
                <div className="col-span-12 lg:col-span-8 space-y-8">
                    {/* Bar Chart: Placement by Dept */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h4 className="text-lg font-bold">Placement Stats by Department</h4>
                                <p className="text-sm text-slate-500">Distribution of successful placements across branches</p>
                            </div>
                            <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm font-medium py-1.5 px-3 focus:ring-primary cursor-pointer">
                                <option>Academic Year 2023-24</option>
                                <option>Academic Year 2022-23</option>
                            </select>
                        </div>
                        <div className="relative h-64 w-full flex items-end gap-4 px-2">
                            {departments.map(dept => (
                                <div key={dept.name} className="flex-1 flex flex-col items-center group">
                                    <div className="relative w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg h-full overflow-hidden">
                                        <div className={`absolute bottom-0 w-full bg-primary${dept.opacity} rounded-t-lg transition-all duration-500`} style={{ height: `${dept.percent}%` }}></div>
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {dept.percent}% Placed
                                        </div>
                                    </div>
                                    <span className="mt-4 text-xs font-bold text-slate-500">{dept.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Line Chart: Monthly Trends */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h4 className="text-lg font-bold">Monthly Placement Trends</h4>
                                <p className="text-sm text-slate-500">Recruitment velocity for the current season</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="size-3 bg-primary rounded-full"></span>
                                    <span className="text-xs font-medium">Offers Made</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="size-3 bg-slate-200 dark:bg-slate-700 rounded-full"></span>
                                    <span className="text-xs font-medium">Last Year</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-48 w-full mt-12">
                            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                                <path d="M 0 80 Q 20 10, 40 40 T 80 10 T 100 30 V 100 H 0 Z" fill="url(#lineGradient)" opacity="0.1"></path>
                                <path d="M 0 80 Q 20 10, 40 40 T 80 10 T 100 30" fill="none" stroke="#1132d4" strokeLinecap="round" strokeWidth="2"></path>
                                <path d="M 0 90 Q 25 50, 50 60 T 100 40" fill="none" opacity="0.5" stroke="#94a3b8" strokeDasharray="4" strokeWidth="1.5"></path>
                                <defs>
                                    <linearGradient id="lineGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                                        <stop offset="0%" stopColor="#1132d4"></stop>
                                        <stop offset="100%" stopColor="#1132d4" stopOpacity="0"></stop>
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="flex justify-between mt-6 text-xs font-bold text-slate-400 px-1">
                                <span>AUG</span><span>OCT</span><span>DEC</span><span>FEB</span><span>APR</span><span>JUN</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Feed Column */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <h4 className="text-lg font-bold">Live Placement Feed</h4>
                            <span className="flex size-2 bg-green-500 rounded-full relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            </span>
                        </div>
                        <div className="flex-1 p-6 space-y-6">
                            {[
                                { name: 'Rahul M.', dept: 'CSE', company: 'Microsoft', lpa: '42.5 LPA', time: '2m ago' },
                                { name: 'Ananya S.', dept: 'IT', company: 'Google', lpa: '38.0 LPA', time: '15m ago' },
                                { name: 'Priya K.', dept: 'ECE', company: 'Adobe', lpa: '24.2 LPA', time: '1h ago' },
                            ].map(item => (
                                <div key={item.name} className="flex gap-4 relative">
                                    <div className="relative z-10 flex-shrink-0 size-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                                        {item.name.split(' ').map(w => w[0]).join('')}
                                    </div>
                                    <div className="flex-1 border-b border-slate-100 dark:border-slate-800 pb-4">
                                        <div className="flex justify-between items-start mb-1">
                                            <p className="text-sm font-bold">{item.name} <span className="font-normal text-slate-500">({item.dept})</span></p>
                                            <span className="text-[10px] font-bold text-slate-400">{item.time}</span>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Placed in <span className="font-semibold text-slate-900 dark:text-slate-100">{item.company}</span></p>
                                        <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold rounded">
                                            <span className="material-symbols-outlined text-xs">verified</span> {item.lpa}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* Drive Announcement */}
                            <div className="flex gap-4 relative">
                                <div className="relative z-10 flex-shrink-0 size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                    <span className="material-symbols-outlined">campaign</span>
                                </div>
                                <div className="flex-1 pb-4">
                                    <div className="flex justify-between items-start mb-1">
                                        <p className="text-sm font-bold text-primary tracking-tight uppercase">Drive Alert</p>
                                        <span className="text-[10px] font-bold text-slate-400">3h ago</span>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-snug">New recruitment drive by <span className="font-semibold text-slate-900 dark:text-slate-100">Atlassian</span> scheduled for Oct 22nd.</p>
                                    <button className="mt-3 text-xs font-bold text-primary hover:underline">View Schedule →</button>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-slate-200 dark:border-slate-800 text-center">
                            <button className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">View All Activities</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Summary Table */}
            <div className="mt-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <h4 className="text-lg font-bold">Recent Company Visits</h4>
                    <button className="text-sm text-primary font-bold">View Pipeline</button>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            <th className="px-6 py-4">Company</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Total Shortlisted</th>
                            <th className="px-6 py-4">Final Offers</th>
                            <th className="px-6 py-4 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        <tr className="text-sm hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-4 font-semibold">Goldman Sachs</td>
                            <td className="px-6 py-4 text-slate-500">Analyst</td>
                            <td className="px-6 py-4">42 Students</td>
                            <td className="px-6 py-4 font-bold">12</td>
                            <td className="px-6 py-4 text-right">
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded">COMPLETED</span>
                            </td>
                        </tr>
                        <tr className="text-sm hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-4 font-semibold">Amazon</td>
                            <td className="px-6 py-4 text-slate-500">SDE-1</td>
                            <td className="px-6 py-4">124 Students</td>
                            <td className="px-6 py-4 font-bold">-</td>
                            <td className="px-6 py-4 text-right">
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded">IN PROGRESS</span>
                            </td>
                        </tr>
                        <tr className="text-sm hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-4 font-semibold">TCS Ninja</td>
                            <td className="px-6 py-4 text-slate-500">GET</td>
                            <td className="px-6 py-4">412 Students</td>
                            <td className="px-6 py-4 font-bold">86</td>
                            <td className="px-6 py-4 text-right">
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded">COMPLETED</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
