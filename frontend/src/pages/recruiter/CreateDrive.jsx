import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function CreateDrive() {
    const navigate = useNavigate()
    const [activeStep, setActiveStep] = useState(0)
    const [form, setForm] = useState({
        title: '', department: 'Engineering', type: 'Full-time', location: '',
        pkgMin: '', pkgMax: '', openings: '', description: '',
        minCGPA: '', backlogPolicy: 'No Active Backlogs',
        branches: ['Computer Science', 'Information Technology', 'Electronics'],
        skills: '',
    })
    const [rounds, setRounds] = useState([
        'Online Assessment', 'Technical Interview (Round 1)', 'Technical Interview (Round 2)', 'HR Interview'
    ])

    const steps = ['Job Details', 'Eligibility', 'Selection Process', 'Timeline']

    const updateForm = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

    const toggleBranch = (branch) => {
        setForm(prev => ({
            ...prev,
            branches: prev.branches.includes(branch)
                ? prev.branches.filter(b => b !== branch)
                : [...prev.branches, branch]
        }))
    }

    const addRound = () => {
        const name = prompt('Enter round name:')
        if (name?.trim()) {
            setRounds(prev => [...prev, name.trim()])
            toast.success(`"${name.trim()}" added!`, { icon: '➕' })
        }
    }

    const deleteRound = (index) => {
        const removed = rounds[index]
        setRounds(prev => prev.filter((_, i) => i !== index))
        toast(`"${removed}" removed`, { icon: '🗑️' })
    }

    const handleSaveDraft = () => {
        toast.success('Drive saved as draft!', { icon: '📋', duration: 3000 })
    }

    const handlePublish = () => {
        if (!form.title.trim()) {
            toast.error('Please enter a job title')
            setActiveStep(0)
            return
        }
        if (!form.description.trim()) {
            toast.error('Please add a job description')
            setActiveStep(0)
            return
        }
        toast.success('🚀 Drive published successfully!', { duration: 4000 })
        setTimeout(() => navigate('/recruiter'), 1500)
    }

    return (
        <div>
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-black tracking-tight">Create New Drive</h2>
                    <p className="text-slate-500 mt-1">Fill in the details to create a new placement drive</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleSaveDraft} className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
                        Save as Draft
                    </button>
                </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center gap-4 mb-8">
                {steps.map((step, i) => (
                    <div key={step} className="flex items-center gap-3">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold cursor-pointer transition-all ${i === activeStep ? 'bg-primary text-white shadow-lg shadow-primary/20' : i < activeStep ? 'bg-green-100 text-green-700' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
                            onClick={() => setActiveStep(i)}>
                            <span className="size-6 flex items-center justify-center rounded-full text-xs font-bold bg-white/20">
                                {i < activeStep ? <span className="material-symbols-outlined text-[16px]">check</span> : i + 1}
                            </span>
                            {step}
                        </div>
                        {i < steps.length - 1 && <div className={`w-12 h-0.5 ${i < activeStep ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-700'}`}></div>}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Main Form */}
                <div className="col-span-12 lg:col-span-8">
                    {/* Job Details */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mb-6">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">work</span>
                            Job Details
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Job Title *</label>
                                <input type="text" value={form.title} onChange={e => updateForm('title', e.target.value)} placeholder="e.g. Software Engineer (SDE-1)" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Department *</label>
                                <select value={form.department} onChange={e => updateForm('department', e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20">
                                    <option>Engineering</option>
                                    <option>Analytics</option>
                                    <option>Product</option>
                                    <option>Design</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Employment Type</label>
                                <select value={form.type} onChange={e => updateForm('type', e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20">
                                    <option>Full-time</option>
                                    <option>Internship</option>
                                    <option>Contract</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Location</label>
                                <input type="text" value={form.location} onChange={e => updateForm('location', e.target.value)} placeholder="e.g. Bengaluru, Remote" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Package Range (LPA)</label>
                                <div className="flex gap-3">
                                    <input type="text" value={form.pkgMin} onChange={e => updateForm('pkgMin', e.target.value)} placeholder="Min" className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20" />
                                    <span className="flex items-center text-slate-400">—</span>
                                    <input type="text" value={form.pkgMax} onChange={e => updateForm('pkgMax', e.target.value)} placeholder="Max" className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Number of Openings</label>
                                <input type="number" value={form.openings} onChange={e => updateForm('openings', e.target.value)} placeholder="e.g. 10" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Job Description *</label>
                            <textarea value={form.description} onChange={e => updateForm('description', e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 resize-none h-32" placeholder="Describe the role, responsibilities, and what you're looking for..."></textarea>
                        </div>
                    </div>

                    {/* Eligibility Criteria */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mb-6">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">checklist</span>
                            Eligibility Criteria
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Minimum CGPA</label>
                                <input type="text" value={form.minCGPA} onChange={e => updateForm('minCGPA', e.target.value)} placeholder="e.g. 7.0" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Backlog Policy</label>
                                <select value={form.backlogPolicy} onChange={e => updateForm('backlogPolicy', e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20">
                                    <option>No Active Backlogs</option>
                                    <option>No Backlogs (Current + History)</option>
                                    <option>Max 1 Backlog Allowed</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Eligible Branches</label>
                            <div className="flex flex-wrap gap-3">
                                {['Computer Science', 'Information Technology', 'Electronics', 'Electrical', 'Mechanical', 'MBA'].map(branch => (
                                    <label key={branch} className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                                        <input type="checkbox" className="rounded text-primary focus:ring-primary/20" checked={form.branches.includes(branch)} onChange={() => toggleBranch(branch)} />
                                        <span className="text-sm">{branch}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Required Skills</label>
                            <input type="text" value={form.skills} onChange={e => updateForm('skills', e.target.value)} placeholder="e.g. React, Node.js, Python (comma separated)" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20" />
                        </div>
                    </div>

                    {/* Selection Process */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mb-6">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">fact_check</span>
                            Selection Process
                        </h3>
                        <div className="space-y-4">
                            {rounds.map((round, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                    <span className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">{i + 1}</span>
                                    <div className="flex-1">
                                        <p className="font-bold text-sm">{round}</p>
                                    </div>
                                    <button onClick={() => deleteRound(i)} className="text-slate-400 hover:text-red-500 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                    </button>
                                </div>
                            ))}
                            <button onClick={addRound} className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-500 hover:border-primary hover:text-primary transition-colors">
                                <span className="material-symbols-outlined text-[18px]">add</span>
                                Add Round
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end gap-4">
                        <button onClick={handleSaveDraft} className="px-6 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
                            Save as Draft
                        </button>
                        <button onClick={handlePublish} className="px-8 py-2.5 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                            Publish Drive
                        </button>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    {/* Preview Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sticky top-6">
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">visibility</span>
                            Live Preview
                        </h4>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined">code</span>
                                </div>
                                <div>
                                    <h5 className="font-bold text-sm">{form.title || 'Job Title'}</h5>
                                    <p className="text-xs text-slate-500">Goldman Sachs • {form.location || 'Location'}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                                <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded">{form.type}</span>
                                {(form.pkgMin || form.pkgMax) && (
                                    <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded">₹{form.pkgMin || '?'}-{form.pkgMax || '?'} LPA</span>
                                )}
                                {form.openings && <span className="px-2 py-1 bg-purple-50 text-purple-600 text-[10px] font-bold rounded">{form.openings} openings</span>}
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">{form.description || 'Job description will appear here...'}</p>
                            {rounds.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{rounds.length} Selection Rounds</p>
                                    <p className="text-xs text-slate-500">{rounds.join(' → ')}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                        <h4 className="font-bold mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-amber-500">tips_and_updates</span>
                            Tips
                        </h4>
                        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                            <div className="flex gap-2">
                                <span className="material-symbols-outlined text-green-500 text-[18px] shrink-0">check_circle</span>
                                <p>Detailed job descriptions attract 3x more qualified candidates</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="material-symbols-outlined text-green-500 text-[18px] shrink-0">check_circle</span>
                                <p>Specify clear eligibility criteria to reduce unqualified applications</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="material-symbols-outlined text-green-500 text-[18px] shrink-0">check_circle</span>
                                <p>Adding a timeline helps students prepare better for the process</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
