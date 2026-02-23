import { useState, useRef } from 'react'
import toast from 'react-hot-toast'

export default function Settings() {
    const fileInputRef = useRef(null)
    const [hasAvatar, setHasAvatar] = useState(false)
    const [avatarPreview, setAvatarPreview] = useState(null)

    const [profile, setProfile] = useState({
        name: 'Rahul Sharma', email: 'rahul.sharma@university.edu', phone: '+91 98765 43210', department: 'Computer Science', enrollment: 'CS2022001'
    })

    const [notifSettings, setNotifSettings] = useState({
        emailNotifications: true, pushNotifications: true, driveAlerts: true, interviewReminders: true, resultUpdates: true, newsletter: false
    })

    const [privacySettings, setPrivacySettings] = useState({
        profileVisible: true, showCGPA: true, showResume: false, showContact: true
    })

    const [theme, setTheme] = useState('System Default')
    const [currentSection, setCurrentSection] = useState('profile')

    const sidebarItems = [
        { id: 'profile', icon: 'person', label: 'Profile' },
        { id: 'notifications', icon: 'notifications', label: 'Notifications' },
        { id: 'privacy', icon: 'lock', label: 'Privacy' },
        { id: 'appearance', icon: 'palette', label: 'Appearance' },
        { id: 'security', icon: 'shield', label: 'Security' },
    ]

    const handleUpload = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error('Please select an image file')
                return
            }
            const url = URL.createObjectURL(file)
            setAvatarPreview(url)
            setHasAvatar(true)
            toast.success('Profile photo updated!')
        }
    }

    const handleRemovePhoto = () => {
        setAvatarPreview(null)
        setHasAvatar(false)
        toast('Profile photo removed', { icon: '🗑️' })
    }

    const handleChangePassword = () => {
        toast.success('Password changed successfully!', { icon: '🔒' })
    }

    const handleEnable2FA = () => {
        toast.success('Two-factor authentication enabled!', { icon: '🛡️' })
    }

    const handleViewSessions = () => {
        toast('Active Sessions:\n• Chrome on Windows (Current)\n• Safari on iPhone (2h ago)', { icon: '💻', duration: 4000 })
    }

    const handleDeleteAccount = () => {
        if (!confirm('⚠️ Are you sure you want to delete your account? This action cannot be undone.')) return
        toast.error('Account deletion request submitted. You will be contacted by admin.', { duration: 5000, icon: '⚠️' })
    }

    const handleSaveAll = () => {
        toast.success('All settings saved successfully!', { icon: '✅', duration: 3000 })
    }

    const Toggle = ({ checked, onChange }) => (
        <button onClick={() => onChange(!checked)} className={`relative w-10 h-5 rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}>
            <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-5' : ''}`}></span>
        </button>
    )

    return (
        <>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-black tracking-tight">Settings</h2>
                    <p className="text-slate-500 mt-1">Manage your account preferences and configurations</p>
                </div>
                <button onClick={handleSaveAll} className="px-6 py-2.5 bg-primary text-white font-bold text-sm rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">save</span>
                    Save All Changes
                </button>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Settings Nav Sidebar */}
                <div className="col-span-12 lg:col-span-3">
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sticky top-6">
                        <div className="space-y-1">
                            {sidebarItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => setCurrentSection(item.id)}
                                    className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentSection === item.id ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Settings Content */}
                <div className="col-span-12 lg:col-span-9 space-y-6">

                    {/* Profile Settings */}
                    {currentSection === 'profile' && (
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">person</span>
                                Profile Information
                            </h3>
                            {/* Avatar Upload */}
                            <div className="flex items-center gap-6 mb-8">
                                <div className="size-20 rounded-full bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                                    {avatarPreview ? <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" /> : 'RS'}
                                </div>
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <button onClick={handleUpload} className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors">Upload</button>
                                        <button onClick={handleRemovePhoto} disabled={!hasAvatar} className="px-4 py-2 border border-slate-200 text-slate-500 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Remove</button>
                                    </div>
                                    <p className="text-xs text-slate-500">JPG, PNG or GIF. Max 2MB.</p>
                                </div>
                            </div>
                            {/* Profile Fields */}
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { label: 'Full Name', key: 'name', type: 'text' },
                                    { label: 'Email', key: 'email', type: 'email' },
                                    { label: 'Phone', key: 'phone', type: 'tel' },
                                    { label: 'Department', key: 'department', type: 'text' },
                                    { label: 'Enrollment No', key: 'enrollment', type: 'text' },
                                ].map(field => (
                                    <div key={field.key}>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{field.label}</label>
                                        <input type={field.type} value={profile[field.key]} onChange={e => setProfile(p => ({ ...p, [field.key]: e.target.value }))} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Notification Settings */}
                    {currentSection === 'notifications' && (
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">notifications</span>
                                Notification Preferences
                            </h3>
                            <div className="space-y-5">
                                {[
                                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
                                    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser and mobile push alerts' },
                                    { key: 'driveAlerts', label: 'New Drive Alerts', desc: 'Get notified about new placement drives' },
                                    { key: 'interviewReminders', label: 'Interview Reminders', desc: 'Reminders before scheduled interviews' },
                                    { key: 'resultUpdates', label: 'Result Updates', desc: 'Notifications for results and offers' },
                                    { key: 'newsletter', label: 'Weekly Newsletter', desc: 'Weekly placement news and tips' },
                                ].map(item => (
                                    <div key={item.key} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
                                        <div>
                                            <p className="text-sm font-medium">{item.label}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                                        </div>
                                        <Toggle checked={notifSettings[item.key]} onChange={(v) => setNotifSettings(p => ({ ...p, [item.key]: v }))} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Privacy Settings */}
                    {currentSection === 'privacy' && (
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">lock</span>
                                Privacy Controls
                            </h3>
                            <div className="space-y-5">
                                {[
                                    { key: 'profileVisible', label: 'Profile Visible to Recruiters', desc: 'Allow recruiters to view your profile' },
                                    { key: 'showCGPA', label: 'Show CGPA', desc: 'Display CGPA on your public profile' },
                                    { key: 'showResume', label: 'Show Resume', desc: 'Make your resume downloadable by recruiters' },
                                    { key: 'showContact', label: 'Show Contact Info', desc: 'Display your email and phone number' },
                                ].map(item => (
                                    <div key={item.key} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
                                        <div>
                                            <p className="text-sm font-medium">{item.label}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                                        </div>
                                        <Toggle checked={privacySettings[item.key]} onChange={(v) => setPrivacySettings(p => ({ ...p, [item.key]: v }))} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Appearance Settings */}
                    {currentSection === 'appearance' && (
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">palette</span>
                                Appearance
                            </h3>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Theme</label>
                                <div className="flex gap-4">
                                    {['Light', 'Dark', 'System Default'].map(t => (
                                        <button key={t} onClick={() => { setTheme(t); toast.success(`Theme set to ${t}`) }} className={`flex-1 py-4 rounded-lg border text-sm font-bold transition-colors ${theme === t ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 dark:border-slate-700 text-slate-600 hover:bg-slate-50'}`}>
                                            <span className="material-symbols-outlined block text-2xl mb-1">{t === 'Light' ? 'light_mode' : t === 'Dark' ? 'dark_mode' : 'computer'}</span>
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Security Settings */}
                    {currentSection === 'security' && (
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">shield</span>
                                Security
                            </h3>
                            <div className="space-y-6">
                                {/* Password */}
                                <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
                                    <div>
                                        <p className="font-medium">Password</p>
                                        <p className="text-xs text-slate-500 mt-1">Last changed 30 days ago</p>
                                    </div>
                                    <button onClick={handleChangePassword} className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors">Change</button>
                                </div>
                                {/* 2FA */}
                                <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
                                    <div>
                                        <p className="font-medium">Two-Factor Authentication</p>
                                        <p className="text-xs text-slate-500 mt-1">Add an extra layer of security</p>
                                    </div>
                                    <button onClick={handleEnable2FA} className="px-4 py-2 border border-green-300 text-green-700 text-xs font-bold rounded-lg hover:bg-green-50 transition-colors">Enable</button>
                                </div>
                                {/* Active Sessions */}
                                <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
                                    <div>
                                        <p className="font-medium">Active Sessions</p>
                                        <p className="text-xs text-slate-500 mt-1">View all active login sessions</p>
                                    </div>
                                    <button onClick={handleViewSessions} className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors">View</button>
                                </div>
                                {/* Delete Account */}
                                <div className="flex items-center justify-between py-4">
                                    <div>
                                        <p className="font-medium text-red-600">Delete Account</p>
                                        <p className="text-xs text-slate-500 mt-1">Permanently delete your account and all data</p>
                                    </div>
                                    <button onClick={handleDeleteAccount} className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors">Delete Account</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
