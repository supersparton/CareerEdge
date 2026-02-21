export default function StudentList() {
    const students = [
        { id: '2021CS0451', initials: 'AH', bgColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400', name: 'Arjun Hemant', cpi: '8.92', skills: ['React', 'Node.js', '+2'], status: 'Placed', statusColor: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' },
        { id: '2021IT0231', initials: 'SV', bgColor: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400', name: 'Sneha Varma', cpi: '9.45', skills: ['Python', 'AWS', 'Docker'], status: 'Unplaced', statusColor: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' },
        { id: '2021CS0118', initials: 'RK', bgColor: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400', name: 'Rohan Kapoor', cpi: '7.65', skills: ['Java', 'SQL'], status: 'Placed', statusColor: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' },
        { id: '2021EC0892', initials: 'MJ', bgColor: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400', name: 'Meera Joshi', cpi: '8.21', skills: ['Embedded C', 'IoT'], status: 'Unplaced', statusColor: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' },
        { id: '2021CS0340', initials: 'DS', bgColor: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400', name: 'Dev Sharma', cpi: '8.44', skills: ['TypeScript', 'GraphQL', '+1'], status: 'Placed', statusColor: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' },
    ]

    return (
        <>
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Student Master List</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and track 1,240 enrolled students for 2024 placement cycle.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors">
                        <span className="material-symbols-outlined text-lg">upload</span>
                        Bulk Import
                    </button>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-700 flex items-center gap-2 transition-colors shadow-sm shadow-primary/20">
                        <span className="material-symbols-outlined text-lg">add</span>
                        Add New Student
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white dark:bg-slate-900 rounded-t-xl border border-slate-200 dark:border-slate-800 border-b-0 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                        <span className="text-xs font-semibold text-slate-500">12 Selected</span>
                        <button className="ml-2 text-primary hover:underline text-xs font-bold">Clear</button>
                    </div>
                    <div className="h-6 w-px bg-slate-200 dark:bg-slate-800"></div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-medium">Filter by:</span>
                        <button className="px-3 py-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-xs font-medium border border-slate-200 dark:border-slate-700 hover:border-primary transition-colors">Class of 2024</button>
                        <button className="px-3 py-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-xs font-medium border border-slate-200 dark:border-slate-700 hover:border-primary transition-colors">CS/IT</button>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 text-sm font-medium transition-colors">
                        <span className="material-symbols-outlined text-lg">download</span>
                        Export to Excel
                    </button>
                    <button className="px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 text-sm font-medium transition-colors">
                        <span className="material-symbols-outlined text-lg">mail</span>
                        Email Broadcast
                    </button>
                    <button className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg flex items-center gap-1.5 text-sm font-bold transition-all hover:bg-primary/20">
                        <span className="material-symbols-outlined text-lg">verified</span>
                        Verify Profiles
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                            <th className="py-4 px-6 w-10">
                                <input className="rounded border-slate-300 text-primary focus:ring-primary bg-white dark:bg-slate-800 dark:border-slate-700" type="checkbox" />
                            </th>
                            <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Enrollment No</th>
                            <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                            <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">CPI</th>
                            <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Skills</th>
                            <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {students.map(s => (
                            <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                <td className="py-4 px-6">
                                    <input className="rounded border-slate-300 text-primary focus:ring-primary bg-white dark:bg-slate-800 dark:border-slate-700" type="checkbox" />
                                </td>
                                <td className="py-4 px-4 font-mono text-sm text-slate-500 dark:text-slate-400">{s.id}</td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`size-8 rounded-full ${s.bgColor} flex items-center justify-center font-bold text-xs`}>{s.initials}</div>
                                        <span className="font-semibold text-slate-900 dark:text-white">{s.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-4 font-bold text-slate-700 dark:text-slate-300">{s.cpi}</td>
                                <td className="py-4 px-4">
                                    <div className="flex flex-wrap gap-1.5">
                                        {s.skills.map(skill => (
                                            <span key={skill} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold rounded uppercase">{skill}</span>
                                        ))}
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${s.statusColor}`}>{s.status}</span>
                                </td>
                                <td className="py-4 px-4 text-right">
                                    <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-400 transition-colors">
                                        <span className="material-symbols-outlined">more_vert</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-t-0 p-4 rounded-b-xl flex items-center justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400">Showing <span className="font-bold text-slate-900 dark:text-white">1 - 5</span> of <span className="font-bold text-slate-900 dark:text-white">1,240</span> students</span>
                <div className="flex items-center gap-1">
                    <button disabled className="size-8 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50">
                        <span className="material-symbols-outlined text-xl">chevron_left</span>
                    </button>
                    <button className="size-8 flex items-center justify-center bg-primary text-white rounded-lg text-sm font-bold">1</button>
                    <button className="size-8 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium">2</button>
                    <button className="size-8 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium">3</button>
                    <span className="px-1 text-slate-400">...</span>
                    <button className="size-8 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium">248</button>
                    <button className="size-8 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
                        <span className="material-symbols-outlined text-xl">chevron_right</span>
                    </button>
                </div>
            </div>
        </>
    )
}
