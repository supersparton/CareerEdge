import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function Profile() {
    const handleShareProfile = () => {
        const profileUrl = window.location.origin + '/student/profile'
        navigator.clipboard.writeText(profileUrl).then(() => {
            toast.success('Profile link copied to clipboard!')
        }).catch(() => {
            toast.error('Failed to copy link')
        })
    }

    const handleDownloadResume = () => {
        const resumeContent = `
═══════════════════════════════════════════════════
                    PRIYA SHARMA
           Full Stack Developer | B.Tech CS
═══════════════════════════════════════════════════

CONTACT
───────────────────────────────────────────────────
Email:    priya.s@university.edu
Phone:    +91 98765 43210
Location: Mumbai, India
LinkedIn: linkedin.com/in/priyasharma
GitHub:   github.com/priyasharma

EDUCATION
───────────────────────────────────────────────────
B.Tech in Computer Science
University Institute of Technology | 2020 - 2024
CPI: 8.9/10 | Class Rank: #12 | Attendance: 94%

TECHNICAL SKILLS
───────────────────────────────────────────────────
Languages:    Java, JavaScript, Python, C++
Frameworks:   React.js, Node.js, Express, Tailwind CSS
Tools:        Git & GitHub, Docker, AWS (Basic), Postman

PROJECTS
───────────────────────────────────────────────────
E-commerce Microservices Platform
  • Built with Spring Boot microservices architecture
  • Features: product catalog, order management, payment gateway
  • Tech: Java, Spring Boot, MySQL

AI Support Chatbot
  • NLP-based chatbot for automated customer support
  • 85% accuracy in intent recognition
  • Tech: Python, TensorFlow, NLP

CODING PROFILES
───────────────────────────────────────────────────
LeetCode:      450+ problems solved (Top 5%)
GeeksForGeeks: 1200 problems (Inst. Rank #3)
GitHub:        45 Repositories (Active contributor)

PLACEMENT STATUS
───────────────────────────────────────────────────
Status: Shortlisted (2 Active Companies)
        `.trim()

        const blob = new Blob([resumeContent], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'Priya_Sharma_Resume.txt'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        toast.success('Resume downloaded!')
    }

    return (
        <>
            {/* Breadcrumbs */}
            <nav className="flex mb-6 text-sm text-slate-500 dark:text-slate-400">
                <a className="hover:text-primary transition-colors" href="#">Home</a>
                <span className="mx-2">/</span>
                <a className="hover:text-primary transition-colors" href="#">Students</a>
                <span className="mx-2">/</span>
                <span className="text-slate-900 dark:text-white font-medium">Priya Sharma</span>
            </nav>

            {/* Profile Header Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                        <div className="relative group">
                            <div className="size-28 rounded-full border-4 border-white dark:border-slate-900 shadow-md overflow-hidden bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                                PS
                            </div>
                            <div className="absolute bottom-1 right-1 bg-green-500 size-4 rounded-full border-2 border-white dark:border-slate-900"></div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Priya Sharma</h1>
                                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                                    <span className="material-symbols-outlined text-[14px]">verified</span>
                                    Verified by TPO
                                </span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 mb-3 text-base">Final Year Computer Science | Full Stack Developer</p>
                            <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                                <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[18px] text-slate-400">mail</span>
                                    priya.s@university.edu
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[18px] text-slate-400">call</span>
                                    +91 98765 43210
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[18px] text-slate-400">location_on</span>
                                    Mumbai, India
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <button
                            onClick={handleShareProfile}
                            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
                        >
                            <span className="material-symbols-outlined text-[20px]">share</span>
                            Share Profile
                        </button>
                        <button
                            onClick={handleDownloadResume}
                            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
                        >
                            <span className="material-symbols-outlined text-[20px]">download</span>
                            Download Resume
                        </button>
                        <Link
                            to="/student/resume-builder"
                            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                        >
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                            Edit Profile
                        </Link>
                    </div>
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Academic Stats */}
                    <section>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">analytics</span>
                            Academic Performance
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between h-32">
                                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">CPI</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-slate-900 dark:text-white">8.9</span>
                                    <span className="text-sm text-green-600 font-medium">↑ 0.2</span>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between h-32">
                                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Department</span>
                                <span className="text-2xl font-bold text-slate-900 dark:text-white">CS</span>
                            </div>
                            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between h-32">
                                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Attendance</span>
                                <div className="w-full">
                                    <span className="text-3xl font-bold text-slate-900 dark:text-white">94%</span>
                                    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 mt-2">
                                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '94%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between h-32">
                                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Rank</span>
                                <span className="text-3xl font-bold text-primary">#12</span>
                            </div>
                        </div>
                    </section>

                    {/* Technical Stack */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">code</span>
                                Technical Stack
                            </h2>
                            <a className="text-sm text-primary font-medium hover:underline" href="#">View All Badges</a>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="mb-6">
                                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Languages</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                                        <span className="size-2 rounded-full bg-orange-500"></span> Java
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800">
                                        <span className="size-2 rounded-full bg-yellow-500"></span> JavaScript
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                        <span className="size-2 rounded-full bg-blue-500"></span> Python
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                        C++
                                    </span>
                                </div>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Frameworks & Libraries</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">React.js</span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800">Node.js</span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">Express</span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">Tailwind CSS</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Tools & Platforms</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">Git & GitHub</span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">Docker</span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800">AWS (Basic)</span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">Postman</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Featured Projects */}
                    <section>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">rocket_launch</span>
                            Featured Projects
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                                <div className="h-32 w-full relative" style={{ backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                                    <div className="absolute inset-0 bg-black/10"></div>
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-slate-900 dark:text-white text-lg">E-commerce Microservices</h3>
                                        <a className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" href="#">
                                            <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                                        </a>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                                        A scalable e-commerce backend built with Spring Boot microservices, featuring product catalog, order management, and payment gateway integration.
                                    </p>
                                    <div className="mt-auto flex flex-wrap gap-2">
                                        <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">Java</span>
                                        <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">Spring Boot</span>
                                        <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">MySQL</span>
                                    </div>
                                </div>
                            </div>
                            <div className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                                <div className="h-32 w-full relative" style={{ backgroundImage: 'linear-gradient(135deg, #13547a 0%, #80d0c7 100%)' }}>
                                    <div className="absolute inset-0 bg-black/10"></div>
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-slate-900 dark:text-white text-lg">AI Support Chatbot</h3>
                                        <a className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" href="#">
                                            <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                                        </a>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                                        NLP-based chatbot using Python and TensorFlow to automate customer support queries with 85% accuracy in intent recognition.
                                    </p>
                                    <div className="mt-auto flex flex-wrap gap-2">
                                        <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">Python</span>
                                        <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">TensorFlow</span>
                                        <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">NLP</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Recommended Drives (Mock) */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">work</span>
                                Recommended Drives
                            </h2>
                            <Link to="/student/job-drives" className="text-sm text-primary font-medium hover:underline">View All Drives</Link>
                        </div>
                        <div className="space-y-4">
                            {[
                                { company: 'Google', role: 'Software Engineer (L3)', package: '₹45 LPA', location: 'Bangalore, India', date: 'Oct 25, 2024', logo: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' },
                                { company: 'Microsoft', role: 'Full Stack Intern', package: '₹12 LPA', location: 'Hyderabad, India (Remote)', date: 'Nov 02, 2024', logo: 'https://cdn-icons-png.flaticon.com/512/732/732221.png' },
                                { company: 'Amazon', role: 'SDE-1 (AWS)', package: '₹32 LPA', location: 'Direct Placement', date: 'Oct 30, 2024', logo: 'https://cdn-icons-png.flaticon.com/512/5969/5969032.png' },
                            ].map((job, i) => (
                                <div key={i} className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-primary/30 transition-all group">
                                    <div className="size-12 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                                        <img src={job.logo} alt={job.company} className="size-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <h4 className="font-bold text-slate-900 dark:text-white truncate">{job.role}</h4>
                                            <span className="text-xs font-bold text-green-600 shrink-0">{job.package}</span>
                                        </div>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">apartment</span> {job.company}</span>
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> {job.location}</span>
                                        </div>
                                    </div>
                                    <button className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-lg hover:bg-primary hover:text-white transition-all">Apply</button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Placement Status */}
                    <div className="bg-gradient-to-br from-primary to-[#0d2499] rounded-xl p-6 text-white shadow-lg">
                        <h2 className="text-lg font-bold mb-1">Placement Status</h2>
                        <p className="text-blue-100 text-sm mb-4">Current activity overview</p>
                        <div className="flex items-center gap-4 mb-4 bg-white/10 p-3 rounded-lg border border-white/10">
                            <div className="size-10 rounded-full bg-white flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">check_circle</span>
                            </div>
                            <div>
                                <p className="font-bold text-lg">Shortlisted</p>
                                <p className="text-xs text-blue-200">2 Active Companies</p>
                            </div>
                        </div>
                        <div className="w-full bg-blue-900/50 h-2 rounded-full overflow-hidden mb-2">
                            <div className="bg-white h-full rounded-full w-3/4"></div>
                        </div>
                        <p className="text-xs text-blue-200 text-right">Profile Completion: 75%</p>
                    </div>

                    {/* Placement Timeline */}
                    <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">history</span>
                            Placement Timeline
                        </h2>
                        <div className="relative pl-4 border-l-2 border-slate-200 dark:border-slate-700 space-y-8">
                            <div className="relative">
                                <div className="absolute -left-[21px] top-1 size-3.5 rounded-full bg-primary border-4 border-white dark:border-slate-900"></div>
                                <div className="mb-1">
                                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">Today, 10:30 AM</span>
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white">Interview Scheduled</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Microsoft - Technical Round 2</p>
                                <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded text-xs font-medium border border-blue-100 dark:border-blue-800">
                                    <span className="material-symbols-outlined text-[14px]">videocam</span> Join Meeting Link
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[21px] top-1 size-3.5 rounded-full bg-slate-300 dark:bg-slate-600 border-4 border-white dark:border-slate-900"></div>
                                <div className="mb-1">
                                    <span className="text-xs font-medium text-slate-400">2 days ago</span>
                                </div>
                                <h3 className="font-medium text-slate-900 dark:text-white">Shortlisted for Amazon</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Your profile was shortlisted for the SDE-1 role.</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[21px] top-1 size-3.5 rounded-full bg-green-500 border-4 border-white dark:border-slate-900"></div>
                                <div className="mb-1">
                                    <span className="text-xs font-medium text-slate-400">1 week ago</span>
                                </div>
                                <h3 className="font-medium text-slate-900 dark:text-white">Assessment Cleared</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Passed HackerRank coding assessment with score 380/400.</p>
                                <div className="mt-2 flex gap-1">
                                    <span className="size-6 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-[10px] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">A+</span>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[21px] top-1 size-3.5 rounded-full bg-slate-300 dark:bg-slate-600 border-4 border-white dark:border-slate-900"></div>
                                <div className="mb-1">
                                    <span className="text-xs font-medium text-slate-400">Sep 15, 2023</span>
                                </div>
                                <h3 className="font-medium text-slate-900 dark:text-white">Resume Verified</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Verified by TPO Office.</p>
                            </div>
                        </div>
                    </section>

                    {/* Coding Profiles */}
                    <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">terminal</span>
                            Coding Profiles
                        </h2>
                        <div className="space-y-4">
                            {[
                                { initials: 'LC', bg: 'bg-yellow-500', name: 'LeetCode', sub: 'Top 5%', value: '450+', valueColor: 'text-slate-900 dark:text-white' },
                                { initials: 'GFG', bg: 'bg-green-600', name: 'GeeksForGeeks', sub: 'Inst. Rank #3', value: '1200', valueColor: 'text-slate-900 dark:text-white' },
                                { initials: 'GH', bg: 'bg-slate-800', name: 'GitHub', sub: '45 Repos', value: 'Active', valueColor: 'text-green-600' },
                            ].map(cp => (
                                <div key={cp.name} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className={`size-8 rounded ${cp.bg} flex items-center justify-center text-white font-bold text-xs`}>{cp.initials}</div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{cp.name}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{cp.sub}</p>
                                        </div>
                                    </div>
                                    <span className={`text-sm font-bold ${cp.valueColor}`}>{cp.value}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
