import { useState } from 'react'
import toast from 'react-hot-toast'

const upcomingInterviews = [
    {
        company: 'Google', round: 'Technical Interview - Round 2', role: 'SDE Intern', package: '₹1.8L/month',
        dateLabel: 'Today', time: '2:00', ampm: 'PM', dateBg: 'bg-green-600', dateTextColor: 'text-white',
        platform: 'Google Meet', duration: '45 mins', isToday: true, urgentLabel: 'In 2 hours',
        meetLink: 'https://meet.google.com/', calendarDate: '20260222T143000', calendarEndDate: '20260222T151500',
        highlightBg: 'bg-gradient-to-r from-green-50 to-transparent dark:from-green-900/10',
        tips: ['Review Google\'s recent products and AI initiatives', 'Practice binary trees and graph traversal', 'Be ready to code in shared editor', 'Prepare 2-3 questions about team culture'],
    },
    {
        company: 'Goldman Sachs', round: 'HR Interview - Final Round', role: 'SDE-1', package: '₹22-26 LPA',
        dateLabel: 'Feb 12', time: '10:00', ampm: 'AM', dateBg: 'bg-primary', dateTextColor: 'text-white',
        platform: 'Zoom', duration: '30 mins', isToday: false,
        meetLink: 'https://zoom.us/', calendarDate: '20260212T100000', calendarEndDate: '20260212T103000',
        highlightBg: '',
        tips: ['Research Goldman Sachs\' engineering culture', 'Prepare STAR method responses for behavioral questions', 'Know your resume inside and out', 'Have salary expectations ready'],
    },
    {
        company: 'Microsoft', round: 'Technical Interview - Round 1', role: 'SDE-1', package: '₹38-50 LPA',
        dateLabel: 'Feb 15', time: '3:30', ampm: 'PM', dateBg: 'bg-slate-100 dark:bg-slate-800', dateTextColor: 'text-slate-500',
        platform: 'Teams', duration: '60 mins', isToday: false,
        meetLink: 'https://teams.microsoft.com/', calendarDate: '20260215T153000', calendarEndDate: '20260215T163000',
        highlightBg: '',
        tips: ['Focus on system design fundamentals', 'Practice dynamic programming problems', 'Review Microsoft\'s Azure services', 'Prepare to discuss past projects in depth'],
    },
]

export default function Interviews() {
    const [prepareModal, setPrepareModal] = useState(null) // index of interview or null

    const handleAddToCalendar = (interview) => {
        const title = encodeURIComponent(`${interview.company} - ${interview.round}`)
        const details = encodeURIComponent(`Role: ${interview.role}\nPackage: ${interview.package}\nPlatform: ${interview.platform}\nMeeting Link: ${interview.meetLink}`)
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${interview.calendarDate}/${interview.calendarEndDate}&details=${details}`
        window.open(url, '_blank')
        toast.success('Opening Google Calendar...')
    }

    const handleJoinNow = (interview) => {
        window.open(interview.meetLink, '_blank')
        toast.success(`Joining ${interview.platform}...`)
    }

    return (
        <>
            {/* Preparation Modal */}
            {prepareModal !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setPrepareModal(null)}>
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg border border-slate-200 dark:border-slate-700 overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="p-6 bg-gradient-to-r from-primary to-indigo-600 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold">{upcomingInterviews[prepareModal].company}</h3>
                                    <p className="text-indigo-100 text-sm">{upcomingInterviews[prepareModal].round}</p>
                                </div>
                                <button onClick={() => setPrepareModal(null)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-6 text-sm text-slate-500">
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">event</span>
                                    {upcomingInterviews[prepareModal].dateLabel} at {upcomingInterviews[prepareModal].time} {upcomingInterviews[prepareModal].ampm}
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">schedule</span>
                                    {upcomingInterviews[prepareModal].duration}
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">videocam</span>
                                    {upcomingInterviews[prepareModal].platform}
                                </span>
                            </div>
                            <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-3">Preparation Tips</h4>
                            <ul className="space-y-3">
                                {upcomingInterviews[prepareModal].tips.map((tip, i) => (
                                    <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                                        <span className="material-symbols-outlined text-primary text-lg mt-0.5">lightbulb</span>
                                        <span className="text-sm text-slate-700 dark:text-slate-300">{tip}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 flex gap-3">
                                <button
                                    onClick={() => { handleAddToCalendar(upcomingInterviews[prepareModal]); setPrepareModal(null) }}
                                    className="flex-1 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-sm">calendar_add_on</span>
                                    Add to Calendar
                                </button>
                                {upcomingInterviews[prepareModal].isToday && (
                                    <button
                                        onClick={() => { handleJoinNow(upcomingInterviews[prepareModal]); setPrepareModal(null) }}
                                        className="flex-1 py-2.5 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-sm">videocam</span>
                                        Join Now
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold">My Interviews</h1>
                    <p className="text-slate-500 mt-1">Track your upcoming and past interviews</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-medium rounded-lg flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">calendar_month</span>
                        Sync Calendar
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[
                    { icon: 'event_upcoming', iconBg: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600', value: '3', label: 'Upcoming' },
                    { icon: 'check_circle', iconBg: 'bg-green-50 dark:bg-green-900/20 text-green-600', value: '5', label: 'Completed' },
                    { icon: 'stars', iconBg: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600', value: '80%', label: 'Success Rate' },
                    { icon: 'emoji_events', iconBg: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600', value: '2', label: 'Offers' },
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

            <div className="grid grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                    {/* Upcoming Interviews */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">event_upcoming</span>
                                Upcoming Interviews
                            </h3>
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded">3 Scheduled</span>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {upcomingInterviews.map((interview, i) => (
                                <div key={i} className={`p-6 ${interview.highlightBg}`}>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className={`text-center p-3 ${interview.dateBg} ${interview.dateTextColor} rounded-lg min-w-16`}>
                                                <p className="text-xs font-medium uppercase">{interview.dateLabel}</p>
                                                <p className="text-xl font-bold">{interview.time}</p>
                                                <p className="text-xs">{interview.ampm}</p>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-bold text-lg">{interview.company}</h4>
                                                    {interview.urgentLabel && (
                                                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded animate-pulse">{interview.urgentLabel}</span>
                                                    )}
                                                </div>
                                                <p className="text-slate-600 dark:text-slate-400">{interview.round}</p>
                                                <p className="text-sm text-slate-500 mt-1">{interview.role} • {interview.package}</p>
                                                <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                                                    <span className="flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-sm">videocam</span>
                                                        {interview.platform}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-sm">schedule</span>
                                                        {interview.duration}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setPrepareModal(i)}
                                                className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                            >
                                                Prepare
                                            </button>
                                            {interview.isToday ? (
                                                <button
                                                    onClick={() => handleJoinNow(interview)}
                                                    className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-sm">videocam</span>
                                                    Join Now
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleAddToCalendar(interview)}
                                                    className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 flex items-center gap-2 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-sm">calendar_add_on</span>
                                                    Add to Calendar
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Past Interviews */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <span className="material-symbols-outlined text-slate-500">history</span>
                                Past Interviews
                            </h3>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {[
                                { company: 'Google - Technical Round 1', date: 'Feb 5, 2026 • Cleared', passed: true },
                                { company: 'Goldman Sachs - Technical Round 1', date: 'Feb 3, 2026 • Cleared', passed: true },
                                { company: 'Goldman Sachs - Technical Round 2', date: 'Feb 6, 2026 • Cleared', passed: true },
                                { company: 'Amazon - Technical Round 2', date: 'Jan 28, 2026 • Not Selected', passed: false },
                            ].map((item, i) => (
                                <div key={i} className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`size-10 rounded-lg ${item.passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} flex items-center justify-center`}>
                                            <span className="material-symbols-outlined">{item.passed ? 'check_circle' : 'cancel'}</span>
                                        </div>
                                        <div>
                                            <p className="font-medium">{item.company}</p>
                                            <p className="text-sm text-slate-500">{item.date}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 ${item.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} text-xs font-bold rounded`}>
                                        {item.passed ? 'Passed' : 'Not Passed'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    {/* Interview Tips */}
                    <div className="bg-gradient-to-br from-primary to-indigo-600 rounded-xl p-6 text-white">
                        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined">tips_and_updates</span>
                            Interview Tips
                        </h4>
                        <ul className="space-y-3 text-sm text-indigo-100">
                            {[
                                'Test your audio/video 15 mins before',
                                'Keep your resume handy',
                                'Prepare STAR method responses',
                                'Research the company culture',
                            ].map((tip, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-sm mt-0.5">check</span>
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Preparation Resources */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                        <h4 className="font-bold mb-4">Preparation Resources</h4>
                        <div className="space-y-3">
                            {[
                                { icon: 'code', iconColor: 'text-blue-600', title: 'DSA Practice', sub: 'LeetCode Problems' },
                                { icon: 'psychology', iconColor: 'text-purple-600', title: 'System Design', sub: 'Mock Interviews' },
                                { icon: 'record_voice_over', iconColor: 'text-green-600', title: 'HR Questions', sub: 'Common Questions' },
                            ].map((res, i) => (
                                <a key={i} href="#" className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                    <span className={`material-symbols-outlined ${res.iconColor}`}>{res.icon}</span>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{res.title}</p>
                                        <p className="text-xs text-slate-500">{res.sub}</p>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400 text-sm">arrow_forward</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Offers Received */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                            <h4 className="font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-amber-500">emoji_events</span>
                                Offers Received
                            </h4>
                        </div>
                        <div className="p-4 space-y-3">
                            <div className="p-3 rounded-lg border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold">G</div>
                                    <div className="flex-1">
                                        <p className="font-bold">Google</p>
                                        <p className="text-sm text-slate-500">SDE Intern • ₹1.8L/month</p>
                                    </div>
                                </div>
                                <div className="mt-3 flex items-center gap-2">
                                    <button onClick={() => toast.success('Offer accepted! 🎉')} className="flex-1 px-3 py-2 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 transition-colors">Accept</button>
                                    <button onClick={() => toast('Offer declined', { icon: '❌' })} className="flex-1 px-3 py-2 border border-slate-300 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors">Decline</button>
                                </div>
                                <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">schedule</span>
                                    Respond by Feb 15, 2026
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
