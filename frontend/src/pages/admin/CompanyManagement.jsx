import { useState, useMemo } from 'react'
import toast from 'react-hot-toast'

const initialCompanies = [
    { initials: 'G', bgClass: 'bg-blue-100 text-blue-600', name: 'Google', location: 'Mountain View, CA', industry: 'Technology', packageRange: '₹35-56 LPA', drives: '8', hired: '45', status: 'Verified', pending: false },
    { initials: 'GS', bgClass: 'bg-gradient-to-br from-blue-500 to-purple-600 text-white', name: 'Goldman Sachs', location: 'New York, USA', industry: 'Finance', packageRange: '₹22-30 LPA', drives: '5', hired: '32', status: 'Verified', pending: false },
    { initials: 'MS', bgClass: 'bg-blue-600 text-white', name: 'Microsoft', location: 'Redmond, WA', industry: 'Technology', packageRange: '₹38-50 LPA', drives: '-', hired: '-', status: 'Pending', pending: true },
    { initials: 'A', bgClass: 'bg-orange-500 text-white', name: 'Amazon', location: 'Seattle, WA', industry: 'Technology', packageRange: '₹28-45 LPA', drives: '6', hired: '38', status: 'Verified', pending: false },
    { initials: 'O', bgClass: 'bg-red-100 text-red-600', name: 'Oracle', location: 'Austin, TX', industry: 'Technology', packageRange: '₹18-28 LPA', drives: '4', hired: '24', status: 'Verified', pending: false },
    { initials: 'TCS', bgClass: 'bg-blue-800 text-white text-sm', name: 'TCS', location: 'Mumbai, India', industry: 'IT Services', packageRange: '₹7-12 LPA', drives: '3', hired: '89', status: 'Verified', pending: false },
]

const bgOptions = [
    'bg-emerald-500 text-white', 'bg-violet-500 text-white', 'bg-rose-500 text-white',
    'bg-cyan-500 text-white', 'bg-amber-500 text-white', 'bg-indigo-500 text-white',
]

export default function CompanyManagement() {
    const [companies, setCompanies] = useState(initialCompanies)
    const [showAddModal, setShowAddModal] = useState(false)
    const [newCompany, setNewCompany] = useState({ name: '', location: '', industry: 'Technology', packageMin: '', packageMax: '', contactEmail: '' })

    // ─── Filter State ─────────────────────────────────────
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('All Status')
    const [industryFilter, setIndustryFilter] = useState('All Industries')
    const [packageFilter, setPackageFilter] = useState('All Package Ranges')
    const [sortField, setSortField] = useState(null)
    const [sortDir, setSortDir] = useState('asc')

    // ─── Parse min package from string like '₹35-56 LPA' ──
    const parseMinPkg = (pkgStr) => {
        const match = pkgStr.match(/(\d+)/)
        return match ? parseInt(match[1]) : 0
    }

    // ─── Filtered + Sorted Data ───────────────────────────
    const filtered = useMemo(() => {
        let result = companies.filter(c => {
            const matchSearch = !searchQuery ||
                c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.industry.toLowerCase().includes(searchQuery.toLowerCase())
            const matchStatus = statusFilter === 'All Status' || c.status === statusFilter
            const matchIndustry = industryFilter === 'All Industries' || c.industry === industryFilter
            let matchPackage = true
            if (packageFilter === 'Above 20 LPA') matchPackage = parseMinPkg(c.packageRange) >= 20
            else if (packageFilter === '10-20 LPA') { const m = parseMinPkg(c.packageRange); matchPackage = m >= 10 && m < 20 }
            else if (packageFilter === '5-10 LPA') { const m = parseMinPkg(c.packageRange); matchPackage = m >= 5 && m < 10 }
            else if (packageFilter === 'Below 5 LPA') matchPackage = parseMinPkg(c.packageRange) < 5
            return matchSearch && matchStatus && matchIndustry && matchPackage
        })
        if (sortField) {
            result = [...result].sort((a, b) => {
                let av = a[sortField], bv = b[sortField]
                if (sortField === 'hired' || sortField === 'drives') {
                    av = av === '-' ? -1 : parseInt(av)
                    bv = bv === '-' ? -1 : parseInt(bv)
                }
                if (typeof av === 'string') av = av.toLowerCase()
                if (typeof bv === 'string') bv = bv.toLowerCase()
                if (av < bv) return sortDir === 'asc' ? -1 : 1
                if (av > bv) return sortDir === 'asc' ? 1 : -1
                return 0
            })
        }
        return result
    }, [companies, searchQuery, statusFilter, industryFilter, packageFilter, sortField, sortDir])

    const handleSort = (field) => {
        if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
        else { setSortField(field); setSortDir('asc') }
    }

    const hasActiveFilters = searchQuery || statusFilter !== 'All Status' || industryFilter !== 'All Industries' || packageFilter !== 'All Package Ranges'
    const clearAllFilters = () => { setSearchQuery(''); setStatusFilter('All Status'); setIndustryFilter('All Industries'); setPackageFilter('All Package Ranges') }

    const handleExport = () => {
        const data = filtered.length > 0 ? filtered : companies
        const csv = `Company,Location,Industry,Package Range,Drives,Hired,Status\n` +
            data.map(c => `${c.name},${c.location},${c.industry},${c.packageRange},${c.drives},${c.hired},${c.status}`).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url; a.download = 'companies_export.csv'; a.click()
        URL.revokeObjectURL(url)
        toast.success(`Exported ${data.length} companies!`, { icon: '📊' })
    }

    const handleAddCompany = (e) => {
        e.preventDefault()
        if (!newCompany.name || !newCompany.location) {
            toast.error('Please fill all required fields')
            return
        }
        const initials = newCompany.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 3)
        const randomBg = bgOptions[Math.floor(Math.random() * bgOptions.length)]
        const pkgRange = newCompany.packageMin && newCompany.packageMax
            ? `₹${newCompany.packageMin}-${newCompany.packageMax} LPA`
            : 'TBD'

        const company = {
            initials,
            bgClass: randomBg,
            name: newCompany.name,
            location: newCompany.location,
            industry: newCompany.industry,
            packageRange: pkgRange,
            drives: '-',
            hired: '-',
            status: 'Pending',
            pending: true,
        }
        setCompanies(prev => [company, ...prev])
        setNewCompany({ name: '', location: '', industry: 'Technology', packageMin: '', packageMax: '', contactEmail: '' })
        setShowAddModal(false)
        toast.success(`${newCompany.name} added successfully!`)
    }

    const handleApprove = (companyName) => {
        setCompanies(prev => prev.map(c =>
            c.name === companyName ? { ...c, status: 'Verified', pending: false } : c
        ))
        toast.success(`${companyName} approved!`, { icon: '✅' })
    }

    const handleReject = (companyName) => {
        setCompanies(prev => prev.filter(c => c.name !== companyName))
        toast(`${companyName} rejected`, { icon: '❌' })
    }

    return (
        <>
            {/* Add Company Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowAddModal(false)}>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg border border-slate-200 dark:border-slate-700 overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="p-6 bg-gradient-to-r from-primary to-indigo-600 text-white flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold">Add New Company</h3>
                                <p className="text-indigo-100 text-sm">Register a new recruitment partner</p>
                            </div>
                            <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleAddCompany} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Company Name *</label>
                                    <input type="text" placeholder="e.g. Infosys" required
                                        value={newCompany.name} onChange={e => setNewCompany({ ...newCompany, name: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Location *</label>
                                    <input type="text" placeholder="e.g. Pune, India" required
                                        value={newCompany.location} onChange={e => setNewCompany({ ...newCompany, location: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Industry</label>
                                <select value={newCompany.industry} onChange={e => setNewCompany({ ...newCompany, industry: e.target.value })}
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20">
                                    <option>Technology</option><option>Finance</option><option>Consulting</option><option>Manufacturing</option><option>IT Services</option><option>Healthcare</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Min Package (LPA)</label>
                                    <input type="number" placeholder="e.g. 10" min="0"
                                        value={newCompany.packageMin} onChange={e => setNewCompany({ ...newCompany, packageMin: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Max Package (LPA)</label>
                                    <input type="number" placeholder="e.g. 25" min="0"
                                        value={newCompany.packageMax} onChange={e => setNewCompany({ ...newCompany, packageMax: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">Contact Email</label>
                                <input type="email" placeholder="e.g. hr@company.com"
                                    value={newCompany.contactEmail} onChange={e => setNewCompany({ ...newCompany, contactEmail: e.target.value })}
                                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm shadow-primary/20">
                                    Add Company
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[
                    { icon: 'apartment', iconBg: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600', value: companies.length.toString(), label: 'Total Companies' },
                    { icon: 'verified', iconBg: 'bg-green-50 dark:bg-green-900/20 text-green-600', value: companies.filter(c => !c.pending).length.toString(), label: 'Verified Partners' },
                    { icon: 'pending', iconBg: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600', value: companies.filter(c => c.pending).length.toString(), label: 'Pending Approval' },
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
                            <input
                                type="text"
                                placeholder="Search companies by name, industry..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </div>
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 cursor-pointer">
                        <option>All Status</option><option>Verified</option><option>Pending</option>
                    </select>
                    <select value={industryFilter} onChange={e => setIndustryFilter(e.target.value)} className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 cursor-pointer">
                        <option>All Industries</option><option>Technology</option><option>Finance</option><option>Consulting</option><option>Manufacturing</option><option>IT Services</option><option>Healthcare</option>
                    </select>
                    <select value={packageFilter} onChange={e => setPackageFilter(e.target.value)} className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 cursor-pointer">
                        <option>All Package Ranges</option><option>Above 20 LPA</option><option>10-20 LPA</option><option>5-10 LPA</option><option>Below 5 LPA</option>
                    </select>
                    {hasActiveFilters && (
                        <button onClick={clearAllFilters} className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 transition-colors">
                            <span className="material-symbols-outlined text-sm">close</span>Clear
                        </button>
                    )}
                    <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-blue-700 flex items-center gap-2 transition-colors shadow-sm shadow-primary/20">
                        <span className="material-symbols-outlined text-lg">add</span>
                        Add Company
                    </button>
                </div>
                {hasActiveFilters && (
                    <p className="text-xs text-slate-500 mt-2">Showing <span className="font-bold text-slate-900 dark:text-white">{filtered.length}</span> of {companies.length} companies</p>
                )}
            </div>

            {/* Pending Approvals Banner */}
            {companies.some(c => c.pending) && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-amber-600">pending_actions</span>
                        <div>
                            <p className="font-bold text-amber-800 dark:text-amber-300">{companies.filter(c => c.pending).length} Companies Awaiting Approval</p>
                            <p className="text-sm text-amber-600 dark:text-amber-400">{companies.filter(c => c.pending).map(c => c.name).join(', ')} have requested to register</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-amber-600 text-white text-sm font-bold rounded-lg hover:bg-amber-700">Review Now</button>
                </div>
            )}

            {/* Companies Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                            <th onClick={() => handleSort('name')} className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-primary transition-colors">
                                <span className="flex items-center gap-1">Company {sortField === 'name' && <span className="material-symbols-outlined text-xs">{sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward'}</span>}</span>
                            </th>
                            <th onClick={() => handleSort('industry')} className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-primary transition-colors">
                                <span className="flex items-center gap-1">Industry {sortField === 'industry' && <span className="material-symbols-outlined text-xs">{sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward'}</span>}</span>
                            </th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Package Range</th>
                            <th onClick={() => handleSort('drives')} className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-primary transition-colors">
                                <span className="flex items-center gap-1">Drives {sortField === 'drives' && <span className="material-symbols-outlined text-xs">{sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward'}</span>}</span>
                            </th>
                            <th onClick={() => handleSort('hired')} className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-primary transition-colors">
                                <span className="flex items-center gap-1">Hired {sortField === 'hired' && <span className="material-symbols-outlined text-xs">{sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward'}</span>}</span>
                            </th>
                            <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {filtered.length > 0 ? filtered.map(c => (
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
                                            <button onClick={() => handleApprove(c.name)} className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700 transition-colors">Approve</button>
                                            <button onClick={() => handleReject(c.name)} className="px-3 py-1 border border-red-300 text-red-600 text-xs font-bold rounded hover:bg-red-50 transition-colors">Reject</button>
                                        </div>
                                    ) : (
                                        <button className="size-8 inline-flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </button>
                                    )}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={7} className="py-16 text-center">
                                    <span className="material-symbols-outlined text-5xl text-slate-300 mb-3 block">search_off</span>
                                    <p className="text-slate-500 font-semibold text-lg">No companies found</p>
                                    <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filter criteria</p>
                                    <button onClick={clearAllFilters} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                                        Clear All Filters
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <p className="text-sm text-slate-500">Showing <span className="font-bold text-slate-900 dark:text-white">{filtered.length}</span> of {companies.length} companies</p>
                    <button onClick={handleExport} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                        <span className="material-symbols-outlined text-sm">download</span>
                        Export CSV
                    </button>
                </div>
            </div>
        </>
    )
}
