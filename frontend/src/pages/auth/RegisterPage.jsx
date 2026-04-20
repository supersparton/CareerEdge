import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

// ─── Validation Helpers ───────────────────────────────
const passwordRules = [
    { label: 'At least 8 characters', test: (p) => p.length >= 8 },
    { label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
    { label: 'One special symbol (!@#$...)', test: (p) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(p) },
]

export default function RegisterPage() {
    const navigate = useNavigate()
    const { register } = useAuth()
    const [step, setStep] = useState(1)
    const [role, setRole] = useState('student')
    const [form, setForm] = useState({ 
        name: '', 
        enrollment: '', 
        department: '', 
        batch: '', 
        companyName: '',
        designation: '',
        adminCode: '',
        email: '', 
        password: '' 
    })
    const [touched, setTouched] = useState({ email: false, password: false })

    const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

    // Email validation
    const getEmailError = () => {
        if (!form.email) return 'Email is required'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(form.email)) return 'Please enter a valid email'
        if (role === 'student' && !form.email.toLowerCase().endsWith('@adaniuni.ac.in')) return 'Must use @adaniuni.ac.in email'
        return ''
    }
    const emailError = touched.email ? getEmailError() : ''

    // Password validation
    const passChecks = passwordRules.map(r => ({ ...r, passed: r.test(form.password) }))
    const allPassValid = passChecks.every(c => c.passed)

    const handleNext = (e) => {
        e.preventDefault()
        if (role === 'student' && (!form.name || !form.enrollment || !form.department)) {
            toast.error('Please fill in all required fields')
            return
        }
        if (role === 'recruiter' && (!form.name || !form.companyName)) {
            toast.error('Please fill in all required fields')
            return
        }
        if (role === 'admin' && (!form.name || !form.adminCode)) {
            toast.error('Please fill in all required fields')
            return
        }
        setStep(2)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setTouched({ email: true, password: true })
        const eErr = getEmailError()
        if (eErr) { toast.error(eErr); return }
        if (!allPassValid) { toast.error('Password does not meet requirements'); return }
        
        const res = await register({
            email: form.email,
            password: form.password,
            role: role,
            name: form.name,
            // Role specific fields
            ...(role === 'student' && { reg_no: form.enrollment, dept: form.department, batch: form.batch }),
            ...(role === 'recruiter' && { company_name: form.companyName, designation: form.designation }),
            ...(role === 'admin' && { admin_code: form.adminCode })
        })

        if (res.success) {
            toast.success('Account created! Welcome.')
            navigate(`/${res.role}`)
        } else {
            toast.error(res.message)
        }
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

                    {/* Role Selection Tabs */}
                    <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                        {['student', 'recruiter', 'admin'].map(r => (
                            <button
                                key={r}
                                onClick={() => { if(step === 1) setRole(r) }}
                                className={`flex-1 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${role === r ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>

                    {/* Stepper Component */}
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-1 flex items-center shadow-sm">
                        <div className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold ${step === 1 ? 'bg-primary/10 text-primary' : 'text-gray-400 dark:text-gray-500'}`}>
                            <span className="material-symbols-outlined text-lg">person</span>
                            <span>Step 1: {role.charAt(0).toUpperCase() + role.slice(1)} Info</span>
                        </div>
                        <div className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm ${step === 2 ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-400 dark:text-gray-500 font-medium'}`}>
                            <span className="material-symbols-outlined text-lg">verified_user</span>
                            <span>Step 2: Security</span>
                        </div>
                    </div>

                    {/* Registration Form Card */}
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 shadow-sm">
                        {step === 1 ? (
                            <form onSubmit={handleNext} className="space-y-5">
                                {/* Common Name Field */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name</label>
                                    <input
                                        value={form.name}
                                        onChange={e => update('name', e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                                        placeholder="e.g. John Doe"
                                        required
                                        type="text"
                                    />
                                </div>

                                {role === 'student' && (
                                    <>
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
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Department</label>
                                                <select
                                                    value={form.department}
                                                    onChange={e => update('department', e.target.value)}
                                                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                                                    required
                                                >
                                                    <option disabled value="">Select Dept</option>
                                                    <option value="cs">Computer Science</option>
                                                    <option value="it">Information Technology</option>
                                                    <option value="ee">Electrical</option>
                                                    <option value="me">Mechanical</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Batch Year</label>
                                                <input
                                                    type="number"
                                                    value={form.batch}
                                                    onChange={e => update('batch', e.target.value)}
                                                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white"
                                                    placeholder="2024"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {role === 'recruiter' && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Company Name</label>
                                            <input
                                                value={form.companyName}
                                                onChange={e => update('companyName', e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white"
                                                placeholder="e.g. Google"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Designation</label>
                                            <input
                                                value={form.designation}
                                                onChange={e => update('designation', e.target.value)}
                                                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white"
                                                placeholder="e.g. HR Manager"
                                            />
                                        </div>
                                    </>
                                )}

                                {role === 'admin' && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Admin Authorization Code</label>
                                        <input
                                            value={form.adminCode}
                                            onChange={e => update('adminCode', e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg py-3 px-4 text-gray-900 dark:text-white"
                                            placeholder="Enter secret code"
                                            required
                                            type="password"
                                        />
                                    </div>
                                )}

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg"
                                    >
                                        Continue to Step 2
                                    </button>
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
                                        onBlur={() => setTouched(t => ({ ...t, email: true }))}
                                        className={`w-full bg-gray-50 dark:bg-gray-800 border rounded-lg py-3 px-4 text-gray-900 dark:text-white ${emailError ? 'border-red-400' : 'border-gray-200'}`}
                                        placeholder={role === 'student' ? 'you@adaniuni.ac.in' : 'you@company.com'}
                                        required
                                    />
                                    {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
                                    <input
                                        type="password"
                                        value={form.password}
                                        onChange={e => update('password', e.target.value)}
                                        onBlur={() => setTouched(t => ({ ...t, password: true }))}
                                        className={`w-full bg-gray-50 dark:bg-gray-800 border rounded-lg py-3 px-4 text-gray-900 dark:text-white ${touched.password && !allPassValid ? 'border-red-400' : 'border-gray-200'}`}
                                        placeholder="Create a strong password"
                                        required
                                    />
                                    {form.password && (
                                        <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-1">
                                            {passChecks.map((c, i) => (
                                                <div key={i} className={`text-[10px] flex items-center gap-1 ${c.passed ? 'text-green-600' : 'text-red-400'}`}>
                                                    <span className="material-symbols-outlined !text-xs">{c.passed ? 'check_circle' : 'cancel'}</span>
                                                    {c.label}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button type="button" onClick={() => setStep(1)} className="flex-1 border dark:border-gray-700 text-gray-500 font-bold py-4 rounded-lg">Back</button>
                                    <button type="submit" className="flex-1 bg-primary text-white font-bold py-4 rounded-lg shadow-lg">Complete Sign Up</button>
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
