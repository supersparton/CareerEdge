import { companyProfileData } from '../../data/mockData'

export default function CompanyProfile() {
    const company = companyProfileData

    return (
        <div>
            {/* Company Header / Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-primary to-indigo-600 rounded-xl p-8 text-white shadow-xl mb-8">
                <div className="relative z-10 flex items-center gap-6">
                    <div className="size-20 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-black border border-white/30">
                        GS
                    </div>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">{company.name}</h1>
                        <p className="text-blue-100 text-lg mt-1">{company.industry}</p>
                        <div className="flex gap-4 mt-3">
                            <a href={company.socialLinks.linkedin} className="flex items-center gap-1 text-sm text-blue-100 hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[18px]">link</span> LinkedIn
                            </a>
                            <a href={company.socialLinks.twitter} className="flex items-center gap-1 text-sm text-blue-100 hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[18px]">alternate_email</span> Twitter
                            </a>
                            <a href={company.socialLinks.github} className="flex items-center gap-1 text-sm text-blue-100 hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[18px]">code</span> GitHub
                            </a>
                        </div>
                    </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {/* Recruitment Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: 'Total Hires', value: company.recruitmentStats.totalHires, icon: 'how_to_reg', bg: 'bg-green-50 dark:bg-green-900/20', color: 'text-green-600' },
                    { label: 'Avg. Package', value: company.recruitmentStats.avgPackage, icon: 'payments', bg: 'bg-blue-50 dark:bg-blue-900/20', color: 'text-blue-600' },
                    { label: 'Return Rate', value: company.recruitmentStats.returnRate, icon: 'trending_up', bg: 'bg-purple-50 dark:bg-purple-900/20', color: 'text-purple-600' },
                    { label: 'Open Positions', value: company.recruitmentStats.openPositions, icon: 'work', bg: 'bg-amber-50 dark:bg-amber-900/20', color: 'text-amber-600' },
                ].map(s => (
                    <div key={s.label} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <span className={`p-2 ${s.bg} ${s.color} rounded-lg`}>
                                <span className="material-symbols-outlined">{s.icon}</span>
                            </span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{s.label}</p>
                        <h3 className="text-2xl font-bold mt-1">{s.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Left Column */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    {/* About */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="text-lg font-bold mb-4">About</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{company.about}</p>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{company.mission}</p>
                    </div>

                    {/* Culture & Values */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="text-lg font-bold mb-4">Culture & Values</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {company.cultureValues.map(v => (
                                <div key={v.title} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
                                    <span className="material-symbols-outlined text-primary mb-2 block">{v.icon}</span>
                                    <h4 className="font-bold text-sm mb-1">{v.title}</h4>
                                    <p className="text-xs text-slate-500">{v.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="text-lg font-bold mb-4">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {company.techStack.map(tech => (
                                <span key={tech} className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-lg">{tech}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    {/* Company Info */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="font-bold mb-4">Company Info</h3>
                        <div className="space-y-3">
                            {[
                                { label: 'Founded', value: company.founded, icon: 'calendar_today' },
                                { label: 'Employees', value: company.employees, icon: 'group' },
                                { label: 'Headquarters', value: company.hq, icon: 'location_on' },
                                { label: 'Website', value: company.website, icon: 'language' },
                            ].map(info => (
                                <div key={info.label} className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-slate-400 text-[20px]">{info.icon}</span>
                                    <div>
                                        <p className="text-xs text-slate-500">{info.label}</p>
                                        <p className="text-sm font-medium">{info.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Office Locations */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="font-bold mb-4">Office Locations</h3>
                        <div className="space-y-3">
                            {company.officeLocations.map(loc => (
                                <div key={loc.city} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                                    <div>
                                        <p className="text-sm font-bold">{loc.city}, {loc.country}</p>
                                        <p className="text-xs text-slate-500">{loc.type}</p>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Perks & Benefits */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <h3 className="font-bold mb-4">Perks & Benefits</h3>
                        <div className="flex flex-wrap gap-2">
                            {company.perks.map(perk => (
                                <span key={perk} className="px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-medium rounded-full border border-green-200 dark:border-green-800">{perk}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
