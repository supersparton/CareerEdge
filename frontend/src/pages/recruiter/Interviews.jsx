import { useState } from 'react'
import toast from 'react-hot-toast'
import { recruiterUpcomingInterviews } from '../../data/mockData'

const initialInterviews = [
    { id: 1, candidate: 'Rahul Sharma', role: 'Senior SDE', dept: 'Computer Science', cgpa: 8.9, date: '2026-02-24', time: '10:00 AM', round: 'Technical Round 2', mode: 'Virtual', status: 'Scheduled', link: 'https://meet.google.com/abc', feedback: null },
    { id: 2, candidate: 'Sneha Gupta', role: 'Senior SDE', dept: 'Computer Science', cgpa: 9.5, date: '2026-02-24', time: '2:00 PM', round: 'System Design', mode: 'Virtual', status: 'Scheduled', link: 'https://meet.google.com/def', feedback: null },
    { id: 3, candidate: 'Priya Patel', role: 'Data Analyst', dept: 'Information Technology', cgpa: 9.2, date: '2026-02-25', time: '11:00 AM', round: 'Case Study', mode: 'In-person', status: 'Scheduled', venue: 'Conference Room A', feedback: null },
    { id: 4, candidate: 'Amit Kumar', role: 'Senior SDE', dept: 'Electronics', cgpa: 7.8, date: '2026-02-22', time: '10:00 AM', round: 'Technical Round 1', mode: 'Virtual', status: 'Completed', link: 'https://meet.google.com/ghi', feedback: 'Strong problem-solving skills. Recommended for next round.' },
    { id: 5, candidate: 'Ananya Verma', role: 'Data Analyst', dept: 'Computer Science', cgpa: 8.7, date: '2026-02-21', time: '3:00 PM', round: 'HR Round', mode: 'Virtual', status: 'Completed', link: 'https://meet.google.com/jkl', feedback: 'Good communication. Offer recommended.' },
    { id: 6, candidate: 'Karthik Nair', role: 'Product Manager', dept: 'MBA', cgpa: 8.4, date: '2026-02-20', time: '11:00 AM', round: 'Case Study', mode: 'In-person', status: 'Cancelled', venue: 'Conference Room B', feedback: 'Candidate withdrew application.' },
    { id: 7, candidate: 'Meera Joshi', role: 'ML Engineer', dept: 'Computer Science', cgpa: 9.0, date: '2026-02-26', time: '10:30 AM', round: 'Technical Round 1', mode: 'Virtual', status: 'Scheduled', link: 'https://meet.google.com/mno', feedback: null },
    { id: 8, candidate: 'Rohan Das', role: 'Senior SDE', dept: 'Information Technology', cgpa: 7.6, date: '2026-02-19', time: '2:30 PM', round: 'Technical Round 1', mode: 'Virtual', status: 'Completed', link: 'https://meet.google.com/pqr', feedback: 'Needs improvement in system design concepts.' },
]

const statusColors = {
    Scheduled: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

export default function RecruiterInterviews() {
    const [filter, setFilter] = useState('All')
    const [selectedInterview, setSelectedInterview] = useState(null)
    const [interviews, setInterviews] = useState(initialInterviews)
    const [showScheduleModal, setShowScheduleModal] = useState(false)
    const [scheduleForm, setScheduleForm] = useState({
        candidate: '', role: '', dept: 'Computer Science', cgpa: '', date: '', time: '', round: 'Technical Round 1', mode: 'Virtual'
    })

    const filters = ['All', 'Scheduled', 'Completed', 'Cancelled']

    const filtered = filter === 'All' ? interviews : interviews.filter(i => i.status === filter)

    const stats = [
        { label: 'Total Scheduled', value: interviews.filter(i => i.status === 'Scheduled').length, icon: 'event', bg: 'bg-blue-50 dark:bg-blue-900/20', color: 'text-blue-600' },
        { label: 'Completed', value: interviews.filter(i => i.status === 'Completed').length, icon: 'check_circle', bg: 'bg-green-50 dark:bg-green-900/20', color: 'text-green-600' },
        { label: 'Cancelled', value: interviews.filter(i => i.status === 'Cancelled').length, icon: 'cancel', bg: 'bg-red-50 dark:bg-red-900/20', color: 'text-red-600' },
        { label: 'Total', value: interviews.length, icon: 'date_range', bg: 'bg-purple-50 dark:bg-purple-900/20', color: 'text-purple-600' },
    ]

    const handleScheduleSubmit = (e) => {
        e.preventDefault()
        if (!scheduleForm.candidate.trim() || !scheduleForm.date || !scheduleForm.time) {
            toast.error('Please fill in candidate name, date, and time')
            return
        }
        const newInterview = {
            id: Date.now(),
            candidate: scheduleForm.candidate,
            role: scheduleForm.role || 'SDE',
            dept: scheduleForm.dept,
            cgpa: parseFloat(scheduleForm.cgpa) || 8.0,
            date: scheduleForm.date,
            time: scheduleForm.time,
            round: scheduleForm.round,
            mode: scheduleForm.mode,
            status: 'Scheduled',
            link: scheduleForm.mode === 'Virtual' ? `https://meet.google.com/${Math.random().toString(36).slice(2, 5)}` : undefined,
            venue: scheduleForm.mode === 'In-person' ? 'Conference Room A' : undefined,
            feedback: null,
        }
        setInterviews(prev => [newInterview, ...prev])
        setShowScheduleModal(false)
        setScheduleForm({ candidate: '', role: '', dept: 'Computer Science', cgpa: '', date: '', time: '', round: 'Technical Round 1', mode: 'Virtual' })
        toast.success(`Interview scheduled with ${scheduleForm.candidate}!`, { icon: '📅' })
    }

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold">Interview Schedule</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and track all candidate interviews</p>
                </div>
                <button onClick={() => setShowScheduleModal(true)} className="self-start px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">add</span>
                    Schedule Interview
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stats.map(s => (
                    <div key={s.label} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <span className={`p-2 ${s.bg} ${s.color} rounded-lg`}>
                                <span className="material-symbols-outlined !text-xl">{s.icon}</span>
                            </span>
                        </div>
                        <p className="text-2xl font-bold">{s.value}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 mb-6">
                {filters.map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${filter === f
                            ? 'bg-primary text-white shadow-sm'
                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Interview List */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <div className="col-span-3">Candidate</div>
                    <div className="col-span-2">Role</div>
                    <div className="col-span-2">Date & Time</div>
                    <div className="col-span-2">Round</div>
                    <div className="col-span-1">Mode</div>
                    <div className="col-span-1">Status</div>
                    <div className="col-span-1 text-right">Action</div>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filtered.map(interview => (
                        <div key={interview.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div className="col-span-3 flex items-center gap-3">
                                <div className="size-10 rounded-full bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                                    {interview.candidate.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">{interview.candidate}</p>
                                    <p className="text-xs text-slate-500">{interview.dept} • CGPA {interview.cgpa}</p>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm font-medium">{interview.role}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm font-medium">{new Date(interview.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                                <p className="text-xs text-slate-500">{interview.time}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm">{interview.round}</p>
                            </div>
                            <div className="col-span-1">
                                <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                                    <span className="material-symbols-outlined !text-sm">{interview.mode === 'Virtual' ? 'videocam' : 'location_on'}</span>
                                    {interview.mode}
                                </span>
                            </div>
                            <div className="col-span-1">
                                <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${statusColors[interview.status]}`}>
                                    {interview.status}
                                </span>
                            </div>
                            <div className="col-span-1 text-right">
                                <button
                                    onClick={() => setSelectedInterview(selectedInterview?.id === interview.id ? null : interview)}
                                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-500"
                                >
                                    <span className="material-symbols-outlined !text-lg">more_vert</span>
                                </button>
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="px-6 py-16 text-center">
                            <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-600 mb-3 block">event_busy</span>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">No {filter.toLowerCase()} interviews found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Interview Detail Modal */}
            {selectedInterview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSelectedInterview(null)}>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg mx-4 animate-scaleIn" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="text-lg font-bold">Interview Details</h3>
                            <button onClick={() => setSelectedInterview(null)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-5">
                            <div className="flex items-center gap-4">
                                <div className="size-14 rounded-full bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                                    {selectedInterview.candidate.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold">{selectedInterview.candidate}</h4>
                                    <p className="text-sm text-slate-500">{selectedInterview.dept} • CGPA {selectedInterview.cgpa}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                    <p className="text-xs text-slate-500 font-medium mb-1">Role</p>
                                    <p className="text-sm font-semibold">{selectedInterview.role}</p>
                                </div>
                                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                    <p className="text-xs text-slate-500 font-medium mb-1">Round</p>
                                    <p className="text-sm font-semibold">{selectedInterview.round}</p>
                                </div>
                                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                    <p className="text-xs text-slate-500 font-medium mb-1">Date & Time</p>
                                    <p className="text-sm font-semibold">{new Date(selectedInterview.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • {selectedInterview.time}</p>
                                </div>
                                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                    <p className="text-xs text-slate-500 font-medium mb-1">Mode</p>
                                    <p className="text-sm font-semibold">{selectedInterview.mode}{selectedInterview.venue ? ` — ${selectedInterview.venue}` : ''}</p>
                                </div>
                            </div>
                            {selectedInterview.feedback && (
                                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                                    <p className="text-xs text-amber-700 dark:text-amber-400 font-bold mb-1">Interviewer Feedback</p>
                                    <p className="text-sm text-amber-800 dark:text-amber-300">{selectedInterview.feedback}</p>
                                </div>
                            )}
                            <div className="flex gap-3">
                                {selectedInterview.status === 'Scheduled' && selectedInterview.link && (
                                    <a href={selectedInterview.link} target="_blank" rel="noreferrer" className="flex-1 py-3 bg-primary text-white text-sm font-bold rounded-lg text-center hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined text-sm">videocam</span>
                                        Join Meeting
                                    </a>
                                )}
                                <button onClick={() => setSelectedInterview(null)} className="flex-1 py-3 border border-slate-200 dark:border-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Schedule Interview Modal */}
            {showScheduleModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowScheduleModal(false)}>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg mx-4 animate-scaleIn" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="text-lg font-bold">Schedule New Interview</h3>
                            <button onClick={() => setShowScheduleModal(false)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleScheduleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Candidate Name *</label>
                                    <input type="text" value={scheduleForm.candidate} onChange={e => setScheduleForm(p => ({ ...p, candidate: e.target.value }))} placeholder="e.g. Rahul Sharma" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Role</label>
                                    <input type="text" value={scheduleForm.role} onChange={e => setScheduleForm(p => ({ ...p, role: e.target.value }))} placeholder="e.g. Senior SDE" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Department</label>
                                    <select value={scheduleForm.dept} onChange={e => setScheduleForm(p => ({ ...p, dept: e.target.value }))} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm">
                                        <option>Computer Science</option>
                                        <option>Information Technology</option>
                                        <option>Electronics</option>
                                        <option>MBA</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">CGPA</label>
                                    <input type="number" step="0.1" value={scheduleForm.cgpa} onChange={e => setScheduleForm(p => ({ ...p, cgpa: e.target.value }))} placeholder="e.g. 8.5" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Date *</label>
                                    <input type="date" value={scheduleForm.date} onChange={e => setScheduleForm(p => ({ ...p, date: e.target.value }))} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Time *</label>
                                    <input type="text" value={scheduleForm.time} onChange={e => setScheduleForm(p => ({ ...p, time: e.target.value }))} placeholder="e.g. 10:00 AM" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Round</label>
                                    <select value={scheduleForm.round} onChange={e => setScheduleForm(p => ({ ...p, round: e.target.value }))} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm">
                                        <option>Technical Round 1</option>
                                        <option>Technical Round 2</option>
                                        <option>System Design</option>
                                        <option>Case Study</option>
                                        <option>HR Round</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Mode</label>
                                    <select value={scheduleForm.mode} onChange={e => setScheduleForm(p => ({ ...p, mode: e.target.value }))} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm">
                                        <option>Virtual</option>
                                        <option>In-person</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="submit" className="flex-1 py-3 bg-primary text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors">
                                    Schedule Interview
                                </button>
                                <button type="button" onClick={() => setShowScheduleModal(false)} className="flex-1 py-3 border border-slate-200 dark:border-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
