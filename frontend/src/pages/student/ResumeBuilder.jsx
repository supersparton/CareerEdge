import { useState } from 'react'

export default function ResumeBuilder() {
    const [activeSection, setActiveSection] = useState('personal')

    const sections = [
        { id: 'personal', label: 'Personal Info', icon: 'person' },
        { id: 'education', label: 'Education', icon: 'school' },
        { id: 'experience', label: 'Experience', icon: 'work' },
        { id: 'skills', label: 'Skills', icon: 'code' },
        { id: 'projects', label: 'Projects', icon: 'terminal' },
    ]

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-black tracking-tight">Smart Resume Builder</h2>
                    <p className="text-slate-500 mt-1">AI-powered resume builder tailored for placements</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 rounded-lg text-sm font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        Download PDF
                    </button>
                    <button className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg shadow-lg shadow-primary/20 flex items-center gap-2">
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

                    {/* Personal Info Section */}
                    {activeSection === 'personal' && (
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                            <h3 className="text-lg font-bold mb-6">Personal Information</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                                    <input type="text" defaultValue="Rahul Sharma" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email</label>
                                    <input type="email" defaultValue="rahul.sharma@university.edu" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Phone</label>
                                    <input type="tel" defaultValue="+91 98765 43210" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">LinkedIn</label>
                                    <input type="url" defaultValue="linkedin.com/in/rahulsharma" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">GitHub</label>
                                    <input type="url" defaultValue="github.com/rahulsharma" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Portfolio</label>
                                    <input type="url" placeholder="Optional" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                </div>
                            </div>
                            <div className="mt-6">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Professional Summary</label>
                                <textarea className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm resize-none h-24" defaultValue="Computer Science student with strong problem-solving skills and experience in full-stack web development. Passionate about building scalable applications."></textarea>
                            </div>
                        </div>
                    )}

                    {/* Education Section */}
                    {activeSection === 'education' && (
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                            <h3 className="text-lg font-bold mb-6">Education</h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 mb-1">Degree</label>
                                            <input type="text" defaultValue="B.Tech Computer Science" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 mb-1">Institution</label>
                                            <input type="text" defaultValue="IIT Delhi" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 mb-1">CGPA / Percentage</label>
                                            <input type="text" defaultValue="9.2" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 mb-1">Year</label>
                                            <input type="text" defaultValue="2022-2026" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full p-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-500 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                    Add Education
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Experience Section */}
                    {activeSection === 'experience' && (
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                            <h3 className="text-lg font-bold mb-6">Experience</h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 mb-1">Position</label>
                                            <input type="text" defaultValue="SDE Intern" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 mb-1">Company</label>
                                            <input type="text" defaultValue="Microsoft" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 mb-1">Duration</label>
                                            <input type="text" defaultValue="May 2025 - Jul 2025" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 mb-1">Location</label>
                                            <input type="text" defaultValue="Hyderabad" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Description</label>
                                        <textarea className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm resize-none h-20" defaultValue="Worked on Azure cloud services..."></textarea>
                                    </div>
                                </div>
                                <button className="w-full p-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-500 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">add</span>
                                    Add Experience
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Skills Section */}
                    {activeSection === 'skills' && (
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                            <h3 className="text-lg font-bold mb-6">Skills</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Technical Skills</label>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {['React.js', 'Node.js', 'Python', 'Java', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker'].map(skill => (
                                            <span key={skill} className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-lg flex items-center gap-1">
                                                {skill}
                                                <button className="text-primary/50 hover:text-red-500">×</button>
                                            </span>
                                        ))}
                                    </div>
                                    <input type="text" placeholder="Add a skill..." className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Soft Skills</label>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {['Leadership', 'Communication', 'Teamwork', 'Problem Solving'].map(skill => (
                                            <span key={skill} className="px-3 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-lg flex items-center gap-1">
                                                {skill}
                                                <button className="text-green-400 hover:text-red-500">×</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Projects Section */}
                    {activeSection === 'projects' && (
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                            <h3 className="text-lg font-bold mb-6">Projects</h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2">
                                            <label className="block text-xs font-bold text-slate-500 mb-1">Project Name</label>
                                            <input type="text" defaultValue="E-Commerce Platform" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 mb-1">Technologies</label>
                                            <input type="text" defaultValue="React, Node.js, MongoDB" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 mb-1">Link</label>
                                            <input type="url" defaultValue="github.com/rahul/ecom" className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" />
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Description</label>
                                        <textarea className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm resize-none h-16" defaultValue="Full-stack e-commerce with payment integration"></textarea>
                                    </div>
                                </div>
                                <button className="w-full p-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-500 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
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
                                <h2 className="text-sm font-black">RAHUL SHARMA</h2>
                                <p className="text-slate-500">rahul.sharma@university.edu | +91 98765 43210 | LinkedIn | GitHub</p>
                            </div>
                            <div className="mb-3">
                                <h3 className="text-[9px] font-black uppercase text-primary tracking-widest mb-1">Education</h3>
                                <p className="font-bold">B.Tech Computer Science — IIT Delhi (2022–2026)</p>
                                <p className="text-slate-500">CGPA: 9.2/10</p>
                            </div>
                            <div className="mb-3">
                                <h3 className="text-[9px] font-black uppercase text-primary tracking-widest mb-1">Experience</h3>
                                <p className="font-bold">SDE Intern — Microsoft (May–Jul 2025)</p>
                                <p className="text-slate-500">Worked on Azure cloud services...</p>
                            </div>
                            <div className="mb-3">
                                <h3 className="text-[9px] font-black uppercase text-primary tracking-widest mb-1">Skills</h3>
                                <p className="text-slate-500">React.js, Node.js, Python, Java, MongoDB, PostgreSQL, AWS, Docker</p>
                            </div>
                            <div>
                                <h3 className="text-[9px] font-black uppercase text-primary tracking-widest mb-1">Projects</h3>
                                <p className="font-bold">E-Commerce Platform (React, Node.js, MongoDB)</p>
                                <p className="text-slate-500">Full-stack e-commerce with payment integration</p>
                            </div>
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
