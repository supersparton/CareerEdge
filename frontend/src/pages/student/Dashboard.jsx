import { Link } from 'react-router-dom'

export default function StudentDashboard() {
    return (
        <>
            <div className="grid grid-cols-12 gap-8">
                {/* Left & Center Content Area (8 Columns) */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
                    {/* Welcome Widget */}
                    <div className="relative overflow-hidden bg-primary rounded-xl p-8 text-white shadow-xl shadow-primary/10">
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-black tracking-tight">Hello, Alex.</h2>
                                <p className="text-primary-foreground/80 text-lg opacity-90">You are eligible for 5 new placement drives this week.</p>
                            </div>
                            <Link to="/student/drives" className="bg-white text-primary px-6 py-3 rounded-lg font-bold text-sm hover:bg-opacity-90 transition-all w-fit shadow-lg">
                                Explore New Drives
                            </Link>
                        </div>
                        {/* Abstract Background Pattern */}
                        <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-white/10 to-transparent pointer-events-none"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                    </div>

                    {/* My Applications Section */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">track_changes</span>
                                My Applications
                            </h3>
                            <Link to="/student/applications" className="text-primary text-sm font-semibold hover:underline">View All</Link>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            {/* Company Header */}
                            <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-6 border-b border-slate-100 dark:border-slate-800">
                                <div className="w-16 h-16 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-3 border border-slate-100 dark:border-slate-700">
                                    <span className="material-symbols-outlined text-3xl text-primary">apartment</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-lg font-bold">Google</h4>
                                        <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-bold rounded-full uppercase tracking-wider">Hiring</span>
                                    </div>
                                    <p className="text-slate-500 text-sm">Software Engineering Intern (Summer 2024)</p>
                                    <p className="text-slate-400 text-xs mt-1">Applied on Oct 12, 2023 • Mountain View, CA (Remote Friendly)</p>
                                </div>
                                <button className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-5 py-2 rounded-lg font-semibold text-sm transition-colors">
                                    View Application
                                </button>
                            </div>
                            {/* Timeline Tracker */}
                            <div className="p-8 bg-slate-50/50 dark:bg-slate-800/20">
                                <div className="relative flex items-center justify-between max-w-3xl mx-auto">
                                    {/* Progress Bar Background */}
                                    <div className="absolute h-1 top-1/2 -translate-y-1/2 left-0 right-0 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                                    {/* Progress Bar Fill */}
                                    <div className="absolute h-1 top-1/2 -translate-y-1/2 left-0 w-1/2 bg-primary rounded-full transition-all duration-500"></div>
                                    {/* Step 1: Applied */}
                                    <div className="relative flex flex-col items-center gap-2">
                                        <div className="z-10 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white ring-4 ring-white dark:ring-slate-900 shadow-lg">
                                            <span className="material-symbols-outlined !text-lg">check</span>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-bold">Applied</p>
                                            <p className="text-[11px] text-green-500 font-medium">Completed</p>
                                        </div>
                                    </div>
                                    {/* Step 2: Shortlisted (Active) */}
                                    <div className="relative flex flex-col items-center gap-2">
                                        <div className="z-10 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white ring-4 ring-white dark:ring-slate-900 shadow-lg ring-offset-2 ring-offset-primary/20 animate-pulse">
                                            <span className="material-symbols-outlined !text-lg">how_to_reg</span>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-bold text-primary">Shortlisted</p>
                                            <p className="text-[11px] text-primary font-bold">Active</p>
                                        </div>
                                    </div>
                                    {/* Step 3: Interview (Pending) */}
                                    <div className="relative flex flex-col items-center gap-2">
                                        <div className="z-10 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 ring-4 ring-white dark:ring-slate-900">
                                            <span className="material-symbols-outlined !text-lg">event</span>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-bold text-slate-400">Interview</p>
                                            <p className="text-[11px] text-slate-400 font-medium">Pending</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Sidebar (4 Columns) */}
                <aside className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                    {/* AI Recommendations Widget */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-primary/5 to-transparent">
                            <div className="flex items-center gap-3">
                                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                    <span className="material-symbols-outlined">psychology</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Recommended for You</h3>
                                    <p className="text-[11px] text-slate-500 font-medium">Curated by AI Matchmaker</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 p-5 flex flex-col gap-4">
                            {/* Recommendation 1 */}
                            {[
                                { title: 'Software Engineer', company: 'Meta', location: 'Menlo Park, CA', match: '98%', tags: ['React', 'Distributed Systems'] },
                                { title: 'Product Designer', company: 'Airbnb', location: 'Remote', match: '95%', tags: ['Figma', 'UI/UX'] },
                                { title: 'Data Analyst', company: 'Stripe', location: 'San Francisco, CA', match: '92%', tags: ['Python', 'SQL'] },
                            ].map((rec, i) => (
                                <div key={i} className="group p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center p-2">
                                            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-all">apartment</span>
                                        </div>
                                        <span className="px-2.5 py-1 bg-primary text-white text-[10px] font-black rounded-lg shadow-sm">{rec.match} MATCH</span>
                                    </div>
                                    <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{rec.title}</h4>
                                    <p className="text-xs text-slate-500 mb-2">{rec.company} • {rec.location}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {rec.tags.map(tag => (
                                            <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] rounded font-medium">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link to="/student/drives" className="m-5 mt-0 py-3 text-center text-sm font-bold text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-all block">
                            View All Recommendations
                        </Link>
                    </div>
                </aside>
            </div>

            {/* Bottom Footer / Quick Stats */}
            <footer className="mt-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined">description</span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Profile Strength</p>
                            <p className="text-xl font-bold">85%</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined">groups</span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Active Applications</p>
                            <p className="text-xl font-bold">12</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined">trending_up</span>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Interview Invites</p>
                            <p className="text-xl font-bold">03</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
