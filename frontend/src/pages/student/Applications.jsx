import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const initialApplications = [
    {
        id: 1, company: 'Google', initials: 'G', bgColor: 'bg-blue-100 text-blue-600',
        role: 'SDE Intern', status: 'Offer Received', statusBg: 'bg-green-100 text-green-700',
        statusIcon: 'verified', salary: '₹1.8L/month', location: 'Bengaluru', applied: 'Applied: Jan 15',
        borderColor: 'border-2 border-green-200 dark:border-green-800', tab: 'Offered',
        timeline: [
            { label: 'Applied', completed: true },
            { label: 'Shortlisted', completed: true },
            { label: 'Round 1', completed: true },
            { label: 'Round 2', completed: true },
            { label: 'Offer', completed: true, isStar: true },
        ]
    },
    {
        id: 2, company: 'Goldman Sachs', initials: 'GS', bgColor: 'bg-gradient-to-br from-blue-500 to-purple-600 text-white',
        role: 'SDE-1', status: 'Interview Stage', statusBg: 'bg-purple-100 text-purple-700',
        salary: '₹22-26 LPA', location: 'Bengaluru', applied: 'Applied: Jan 20',
        borderColor: 'border border-slate-200 dark:border-slate-800', tab: 'Interview',
        timeline: [
            { label: 'Applied', completed: true },
            { label: 'Shortlisted', completed: true },
            { label: 'Round 1', completed: true },
            { label: 'Round 2', completed: true },
            { label: 'HR Round', active: true },
        ]
    },
    {
        id: 3, company: 'Microsoft', initials: 'MS', bgColor: 'bg-blue-600 text-white',
        role: 'SDE-1', status: 'Interview Stage', statusBg: 'bg-purple-100 text-purple-700',
        salary: '₹38-50 LPA', location: 'Hyderabad', applied: 'Applied: Jan 25',
        borderColor: 'border border-slate-200 dark:border-slate-800', tab: 'Interview',
        timeline: [
            { label: 'Applied', completed: true },
            { label: 'Shortlisted', completed: true },
            { label: 'Round 1', active: true },
            { label: 'Round 2', number: '2' },
        ]
    },
    {
        id: 4, company: 'Amazon', initials: 'A', bgColor: 'bg-orange-500 text-white',
        role: 'SDE + Data Science', status: 'Shortlisted', statusBg: 'bg-blue-100 text-blue-700',
        salary: '₹28-45 LPA', location: 'Bengaluru', applied: 'Applied: Feb 1',
        borderColor: 'border border-slate-200 dark:border-slate-800', tab: 'Shortlisted',
        timeline: [
            { label: 'Applied', completed: true },
            { label: 'Shortlisted', active: true, activeColor: 'blue' },
            { label: 'Round 1', number: '1' },
        ]
    },
    {
        id: 5, company: 'Stripe', initials: 'S', bgColor: 'bg-green-600 text-white',
        role: 'Backend Engineer', status: 'Applied', statusBg: 'bg-slate-100 text-slate-600',
        salary: '₹40-55 LPA', location: 'Remote', applied: 'Applied: Feb 5',
        borderColor: 'border border-slate-200 dark:border-slate-800', tab: 'Applied',
        timeline: [
            { label: 'Applied', active: true, activeColor: 'slate' },
            { label: 'Shortlist', number: '2' },
            { label: 'Interview', number: '3' },
        ],
        note: "Under review by the recruiter. You'll be notified once shortlisted."
    },
]

const tabs = ['All', 'Applied', 'Shortlisted', 'Interview', 'Offered', 'Rejected']

export default function Applications() {
    const [activeTab, setActiveTab] = useState('All')
    const [applications, setApplications] = useState(initialApplications)

    const filtered = activeTab === 'All' ? applications : applications.filter(a => a.tab === activeTab)

    const tabCounts = {
        All: applications.length,
        Applied: applications.filter(a => a.tab === 'Applied').length,
        Shortlisted: applications.filter(a => a.tab === 'Shortlisted').length,
        Interview: applications.filter(a => a.tab === 'Interview').length,
        Offered: applications.filter(a => a.tab === 'Offered').length,
        Rejected: applications.filter(a => a.tab === 'Rejected').length,
    }

    const stats = [
        { value: applications.length, label: 'Total Applied', color: 'text-primary' },
        { value: tabCounts.Shortlisted, label: 'Shortlisted', color: 'text-blue-600' },
        { value: tabCounts.Interview, label: 'In Interview', color: 'text-purple-600' },
        { value: tabCounts.Offered, label: 'Offers', color: 'text-green-600' },
        { value: tabCounts.Rejected, label: 'Rejected', color: 'text-slate-400' },
    ]

    const handleAcceptOffer = (id) => {
        setApplications(prev => prev.map(a => a.id === id ? {
            ...a, status: 'Offer Accepted ✅', statusBg: 'bg-green-100 text-green-700',
            statusIcon: 'check_circle', borderColor: 'border-2 border-green-300 dark:border-green-700'
        } : a))
        toast.success('🎉 Congratulations! Offer accepted!', { duration: 4000 })
    }

    const handleDecline = (id) => {
        if (!confirm('Are you sure you want to decline this offer?')) return
        setApplications(prev => prev.map(a => a.id === id ? {
            ...a, status: 'Declined', statusBg: 'bg-red-100 text-red-700', tab: 'Rejected',
            statusIcon: null, borderColor: 'border border-slate-200 dark:border-slate-800'
        } : a))
        toast('Offer declined', { icon: '❌' })
    }

    const handleWithdraw = (id) => {
        if (!confirm('Are you sure you want to withdraw this application?')) return
        setApplications(prev => prev.filter(a => a.id !== id))
        toast('Application withdrawn', { icon: '🗑️' })
    }

    const getActions = (app) => {
        if (app.status === 'Offer Received') {
            return (
                <>
                    <button onClick={() => handleAcceptOffer(app.id)} className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition-colors">Accept Offer</button>
                    <button onClick={() => handleDecline(app.id)} className="px-4 py-2 border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors">Decline</button>
                </>
            )
        }
        if (app.status === 'Offer Accepted ✅') {
            return <span className="px-4 py-2 bg-green-50 text-green-700 text-sm font-bold rounded-lg">✅ Accepted</span>
        }
        if (app.status === 'Declined') {
            return <span className="px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg">Declined</span>
        }
        if (app.tab === 'Interview') {
            return <Link to="/student/interviews" className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors">View Interview</Link>
        }
        if (app.tab === 'Shortlisted') {
            return <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg">Awaiting Interview</span>
        }
        if (app.tab === 'Applied') {
            return <button onClick={() => handleWithdraw(app.id)} className="px-4 py-2 border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors">Withdraw</button>
        }
        return null
    }

    return (
        <>
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold">My Applications</h1>
                    <p className="text-slate-500 mt-1">Track all your job applications and their status</p>
                </div>
                <Link to="/student/drives" className="self-start px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">search</span>
                    Browse Jobs
                </Link>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm rounded-lg whitespace-nowrap transition-colors ${tab === activeTab
                            ? 'bg-primary text-white font-bold'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 font-medium'
                            }`}
                    >
                        {tab} ({tabCounts[tab]})
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
                {filtered.length === 0 && (
                    <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                        <span className="material-symbols-outlined text-5xl text-slate-300 mb-3 block">inbox</span>
                        <p className="text-slate-500 font-medium">No {activeTab.toLowerCase()} applications</p>
                    </div>
                )}
                {filtered.map(app => (
                    <div key={app.id} className={`bg-white dark:bg-slate-900 rounded-xl ${app.borderColor} shadow-sm overflow-hidden`}>
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
                                    {getActions(app)}
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
        </>
    )
}
