import { useState } from 'react'
import { Link } from 'react-router-dom'

const applications = [
    {
        company: 'Google', initials: 'G', bgColor: 'bg-blue-100 text-blue-600',
        role: 'SDE Intern', status: 'Offer Received', statusBg: 'bg-green-100 text-green-700',
        statusIcon: 'verified', salary: '₹1.8L/month', location: 'Bengaluru', applied: 'Applied: Jan 15',
        borderColor: 'border-2 border-green-200 dark:border-green-800',
        actions: [
            { label: 'Accept Offer', className: 'px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700' },
            { label: 'Decline', className: 'px-4 py-2 border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50' },
        ],
        timeline: [
            { label: 'Applied', completed: true },
            { label: 'Shortlisted', completed: true },
            { label: 'Round 1', completed: true },
            { label: 'Round 2', completed: true },
            { label: 'Offer', completed: true, isStar: true },
        ]
    },
    {
        company: 'Goldman Sachs', initials: 'GS', bgColor: 'bg-gradient-to-br from-blue-500 to-purple-600 text-white',
        role: 'SDE-1', status: 'Interview Stage', statusBg: 'bg-purple-100 text-purple-700',
        salary: '₹22-26 LPA', location: 'Bengaluru', applied: 'Applied: Jan 20',
        borderColor: 'border border-slate-200 dark:border-slate-800',
        actions: [{ label: 'View Interview', className: 'px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90', isLink: true }],
        timeline: [
            { label: 'Applied', completed: true },
            { label: 'Shortlisted', completed: true },
            { label: 'Round 1', completed: true },
            { label: 'Round 2', completed: true },
            { label: 'HR Round', active: true },
        ]
    },
    {
        company: 'Microsoft', initials: 'MS', bgColor: 'bg-blue-600 text-white',
        role: 'SDE-1', status: 'Interview Stage', statusBg: 'bg-purple-100 text-purple-700',
        salary: '₹38-50 LPA', location: 'Hyderabad', applied: 'Applied: Jan 25',
        borderColor: 'border border-slate-200 dark:border-slate-800',
        actions: [{ label: 'View Interview', className: 'px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90', isLink: true }],
        timeline: [
            { label: 'Applied', completed: true },
            { label: 'Shortlisted', completed: true },
            { label: 'Round 1', active: true },
            { label: 'Round 2', number: '2' },
        ]
    },
    {
        company: 'Amazon', initials: 'A', bgColor: 'bg-orange-500 text-white',
        role: 'SDE + Data Science', status: 'Shortlisted', statusBg: 'bg-blue-100 text-blue-700',
        salary: '₹28-45 LPA', location: 'Bengaluru', applied: 'Applied: Feb 1',
        borderColor: 'border border-slate-200 dark:border-slate-800',
        actions: [{ label: 'Awaiting Interview', className: 'px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg', isStatus: true }],
        timeline: [
            { label: 'Applied', completed: true },
            { label: 'Shortlisted', active: true, activeColor: 'blue' },
            { label: 'Round 1', number: '1' },
        ]
    },
    {
        company: 'Stripe', initials: 'S', bgColor: 'bg-green-600 text-white',
        role: 'Backend Engineer', status: 'Applied', statusBg: 'bg-slate-100 text-slate-600',
        salary: '₹40-55 LPA', location: 'Remote', applied: 'Applied: Feb 5',
        borderColor: 'border border-slate-200 dark:border-slate-800',
        actions: [{ label: 'Withdraw', className: 'px-4 py-2 border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50' }],
        timeline: [
            { label: 'Applied', active: true, activeColor: 'slate' },
            { label: 'Shortlist', number: '2' },
            { label: 'Interview', number: '3' },
        ],
        note: "Under review by the recruiter. You'll be notified once shortlisted."
    },
]

const tabs = [
    { label: 'All', count: 8 },
    { label: 'Applied', count: 2 },
    { label: 'Shortlisted', count: 3 },
    { label: 'Interview', count: 2 },
    { label: 'Offered', count: 1 },
    { label: 'Rejected', count: 0 },
]

const stats = [
    { value: '8', label: 'Total Applied', color: 'text-primary' },
    { value: '3', label: 'Shortlisted', color: 'text-blue-600' },
    { value: '2', label: 'In Interview', color: 'text-purple-600' },
    { value: '1', label: 'Offers', color: 'text-green-600' },
    { value: '0', label: 'Rejected', color: 'text-slate-400' },
]

export default function Applications() {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <>
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold">My Applications</h1>
                    <p className="text-slate-500 mt-1">Track all your job applications and their status</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link to="/student/drives" className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">search</span>
                        Browse Jobs
                    </Link>
                </div>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                {tabs.map((tab, i) => (
                    <button
                        key={tab.label}
                        onClick={() => setActiveTab(i)}
                        className={`px-4 py-2 text-sm font-${i === activeTab ? 'bold' : 'medium'} rounded-lg ${i === activeTab
                            ? 'bg-primary text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                            }`}
                    >
                        {tab.label} ({tab.count})
                    </button>
                ))}
            </div>

            {/* Application Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {stats.map(stat => (
                    <div key={stat.label} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                        <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Applications List */}
            <div className="space-y-4">
                {applications.map((app, i) => (
                    <div key={i} className={`bg-white dark:bg-slate-900 rounded-xl ${app.borderColor} shadow-sm overflow-hidden`}>
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className={`size-14 rounded-xl ${app.bgColor} flex items-center justify-center font-bold text-xl`}>
                                        {app.initials}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="text-lg font-bold">{app.company}</h3>
                                            <span className={`px-2 py-1 ${app.statusBg} text-xs font-bold rounded-full flex items-center gap-1`}>
                                                {app.statusIcon && <span className="material-symbols-outlined text-sm">{app.statusIcon}</span>}
                                                {app.status}
                                            </span>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-400 font-medium">{app.role}</p>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">currency_rupee</span>
                                                {app.salary}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">location_on</span>
                                                {app.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">calendar_month</span>
                                                {app.applied}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {app.actions.map((action, j) => (
                                        action.isLink ? (
                                            <Link key={j} to="/student/interviews" className={action.className}>{action.label}</Link>
                                        ) : action.isStatus ? (
                                            <span key={j} className={action.className}>{action.label}</span>
                                        ) : (
                                            <button key={j} className={action.className}>{action.label}</button>
                                        )
                                    ))}
                                </div>
                            </div>

                            {/* Progress Timeline */}
                            <div className="mt-6 flex items-center gap-2 overflow-x-auto">
                                {app.timeline.map((step, j) => (
                                    <div key={j} className="contents">
                                        <div className="flex items-center gap-2">
                                            <span className={`size-6 rounded-full flex items-center justify-center text-xs ${step.completed
                                                ? 'bg-green-600 text-white'
                                                : step.active
                                                    ? `${step.activeColor === 'blue' ? 'bg-blue-600' : step.activeColor === 'slate' ? 'bg-slate-400' : 'bg-purple-600'} text-white animate-pulse`
                                                    : 'bg-slate-300 dark:bg-slate-600'
                                                }`}>
                                                {step.completed ? (step.isStar ? '★' : '✓') : step.active ? '●' : step.number || ''}
                                            </span>
                                            <span className={`text-xs ${step.completed
                                                ? 'font-medium text-green-600'
                                                : step.active
                                                    ? `font-bold ${step.activeColor === 'blue' ? 'text-blue-600' : step.activeColor === 'slate' ? 'text-slate-600' : 'text-purple-600'}`
                                                    : 'text-slate-500'
                                                }`}>{step.label}</span>
                                        </div>
                                        {j < app.timeline.length - 1 && (
                                            <div className={`flex-1 h-0.5 min-w-8 ${step.completed && app.timeline[j + 1]?.completed
                                                ? 'bg-green-300'
                                                : step.completed && (app.timeline[j + 1]?.active || app.timeline[j + 1]?.completed)
                                                    ? 'bg-green-300'
                                                    : 'bg-slate-200 dark:bg-slate-700'
                                                }`}></div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {app.note && (
                                <p className="text-xs text-slate-500 mt-4 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">info</span>
                                    {app.note}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2">
                <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50" disabled>
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="size-10 flex items-center justify-center rounded-lg bg-primary text-white">1</button>
                <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 hover:bg-slate-50">2</button>
                <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50">
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
            </div>
        </>
    )
}
