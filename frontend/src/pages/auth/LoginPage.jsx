import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

// ─── Validation Helpers ───────────────────────────────
const validateEmail = (email, role) => {
    if (!email) return 'Email is required'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return 'Please enter a valid email address'
    if ((role === 'student' || role === 'admin') && !email.toLowerCase().endsWith('@adaniuni.ac.in')) {
        return 'Student & Admin must use @adaniuni.ac.in email'
    }
    return ''
}

const validatePassword = (password) => {
    const errors = []
    if (password.length < 8) errors.push('At least 8 characters')
    if (!/[A-Z]/.test(password)) errors.push('At least one uppercase letter')
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) errors.push('At least one special symbol')
    return errors
}

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('student')
    const [showPassword, setShowPassword] = useState(false)
    const [remember, setRemember] = useState(false)
    const [touched, setTouched] = useState({ email: false, password: false })
    const { login } = useAuth()
    const navigate = useNavigate()

    const emailError = touched.email ? validateEmail(email, role) : ''
    const passwordErrors = touched.password ? validatePassword(password) : []

    const handleSubmit = async (e) => {
        e.preventDefault()
        setTouched({ email: true, password: true })
        const eErr = validateEmail(email, role)
        const pErrs = validatePassword(password)
        if (eErr) { toast.error(eErr); return }
        if (pErrs.length > 0) { toast.error(pErrs[0]); return }
        
        const res = await login(email, password)
        if (res.success) {
            toast.success(`Welcome! Logged in as ${res.role}`)
            navigate(`/${res.role}`)
        } else {
            toast.error(res.message)
        }
    }

    return (
        <div className="flex min-h-screen w-full flex-col lg:flex-row font-display text-slate-600">
            {/* Left Side: Visual/Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-primary items-center justify-center p-12 overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern height="40" id="grid" patternUnits="userSpaceOnUse" width="40">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"></path>
                            </pattern>
                        </defs>
                        <rect fill="url(#grid)" height="100%" width="100%"></rect>
                    </svg>
                </div>
                <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-2xl"></div>
                <div className="relative z-10 max-w-lg text-center lg:text-left">
                    <div className="mb-8 flex items-center justify-center lg:justify-start gap-3">
                        <div className="bg-white p-2 rounded-xl shadow-lg">
                            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd"></path>
                            </svg>
                        </div>
                        <span className="text-3xl font-bold text-white tracking-tight">CareerEdge</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
                        Launch your career <br />with confidence.
                    </h1>
                    <p className="text-white/80 text-lg mb-10 leading-relaxed">
                        Connecting top-tier talent from colleges with global enterprises. Access curated job opportunities, internship tracks, and placement analytics.
                    </p>
                    <div className="grid grid-cols-2 gap-6 text-white/90">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined bg-white/20 p-2 rounded-lg">verified_user</span>
                            <span className="text-sm font-medium">Verified Profiles</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined bg-white/20 p-2 rounded-lg">trending_up</span>
                            <span className="text-sm font-medium">Growth Analytics</span>
                        </div>
                    </div>
                    <div className="mt-12 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                        <img
                            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80&auto=format&fit=crop"
                            alt="Students collaborating in a modern campus setting"
                            className="h-64 w-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Right Side: Login Section */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 md:p-20 bg-background-light dark:bg-background-dark">
                <div className="w-full max-w-[480px]">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
                        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd"></path>
                        </svg>
                        <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">CareerEdge</span>
                    </div>

                    <div className="bg-white dark:bg-slate-900 shadow-xl shadow-indigo-100/50 dark:shadow-none rounded-2xl p-8 border border-slate-100 dark:border-slate-800">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back</h2>
                            <p className="text-slate-500 dark:text-slate-400">Secure access to your career placement portal</p>
                        </div>

                        {/* Role Switcher */}
                        <div className="mb-8 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl flex">
                            {[
                                { value: 'student', label: 'Student' },
                                { value: 'admin', label: 'Admin/TPO' },
                                { value: 'recruiter', label: 'Recruiter' },
                            ].map(r => (
                                <button
                                    key={r.value}
                                    type="button"
                                    onClick={() => setRole(r.value)}
                                    className={`flex-1 py-2.5 text-center text-sm font-semibold rounded-lg transition-all ${role === r.value
                                        ? 'bg-white dark:bg-slate-700 text-primary shadow-sm'
                                        : 'text-slate-500 dark:text-slate-400'
                                        }`}
                                >
                                    {r.label}
                                </button>
                            ))}
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email (College ID)</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">alternate_email</span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        onBlur={() => setTouched(t => ({ ...t, email: true }))}
                                        className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400 ${emailError ? 'border-red-400' : 'border-slate-200 dark:border-slate-700'}`}
                                        placeholder={role === 'recruiter' ? 'e.g. name@company.com' : 'e.g. name@adaniuni.ac.in'}
                                        required
                                    />
                                </div>
                                {emailError && <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1"><span className="material-symbols-outlined text-xs">error</span>{emailError}</p>}
                                {!emailError && role !== 'recruiter' && <p className="text-xs text-slate-400 mt-1.5">Must use @adaniuni.ac.in domain</p>}
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                                    <a className="text-xs font-semibold text-primary hover:underline" href="#">Forgot password?</a>
                                </div>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        onBlur={() => setTouched(t => ({ ...t, password: true }))}
                                        className={`w-full pl-11 pr-12 py-3.5 bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 dark:text-white placeholder:text-slate-400 ${passwordErrors.length > 0 ? 'border-red-400' : 'border-slate-200 dark:border-slate-700'}`}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                    </button>
                                </div>
                                {passwordErrors.length > 0 && (
                                    <div className="mt-1.5 space-y-0.5">
                                        {passwordErrors.map((err, i) => (
                                            <p key={i} className="text-xs text-red-500 flex items-center gap-1">
                                                <span className="material-symbols-outlined text-xs">close</span>{err}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                                    id="remember"
                                    type="checkbox"
                                    checked={remember}
                                    onChange={e => setRemember(e.target.checked)}
                                />
                                <label className="text-sm text-slate-600 dark:text-slate-400" htmlFor="remember">Remember this device</label>
                            </div>
                            <button
                                className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98]"
                                type="submit"
                            >
                                Sign In
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-8 text-center">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                            </div>
                            <span className="relative px-4 text-xs font-semibold uppercase tracking-wider text-slate-400 bg-white dark:bg-slate-900">Or continue with</span>
                        </div>

                        {/* Social Login */}
                        <button className="w-full py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl flex items-center justify-center gap-3 transition-all text-slate-700 dark:text-slate-300 font-semibold shadow-sm">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                            </svg>
                            Sign in with Google
                        </button>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Don't have an account?{' '}
                                <Link className="text-primary font-bold hover:underline" to="/register">Register Now</Link>
                            </p>
                        </div>
                    </div>

                    {/* Footer Support Links */}
                    <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs font-medium text-slate-400">
                        <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                        <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                        <a className="hover:text-primary transition-colors flex items-center gap-1" href="#">
                            <span className="material-symbols-outlined text-sm">support_agent</span>
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
