import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function RegisterPage() {
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [form, setForm] = useState({ name: '', enrollment: '', department: '', batch: '', email: '', password: '' })

    const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

    const handleNext = (e) => {
        e.preventDefault()
        if (!form.name || !form.enrollment || !form.department) {
            toast.error('Please fill in all required fields')
            return
        }
        setStep(2)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.email || !form.password) {
            toast.error('Please fill in email and password')
            return
        }
        toast.success('Account created! Please login.')
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display flex flex-col">
            {/* Top Navigation Bar */}
            <header className="w-full bg-white dark:bg-background-dark border-b border-gray-200 dark:border-gray-800 px-6 lg:px-20 py-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="bg-primary p-1.5 rounded-lg text-white flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">school</span>
                    </div>
                    <h2 className="text-gray-900 dark:text-white text-xl font-bold tracking-tight">PlacementPortal</h2>
                </div>
                <div className="flex items-center gap-6">
                    <a className="hidden md:block text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-primary transition-colors" href="#">Contact Support</a>
                    <Link to="/login" className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-all">
                        Login
                    </Link>
                </div>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-[540px] flex flex-col gap-8 animate-fadeIn">
                    {/* Page Heading */}
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Create your account</h1>
                        <p className="text-gray-500 dark:text-gray-400">Join the elite network of university placements.</p>
                    </div>

                    {/* Stepper Component */}
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-1 flex items-center shadow-sm">
                        <div className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold ${step === 1 ? 'bg-primary/10 text-primary' : 'text-gray-400 dark:text-gray-500'}`}>
                            <span className="material-symbols-outlined text-lg">person</span>
                            <span>Step 1: Account Info</span>
                        </div>
                        <div className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm ${step === 2 ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-400 dark:text-gray-500 font-medium'}`}>
                            <span className="material-symbols-outlined text-lg">verified_user</span>
                            <span>Step 2: Verification</span>
                        </div>
                    </div>

                    {/* Registration Form Card */}
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 shadow-sm">
                        {step === 1 ? (
                            <form onSubmit={handleNext} className="space-y-5">
                                {/* Full Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">Full Name</label>
                                    <div className="relative">
                                        <input
                                            value={form.name}
                                            onChange={e => update('name', e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                                            placeholder="e.g. John Doe"
                                            required
                                            type="text"
                                        />
                                    </div>
                                </div>
                                {/* Enrollment Number */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Enrollment Number</label>
                                    <input
                                        value={form.enrollment}
                                        onChange={e => update('enrollment', e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                                        placeholder="Enter your university ID"
                                        required
                                        type="text"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Department */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Department</label>
                                        <div className="relative">
                                            <select
                                                value={form.department}
                                                onChange={e => update('department', e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all cursor-pointer"
                                                required
                                            >
                                                <option disabled value="">Select Department</option>
                                                <option value="cs">Computer Science</option>
                                                <option value="ee">Electrical Engineering</option>
                                                <option value="me">Mechanical Engineering</option>
                                                <option value="ce">Civil Engineering</option>
                                                <option value="it">Information Technology</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                                                <span className="material-symbols-outlined">expand_more</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Batch Year */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Batch Year</label>
                                        <input
                                            type="number"
                                            value={form.batch}
                                            onChange={e => update('batch', e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                                            placeholder="e.g. 2024"
                                            min="2000"
                                            max="2030"
                                        />
                                    </div>
                                </div>
                                {/* Action Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
                                    >
                                        <span>Create Account</span>
                                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                    </button>
                                </div>
                                {/* Alternative Link */}
                                <div className="text-center pt-2">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Already have an account?{' '}
                                        <Link className="text-primary font-semibold hover:underline decoration-2 underline-offset-4 transition-all" to="/login">Log in here</Link>
                                    </p>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={e => update('email', e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                                        placeholder="you@university.edu"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
                                    <input
                                        type="password"
                                        value={form.password}
                                        onChange={e => update('password', e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                                        placeholder="Create a strong password"
                                        required
                                    />
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button type="button" onClick={() => setStep(1)} className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold py-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">Back</button>
                                    <button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                                        <span>Create Account</span>
                                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                    </button>
                                </div>
                                <div className="text-center pt-2">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Already have an account?{' '}
                                        <Link className="text-primary font-semibold hover:underline decoration-2 underline-offset-4 transition-all" to="/login">Log in here</Link>
                                    </p>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Trust Badge */}
                    <div className="flex items-center justify-center gap-4 text-gray-400 dark:text-gray-600">
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm">lock</span>
                            <span className="text-xs uppercase tracking-widest font-bold">Secure Registration</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 dark:bg-gray-800 rounded-full"></div>
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm">verified</span>
                            <span className="text-xs uppercase tracking-widest font-bold">University Verified</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Area */}
            <footer className="w-full py-6 px-10 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400 dark:text-gray-500">© 2024 PlacementPortal. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a className="text-xs text-gray-400 dark:text-gray-500 hover:text-primary transition-colors" href="#">Privacy Policy</a>
                        <a className="text-xs text-gray-400 dark:text-gray-500 hover:text-primary transition-colors" href="#">Terms of Service</a>
                        <a className="text-xs text-gray-400 dark:text-gray-500 hover:text-primary transition-colors" href="#">Cookie Policy</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
