import { useState } from 'react'

export default function Settings() {
    const [settings, setSettings] = useState({
        newJobDrives: true,
        applicationUpdates: true,
        interviewReminders: true,
        emailNotifications: true,
        smsNotifications: false,
        profileVisibleToRecruiters: true,
        showEmailToCompanies: true,
        showPhoneNumber: false,
    })

    const toggle = (key) => setSettings(s => ({ ...s, [key]: !s[key] }))

    const Toggle = ({ id }) => (
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={settings[id]} onChange={() => toggle(id)} className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-200 peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
    )

    return (
        <div className="max-w-5xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-slate-500 mt-1">Manage your account preferences and privacy</p>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Settings Navigation */}
                <div className="col-span-12 md:col-span-3">
                    <nav className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        {[
                            { icon: 'person', label: 'Profile', active: true },
                            { icon: 'notifications', label: 'Notifications' },
                            { icon: 'lock', label: 'Privacy' },
                            { icon: 'palette', label: 'Appearance' },
                            { icon: 'security', label: 'Security' },
                        ].map(item => (
                            <a key={item.label} href={`#${item.label.toLowerCase()}`}
                                className={`flex items-center gap-3 px-4 py-3 border-l-4 ${item.active
                                    ? 'bg-primary/10 text-primary font-semibold border-primary'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border-transparent'
                                    }`}>
                                <span className="material-symbols-outlined">{item.icon}</span>
                                <span>{item.label}</span>
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Settings Content */}
                <div className="col-span-12 md:col-span-9 space-y-6">
                    {/* Profile Settings */}
                    <div id="profile" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                            <h3 className="font-bold text-lg">Profile Settings</h3>
                            <p className="text-sm text-slate-500 mt-1">Update your personal information and photo</p>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <div className="size-24 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">RS</div>
                                    <button className="absolute bottom-0 right-0 size-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90">
                                        <span className="material-symbols-outlined text-sm">edit</span>
                                    </button>
                                </div>
                                <div>
                                    <p className="font-semibold">Profile Photo</p>
                                    <p className="text-sm text-slate-500 mb-2">JPG, PNG or GIF. Max 2MB</p>
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1 bg-primary text-white text-sm font-medium rounded">Upload</button>
                                        <button className="px-3 py-1 border border-slate-300 text-slate-600 text-sm font-medium rounded">Remove</button>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Full Name</label>
                                    <input type="text" defaultValue="Rahul Sharma" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20" />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Email</label>
                                    <input type="email" defaultValue="rahul.sharma@college.edu" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20" />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Phone</label>
                                    <input type="tel" defaultValue="+91 98765 43210" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20" />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Roll Number</label>
                                    <input type="text" defaultValue="CS21B1045" readOnly className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notification Settings */}
                    <div id="notifications" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                            <h3 className="font-bold text-lg">Notification Preferences</h3>
                            <p className="text-sm text-slate-500 mt-1">Choose how you want to be notified</p>
                        </div>
                        <div className="p-6 space-y-4">
                            {[
                                { id: 'newJobDrives', title: 'New Job Drives', desc: 'Get notified when new drives match your profile' },
                                { id: 'applicationUpdates', title: 'Application Updates', desc: 'Status changes on your applications' },
                                { id: 'interviewReminders', title: 'Interview Reminders', desc: 'Get reminders before scheduled interviews' },
                                { id: 'emailNotifications', title: 'Email Notifications', desc: 'Receive updates via email' },
                                { id: 'smsNotifications', title: 'SMS Notifications', desc: 'Receive urgent updates via SMS', last: true },
                            ].map(item => (
                                <div key={item.id} className={`flex items-center justify-between py-3 ${!item.last ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}>
                                    <div>
                                        <p className="font-medium">{item.title}</p>
                                        <p className="text-sm text-slate-500">{item.desc}</p>
                                    </div>
                                    <Toggle id={item.id} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Privacy Settings */}
                    <div id="privacy" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                            <h3 className="font-bold text-lg">Privacy Settings</h3>
                            <p className="text-sm text-slate-500 mt-1">Control who can see your information</p>
                        </div>
                        <div className="p-6 space-y-4">
                            {[
                                { id: 'profileVisibleToRecruiters', title: 'Profile Visible to Recruiters', desc: 'Allow recruiters to view your profile' },
                                { id: 'showEmailToCompanies', title: 'Show Email to Companies', desc: 'Display email in application details' },
                                { id: 'showPhoneNumber', title: 'Show Phone Number', desc: 'Display phone in application details', last: true },
                            ].map(item => (
                                <div key={item.id} className={`flex items-center justify-between py-3 ${!item.last ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}>
                                    <div>
                                        <p className="font-medium">{item.title}</p>
                                        <p className="text-sm text-slate-500">{item.desc}</p>
                                    </div>
                                    <Toggle id={item.id} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Appearance Settings */}
                    <div id="appearance" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                            <h3 className="font-bold text-lg">Appearance</h3>
                            <p className="text-sm text-slate-500 mt-1">Customize the look and feel</p>
                        </div>
                        <div className="p-6">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">Theme</label>
                            <div className="flex gap-4">
                                {[
                                    { value: 'light', icon: 'light_mode', iconColor: 'text-amber-500', label: 'Light', checked: true },
                                    { value: 'dark', icon: 'dark_mode', iconColor: 'text-indigo-500', label: 'Dark' },
                                    { value: 'system', icon: 'computer', iconColor: 'text-slate-500', label: 'System' },
                                ].map(theme => (
                                    <label key={theme.value} className="flex-1 cursor-pointer">
                                        <input type="radio" name="theme" value={theme.value} defaultChecked={theme.checked} className="sr-only peer" />
                                        <div className="p-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl peer-checked:border-primary peer-checked:bg-primary/5 text-center">
                                            <span className={`material-symbols-outlined text-3xl ${theme.iconColor} mb-2`}>{theme.icon}</span>
                                            <p className="font-medium">{theme.label}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Security Settings */}
                    <div id="security" className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                            <h3 className="font-bold text-lg">Security</h3>
                            <p className="text-sm text-slate-500 mt-1">Manage your account security</p>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                                <div>
                                    <p className="font-medium">Change Password</p>
                                    <p className="text-sm text-slate-500">Last changed 30 days ago</p>
                                </div>
                                <button className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50">Change</button>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                                <div>
                                    <p className="font-medium">Two-Factor Authentication</p>
                                    <p className="text-sm text-slate-500">Add extra security to your account</p>
                                </div>
                                <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90">Enable</button>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <div>
                                    <p className="font-medium">Active Sessions</p>
                                    <p className="text-sm text-slate-500">Manage devices logged into your account</p>
                                </div>
                                <button className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50">View</button>
                            </div>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 p-6">
                        <h3 className="font-bold text-lg text-red-700 dark:text-red-400 mb-2">Danger Zone</h3>
                        <p className="text-sm text-red-600 dark:text-red-400 mb-4">These actions are irreversible. Please proceed with caution.</p>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30">
                                Delete Account
                            </button>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                            Save All Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
