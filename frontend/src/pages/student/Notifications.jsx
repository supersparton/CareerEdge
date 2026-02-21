export default function Notifications() {
    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Notifications</h1>
                    <p className="text-slate-500 mt-1">Stay updated on your placement activities</p>
                </div>
                <button className="text-sm font-bold text-primary hover:underline">Mark all as read</button>
            </div>

            {/* Notification List */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                {/* Urgent Alert Item */}
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors cursor-pointer">
                    <div className="flex gap-3">
                        <div className="size-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-600 shrink-0">
                            <span className="material-symbols-outlined">warning</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                                Alert: Interview for TCS starts in 15 mins
                            </p>
                            <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">Urgent Reminder • Join via portal</p>
                            <div className="flex gap-2 mt-2">
                                <button className="px-3 py-1 bg-amber-600 text-white text-xs font-bold rounded-md hover:bg-amber-700">Join Now</button>
                                <button className="px-3 py-1 bg-transparent border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 text-xs font-bold rounded-md">Dismiss</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* New Drive Item */}
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                    <div className="flex gap-3">
                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined">work</span>
                        </div>
                        <div className="flex flex-col grow">
                            <div className="flex justify-between items-start">
                                <p className="text-sm font-medium text-slate-900 dark:text-white leading-snug">
                                    New Drive: <span className="text-primary font-bold">Amazon SDE-1</span> announced
                                </p>
                                <span className="text-[10px] text-slate-400 font-medium shrink-0">2m ago</span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Application deadline: Oct 24th, 2024</p>
                        </div>
                        <div className="size-2 rounded-full bg-primary shrink-0 mt-1.5"></div>
                    </div>
                </div>

                {/* System Item */}
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                    <div className="flex gap-3">
                        <div className="size-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 shrink-0">
                            <span className="material-symbols-outlined">check_circle</span>
                        </div>
                        <div className="flex flex-col grow">
                            <div className="flex justify-between items-start">
                                <p className="text-sm font-medium text-slate-900 dark:text-white leading-snug">
                                    System: Your Resume Parsing is complete
                                </p>
                                <span className="text-[10px] text-slate-400 font-medium shrink-0">10m ago</span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Optimization score: 85/100</p>
                        </div>
                    </div>
                </div>

                {/* Read Item */}
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer opacity-70 group">
                    <div className="flex gap-3">
                        <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                            <span className="material-symbols-outlined">description</span>
                        </div>
                        <div className="flex flex-col grow">
                            <div className="flex justify-between items-start">
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-snug">
                                    Profile updated successfully
                                </p>
                                <span className="text-[10px] text-slate-400 font-medium shrink-0">1h ago</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Application shortlisted */}
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                    <div className="flex gap-3">
                        <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shrink-0">
                            <span className="material-symbols-outlined">thumb_up</span>
                        </div>
                        <div className="flex flex-col grow">
                            <div className="flex justify-between items-start">
                                <p className="text-sm font-medium text-slate-900 dark:text-white leading-snug">
                                    You've been <span className="text-blue-600 font-bold">shortlisted</span> for Goldman Sachs SDE-1
                                </p>
                                <span className="text-[10px] text-slate-400 font-medium shrink-0">3h ago</span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Interview scheduled for Feb 12</p>
                        </div>
                        <div className="size-2 rounded-full bg-primary shrink-0 mt-1.5"></div>
                    </div>
                </div>

                {/* Offer Item */}
                <div className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                    <div className="flex gap-3">
                        <div className="size-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 shrink-0">
                            <span className="material-symbols-outlined">emoji_events</span>
                        </div>
                        <div className="flex flex-col grow">
                            <div className="flex justify-between items-start">
                                <p className="text-sm font-medium text-slate-900 dark:text-white leading-snug">
                                    🎉 Congratulations! <span className="text-green-600 font-bold">Google</span> has sent you an offer
                                </p>
                                <span className="text-[10px] text-slate-400 font-medium shrink-0">1d ago</span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">SDE Intern • ₹1.8L/month • Respond by Feb 15</p>
                        </div>
                        <div className="size-2 rounded-full bg-primary shrink-0 mt-1.5"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
