import { useState } from 'react'
import { recruiterApplications } from '../../data/mockData'

export default function ApplicationReview() {
    const [selected, setSelected] = useState(0)
    const [filter, setFilter] = useState('All')
    const candidate = recruiterApplications[selected]

    const filters = ['All', 'Pending', 'Shortlisted', 'Rejected']

    const skills = [
        { name: 'React.js', level: 'Expert', pct: 95, color: 'bg-primary' },
        { name: 'Node.js / Backend', level: 'Advanced', pct: 85, color: 'bg-primary' },
        { name: 'AWS Cloud', level: 'Intermediate', pct: 60, color: 'bg-yellow-500' },
        { name: 'UI/UX Design', level: 'Bonus Skill', pct: 75, color: 'bg-purple-500' },
    ]

    const breakdown = [
        { label: 'Experience:', detail: '5 Years (Required: 3+)', pass: true },
        { label: 'Education:', detail: 'BS Computer Science', pass: true },
        { label: 'Location:', detail: 'Timezone Match (PST)', pass: true },
        { label: 'Missing:', detail: 'Kubernetes Certification', pass: false },
    ]

    const timeline = [
        { title: 'Senior Frontend Dev', company: 'TechCorp Inc. • 2021 - Present', current: true },
        { title: 'Web Developer', company: 'StartupXY • 2019 - 2021', current: false },
        { title: 'Junior Dev', company: 'Agency Z • 2018 - 2019', current: false },
    ]

    const slots = [
        { label: 'Tomorrow, 10:00 AM', primary: true },
        { label: 'Tomorrow, 2:30 PM', primary: false },
        { label: 'Wed, Oct 24, 11:00 AM', primary: false },
    ]

    return (
        <div className="flex h-[calc(100vh-73px)] -m-8 -mt-0">
            {/* Left Panel: Applicant List */}
            <aside className="w-[380px] shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-full overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold">Applications</h3>
                        <span className="text-xs text-slate-500 font-medium">{recruiterApplications.length} candidates</span>
                    </div>
                    {/* Search */}
                    <div className="relative mb-3">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
                        <input type="text" placeholder="Search candidates..." className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20" />
                    </div>
                    {/* Filters */}
                    <div className="flex gap-2">
                        {filters.map(f => (
                            <button key={f} onClick={() => setFilter(f)}
                                className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${filter === f ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'}`}>
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Applicant List */}
                <div className="flex-1 overflow-y-auto">
                    {recruiterApplications.map((app, i) => (
                        <div key={app.id} onClick={() => setSelected(i)}
                            className={`group flex flex-col gap-2 p-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors border-l-4 ${selected === i ? 'border-l-primary bg-primary/5' : 'border-l-transparent'}`}>
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="size-12 rounded-full bg-slate-200 dark:bg-slate-700 shadow-sm"></div>
                                        {app.online && <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></span>}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white leading-tight">{app.name}</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{app.role} • {app.experience}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    {app.resumeScore >= 90 ? (
                                        <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded text-xs font-bold">
                                            {app.resumeScore}%
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 px-2 py-0.5 rounded text-xs font-bold">
                                            {app.resumeScore}%
                                        </div>
                                    )}
                                    <span className="text-[10px] text-slate-400 font-medium">{app.appliedAgo}</span>
                                </div>
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                                <div className="flex gap-2">
                                    {app.skills.slice(0, 2).map(skill => (
                                        <span key={skill} className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-700 px-2 py-1 text-[10px] font-medium text-slate-600 dark:text-slate-300">{skill}</span>
                                    ))}
                                </div>
                                {app.matchLabel && <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{app.matchLabel}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Right Panel: Detailed View */}
            <section className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
                {/* Detail Header */}
                <div className="bg-white dark:bg-slate-900 px-8 py-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-start shrink-0">
                    <div className="flex gap-6">
                        <div className="size-24 rounded-xl bg-slate-200 dark:bg-slate-700 shadow-md shrink-0"></div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{candidate.name}</h1>
                                <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-2.5 py-0.5 rounded-full text-xs font-bold border border-green-200 dark:border-green-800">Available immediately</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-lg mt-1">{candidate.role} • {candidate.experience} Experience</p>
                            <div className="flex gap-4 mt-4">
                                <a className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary transition-colors" href="#">
                                    <span className="material-symbols-outlined text-[18px]">link</span> LinkedIn
                                </a>
                                <a className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary transition-colors" href="#">
                                    <span className="material-symbols-outlined text-[18px]">code</span> GitHub
                                </a>
                                <a className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary transition-colors" href="#">
                                    <span className="material-symbols-outlined text-[18px]">description</span> Download Resume
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 items-end">
                        <div className="flex gap-3">
                            <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-sm font-bold shadow-sm transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">close</span> Reject
                            </button>
                            <button className="px-6 py-2 bg-primary text-white hover:bg-blue-700 rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">check</span> Verify & Shortlist
                            </button>
                        </div>
                        <p className="text-xs text-slate-400">Review expires in 2 days</p>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="grid grid-cols-12 gap-6 max-w-[1400px] mx-auto">
                        {/* Left Detail Column */}
                        <div className="col-span-12 lg:col-span-8 space-y-6">
                            {/* AI Match Analysis */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">auto_awesome</span>
                                        AI Match Analysis
                                    </h3>
                                    <div className="text-right">
                                        <p className="text-sm text-slate-500">Confidence Score</p>
                                        <p className="text-2xl font-bold text-primary">{candidate.resumeScore}% Match</p>
                                    </div>
                                </div>
                                <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg p-4 mb-6">
                                    <p className="text-sm text-slate-900 dark:text-slate-200 leading-relaxed">
                                        <strong className="text-primary block mb-1">Summary:</strong>
                                        High confidence match. Candidate has 5 years of required React experience, exceeding the 3-year requirement. Resume demonstrates strong leadership in previous roles. Skills overlap with team stack is 95%.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Skills Gap */}
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Skills Gap Analysis</h4>
                                        <div className="space-y-4">
                                            {skills.map(s => (
                                                <div key={s.name}>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className="font-medium text-slate-900 dark:text-white">{s.name}</span>
                                                        <span className={`font-bold ${s.level === 'Expert' || s.level === 'Advanced' ? 'text-green-600' : s.level === 'Intermediate' ? 'text-yellow-600' : 'text-slate-500'}`}>{s.level}</span>
                                                    </div>
                                                    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                                                        <div className={`${s.color} h-2 rounded-full`} style={{ width: `${s.pct}%` }}></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Breakdown */}
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Detailed Breakdown</h4>
                                        <ul className="space-y-3">
                                            {breakdown.map((b, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-slate-900 dark:text-slate-300">
                                                    <span className={`material-symbols-outlined text-[20px] shrink-0 ${b.pass ? 'text-green-500' : 'text-red-500'}`}>
                                                        {b.pass ? 'check_circle' : 'cancel'}
                                                    </span>
                                                    <span><strong>{b.label}</strong> {b.detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Resume Sentiment & Experience Timeline */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <h3 className="text-md font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-purple-500">psychology_alt</span>
                                        Resume Sentiment
                                    </h3>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="size-16 rounded-full border-4 border-green-500 flex items-center justify-center text-green-600 font-bold text-lg bg-green-50 dark:bg-transparent">
                                            Pos
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900 dark:text-white">Leadership Oriented</p>
                                            <p className="text-sm text-slate-500">Resume uses strong action verbs indicating initiative and ownership.</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {['"Spearheaded"', '"Architected"', '"Mentored"'].map(w => (
                                            <span key={w} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded">{w}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <h3 className="text-md font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-orange-500">work_history</span>
                                        Experience Timeline
                                    </h3>
                                    <div className="relative pl-4 border-l-2 border-slate-200 dark:border-slate-700 space-y-6">
                                        {timeline.map((t, i) => (
                                            <div key={i} className="relative">
                                                <span className={`absolute -left-[21px] top-1 size-3 rounded-full border-2 border-white dark:border-slate-900 ${t.current ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`}></span>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">{t.title}</p>
                                                <p className="text-xs text-slate-500">{t.company}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="col-span-12 lg:col-span-4 space-y-6">
                            {/* Schedule Interview */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <h3 className="text-md font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">calendar_month</span>
                                    Schedule Interview
                                </h3>
                                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mb-4 text-center">
                                    <p className="text-sm text-slate-500 mb-2">Suggested Slots (Based on your calendar)</p>
                                    <div className="space-y-2">
                                        {slots.map((s, i) => (
                                            <button key={i} className={`w-full py-2 px-3 rounded text-sm font-medium transition-all flex justify-between items-center ${s.primary ? 'bg-white dark:bg-slate-900 border border-primary/30 text-primary hover:bg-primary hover:text-white' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-300 hover:border-primary/50'}`}>
                                                <span>{s.label}</span>
                                                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <button className="w-full text-center text-sm text-slate-500 font-medium hover:text-primary underline">View Full Calendar</button>
                            </div>

                            {/* Internal Notes */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <h3 className="text-md font-bold text-slate-900 dark:text-white mb-4">Internal Notes</h3>
                                <textarea className="w-full p-3 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-500 focus:ring-1 focus:ring-primary resize-none h-32" placeholder="Add a note for the hiring manager..."></textarea>
                                <div className="flex justify-end mt-2">
                                    <button className="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white text-xs font-bold py-1.5 px-3 rounded transition-colors">Save Note</button>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <h3 className="text-md font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { icon: 'mail', label: 'Email' },
                                        { icon: 'share', label: 'Share' },
                                        { icon: 'print', label: 'Print' },
                                        { icon: 'archive', label: 'Archive' },
                                    ].map(a => (
                                        <button key={a.label} className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                            <span className="material-symbols-outlined text-slate-500">{a.icon}</span>
                                            <span className="text-xs font-medium text-slate-900 dark:text-white">{a.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
