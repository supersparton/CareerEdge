import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

// ─── Mock Student Data ────────────────────────────────────
const allStudents = [
    { id: 1, name: 'Rahul Sharma', dept: 'Computer Science', status: 'placed', company: 'Goldman Sachs', package: 42.5 },
    { id: 2, name: 'Priya Patel', dept: 'Computer Science', status: 'placed', company: 'Google', package: 56 },
    { id: 3, name: 'Aman Gupta', dept: 'Computer Science', status: 'placed', company: 'Microsoft', package: 38 },
    { id: 4, name: 'Sneha Reddy', dept: 'Computer Science', status: 'unplaced', company: null, package: 0 },
    { id: 5, name: 'Arjun Singh', dept: 'Computer Science', status: 'placed', company: 'Amazon', package: 32 },
    { id: 6, name: 'Neha Joshi', dept: 'Information Technology', status: 'placed', company: 'Adobe', package: 24 },
    { id: 7, name: 'Vikram Mehta', dept: 'Information Technology', status: 'placed', company: 'Flipkart', package: 18 },
    { id: 8, name: 'Riya Agarwal', dept: 'Information Technology', status: 'unplaced', company: null, package: 0 },
    { id: 9, name: 'Karan Desai', dept: 'Information Technology', status: 'placed', company: 'TCS', package: 7 },
    { id: 10, name: 'Ananya Nair', dept: 'Electronics', status: 'placed', company: 'Qualcomm', package: 22 },
    { id: 11, name: 'Rohan Kumar', dept: 'Electronics', status: 'unplaced', company: null, package: 0 },
    { id: 12, name: 'Divya Sharma', dept: 'Electronics', status: 'placed', company: 'Intel', package: 20 },
    { id: 13, name: 'Manish Yadav', dept: 'Mechanical', status: 'placed', company: 'Tata Motors', package: 8 },
    { id: 14, name: 'Pooja Mishra', dept: 'Mechanical', status: 'unplaced', company: null, package: 0 },
    { id: 15, name: 'Aditya Verma', dept: 'Mechanical', status: 'placed', company: 'L&T', package: 6 },
    { id: 16, name: 'Simran Kaur', dept: 'MBA', status: 'placed', company: 'McKinsey', package: 28 },
    { id: 17, name: 'Harsh Pandey', dept: 'MBA', status: 'placed', company: 'Deloitte', package: 15 },
    { id: 18, name: 'Meera Iyer', dept: 'MBA', status: 'unplaced', company: null, package: 0 },
]

const departments = ['All Departments', 'Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'MBA']

const handleExportData = (filteredStudents) => {
    const csv = `Name,Department,Status,Company,Package (LPA)\n` +
        filteredStudents.map(s => `${s.name},${s.dept},${s.status},${s.company || 'N/A'},${s.package || 'N/A'}`).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'placement_data_export.csv'; a.click()
    URL.revokeObjectURL(url)
    toast.success('Data exported successfully!', { icon: '📊' })
}

export default function AdminDashboard() {
    const navigate = useNavigate()
    const [statusFilter, setStatusFilter] = useState('all')
    const [deptFilter, setDeptFilter] = useState('All Departments')
    const [searchQuery, setSearchQuery] = useState('')
    // ─── Filtered Data ────────────────────────────────────
    const filtered = useMemo(() => {
        return allStudents.filter(s => {
            const matchStatus = statusFilter === 'all' || s.status === statusFilter
            const matchDept = deptFilter === 'All Departments' || s.dept === deptFilter
            const matchSearch = !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.dept.toLowerCase().includes(searchQuery.toLowerCase()) || (s.company && s.company.toLowerCase().includes(searchQuery.toLowerCase()))
            return matchStatus && matchDept && matchSearch
        })
    }, [statusFilter, deptFilter, searchQuery])

    // ─── Computed Stats ───────────────────────────────────
    const stats = useMemo(() => {
        const total = filtered.length
        const placed = filtered.filter(s => s.status === 'placed').length
        const pending = total - placed
        const pct = total ? Math.round((placed / total) * 100) : 0
        const avgPkg = placed ? (filtered.filter(s => s.status === 'placed').reduce((sum, s) => sum + s.package, 0) / placed).toFixed(1) : 0
        return { total, placed, pending, pct, avgPkg }
    }, [filtered])

    // ─── Department Progress ──────────────────────────────
    const deptProgress = useMemo(() => {
        const depts = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'MBA']
        return depts.map(dept => {
            const deptStudents = allStudents.filter(s => s.dept === dept)
            const deptPlaced = deptStudents.filter(s => s.status === 'placed').length
            const pct = deptStudents.length ? Math.round((deptPlaced / deptStudents.length) * 100) : 0
            return { dept, pct, placed: deptPlaced, total: deptStudents.length, color: pct >= 70 ? 'bg-green-500' : 'bg-amber-500', textColor: pct >= 70 ? 'text-green-600' : 'text-amber-600' }
        })
    }, [])

    return (
        <>
            {/* Welcome Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white shadow-xl mb-8">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black tracking-tight">Good Morning, Coordinator!</h2>
                        <p className="text-indigo-100 text-lg">Placement season is going well. {stats.pct}% students placed so far.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link to="/admin/analytics" className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold text-sm hover:bg-opacity-90 transition-all shadow-lg">
                            View Analytics
                        </Link>
                    </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {/* ─── Filter Bar ────────────────────────────────── */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 mb-6">
                <div className="flex flex-wrap items-center gap-4">
                    {/* Search */}
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <input
                                type="text"
                                placeholder="Search students, companies..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>
                    </div>
                    {/* Status Filter */}
                    <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                        {[
                            { value: 'all', label: 'All', icon: 'group' },
                            { value: 'placed', label: 'Placed', icon: 'how_to_reg' },
                            { value: 'unplaced', label: 'Unplaced', icon: 'pending' },
                        ].map(f => (
                            <button
                                key={f.value}
                                onClick={() => setStatusFilter(f.value)}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-semibold transition-all ${statusFilter === f.value
                                    ? 'bg-white dark:bg-slate-700 text-primary shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-base">{f.icon}</span>
                                {f.label}
                            </button>
                        ))}
                    </div>
                    {/* Department Filter */}
                    <select
                        value={deptFilter}
                        onChange={e => setDeptFilter(e.target.value)}
                        className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20 cursor-pointer"
                    >
                        {departments.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    {/* Reset */}
                    {(statusFilter !== 'all' || deptFilter !== 'All Departments' || searchQuery) && (
                        <button
                            onClick={() => { setStatusFilter('all'); setDeptFilter('All Departments'); setSearchQuery('') }}
                            className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm">close</span>
                            Clear Filters
                        </button>
                    )}
                </div>
            </div>

            {/* Overview KPIs (reactive + clickable) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {[
                    { icon: 'group', iconBg: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600', label: 'Total Students', value: stats.total.toLocaleString(), onClick: () => navigate('/admin/students') },
                    { icon: 'how_to_reg', iconBg: 'bg-green-50 dark:bg-green-900/20 text-green-600', label: 'Placed', value: stats.placed.toLocaleString(), badge: `${stats.pct}%`, badgeColor: 'text-green-500', onClick: () => navigate('/admin/students?status=Placed') },
                    { icon: 'pending', iconBg: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600', label: 'Pending', value: stats.pending.toLocaleString(), onClick: () => navigate('/admin/students?status=Unplaced') },
                    { icon: 'apartment', iconBg: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600', label: 'Companies', value: '64', onClick: () => navigate('/admin/companies') },
                    { icon: 'currency_rupee', iconBg: 'bg-indigo-50 dark:bg-indigo-900/20 text-primary', label: 'Avg. Package', value: `₹${stats.avgPkg}L` },
                ].map(stat => (
                    <div
                        key={stat.label}
                        onClick={stat.onClick}
                        className={`bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all ${stat.onClick ? 'cursor-pointer hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5 active:scale-[0.98]' : ''
                            }`}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className={`p-2 ${stat.iconBg} rounded-lg`}>
                                <span className="material-symbols-outlined">{stat.icon}</span>
                            </span>
                            {stat.badge && <span className={`${stat.badgeColor} text-xs font-bold`}>{stat.badge}</span>}
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                        <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                        {stat.onClick && <p className="text-[10px] text-primary font-semibold mt-2 flex items-center gap-0.5"><span className="material-symbols-outlined text-xs">open_in_new</span>Click to view</p>}
                    </div>
                ))}
            </div>

            {/* Filtered Student List (shown when filter is active) */}
            {(statusFilter !== 'all' || deptFilter !== 'All Departments' || searchQuery) && (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8 overflow-hidden">
                    <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <h4 className="text-lg font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">filter_list</span>
                            Filtered Results
                            <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full">{filtered.length} students</span>
                        </h4>
                        <button onClick={() => handleExportData(filtered)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                            <span className="material-symbols-outlined text-sm">download</span>
                            Export
                        </button>
                    </div>
                    {filtered.length > 0 ? (
                        <table className="w-full">
                            <thead className="bg-slate-50 dark:bg-slate-800">
                                <tr>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Package</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {filtered.map(s => (
                                    <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                                                    {s.name.split(' ').map(w => w[0]).join('')}
                                                </div>
                                                <span className="font-medium text-sm">{s.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 text-sm text-slate-600 dark:text-slate-400">{s.dept}</td>
                                        <td className="px-5 py-3">
                                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${s.status === 'placed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                                }`}>
                                                {s.status === 'placed' ? 'Placed' : 'Unplaced'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-sm font-medium">{s.company || '—'}</td>
                                        <td className="px-5 py-3 text-sm font-bold">{s.package ? `₹${s.package} LPA` : '—'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-12 text-center">
                            <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">search_off</span>
                            <p className="text-slate-500 font-medium">No students match your filter criteria</p>
                            <p className="text-sm text-slate-400">Try adjusting your filters</p>
                        </div>
                    )}
                </div>
            )}

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
                            {deptProgress.map(d => (
                                <button
                                    key={d.dept}
                                    onClick={() => { setDeptFilter(d.dept); setStatusFilter('all'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                                    className={`w-full text-left p-3 rounded-lg transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 ${deptFilter === d.dept ? 'ring-2 ring-primary/30 bg-primary/5' : ''}`}
                                >
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-medium flex items-center gap-2">
                                            {d.dept}
                                            <span className="text-xs text-slate-400 font-normal">({d.placed}/{d.total})</span>
                                        </span>
                                        <span className={`text-sm font-bold ${d.textColor}`}>{d.pct}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className={`h-full ${d.color} rounded-full transition-all duration-500`} style={{ width: `${d.pct}%` }}></div>
                                    </div>
                                </button>
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
                                { icon: 'download', label: 'Export Data', to: '#', onClick: () => handleExportData(filtered) },
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
                            <p className="text-xs text-slate-500 mt-1">Sunday, Feb 23, 2026</p>
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
