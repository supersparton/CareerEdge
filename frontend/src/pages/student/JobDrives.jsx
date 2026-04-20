import { useState, useMemo, useEffect } from 'react'
import toast from 'react-hot-toast'
import api from '../../api'

export default function JobDrives() {
    const [drives, setDrives] = useState([])
    const [loading, setLoading] = useState(true)
    const [packageRange, setPackageRange] = useState(0)
    const [selectedRoles, setSelectedRoles] = useState([])
    const [locationFilter, setLocationFilter] = useState('All Locations')
    const [sortOrder, setSortOrder] = useState('default')
    const [showSortMenu, setShowSortMenu] = useState(false)
    const [appliedDriveIds, setAppliedDriveIds] = useState(new Set())

    useEffect(() => {
        const fetchDrives = async () => {
            try {
                const [drivesRes, appsRes] = await Promise.all([
                    api.get('/student/drives'),
                    api.get('/student/applications')
                ])
                
                // Fallback mock data if database is empty
                const fetchedDrives = drivesRes.data.length > 0 ? drivesRes.data : [
                    {
                        id: 'm1',
                        role: 'Software Engineer',
                        package: '₹45 LPA',
                        location: 'Bangalore, India',
                        drive_date: '2024-10-25',
                        job_type: 'Full-time',
                        companies: { name: 'Google' }
                    },
                    {
                        id: 'm2',
                        role: 'Data Scientist',
                        package: '₹38 LPA',
                        location: 'Hyderabad, India',
                        drive_date: '2024-11-05',
                        job_type: 'Full-time',
                        companies: { name: 'Meta' }
                    },
                    {
                        id: 'm3',
                        role: 'UX Designer',
                        package: '₹22 LPA',
                        location: 'Remote',
                        drive_date: '2024-10-28',
                        job_type: 'Internship',
                        companies: { name: 'Airbnb' }
                    },
                    {
                        id: 'm4',
                        role: 'Backend Developer',
                        package: '₹28 LPA',
                        location: 'Mumbai, India',
                        drive_date: '2024-11-12',
                        job_type: 'Full-time',
                        companies: { name: 'Netflix' }
                    }
                ]

                const mockApps = JSON.parse(localStorage.getItem('mock_apps') || '[]')
                const allAppliedIds = new Set([
                    ...appsRes.data.map(app => app.drive_id),
                    ...mockApps.map(app => app.drive_id)
                ])

                setDrives(fetchedDrives)
                setAppliedDriveIds(allAppliedIds)
            } catch (err) {
                console.error('Error fetching drives:', err)
                toast.error('Failed to load placement drives')
            } finally {
                setLoading(false)
            }
        }
        fetchDrives()
    }, [])

    const handleRoleToggle = (role) => {
        setSelectedRoles(prev => {
            if (prev.includes(role)) {
                return prev.filter(r => r !== role)
            } else {
                return [...prev, role]
            }
        })
    }

    const handleApply = async (driveId, companyName) => {
        // Handle Mock Drives
        if (typeof driveId === 'string' && driveId.startsWith('m')) {
            const drive = drives.find(d => d.id === driveId)
            const mockApp = {
                id: `app_${Date.now()}`,
                drive_id: driveId,
                applied_date: new Date().toISOString(),
                status: 'Applied',
                stage: 'Resume Screen',
                drives: drive // Match the structure expected by Dashboard
            }
            
            const existing = JSON.parse(localStorage.getItem('mock_apps') || '[]')
            localStorage.setItem('mock_apps', JSON.stringify([mockApp, ...existing]))
            
            setAppliedDriveIds(prev => new Set([...prev, driveId]))
            toast.success(`Applied to ${companyName}! (Mock)`, { icon: '🎉' })
            return
        }

        // Real API call for actual drives
        try {
            await api.post('/student/apply', { driveId })
            setAppliedDriveIds(prev => new Set([...prev, driveId]))
            toast.success(`Applied to ${companyName}!`, { icon: '🎉' })
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to apply')
        }
    }

    const roleTypes = useMemo(() => {
        const roles = new Set(drives.map(d => d.role))
        return Array.from(roles)
    }, [drives])

    const filteredDrives = useMemo(() => {
        let result = [...drives]

        // Filter by role type
        if (selectedRoles.length > 0) {
            result = result.filter(d => selectedRoles.includes(d.role))
        }

        // Filter by package range (parsing something like "₹45 LPA")
        if (packageRange > 0) {
            result = result.filter(d => {
                const val = parseInt(d.package?.replace(/[^0-9]/g, '') || '0')
                return val >= packageRange
            })
        }

        // Filter by location
        if (locationFilter === 'Remote Only') {
            result = result.filter(d => d.location?.toLowerCase().includes('remote'))
        } else if (locationFilter === 'On-site') {
            result = result.filter(d => !d.location?.toLowerCase().includes('remote'))
        }

        // Sort
        if (sortOrder === 'package-high') {
            result.sort((a, b) => parseInt(b.package?.replace(/[^0-9]/g, '') || '0') - parseInt(a.package?.replace(/[^0-9]/g, '') || '0'))
        } else if (sortOrder === 'package-low') {
            result.sort((a, b) => parseInt(a.package?.replace(/[^0-9]/g, '') || '0') - parseInt(b.package?.replace(/[^0-9]/g, '') || '0'))
        }

        return result
    }, [drives, selectedRoles, packageRange, locationFilter, sortOrder])

    const getDriveStatus = (drive) => {
        if (appliedDriveIds.has(drive.id)) return 'applied'
        return 'eligible'
    }

    if (loading) return <div className="p-8 text-center text-slate-500">Loading placement drives...</div>

    return (
        <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className="w-64 shrink-0 hidden lg:block sticky top-24 self-start space-y-8">
                <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Job Filters</h3>
                    {/* Role Filter */}
                    <div className="mb-6">
                        <label className="text-xs font-semibold text-slate-500 uppercase mb-3 block">Role Type</label>
                        <div className="space-y-2">
                            {roleTypes.map(role => (
                                <label key={role} className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        checked={selectedRoles.includes(role)}
                                        onChange={() => handleRoleToggle(role)}
                                        className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox"
                                    />
                                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary">{role}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    {/* Package Range */}
                    <div className="mb-6">
                        <label className="text-xs font-semibold text-slate-500 uppercase mb-3 block">Package (LPA)</label>
                        <input
                            className="w-full accent-primary h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                            max="50" min="0" type="range" value={packageRange}
                            onChange={e => setPackageRange(Number(e.target.value))}
                        />
                        <div className="flex justify-between mt-2">
                            <span className="text-xs font-medium text-slate-500">0 LPA</span>
                            <span className="text-xs font-bold text-primary">{packageRange}+ LPA</span>
                            <span className="text-xs font-medium text-slate-500">50 LPA</span>
                        </div>
                    </div>
                    {/* Location Filter */}
                    <div className="mb-6">
                        <label className="text-xs font-semibold text-slate-500 uppercase mb-3 block">Location</label>
                        <div className="space-y-2">
                            {['All Locations', 'Remote Only', 'On-site'].map(loc => (
                                <label key={loc} className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        checked={locationFilter === loc}
                                        onChange={() => setLocationFilter(loc)}
                                        className="border-slate-300 text-primary focus:ring-primary" name="loc" type="radio"
                                    />
                                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary">{loc}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <section className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Active Placement Drives</h2>
                        <p className="text-slate-500 text-sm mt-1">{filteredDrives.length} Job roles matching your preferences</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative">
                            <button
                                onClick={() => setShowSortMenu(!showSortMenu)}
                                className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-50 transition-colors"
                            >
                                <span className="material-symbols-outlined !text-lg">sort</span>
                                Sort {sortOrder !== 'default' && '•'}
                            </button>
                            {showSortMenu && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-20 overflow-hidden">
                                    {[
                                        { value: 'default', label: 'Default' },
                                        { value: 'package-high', label: 'Package: High → Low' },
                                        { value: 'package-low', label: 'Package: Low → High' },
                                    ].map(opt => (
                                        <button
                                            key={opt.value}
                                            onClick={() => { setSortOrder(opt.value); setShowSortMenu(false) }}
                                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${sortOrder === opt.value ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Job Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredDrives.length === 0 ? (
                        <div className="col-span-2 text-center py-16">
                            <span className="material-symbols-outlined text-5xl text-slate-300 mb-4 block">search_off</span>
                            <h3 className="text-lg font-bold text-slate-400">No drives match your filters</h3>
                        </div>
                    ) : filteredDrives.map((drive) => {
                        const status = getDriveStatus(drive)
                        return (
                            <div key={drive.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300 relative">
                                <div className="p-6 flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-3 border border-slate-100 dark:border-slate-700">
                                            <span className="material-symbols-outlined text-primary !text-3xl">apartment</span>
                                        </div>
                                        <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded tracking-wide">{drive.job_type}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{drive.role}</h3>
                                    <p className="text-slate-500 text-sm font-medium mb-4">{drive.companies?.name}</p>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                            <span className="material-symbols-outlined !text-lg opacity-70">payments</span>
                                            <span className="text-sm">{drive.package}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                            <span className="material-symbols-outlined !text-lg opacity-70">location_on</span>
                                            <span className="text-sm">{drive.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                            <span className="material-symbols-outlined !text-lg opacity-70">event</span>
                                            <span className="text-sm">{new Date(drive.drive_date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    {status === 'applied' ? (
                                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50">
                                            <button className="w-full py-2.5 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 rounded-lg font-bold text-sm cursor-default flex items-center justify-center gap-2">
                                                <span className="material-symbols-outlined !text-lg">check</span> Applied ✓
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50">
                                            <button
                                                onClick={() => handleApply(drive.id, drive.companies?.name)}
                                                className="w-full py-2.5 bg-primary text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-primary/20"
                                            >
                                                One-Click Apply
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Pagination */}
                <div className="mt-12 py-6 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-500">Showing {filteredDrives.length} of {drives.length} active recruitment drives</p>
                    <div className="flex gap-2">
                        <button className="p-2 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800">
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button className="px-4 py-2 bg-primary text-white rounded font-medium text-sm">1</button>
                        <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800">2</button>
                        <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800">3</button>
                        <button className="p-2 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
