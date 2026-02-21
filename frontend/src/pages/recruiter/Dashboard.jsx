import { Link } from 'react-router-dom'
import { recruiterDashboardStats, recruiterActiveDrives, recruiterUpcomingInterviews } from '../../data/mockData'

export default function RecruiterDashboard() {
    const stats = [
        { label: 'Active Drives', value: recruiterDashboardStats.activeDrives, icon: 'work', bg: 'bg-blue-50 dark:bg-blue-900/20', color: 'text-blue-600', badge: 'Active' },
        { label: 'Total Applications', value: '1,248', icon: 'group', bg: 'bg-indigo-50 dark:bg-indigo-900/20', color: 'text-primary', badge: '+45 today' },
        { label: 'Scheduled Interviews', value: recruiterDashboardStats.scheduledInterviews, icon: 'event', bg: 'bg-amber-50 dark:bg-amber-900/20', color: 'text-amber-600', badge: null },
        { label: 'Offers Extended', value: recruiterDashboardStats.offersExtended, icon: 'how_to_reg', bg: 'bg-green-50 dark:bg-green-900/20', color: 'text-green-600', badge: null },
    ]

    const activeDrives = [
        { role: 'Software Engineer (SDE-1)', pkg: '₹22-26 LPA • Bengaluru', icon: 'code', iconBg: 'bg-primary/10 text-primary', applied: 342, shortlisted: 48, status: 'Active', statusColor: 'bg-green-100 text-green-700' },
        { role: 'Data Analyst', pkg: '₹18-22 LPA • Mumbai', icon: 'analytics', iconBg: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600', applied: 186, shortlisted: 24, status: 'Active', statusColor: 'bg-green-100 text-green-700' },
        { role: 'Product Designer', pkg: '₹15-20 LPA • Remote', icon: 'design_services', iconBg: 'bg-amber-100 dark:bg-amber-900/20 text-amber-600', applied: 94, shortlisted: 12, status: 'Closing Soon', statusColor: 'bg-amber-100 text-amber-700' },
    ]

    const pipeline = [
        { label: 'Total Applied', value: '1,248', bg: 'bg-slate-50 dark:bg-slate-800', color: 'text-slate-600' },
        { label: 'Screened', value: '892', bg: 'bg-blue-50 dark:bg-blue-900/20', color: 'text-blue-600' },
        { label: 'Shortlisted', value: '156', bg: 'bg-purple-50 dark:bg-purple-900/20', color: 'text-purple-600' },
        { label: 'Interview', value: '68', bg: 'bg-amber-50 dark:bg-amber-900/20', color: 'text-amber-600' },
        { label: 'Offered', value: '42', bg: 'bg-green-50 dark:bg-green-900/20', color: 'text-green-600' },
    ]

    const todayInterviews = [
        { name: 'Rahul Sharma', role: 'SDE-1', time: '10:00 AM', status: 'join' },
        { name: 'Priya Patel', role: 'Data Analyst', time: '11:30 AM', status: 'In 2hrs' },
        { name: 'Amit Kumar', role: 'SDE-1', time: '2:00 PM', status: 'In 4hrs' },
    ]

    const topCandidates = [
        { name: 'Ananya Singh', info: 'CGPA 9.2 • IIT Delhi', score: '98%' },
        { name: 'Karan Mehta', info: 'CGPA 8.9 • NIT Trichy', score: '95%' },
        { name: 'Neha Joshi', info: 'CGPA 9.0 • BITS Pilani', score: '94%' },
    ]

    return (
        <div>
            {/* Welcome Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-primary to-blue-600 rounded-xl p-8 text-white shadow-xl mb-8">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black tracking-tight">Welcome back, Goldman Sachs!</h2>
                        <p className="text-blue-100 text-lg">You have 156 new applications waiting for review.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link to="/recruiter/applications" className="bg-white text-primary px-6 py-3 rounded-lg font-bold text-sm hover:bg-opacity-90 transition-all shadow-lg">
                            Review Applications
                        </Link>
                    </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map(s => (
                    <div key={s.label} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className={`p-2 ${s.bg} ${s.color} rounded-lg`}>
                                <span className="material-symbols-outlined">{s.icon}</span>
                            </span>
                            {s.badge && <span className="text-green-500 text-xs font-bold flex items-center">{s.badge}</span>}
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{s.label}</p>
                        <h3 className="text-3xl font-bold mt-1">{s.value}</h3>
                    </div>
                ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-12 gap-8">
                {/* Left Column */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    {/* Active Drives */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <h4 className="text-lg font-bold">Active Placement Drives</h4>
                            <Link to="/recruiter/create-drive" className="text-sm text-primary font-bold hover:underline">+ Create New</Link>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {activeDrives.map((drive, i) => (
                                <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`size-12 rounded-lg ${drive.iconBg} flex items-center justify-center`}>
                                            <span className="material-symbols-outlined">{drive.icon}</span>
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-slate-900 dark:text-white">{drive.role}</h5>
                                            <p className="text-sm text-slate-500">{drive.pkg}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-primary">{drive.applied}</p>
                                            <p className="text-xs text-slate-500">Applied</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-green-600">{drive.shortlisted}</p>
                                            <p className="text-xs text-slate-500">Shortlisted</p>
                                        </div>
                                        <span className={`px-3 py-1 ${drive.statusColor} text-xs font-bold rounded-full`}>{drive.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Application Pipeline */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                        <h4 className="text-lg font-bold mb-6">Application Pipeline</h4>
                        <div className="grid grid-cols-5 gap-4">
                            {pipeline.map(p => (
                                <div key={p.label} className={`text-center p-4 rounded-lg ${p.bg}`}>
                                    <p className={`text-3xl font-bold ${p.color}`}>{p.value}</p>
                                    <p className="text-xs text-slate-500 mt-1 font-medium">{p.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    {/* Today's Interviews */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <h4 className="font-bold">Today's Interviews</h4>
                            <span className="size-6 bg-primary rounded-full text-white text-xs font-bold flex items-center justify-center">4</span>
                        </div>
                        <div className="p-4 space-y-3">
                            {todayInterviews.map((intv, i) => (
                                <div key={i} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold">{intv.name}</p>
                                        <p className="text-xs text-slate-500">{intv.role} • {intv.time}</p>
                                    </div>
                                    {intv.status === 'join' ? (
                                        <button className="px-3 py-1 bg-primary text-white text-xs font-bold rounded">Join</button>
                                    ) : (
                                        <span className="text-xs text-slate-500 font-medium">{intv.status}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                            <button className="w-full text-center text-sm font-bold text-primary hover:underline">View Full Schedule</button>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                        <h4 className="font-bold mb-4">Quick Actions</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <Link to="/recruiter/create-drive" className="flex flex-col items-center gap-2 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-primary/5 hover:border-primary/30 transition-colors">
                                <span className="material-symbols-outlined text-primary">add_circle</span>
                                <span className="text-xs font-medium text-center">New Drive</span>
                            </Link>
                            <Link to="/recruiter/applications" className="flex flex-col items-center gap-2 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-primary/5 hover:border-primary/30 transition-colors">
                                <span className="material-symbols-outlined text-primary">person_search</span>
                                <span className="text-xs font-medium text-center">Review Apps</span>
                            </Link>
                            <Link to="#" className="flex flex-col items-center gap-2 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-primary/5 hover:border-primary/30 transition-colors">
                                <span className="material-symbols-outlined text-primary">mail</span>
                                <span className="text-xs font-medium text-center">Send Offers</span>
                            </Link>
                            <Link to="/recruiter/company-profile" className="flex flex-col items-center gap-2 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-primary/5 hover:border-primary/30 transition-colors">
                                <span className="material-symbols-outlined text-primary">edit</span>
                                <span className="text-xs font-medium text-center">Edit Profile</span>
                            </Link>
                        </div>
                    </div>

                    {/* Top Candidates */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                        <h4 className="font-bold mb-4">Top AI-Matched Candidates</h4>
                        <div className="space-y-3">
                            {topCandidates.map((c, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold">{c.name}</p>
                                        <p className="text-xs text-slate-500">{c.info}</p>
                                    </div>
                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">{c.score}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
