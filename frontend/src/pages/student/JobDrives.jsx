import { useState } from 'react'

const drives = [
    {
        icon: 'token', iconColor: 'text-primary', category: 'Tech', categoryBg: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
        title: 'Software Engineer', company: 'Goldman Sachs', package: '22.0 - 26.5 LPA', location: 'Bengaluru, KA', deadline: 'Deadline: Oct 24, 2023',
        eligible: true, status: 'eligible', isNew: false
    },
    {
        icon: 'auto_awesome', iconColor: 'text-red-500', category: 'Design', categoryBg: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
        title: 'Senior UX Designer', company: 'Adobe Systems', package: '18.0 - 20.0 LPA', location: 'Noida, UP', deadline: 'Deadline: Oct 18, 2023',
        eligible: false, status: 'not-eligible', isNew: false
    },
    {
        icon: 'database', iconColor: 'text-slate-900 dark:text-white', category: 'Big Data', categoryBg: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
        title: 'Data Scientist I', company: 'Google India', package: '32.0 - 45.0 LPA', location: 'Remote / Hyderabad', deadline: null,
        eligible: true, status: 'applied', appliedDate: 'Applied on Oct 12', isNew: false
    },
    {
        icon: 'terminal', iconColor: 'text-blue-500', category: 'Product', categoryBg: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
        title: 'Product Manager Intern', company: 'Microsoft', package: '1.5 Lacs / Month', location: 'Hyderabad, TS', deadline: 'Deadline: Nov 02, 2023',
        eligible: true, status: 'eligible', isNew: true
    },
]

export default function JobDrives() {
    const [packageRange, setPackageRange] = useState(10)

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
                            {['Software Engineer', 'Data Analyst', 'Product Design', 'Business Analyst'].map((role, i) => (
                                <label key={role} className="flex items-center gap-2 cursor-pointer group">
                                    <input defaultChecked={i === 0} className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
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
                            onChange={e => setPackageRange(e.target.value)}
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
                            {['All Locations', 'Remote Only', 'On-site'].map((loc, i) => (
                                <label key={loc} className="flex items-center gap-2 cursor-pointer group">
                                    <input defaultChecked={i === 0} className="border-slate-300 text-primary focus:ring-primary" name="loc" type="radio" />
                                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary">{loc}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <p className="text-xs font-semibold text-primary uppercase mb-1">Upcoming Milestone</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-snug">Google Pre-Placement Talk starts in 2 hours.</p>
                    <button className="mt-3 text-xs font-bold text-primary hover:underline">Set Reminder</button>
                </div>
            </aside>

            {/* Main Content */}
            <section className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Active Placement Drives</h2>
                        <p className="text-slate-500 text-sm mt-1">24 Job roles matching your preferences for Batch 2024</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-50 transition-colors">
                            <span className="material-symbols-outlined !text-lg">sort</span> Sort
                        </button>
                        <button className="lg:hidden px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-50 transition-colors">
                            <span className="material-symbols-outlined !text-lg">filter_list</span> Filters
                        </button>
                    </div>
                </div>

                {/* Job Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {drives.map((drive, i) => (
                        <div key={i} className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300 relative ${drive.status === 'not-eligible' ? 'opacity-90' : ''}`}>
                            {drive.isNew && (
                                <div className="absolute top-3 right-3">
                                    <div className="px-2 py-0.5 bg-primary text-white text-[10px] font-bold rounded-full animate-pulse">NEW</div>
                                </div>
                            )}
                            <div className="p-6 flex-1">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700">
                                        <span className={`material-symbols-outlined ${drive.iconColor} !text-3xl`}>{drive.icon}</span>
                                    </div>
                                    <span className={`px-2 py-1 ${drive.categoryBg} text-[10px] font-bold uppercase rounded tracking-wide`}>{drive.category}</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{drive.title}</h3>
                                <p className="text-slate-500 text-sm font-medium mb-4">{drive.company}</p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                        <span className="material-symbols-outlined !text-lg opacity-70">payments</span>
                                        <span className="text-sm">{drive.package}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                        <span className="material-symbols-outlined !text-lg opacity-70">location_on</span>
                                        <span className="text-sm">{drive.location}</span>
                                    </div>
                                    {drive.deadline ? (
                                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                            <span className="material-symbols-outlined !text-lg opacity-70">event</span>
                                            <span className="text-sm">{drive.deadline}</span>
                                        </div>
                                    ) : drive.appliedDate ? (
                                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                                            <span className="material-symbols-outlined !text-lg">done_all</span>
                                            <span className="text-sm">{drive.appliedDate}</span>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="mt-auto">
                                {drive.status === 'eligible' && (
                                    <>
                                        <div className="px-6 py-2 bg-emerald-50 dark:bg-emerald-900/10 border-t border-emerald-100 dark:border-emerald-900/30">
                                            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                                <span className="material-symbols-outlined !text-sm">check_circle</span> You are Eligible
                                            </p>
                                        </div>
                                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50">
                                            <button className="w-full py-2.5 bg-primary text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-primary/20">
                                                One-Click Apply
                                            </button>
                                        </div>
                                    </>
                                )}
                                {drive.status === 'not-eligible' && (
                                    <>
                                        <div className="px-6 py-2 bg-red-50 dark:bg-red-900/10 border-t border-red-100 dark:border-red-900/30">
                                            <p className="text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1">
                                                <span className="material-symbols-outlined !text-sm">error</span> Not Eligible: CPI &lt; 8.0
                                            </p>
                                        </div>
                                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50">
                                            <button className="w-full py-2.5 bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 rounded-lg font-bold text-sm cursor-not-allowed" disabled>
                                                Application Closed
                                            </button>
                                        </div>
                                    </>
                                )}
                                {drive.status === 'applied' && (
                                    <>
                                        <div className="px-6 py-2 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                                            <p className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                                                <span className="material-symbols-outlined !text-sm">history</span> Application Submitted
                                            </p>
                                        </div>
                                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50">
                                            <button className="w-full py-2.5 border-2 border-primary text-primary dark:text-blue-400 rounded-lg font-bold text-sm hover:bg-primary hover:text-white transition-all">
                                                Track Status
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-12 py-6 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-500">Showing 4 of 24 active recruitment drives</p>
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
