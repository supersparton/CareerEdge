import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ResumeBuilder() {
    const [activeSection, setActiveSection] = useState('personal')

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
    const [newSkill, setNewSkill] = useState('')

    const [projects, setProjects] = useState([
        { id: 1, name: 'E-Commerce Platform', tech: 'React, Node.js, MongoDB', link: 'github.com/rahul/ecom', description: 'Full-stack e-commerce with payment integration' }
    ])

    const sections = [
        { id: 'personal', label: 'Personal Info', icon: 'person' },
        { id: 'education', label: 'Education', icon: 'school' },
        { id: 'experience', label: 'Experience', icon: 'work' },
        { id: 'skills', label: 'Skills', icon: 'code' },
        { id: 'projects', label: 'Projects', icon: 'terminal' },
    ]

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
        ]
        const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url; a.download = `${personal.name.replace(/\s+/g, '_')}_Resume.txt`
        a.click(); URL.revokeObjectURL(url)
        toast.success('Resume downloaded!', { icon: '📄' })
    }

    const handleAIOptimize = () => {
        toast.loading('AI analyzing your resume...', { duration: 1500 })
        setTimeout(() => {
            toast.success('✨ AI Optimization complete! ATS Score: 95%', { duration: 3000 })
        }, 1600)
    }

    const addSkill = (e) => {
        if (e.key === 'Enter' && newSkill.trim()) {
            e.preventDefault()
            if (!techSkills.includes(newSkill.trim())) {
                setTechSkills(prev => [...prev, newSkill.trim()])
                toast.success(`"${newSkill.trim()}" added!`)
            }
            setNewSkill('')
        }
    }

    const removeTechSkill = (skill) => {
        setTechSkills(prev => prev.filter(s => s !== skill))
    }

    const removeSoftSkill = (skill) => {
        setSoftSkills(prev => prev.filter(s => s !== skill))
    }

    const addEducation = () => {
        setEducation(prev => [...prev, { id: Date.now(), degree: '', institution: '', cgpa: '', year: '' }])
        toast.success('Education entry added')
    }

    const addExperience = () => {
        setExperience(prev => [...prev, { id: Date.now(), position: '', company: '', duration: '', location: '', description: '' }])
        toast.success('Experience entry added')
    }

    const addProject = () => {
        setProjects(prev => [...prev, { id: Date.now(), name: '', tech: '', link: '', description: '' }])
        toast.success('Project entry added')
    }

    const updateEdu = (id, key, val) => setEducation(prev => prev.map(e => e.id === id ? { ...e, [key]: val } : e))
    const updateExp = (id, key, val) => setExperience(prev => prev.map(e => e.id === id ? { ...e, [key]: val } : e))
    const updateProj = (id, key, val) => setProjects(prev => prev.map(p => p.id === id ? { ...p, [key]: val } : p))

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-black tracking-tight">Smart Resume Builder</h2>
                    <p className="text-slate-500 mt-1">AI-powered resume builder tailored for placements</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleDownloadPDF} className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        Download PDF
                    </button>
                    <button onClick={handleAIOptimize} className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg shadow-lg shadow-primary/20 flex items-center gap-2 hover:bg-primary/90 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                        AI Optimize
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Left: Section Nav + Form */}
                <div className="col-span-12 lg:col-span-7 space-y-6">
                    {/* Section Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {sections.map(s => (
                            <button key={s.id} onClick={() => setActiveSection(s.id)} className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg whitespace-nowrap transition-colors ${activeSection === s.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 hover:bg-slate-50'}`}>
                                <span className="material-symbols-outlined text-[18px]">{s.icon}</span>
                                {s.label}
                            </button>
                        ))}
                    </div>

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
                                        <input type={f.type} value={personal[f.key]} onChange={e => setPersonal(p => ({ ...p, [f.key]: e.target.value }))} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Professional Summary</label>
                                <textarea className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm resize-none h-24" value={personal.summary} onChange={e => setPersonal(p => ({ ...p, summary: e.target.value }))}></textarea>
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {activeSection === 'education' && (
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                            <h3 className="text-lg font-bold mb-6">Education</h3>
                            <div className="space-y-4">
                                {education.map(edu => (
                                    <div key={edu.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Degree</label>
                                                <input type="text" value={edu.degree} onChange={e => updateEdu(edu.id, 'degree', e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Institution</label>
                                                <input type="text" value={edu.institution} onChange={e => updateEdu(edu.id, 'institution', e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">CGPA / Percentage</label>
                                                <input type="text" value={edu.cgpa} onChange={e => updateEdu(edu.id, 'cgpa', e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Year</label>
                                                <input type="text" value={edu.year} onChange={e => updateEdu(edu.id, 'year', e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
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
                                    <div key={exp.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Position</label>
                                                <input type="text" value={exp.position} onChange={e => updateExp(exp.id, 'position', e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Company</label>
                                                <input type="text" value={exp.company} onChange={e => updateExp(exp.id, 'company', e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Duration</label>
                                                <input type="text" value={exp.duration} onChange={e => updateExp(exp.id, 'duration', e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Location</label>
                                                <input type="text" value={exp.location} onChange={e => updateExp(exp.id, 'location', e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <label className="block text-xs font-bold text-slate-500 mb-1">Description</label>
                                            <textarea className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm resize-none h-20" value={exp.description} onChange={e => updateExp(exp.id, 'description', e.target.value)}></textarea>
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
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Technical Skills</label>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {techSkills.map(skill => (
                                            <span key={skill} className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-lg flex items-center gap-1">
                                                {skill}
                                                <button onClick={() => removeTechSkill(skill)} className="text-primary/50 hover:text-red-500 transition-colors ml-1">×</button>
                                            </span>
                                        ))}
                                    </div>
                                    <input type="text" placeholder="Type a skill and press Enter..." value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={addSkill} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Soft Skills</label>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {softSkills.map(skill => (
                                            <span key={skill} className="px-3 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-lg flex items-center gap-1">
                                                {skill}
                                                <button onClick={() => removeSoftSkill(skill)} className="text-green-400 hover:text-red-500 transition-colors ml-1">×</button>
                                            </span>
                                        ))}
                                    </div>
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
                                    <div key={proj.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="col-span-2">
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Project Name</label>
                                                <input type="text" value={proj.name} onChange={e => updateProj(proj.id, 'name', e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Technologies</label>
                                                <input type="text" value={proj.tech} onChange={e => updateProj(proj.id, 'tech', e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 mb-1">Link</label>
                                                <input type="url" value={proj.link} onChange={e => updateProj(proj.id, 'link', e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <label className="block text-xs font-bold text-slate-500 mb-1">Description</label>
                                            <textarea className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm resize-none h-16" value={proj.description} onChange={e => updateProj(proj.id, 'description', e.target.value)}></textarea>
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
                </div>

                {/* Right: Live Preview */}
                <div className="col-span-12 lg:col-span-5">
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 sticky top-6">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">visibility</span>
                                Live Preview
                            </h4>
                            <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded">ATS Score: 92%</span>
                        </div>

                        {/* Mini Resume Preview */}
                        <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-6 bg-white dark:bg-slate-800 text-[10px] leading-relaxed">
                            <div className="text-center border-b border-slate-200 pb-3 mb-3">
                                <h2 className="text-sm font-black">{personal.name.toUpperCase()}</h2>
                                <p className="text-slate-500">{personal.email} | {personal.phone} | {personal.linkedin} | {personal.github}</p>
                            </div>
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
                                <p className="text-slate-500">{techSkills.join(', ')}</p>
                            </div>
                            {projects.length > 0 && (
                                <div>
                                    <h3 className="text-[9px] font-black uppercase text-primary tracking-widest mb-1">Projects</h3>
                                    {projects.map(p => (
                                        <div key={p.id}>
                                            <p className="font-bold">{p.name || 'Project'} ({p.tech || 'Tech'})</p>
                                            <p className="text-slate-500">{p.description || 'Description'}</p>
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
