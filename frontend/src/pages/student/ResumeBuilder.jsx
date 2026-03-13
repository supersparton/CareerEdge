import { useState, useRef } from 'react'
import toast from 'react-hot-toast'

export default function ResumeBuilder() {
    const [activeSection, setActiveSection] = useState('resume')
    const fileInputRef = useRef(null)

    // ─── Resume Upload State ──────────────────────────────
    const [resumeFile, setResumeFile] = useState(null)
    const [isDragging, setIsDragging] = useState(false)
    const [isExtracting, setIsExtracting] = useState(false)

    const [personal, setPersonal] = useState({
        name: 'Rahul Sharma', email: 'rahul.sharma@university.edu', phone: '+91 98765 43210',
        linkedin: 'linkedin.com/in/rahulsharma', github: 'github.com/rahulsharma', portfolio: '',
        summary: 'Computer Science student with strong problem-solving skills and experience in full-stack web development. Passionate about building scalable applications.'
    })

    const [education, setEducation] = useState([
        { id: 1, degree: 'B.Tech Computer Science', institution: 'IIT Delhi', cgpa: '9.2', year: '2022-2026' }
    ])

    const [experience, setExperience] = useState([
        { id: 1, position: 'SDE Intern', company: 'Microsoft', duration: 'May 2025 - Jul 2025', location: 'Hyderabad', description: 'Worked on Azure cloud services...' }
    ])

    const [techSkills, setTechSkills] = useState(['React.js', 'Node.js', 'Python', 'Java', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker'])
    const [softSkills, setSoftSkills] = useState(['Leadership', 'Communication', 'Teamwork', 'Problem Solving'])
    const [newTechSkill, setNewTechSkill] = useState('')
    const [newSoftSkill, setNewSoftSkill] = useState('')

    const [projects, setProjects] = useState([
        { id: 1, name: 'E-Commerce Platform', tech: 'React, Node.js, MongoDB', link: 'github.com/rahul/ecom', description: 'Full-stack e-commerce with payment integration' }
    ])

    const [certifications, setCertifications] = useState([
        { id: 1, name: 'AWS Cloud Practitioner', issuer: 'Amazon', year: '2025' }
    ])

    const sections = [
        { id: 'resume', label: 'Resume Upload', icon: 'upload_file' },
        { id: 'personal', label: 'Personal Info', icon: 'person' },
        { id: 'education', label: 'Education', icon: 'school' },
        { id: 'experience', label: 'Experience', icon: 'work' },
        { id: 'skills', label: 'Skills', icon: 'code' },
        { id: 'projects', label: 'Projects', icon: 'terminal' },
        { id: 'certifications', label: 'Certifications', icon: 'workspace_premium' },
    ]

    // ─── Resume Upload Handlers ────────────────────────────
    const handleFileSelect = (file) => {
        if (!file) return
        if (file.type !== 'application/pdf') {
            toast.error('Only PDF files are accepted')
            return
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size must be under 5MB')
            return
        }
        setResumeFile({
            name: file.name,
            size: (file.size / 1024).toFixed(1) + ' KB',
            uploadedAt: new Date().toLocaleString(),
            file: file
        })
        toast.success(`"${file.name}" uploaded successfully!`, { icon: '📄' })
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files[0]
        handleFileSelect(file)
    }

    const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true) }
    const handleDragLeave = () => setIsDragging(false)

    const handleReplaceResume = () => fileInputRef.current?.click()

    const handleDeleteResume = () => {
        setResumeFile(null)
        toast('Resume removed', { icon: '🗑️' })
    }

    const handleAIExtract = () => {
        if (!resumeFile) {
            toast.error('Please upload a resume first')
            return
        }
        setIsExtracting(true)
        toast.loading('🤖 AI is analyzing your resume...', { id: 'ai-extract' })

        // Simulate AI extraction (future: real API call)
        setTimeout(() => {
            setTechSkills(prev => {
                const newSkills = ['TypeScript', 'GraphQL', 'Kubernetes']
                return [...new Set([...prev, ...newSkills])]
            })
            setProjects(prev => [
                ...prev,
                { id: Date.now(), name: 'Task Manager App', tech: 'TypeScript, GraphQL', link: '', description: 'Extracted from resume - collaborative task management tool' }
            ])
            setCertifications(prev => [
                ...prev,
                { id: Date.now(), name: 'Google Cloud Digital Leader', issuer: 'Google', year: '2025' }
            ])
            setIsExtracting(false)
            toast.dismiss('ai-extract')
            toast.success('✨ AI extracted 3 skills, 1 project, and 1 certification from your resume!', { duration: 4000 })
        }, 2500)
    }

    // ─── CRUD Handlers ──────────────────────────────────────
    const addTechSkill = (e) => {
        if (e.key === 'Enter' && newTechSkill.trim()) {
            e.preventDefault()
            if (!techSkills.includes(newTechSkill.trim())) {
                setTechSkills(prev => [...prev, newTechSkill.trim()])
                toast.success(`"${newTechSkill.trim()}" added!`)
            } else {
                toast.error('Skill already exists')
            }
            setNewTechSkill('')
        }
    }

    const addSoftSkill = (e) => {
        if (e.key === 'Enter' && newSoftSkill.trim()) {
            e.preventDefault()
            if (!softSkills.includes(newSoftSkill.trim())) {
                setSoftSkills(prev => [...prev, newSoftSkill.trim()])
                toast.success(`"${newSoftSkill.trim()}" added!`)
            } else {
                toast.error('Skill already exists')
            }
            setNewSoftSkill('')
        }
    }

    const removeTechSkill = (skill) => setTechSkills(prev => prev.filter(s => s !== skill))
    const removeSoftSkill = (skill) => setSoftSkills(prev => prev.filter(s => s !== skill))

    const addEducation = () => { setEducation(prev => [...prev, { id: Date.now(), degree: '', institution: '', cgpa: '', year: '' }]); toast.success('Education entry added') }
    const removeEducation = (id) => { setEducation(prev => prev.filter(e => e.id !== id)); toast('Entry removed', { icon: '🗑️' }) }

    const addExperience = () => { setExperience(prev => [...prev, { id: Date.now(), position: '', company: '', duration: '', location: '', description: '' }]); toast.success('Experience entry added') }
    const removeExperience = (id) => { setExperience(prev => prev.filter(e => e.id !== id)); toast('Entry removed', { icon: '🗑️' }) }

    const addProject = () => { setProjects(prev => [...prev, { id: Date.now(), name: '', tech: '', link: '', description: '' }]); toast.success('Project entry added') }
    const removeProject = (id) => { setProjects(prev => prev.filter(p => p.id !== id)); toast('Entry removed', { icon: '🗑️' }) }

    const addCertification = () => { setCertifications(prev => [...prev, { id: Date.now(), name: '', issuer: '', year: '' }]); toast.success('Certification added') }
    const removeCertification = (id) => { setCertifications(prev => prev.filter(c => c.id !== id)); toast('Entry removed', { icon: '🗑️' }) }

    const updateEdu = (id, key, val) => setEducation(prev => prev.map(e => e.id === id ? { ...e, [key]: val } : e))
    const updateExp = (id, key, val) => setExperience(prev => prev.map(e => e.id === id ? { ...e, [key]: val } : e))
    const updateProj = (id, key, val) => setProjects(prev => prev.map(p => p.id === id ? { ...p, [key]: val } : p))
    const updateCert = (id, key, val) => setCertifications(prev => prev.map(c => c.id === id ? { ...c, [key]: val } : c))

    const handleDownloadPDF = () => {
        const lines = [
            personal.name.toUpperCase(),
            `${personal.email} | ${personal.phone} | ${personal.linkedin} | ${personal.github}`,
            '', '--- EDUCATION ---',
            ...education.map(e => `${e.degree} — ${e.institution} (${e.year})\nCGPA: ${e.cgpa}`),
            '', '--- EXPERIENCE ---',
            ...experience.map(e => `${e.position} — ${e.company} (${e.duration})\n${e.location}\n${e.description}`),
            '', '--- SKILLS ---',
            `Technical: ${techSkills.join(', ')}`,
            `Soft Skills: ${softSkills.join(', ')}`,
            '', '--- PROJECTS ---',
            ...projects.map(p => `${p.name} (${p.tech})\n${p.description}\n${p.link}`),
            '', '--- CERTIFICATIONS ---',
            ...certifications.map(c => `${c.name} — ${c.issuer} (${c.year})`),
        ]
        const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url; a.download = `${personal.name.replace(/\s+/g, '_')}_Resume.txt`
        a.click(); URL.revokeObjectURL(url)
        toast.success('Resume downloaded!', { icon: '📄' })
    }

    const handleSaveProfile = () => {
        toast.success('Profile saved successfully!', { icon: '✅', duration: 2000 })
    }

    // ─── Common input className ───────────────────────────
    const inputCls = 'w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-black tracking-tight">Resume & Profile Manager</h2>
                    <p className="text-slate-500 mt-1">Upload your resume, or manually edit your profile details</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleSaveProfile} className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">save</span>
                        Save Profile
                    </button>
                    <button onClick={handleDownloadPDF} className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg shadow-lg shadow-primary/20 flex items-center gap-2 hover:bg-primary/90 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        Download Resume
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Left: Section Nav + Form */}
                <div className="col-span-12 lg:col-span-7 space-y-6">
                    {/* Section Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {sections.map(s => (
                            <button key={s.id} onClick={() => setActiveSection(s.id)} className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg whitespace-nowrap transition-all ${activeSection === s.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 hover:bg-slate-50'}`}>
                                <span className="material-symbols-outlined text-[18px]">{s.icon}</span>
                                {s.label}
                            </button>
                        ))}
                    </div>

                    {/* ─── Resume Upload Section ──────────────────────── */}
                    {activeSection === 'resume' && (
                        <div className="space-y-6">
                            {/* Upload Area */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">upload_file</span>
                                    Upload Resume
                                </h3>
                                <p className="text-sm text-slate-500 mb-6">Upload your resume as a PDF file. In the future, AI will auto-extract your skills, projects, and experience.</p>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf"
                                    className="hidden"
                                    onChange={(e) => handleFileSelect(e.target.files[0])}
                                />

                                {!resumeFile ? (
                                    <div
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${isDragging
                                                ? 'border-primary bg-primary/5 scale-[1.01]'
                                                : 'border-slate-300 dark:border-slate-700 hover:border-primary hover:bg-primary/5'
                                            }`}
                                    >
                                        <span className="material-symbols-outlined text-5xl text-slate-300 mb-4 block">cloud_upload</span>
                                        <p className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                            {isDragging ? 'Drop your resume here!' : 'Drag & drop your resume here'}
                                        </p>
                                        <p className="text-sm text-slate-500 mt-2">or click to browse files</p>
                                        <p className="text-xs text-slate-400 mt-4">Supported: PDF only • Max size: 5MB</p>
                                    </div>
                                ) : (
                                    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-5 bg-slate-50 dark:bg-slate-800">
                                        <div className="flex items-center gap-4">
                                            <div className="size-14 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center shrink-0">
                                                <span className="material-symbols-outlined text-3xl text-red-500">picture_as_pdf</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-sm truncate">{resumeFile.name}</p>
                                                <p className="text-xs text-slate-500">{resumeFile.size} • Uploaded {resumeFile.uploadedAt}</p>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <button onClick={handleReplaceResume} className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-sm">swap_horiz</span>
                                                    Replace
                                                </button>
                                                <button onClick={handleDeleteResume} className="px-3 py-1.5 border border-red-300 text-red-600 text-xs font-bold rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-sm">delete</span>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-lg">
                                            <span className="material-symbols-outlined text-green-600 text-lg">check_circle</span>
                                            <span className="text-sm font-medium text-green-700 dark:text-green-400">Resume uploaded successfully</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* AI Extract Card */}
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white shadow-xl">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/10 rounded-xl">
                                        <span className="material-symbols-outlined text-3xl">auto_awesome</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-lg">AI Resume Extraction</h4>
                                        <p className="text-indigo-100 text-sm mt-1 mb-4">
                                            Automatically extract skills, projects, education, and experience from your uploaded resume using AI.
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={handleAIExtract}
                                                disabled={!resumeFile || isExtracting}
                                                className="px-5 py-2.5 bg-white text-indigo-600 text-sm font-bold rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                            >
                                                {isExtracting ? (
                                                    <><span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>Extracting...</>
                                                ) : (
                                                    <><span className="material-symbols-outlined text-[18px]">magic_button</span>Extract from Resume</>
                                                )}
                                            </button>
                                            {!resumeFile && <span className="text-indigo-200 text-xs">Upload a resume first</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 p-3 bg-white/10 rounded-lg">
                                    <p className="text-xs text-indigo-100 flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-sm">info</span>
                                        Coming soon: Full AI-powered extraction will auto-fill all your profile sections from the uploaded resume.
                                    </p>
                                </div>
                            </div>

                            {/* Manual Edit Prompt */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                                <h4 className="font-bold mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-amber-500">edit_note</span>
                                    Or Edit Manually
                                </h4>
                                <p className="text-sm text-slate-500 mb-4">Use the tabs above to manually add or edit each section of your profile.</p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {sections.filter(s => s.id !== 'resume').map(s => (
                                        <button key={s.id} onClick={() => setActiveSection(s.id)} className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary/40 hover:bg-primary/5 transition-all flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                                            <span className="material-symbols-outlined text-primary text-[18px]">{s.icon}</span>
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Personal Info */}
                    {activeSection === 'personal' && (
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                            <h3 className="text-lg font-bold mb-6">Personal Information</h3>
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { label: 'Full Name', key: 'name', type: 'text' },
                                    { label: 'Email', key: 'email', type: 'email' },
                                    { label: 'Phone', key: 'phone', type: 'tel' },
                                    { label: 'LinkedIn', key: 'linkedin', type: 'url' },
                                    { label: 'GitHub', key: 'github', type: 'url' },
                                    { label: 'Portfolio', key: 'portfolio', type: 'url' },
                                ].map(f => (
                                    <div key={f.key}>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{f.label}</label>
                                        <input type={f.type} value={personal[f.key]} onChange={e => setPersonal(p => ({ ...p, [f.key]: e.target.value }))} className={inputCls} />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Professional Summary</label>
                                <textarea className={`${inputCls} resize-none h-24`} value={personal.summary} onChange={e => setPersonal(p => ({ ...p, summary: e.target.value }))}></textarea>
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {activeSection === 'education' && (
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                            <h3 className="text-lg font-bold mb-6">Education</h3>
                            <div className="space-y-4">
                                {education.map(edu => (
                                    <div key={edu.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 relative group">
                                        <button onClick={() => removeEducation(edu.id)} className="absolute top-3 right-3 size-7 bg-red-50 text-red-500 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-100" title="Remove">
                                            <span className="material-symbols-outlined text-sm">close</span>
                                        </button>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Degree</label>
                                                <input type="text" value={edu.degree} onChange={e => updateEdu(edu.id, 'degree', e.target.value)} className={inputCls} placeholder="e.g. B.Tech Computer Science" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Institution</label>
                                                <input type="text" value={edu.institution} onChange={e => updateEdu(edu.id, 'institution', e.target.value)} className={inputCls} placeholder="e.g. IIT Delhi" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">CGPA / Percentage</label>
                                                <input type="text" value={edu.cgpa} onChange={e => updateEdu(edu.id, 'cgpa', e.target.value)} className={inputCls} placeholder="e.g. 9.2" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Year</label>
                                                <input type="text" value={edu.year} onChange={e => updateEdu(edu.id, 'year', e.target.value)} className={inputCls} placeholder="e.g. 2022-2026" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={addEducation} className="w-full p-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-500 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                    Add Education
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Experience */}
                    {activeSection === 'experience' && (
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                            <h3 className="text-lg font-bold mb-6">Experience</h3>
                            <div className="space-y-4">
                                {experience.map(exp => (
                                    <div key={exp.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 relative group">
                                        <button onClick={() => removeExperience(exp.id)} className="absolute top-3 right-3 size-7 bg-red-50 text-red-500 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-100" title="Remove">
                                            <span className="material-symbols-outlined text-sm">close</span>
                                        </button>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Position</label>
                                                <input type="text" value={exp.position} onChange={e => updateExp(exp.id, 'position', e.target.value)} className={inputCls} placeholder="e.g. SDE Intern" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Company</label>
                                                <input type="text" value={exp.company} onChange={e => updateExp(exp.id, 'company', e.target.value)} className={inputCls} placeholder="e.g. Microsoft" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Duration</label>
                                                <input type="text" value={exp.duration} onChange={e => updateExp(exp.id, 'duration', e.target.value)} className={inputCls} placeholder="e.g. May 2025 - Jul 2025" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Location</label>
                                                <input type="text" value={exp.location} onChange={e => updateExp(exp.id, 'location', e.target.value)} className={inputCls} placeholder="e.g. Hyderabad" />
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <label className="block text-xs font-bold text-slate-500 mb-1">Description</label>
                                            <textarea className={`${inputCls} resize-none h-20`} value={exp.description} onChange={e => updateExp(exp.id, 'description', e.target.value)} placeholder="Describe your responsibilities and achievements..."></textarea>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={addExperience} className="w-full p-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-500 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                    Add Experience
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Skills */}
                    {activeSection === 'skills' && (
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                            <h3 className="text-lg font-bold mb-6">Skills</h3>
                            <div className="space-y-6">
                                {/* Technical Skills */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Technical Skills</label>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {techSkills.map(skill => (
                                            <span key={skill} className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-lg flex items-center gap-1 group">
                                                {skill}
                                                <button onClick={() => removeTechSkill(skill)} className="text-primary/40 hover:text-red-500 transition-colors ml-1 opacity-70 group-hover:opacity-100">
                                                    <span className="material-symbols-outlined text-xs">close</span>
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                    <input type="text" placeholder="Type a skill and press Enter..." value={newTechSkill} onChange={e => setNewTechSkill(e.target.value)} onKeyDown={addTechSkill} className={inputCls} />
                                </div>
                                {/* Soft Skills */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Soft Skills</label>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {softSkills.map(skill => (
                                            <span key={skill} className="px-3 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-lg flex items-center gap-1 group">
                                                {skill}
                                                <button onClick={() => removeSoftSkill(skill)} className="text-green-400 hover:text-red-500 transition-colors ml-1 opacity-70 group-hover:opacity-100">
                                                    <span className="material-symbols-outlined text-xs">close</span>
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                    <input type="text" placeholder="Type a soft skill and press Enter..." value={newSoftSkill} onChange={e => setNewSoftSkill(e.target.value)} onKeyDown={addSoftSkill} className={inputCls} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Projects */}
                    {activeSection === 'projects' && (
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                            <h3 className="text-lg font-bold mb-6">Projects</h3>
                            <div className="space-y-4">
                                {projects.map(proj => (
                                    <div key={proj.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 relative group">
                                        <button onClick={() => removeProject(proj.id)} className="absolute top-3 right-3 size-7 bg-red-50 text-red-500 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-100" title="Remove">
                                            <span className="material-symbols-outlined text-sm">close</span>
                                        </button>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="col-span-2">
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Project Name</label>
                                                <input type="text" value={proj.name} onChange={e => updateProj(proj.id, 'name', e.target.value)} className={inputCls} placeholder="e.g. E-Commerce Platform" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Technologies</label>
                                                <input type="text" value={proj.tech} onChange={e => updateProj(proj.id, 'tech', e.target.value)} className={inputCls} placeholder="e.g. React, Node.js, MongoDB" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Link</label>
                                                <input type="url" value={proj.link} onChange={e => updateProj(proj.id, 'link', e.target.value)} className={inputCls} placeholder="e.g. github.com/user/project" />
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <label className="block text-xs font-bold text-slate-500 mb-1">Description</label>
                                            <textarea className={`${inputCls} resize-none h-16`} value={proj.description} onChange={e => updateProj(proj.id, 'description', e.target.value)} placeholder="What does this project do?"></textarea>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={addProject} className="w-full p-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-500 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                    Add Project
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Certifications */}
                    {activeSection === 'certifications' && (
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                            <h3 className="text-lg font-bold mb-6">Certifications & Awards</h3>
                            <div className="space-y-4">
                                {certifications.map(cert => (
                                    <div key={cert.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 relative group">
                                        <button onClick={() => removeCertification(cert.id)} className="absolute top-3 right-3 size-7 bg-red-50 text-red-500 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-100" title="Remove">
                                            <span className="material-symbols-outlined text-sm">close</span>
                                        </button>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="col-span-3 sm:col-span-1">
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Certification Name</label>
                                                <input type="text" value={cert.name} onChange={e => updateCert(cert.id, 'name', e.target.value)} className={inputCls} placeholder="e.g. AWS Cloud Practitioner" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Issuing Organization</label>
                                                <input type="text" value={cert.issuer} onChange={e => updateCert(cert.id, 'issuer', e.target.value)} className={inputCls} placeholder="e.g. Amazon" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Year</label>
                                                <input type="text" value={cert.year} onChange={e => updateCert(cert.id, 'year', e.target.value)} className={inputCls} placeholder="e.g. 2025" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={addCertification} className="w-full p-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-500 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                    Add Certification
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Live Preview */}
                <div className="col-span-12 lg:col-span-5">
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 sticky top-6">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">visibility</span>
                                Live Preview
                            </h4>
                            <div className="flex items-center gap-2">
                                {resumeFile && (
                                    <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs">attach_file</span>
                                        PDF Uploaded
                                    </span>
                                )}
                                <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded">ATS Score: 92%</span>
                            </div>
                        </div>

                        {/* Mini Resume Preview */}
                        <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-6 bg-white dark:bg-slate-800 text-[10px] leading-relaxed">
                            <div className="text-center border-b border-slate-200 pb-3 mb-3">
                                <h2 className="text-sm font-black">{personal.name.toUpperCase()}</h2>
                                <p className="text-slate-500">{personal.email} | {personal.phone} | {personal.linkedin} | {personal.github}</p>
                            </div>
                            {personal.summary && (
                                <div className="mb-3">
                                    <h3 className="text-[9px] font-black uppercase text-primary tracking-widest mb-1">Summary</h3>
                                    <p className="text-slate-500">{personal.summary}</p>
                                </div>
                            )}
                            {education.length > 0 && (
                                <div className="mb-3">
                                    <h3 className="text-[9px] font-black uppercase text-primary tracking-widest mb-1">Education</h3>
                                    {education.map(e => (
                                        <div key={e.id}>
                                            <p className="font-bold">{e.degree || 'Degree'} — {e.institution || 'Institution'} ({e.year || 'Year'})</p>
                                            <p className="text-slate-500">CGPA: {e.cgpa || '-'}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {experience.length > 0 && (
                                <div className="mb-3">
                                    <h3 className="text-[9px] font-black uppercase text-primary tracking-widest mb-1">Experience</h3>
                                    {experience.map(e => (
                                        <div key={e.id}>
                                            <p className="font-bold">{e.position || 'Position'} — {e.company || 'Company'} ({e.duration || 'Duration'})</p>
                                            <p className="text-slate-500">{e.description || 'Description'}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="mb-3">
                                <h3 className="text-[9px] font-black uppercase text-primary tracking-widest mb-1">Skills</h3>
                                <p className="text-slate-500"><span className="font-medium">Technical:</span> {techSkills.join(', ')}</p>
                                <p className="text-slate-500"><span className="font-medium">Soft:</span> {softSkills.join(', ')}</p>
                            </div>
                            {projects.length > 0 && (
                                <div className="mb-3">
                                    <h3 className="text-[9px] font-black uppercase text-primary tracking-widest mb-1">Projects</h3>
                                    {projects.map(p => (
                                        <div key={p.id}>
                                            <p className="font-bold">{p.name || 'Project'} ({p.tech || 'Tech'})</p>
                                            <p className="text-slate-500">{p.description || 'Description'}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {certifications.length > 0 && (
                                <div>
                                    <h3 className="text-[9px] font-black uppercase text-primary tracking-widest mb-1">Certifications</h3>
                                    {certifications.map(c => (
                                        <div key={c.id}>
                                            <p className="font-bold">{c.name || 'Certification'} — {c.issuer || 'Issuer'} ({c.year || 'Year'})</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* AI Suggestions */}
                        <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
                            <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                                AI Suggestions
                            </h4>
                            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                                <li className="flex gap-2">
                                    <span className="material-symbols-outlined text-amber-500 text-[14px] shrink-0">lightbulb</span>
                                    Add quantifiable metrics to your experience section
                                </li>
                                <li className="flex gap-2">
                                    <span className="material-symbols-outlined text-amber-500 text-[14px] shrink-0">lightbulb</span>
                                    Include certifications and awards section
                                </li>
                                <li className="flex gap-2">
                                    <span className="material-symbols-outlined text-green-500 text-[14px] shrink-0">check_circle</span>
                                    Good use of action verbs in descriptions
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
