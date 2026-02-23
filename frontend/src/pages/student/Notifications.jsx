import { useState } from 'react'
import toast from 'react-hot-toast'

const initialNotifications = [
    {
        id: 1, type: 'urgent',
        title: 'Alert: Interview for TCS starts in 15 mins',
        subtitle: 'Urgent Reminder • Join via portal',
        icon: 'warning', iconBg: 'bg-amber-500/20', iconColor: 'text-amber-600',
        bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-l-4 border-amber-500',
        link: 'https://meet.google.com/tcs-interview',
        unread: true, time: '2m ago',
    },
    {
        id: 2, type: 'drive',
        title: <>New Drive: <span className="text-primary font-bold">Amazon SDE-1</span> announced</>,
        subtitle: 'Application deadline: Oct 24th, 2024',
        icon: 'work', iconBg: 'bg-primary/10', iconColor: 'text-primary',
        unread: true, time: '2m ago',
    },
    {
        id: 3, type: 'system',
        title: 'System: Your Resume Parsing is complete',
        subtitle: 'Optimization score: 85/100',
        icon: 'check_circle', iconBg: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600',
        unread: true, time: '10m ago',
    },
    {
        id: 4, type: 'read',
        title: 'Profile updated successfully',
        subtitle: null,
        icon: 'description', iconBg: 'bg-slate-100 dark:bg-slate-800', iconColor: 'text-slate-400',
        unread: false, time: '1h ago',
    },
    {
        id: 5, type: 'shortlist',
        title: <>You've been <span className="text-blue-600 font-bold">shortlisted</span> for Goldman Sachs SDE-1</>,
        subtitle: 'Interview scheduled for Feb 12',
        icon: 'thumb_up', iconBg: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600',
        unread: true, time: '3h ago',
    },
    {
        id: 6, type: 'offer',
        title: <>🎉 Congratulations! <span className="text-green-600 font-bold">Google</span> has sent you an offer</>,
        subtitle: 'SDE Intern • ₹1.8L/month • Respond by Feb 15',
        icon: 'emoji_events', iconBg: 'bg-green-100 dark:bg-green-900/30', iconColor: 'text-green-600',
        unread: true, time: '1d ago',
    },
]

export default function Notifications() {
    const [notifications, setNotifications] = useState(initialNotifications)

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
        toast.success('All notifications marked as read')
    }

    const dismiss = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id))
        toast('Notification dismissed', { icon: '🗑️' })
    }

    const handleJoinNow = (link) => {
        window.open(link, '_blank')
        toast.success('Joining interview...', { icon: '📹' })
    }

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Notifications</h1>
                    <p className="text-slate-500 mt-1">Stay updated on your placement activities</p>
                </div>
                <button onClick={markAllRead} className="text-sm font-bold text-primary hover:underline">Mark all as read</button>
            </div>

            {/* Notification List */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                {notifications.length === 0 && (
                    <div className="p-12 text-center">
                        <span className="material-symbols-outlined text-5xl text-slate-300 mb-3 block">notifications_off</span>
                        <p className="text-slate-500 font-medium">No notifications</p>
                    </div>
                )}
                {notifications.map(n => (
                    <div key={n.id} className={`p-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group ${n.bg || ''} ${n.border || ''} ${!n.unread ? 'opacity-60' : ''}`}>
                        <div className="flex gap-3">
                            <div className={`size-10 rounded-full ${n.iconBg} flex items-center justify-center ${n.iconColor} shrink-0`}>
                                <span className="material-symbols-outlined">{n.icon}</span>
                            </div>
                            <div className="flex flex-col grow">
                                <div className="flex justify-between items-start">
                                    <p className={`text-sm font-${n.unread ? 'semibold' : 'medium'} ${n.type === 'urgent' ? 'text-amber-900 dark:text-amber-200' : 'text-slate-900 dark:text-white'} leading-snug`}>
                                        {n.title}
                                    </p>
                                    <span className="text-[10px] text-slate-400 font-medium shrink-0 ml-2">{n.time}</span>
                                </div>
                                {n.subtitle && <p className={`text-xs mt-1 ${n.type === 'urgent' ? 'text-amber-700 dark:text-amber-400 font-medium' : 'text-slate-500 dark:text-slate-400'}`}>{n.subtitle}</p>}
                                {n.type === 'urgent' && (
                                    <div className="flex gap-2 mt-2">
                                        <button onClick={() => handleJoinNow(n.link)} className="px-3 py-1 bg-amber-600 text-white text-xs font-bold rounded-md hover:bg-amber-700 transition-colors">Join Now</button>
                                        <button onClick={() => dismiss(n.id)} className="px-3 py-1 bg-transparent border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 text-xs font-bold rounded-md hover:bg-amber-100 transition-colors">Dismiss</button>
                                    </div>
                                )}
                            </div>
                            {n.unread && <div className="size-2 rounded-full bg-primary shrink-0 mt-1.5"></div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
