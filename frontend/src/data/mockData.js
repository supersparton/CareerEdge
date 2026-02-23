// ============================
// MOCK DATA FOR PLACEMENT PORTAL
// Expanded to match all original HTML designs
// ============================

export const students = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul@uni.edu', dept: 'Computer Science', cgpa: 8.9, status: 'Placed', company: 'Goldman Sachs', batch: 2024, phone: '+91 98765 43210', regNo: 'CS2024001', photo: null },
    { id: 2, name: 'Priya Patel', email: 'priya@uni.edu', dept: 'Information Technology', cgpa: 9.2, status: 'Placed', company: 'Google', batch: 2024, phone: '+91 98765 43211', regNo: 'IT2024002', photo: null },
    { id: 3, name: 'Amit Kumar', email: 'amit@uni.edu', dept: 'Electronics', cgpa: 7.8, status: 'Pending', company: null, batch: 2024, phone: '+91 98765 43212', regNo: 'EC2024003', photo: null },
    { id: 4, name: 'Sneha Gupta', email: 'sneha@uni.edu', dept: 'Computer Science', cgpa: 9.5, status: 'Placed', company: 'Microsoft', batch: 2024, phone: '+91 98765 43213', regNo: 'CS2024004', photo: null },
    { id: 5, name: 'Vikram Singh', email: 'vikram@uni.edu', dept: 'Mechanical', cgpa: 7.2, status: 'Pending', company: null, batch: 2024, phone: '+91 98765 43214', regNo: 'ME2024005', photo: null },
    { id: 6, name: 'Ananya Verma', email: 'ananya@uni.edu', dept: 'Computer Science', cgpa: 8.7, status: 'Placed', company: 'Amazon', batch: 2024, phone: '+91 98765 43215', regNo: 'CS2024006', photo: null },
    { id: 7, name: 'Karthik Nair', email: 'karthik@uni.edu', dept: 'Electronics', cgpa: 8.1, status: 'Interview', company: null, batch: 2024, phone: '+91 98765 43216', regNo: 'EC2024007', photo: null },
    { id: 8, name: 'Meera Joshi', email: 'meera@uni.edu', dept: 'MBA', cgpa: 8.4, status: 'Placed', company: 'Deloitte', batch: 2024, phone: '+91 98765 43217', regNo: 'MB2024008', photo: null },
    { id: 9, name: 'Rohan Das', email: 'rohan@uni.edu', dept: 'Information Technology', cgpa: 7.6, status: 'Pending', company: null, batch: 2024, phone: '+91 98765 43218', regNo: 'IT2024009', photo: null },
    { id: 10, name: 'Ishita Reddy', email: 'ishita@uni.edu', dept: 'Computer Science', cgpa: 9.1, status: 'Placed', company: 'Meta', batch: 2024, phone: '+91 98765 43219', regNo: 'CS2024010', photo: null },
]

export const companies = [
    { id: 1, name: 'Google', industry: 'Technology', status: 'Active', drives: 3, hires: 12, package: '₹45 LPA', logo: 'G', color: 'bg-blue-500', contact: 'Sarah Chen', contactEmail: 'sarah@google.com', founded: '1998', employees: '180,000+', location: 'Mountain View, CA' },
    { id: 2, name: 'Microsoft', industry: 'Technology', status: 'Active', drives: 2, hires: 8, package: '₹42 LPA', logo: 'M', color: 'bg-emerald-500', contact: 'John Smith', contactEmail: 'john@microsoft.com', founded: '1975', employees: '220,000+', location: 'Redmond, WA' },
    { id: 3, name: 'Amazon', industry: 'Technology', status: 'Active', drives: 4, hires: 15, package: '₹38 LPA', logo: 'A', color: 'bg-amber-500', contact: 'Priya Mehta', contactEmail: 'priya@amazon.com', founded: '1994', employees: '1,500,000+', location: 'Seattle, WA' },
    { id: 4, name: 'Goldman Sachs', industry: 'Finance', status: 'Active', drives: 1, hires: 5, package: '₹35 LPA', logo: 'GS', color: 'bg-indigo-500', contact: 'Michael Brown', contactEmail: 'michael@gs.com', founded: '1869', employees: '45,000+', location: 'New York, NY' },
    { id: 5, name: 'Deloitte', industry: 'Consulting', status: 'Pending', drives: 0, hires: 0, package: '₹18 LPA', logo: 'D', color: 'bg-green-600', contact: 'Ravi Kumar', contactEmail: 'ravi@deloitte.com', founded: '1845', employees: '415,000+', location: 'London, UK' },
    { id: 6, name: 'Meta', industry: 'Technology', status: 'Active', drives: 2, hires: 6, package: '₹56 LPA', logo: 'M', color: 'bg-blue-600', contact: 'Lisa Wong', contactEmail: 'lisa@meta.com', founded: '2004', employees: '86,000+', location: 'Menlo Park, CA' },
    { id: 7, name: 'Adobe', industry: 'Technology', status: 'Pending', drives: 0, hires: 0, package: '₹30 LPA', logo: 'Ad', color: 'bg-red-500', contact: 'David Lee', contactEmail: 'david@adobe.com', founded: '1982', employees: '30,000+', location: 'San Jose, CA' },
    { id: 8, name: 'Stripe', industry: 'Fintech', status: 'Blocked', drives: 1, hires: 3, package: '₹40 LPA', logo: 'S', color: 'bg-purple-500', contact: 'Amy Taylor', contactEmail: 'amy@stripe.com', founded: '2010', employees: '8,000+', location: 'San Francisco, CA' },
]

export const drives = [
    { id: 1, company: 'Google', role: 'SDE Intern', date: '2026-02-24', time: '9:00 AM', venue: 'Seminar Hall', eligible: 89, applied: 67, status: 'Confirmed', package: '₹45 LPA', type: 'Full-time', description: 'Looking for talented software engineers to join our Search team.', requirements: ['B.Tech CS/IT', 'CGPA > 8.0', 'No backlogs'], location: 'Bangalore' },
    { id: 2, company: 'Microsoft', role: 'SDE-1', date: '2026-02-25', time: '10:00 AM', venue: 'Main Auditorium', eligible: 156, applied: 120, status: 'Pending', package: '₹42 LPA', type: 'Full-time', description: 'Join Microsoft Azure team as a full-time SDE.', requirements: ['B.Tech/M.Tech', 'CGPA > 7.5', 'Strong DSA skills'], location: 'Hyderabad' },
    { id: 3, company: 'Amazon', role: 'SDE + DS', date: '2026-02-27', time: '9:30 AM', venue: 'Lab Complex', eligible: 203, applied: 178, status: 'Confirmed', package: '₹38 LPA', type: 'Full-time', description: 'Multiple openings for SDE and Data Science roles.', requirements: ['B.Tech any branch', 'CGPA > 7.0', 'Python/Java'], location: 'Bangalore' },
    { id: 4, company: 'Goldman Sachs', role: 'Analyst', date: '2026-03-01', time: '11:00 AM', venue: 'Conference Hall B', eligible: 45, applied: 32, status: 'Confirmed', package: '₹35 LPA', type: 'Full-time', description: 'Quantitative analyst position in Securities.', requirements: ['B.Tech CS/IT/Math', 'CGPA > 8.5', 'Strong analytical skills'], location: 'Bangalore' },
    { id: 5, company: 'Meta', role: 'Software Engineer', date: '2026-03-05', time: '10:00 AM', venue: 'Virtual', eligible: 120, applied: 95, status: 'Confirmed', package: '₹56 LPA', type: 'Full-time', description: 'Build products used by billions of people.', requirements: ['B.Tech CS/IT', 'CGPA > 8.0', 'React experience preferred'], location: 'Remote' },
]

export const applications = [
    { id: 1, company: 'Google', role: 'SDE Intern', appliedDate: '2026-02-10', status: 'Shortlisted', stage: 'Technical Round', package: '₹45 LPA', timeline: ['Applied', 'Resume Screened', 'Shortlisted'] },
    { id: 2, company: 'Microsoft', role: 'SDE-1', appliedDate: '2026-02-08', status: 'Applied', stage: 'Resume Review', package: '₹42 LPA', timeline: ['Applied'] },
    { id: 3, company: 'Amazon', role: 'SDE', appliedDate: '2026-02-05', status: 'Rejected', stage: 'Online Test', package: '₹38 LPA', timeline: ['Applied', 'Online Test', 'Rejected'] },
    { id: 4, company: 'Goldman Sachs', role: 'Analyst', appliedDate: '2026-02-12', status: 'Interview', stage: 'HR Round', package: '₹35 LPA', timeline: ['Applied', 'Resume Screened', 'Shortlisted', 'Technical Round', 'HR Round'] },
    { id: 5, company: 'Meta', role: 'Software Engineer', appliedDate: '2026-02-15', status: 'Applied', stage: 'Resume Review', package: '₹56 LPA', timeline: ['Applied'] },
    { id: 6, company: 'Deloitte', role: 'Consultant', appliedDate: '2026-01-20', status: 'Accepted', stage: 'Offer Letter', package: '₹18 LPA', timeline: ['Applied', 'Resume Screened', 'Shortlisted', 'Technical Round', 'HR Round', 'Offer Letter'] },
]

export const interviews = [
    { id: 1, company: 'Google', role: 'SDE Intern', date: '2026-02-25', time: '10:00 AM', type: 'Technical', round: 'Round 2', mode: 'Virtual', link: 'https://meet.google.com/abc', status: 'Upcoming', interviewer: 'Sarah Chen' },
    { id: 2, company: 'Goldman Sachs', role: 'Analyst', date: '2026-02-26', time: '2:00 PM', type: 'HR', round: 'Final', mode: 'In-person', venue: 'Conference Room A', status: 'Upcoming', interviewer: 'Michael Brown' },
    { id: 3, company: 'Microsoft', role: 'SDE-1', date: '2026-02-22', time: '11:00 AM', type: 'Technical', round: 'Round 1', mode: 'Virtual', link: 'https://teams.microsoft.com/xyz', status: 'Completed', interviewer: 'John Smith' },
    { id: 4, company: 'Meta', role: 'Software Engineer', date: '2026-03-01', time: '3:00 PM', type: 'System Design', round: 'Round 3', mode: 'Virtual', link: 'https://meet.google.com/def', status: 'Upcoming', interviewer: 'Lisa Wong' },
]

export const notifications = [
    { id: 1, title: 'Google Drive Confirmed', message: 'The Google SDE Intern drive has been confirmed for Feb 24.', time: '5 min ago', type: 'drive', read: false, icon: 'work' },
    { id: 2, title: 'Shortlisted!', message: 'You have been shortlisted for Google SDE Intern position.', time: '1 hour ago', type: 'success', read: false, icon: 'check_circle' },
    { id: 3, title: 'Microsoft Drive Update', message: 'Microsoft SDE-1 drive venue has been updated to Main Auditorium.', time: '2 hours ago', type: 'info', read: true, icon: 'info' },
    { id: 4, title: 'Profile Reminder', message: 'Complete your profile to increase visibility to recruiters.', time: '1 day ago', type: 'warning', read: true, icon: 'warning' },
    { id: 5, title: 'New Drive: Meta', message: 'Meta is visiting campus on March 5 for Software Engineer roles.', time: '2 days ago', type: 'drive', read: true, icon: 'work' },
    { id: 6, title: 'Interview Scheduled', message: 'Your interview with Goldman Sachs is scheduled for Feb 26 at 2 PM.', time: '3 days ago', type: 'interview', read: true, icon: 'event' },
    { id: 7, title: 'Resume Score Updated', message: 'Your AI resume score has been updated to 92/100.', time: '4 days ago', type: 'info', read: true, icon: 'description' },
]

export const recruiterApplications = [
    { id: 1, name: 'John Doe', dept: 'Computer Science', cgpa: 9.2, skills: ['React', 'Node.js', 'TypeScript', 'AWS'], experience: '5y Exp', role: 'Senior Frontend', status: 'Pending', resumeScore: 98, matchLabel: 'Ideal Match', online: true, appliedAgo: '10m ago', about: 'Passionate full-stack developer with 5 years of experience building scalable web applications. Previously worked at Google and a Y Combinator startup.', education: [{ degree: 'M.S. Computer Science', school: 'Stanford University', year: '2019', gpa: '3.9/4.0' }, { degree: 'B.Tech Computer Science', school: 'IIT Bombay', year: '2017', gpa: '9.2/10' }], projects: [{ name: 'E-Commerce Platform', tech: 'React, Node.js, MongoDB', description: 'Built a full-featured e-commerce platform handling 10K+ daily transactions.' }, { name: 'Real-time Chat System', tech: 'WebSocket, Redis, React', description: 'Designed a scalable real-time chat system supporting 100K concurrent users.' }] },
    { id: 2, name: 'Sarah Smith', dept: 'Information Technology', cgpa: 8.8, skills: ['Python', 'Django', 'React', 'Docker'], experience: '3y Exp', role: 'Full Stack Dev', status: 'Shortlisted', resumeScore: 92, matchLabel: null, online: false, appliedAgo: '1h ago', about: 'Full-stack developer specializing in Python and React. Passionate about building developer tools.', education: [{ degree: 'B.Tech IT', school: 'NIT Trichy', year: '2021', gpa: '8.8/10' }], projects: [] },
    { id: 3, name: 'Mike Johnson', dept: 'Computer Science', cgpa: 8.5, skills: ['Java', 'Spring Boot', 'Microservices'], experience: '4y Exp', role: 'Backend Dev', status: 'Pending', resumeScore: 85, matchLabel: null, online: true, appliedAgo: '2h ago', about: 'Backend engineer with expertise in distributed systems and microservices architecture.', education: [{ degree: 'B.Tech CS', school: 'BITS Pilani', year: '2020', gpa: '8.5/10' }], projects: [] },
    { id: 4, name: 'Emily Davis', dept: 'Computer Science', cgpa: 9.0, skills: ['Python', 'ML', 'TensorFlow', 'PyTorch'], experience: '2y Exp', role: 'ML Engineer', status: 'Pending', resumeScore: 78, matchLabel: null, online: false, appliedAgo: '3h ago', about: 'Machine learning engineer focused on NLP and computer vision applications.', education: [{ degree: 'M.Tech AI', school: 'IISc Bangalore', year: '2022', gpa: '9.0/10' }], projects: [] },
    { id: 5, name: 'David Wilson', dept: 'Electronics', cgpa: 7.9, skills: ['Embedded C', 'FPGA', 'IoT'], experience: '3y Exp', role: 'Embedded Engineer', status: 'Rejected', resumeScore: 62, matchLabel: null, online: false, appliedAgo: '5h ago', about: 'Embedded systems engineer with IoT expertise.', education: [{ degree: 'B.Tech ECE', school: 'VIT Vellore', year: '2021', gpa: '7.9/10' }], projects: [] },
    { id: 6, name: 'Ananya Verma', dept: 'Computer Science', cgpa: 8.7, skills: ['React', 'TypeScript', 'GraphQL', 'Next.js'], experience: '2y Exp', role: 'Frontend Dev', status: 'Shortlisted', resumeScore: 90, matchLabel: null, online: true, appliedAgo: '6h ago', about: 'Frontend developer passionate about building accessible and performant web apps.', education: [{ degree: 'B.Tech CS', school: 'DTU Delhi', year: '2022', gpa: '8.7/10' }], projects: [] },
]

export const departmentStats = [
    { name: 'Computer Science', placed: 85, total: 120, eligible: 120 },
    { name: 'Information Technology', placed: 78, total: 95, eligible: 95 },
    { name: 'Electronics', placed: 62, total: 88, eligible: 88 },
    { name: 'Mechanical', placed: 54, total: 75, eligible: 75 },
    { name: 'MBA', placed: 72, total: 60, eligible: 60 },
]

export const profileData = {
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    phone: '+91 98765 43210',
    enrollment: 'CS2024001',
    dept: 'Computer Science',
    batch: 2024,
    year: '4th Year',
    cgpa: 8.9,
    backlogs: 0,
    classRank: 12,
    totalCredits: 168,
    linkedin: '#',
    github: '#',
    portfolio: '#',
    skills: [
        { name: 'React', level: 'Advanced' },
        { name: 'Node.js', level: 'Advanced' },
        { name: 'Python', level: 'Intermediate' },
        { name: 'TypeScript', level: 'Advanced' },
        { name: 'AWS', level: 'Intermediate' },
        { name: 'Docker', level: 'Intermediate' },
        { name: 'MongoDB', level: 'Advanced' },
    ],
    education: [
        { institution: 'University Institute of Technology', degree: 'B.Tech in Computer Science', year: '2020-2024', cgpa: '8.9/10' },
        { institution: 'Delhi Public School', degree: 'Class XII (CBSE)', year: '2018-2020', percentage: '95.2%' },
    ],
    experience: [
        { company: 'Google', role: 'SDE Intern', duration: 'May 2023 - Jul 2023', description: 'Worked on search optimization algorithms for the core search team.' },
        { company: 'Startup XYZ', role: 'Full Stack Developer', duration: 'Jan 2023 - Apr 2023', description: 'Built a customer-facing dashboard using React and Node.js.' },
    ],
    projects: [
        { name: 'Campus Placement Portal', tech: 'React, Node.js, MongoDB', description: 'End-to-end placement management system with role-based dashboards.' },
        { name: 'AI Resume Parser', tech: 'Python, NLP, Flask', description: 'Automated resume parsing with 95% accuracy using NLP techniques.' },
        { name: 'Real-time Chat App', tech: 'Socket.io, React, Redis', description: 'Scalable chat application supporting 10K concurrent users.' },
    ],
    codingProfiles: [
        { platform: 'LeetCode', rating: '1850', solved: 450, url: '#' },
        { platform: 'CodeForces', rating: '1620', solved: 320, url: '#' },
        { platform: 'HackerRank', rating: '5★', solved: 280, url: '#' },
    ],
    placementStatus: 'Placed',
    placedCompany: 'Goldman Sachs',
    placedRole: 'Software Analyst',
    placedPackage: '₹35 LPA',
    activityTimeline: [
        { date: 'Feb 20', event: 'Offer accepted from Goldman Sachs', type: 'success' },
        { date: 'Feb 18', event: 'HR Round cleared at Goldman Sachs', type: 'info' },
        { date: 'Feb 15', event: 'Applied for Meta Software Engineer', type: 'info' },
        { date: 'Feb 12', event: 'Shortlisted by Google for SDE Intern', type: 'success' },
        { date: 'Feb 10', event: 'Applied for Google SDE Intern', type: 'info' },
    ],
}

// Coordinator/Admin Dashboard data
export const coordinatorStats = {
    totalStudents: 2847,
    activeCompanies: 156,
    liveDrives: 23,
    studentsPlaced: 892,
    placementRate: 68.2,
    avgPackage: '₹12.8 LPA',
    highestPackage: '₹45 LPA',
    totalOffers: 892,
}

export const pendingApprovals = [
    { id: 1, type: 'Company Registration', name: 'Adobe Inc.', submitted: '2 hours ago', priority: 'high' },
    { id: 2, type: 'Drive Request', name: 'Microsoft — SDE Intern', submitted: '5 hours ago', priority: 'medium' },
    { id: 3, type: 'Student Grievance', name: 'Drive eligibility dispute', submitted: '1 day ago', priority: 'high' },
]

export const recentActivity = [
    { id: 1, message: 'Google drive confirmed for Feb 24', time: '10 min ago', icon: 'check_circle', color: 'text-green-500' },
    { id: 2, message: 'New company registration: Adobe Inc.', time: '2 hours ago', icon: 'apartment', color: 'text-blue-500' },
    { id: 3, message: '15 students shortlisted by Amazon', time: '3 hours ago', icon: 'group', color: 'text-purple-500' },
    { id: 4, message: 'Microsoft drive venue updated', time: '5 hours ago', icon: 'location_on', color: 'text-amber-500' },
    { id: 5, message: 'Goldman Sachs offers sent to 5 students', time: '1 day ago', icon: 'mail', color: 'text-indigo-500' },
]

// Recruiter Dashboard data
export const recruiterDashboardStats = {
    activeDrives: 4,
    totalApplications: 1248,
    scheduledInterviews: 28,
    offersExtended: 42,
}

export const recruiterActiveDrives = [
    { id: 1, role: 'Senior SDE', status: 'Active', applicants: 342, shortlisted: 45, date: '2026-02-24', dept: 'Engineering' },
    { id: 2, role: 'Data Analyst', status: 'Active', applicants: 189, shortlisted: 28, date: '2026-02-28', dept: 'Analytics' },
    { id: 3, role: 'Product Manager', status: 'Screening', applicants: 256, shortlisted: 30, date: '2026-03-05', dept: 'Product' },
    { id: 4, role: 'ML Engineer', status: 'Upcoming', applicants: 0, shortlisted: 0, date: '2026-03-15', dept: 'AI/ML' },
]

export const recruiterTimeline = [
    { id: 1, message: 'Shortlisted 12 candidates for Senior SDE', time: '30 min ago', icon: 'how_to_reg', color: 'text-green-500' },
    { id: 2, message: 'Scheduled 5 interviews for Data Analyst', time: '2 hours ago', icon: 'event', color: 'text-blue-500' },
    { id: 3, message: 'Received 45 new applications', time: '4 hours ago', icon: 'inbox', color: 'text-purple-500' },
    { id: 4, message: 'Extended offer to Priya Patel', time: '1 day ago', icon: 'send', color: 'text-amber-500' },
    { id: 5, message: 'Created new drive: ML Engineer', time: '2 days ago', icon: 'add_circle', color: 'text-indigo-500' },
]

export const recruiterUpcomingInterviews = [
    { id: 1, candidate: 'Rahul Sharma', role: 'Senior SDE', time: '10:00 AM', date: 'Today', round: 'Technical Round 2', mode: 'Virtual' },
    { id: 2, candidate: 'Sneha Gupta', role: 'Senior SDE', time: '2:00 PM', date: 'Today', round: 'System Design', mode: 'Virtual' },
    { id: 3, candidate: 'Priya Patel', role: 'Data Analyst', time: '11:00 AM', date: 'Tomorrow', round: 'Case Study', mode: 'In-person' },
]

// Interview tips for student interviews sidebar
export const interviewTips = [
    'Research the company culture and recent news before the interview.',
    'Practice common data structure and algorithm problems.',
    'Prepare at least 2-3 questions to ask your interviewer.',
    'Review your resume thoroughly — be ready to discuss any item.',
    'Test your camera, mic, and internet for virtual interviews.',
]

export const recentOffers = [
    { student: 'Rahul Sharma', company: 'Goldman Sachs', package: '₹35 LPA', date: 'Feb 20' },
    { student: 'Priya Patel', company: 'Google', package: '₹45 LPA', date: 'Feb 18' },
    { student: 'Sneha Gupta', company: 'Microsoft', package: '₹42 LPA', date: 'Feb 15' },
]

// Recruiter Company Profile data
export const companyProfileData = {
    name: 'Goldman Sachs',
    industry: 'Financial Services & Technology',
    founded: '1869',
    employees: '45,000+',
    website: 'www.goldmansachs.com',
    hq: 'New York, NY',
    about: 'Goldman Sachs is a leading global investment banking, securities, and investment management firm. We provide a wide range of financial services to a substantial and diversified client base that includes corporations, financial institutions, governments, and individuals.',
    mission: 'To advance sustainable economic growth and financial opportunity. Our people, capital, and expertise help drive the innovation economy.',
    perks: ['Health Insurance', 'Stock Options', 'Remote Work', 'Learning Budget', 'Gym Membership', 'Free Meals', '401(k) Match', 'Parental Leave'],
    techStack: ['React', 'Java', 'Python', 'AWS', 'Kubernetes', 'Kafka', 'PostgreSQL', 'GraphQL'],
    socialLinks: { linkedin: '#', twitter: '#', github: '#' },
    recruitmentStats: {
        totalHires: 156,
        avgPackage: '₹35 LPA',
        returnRate: '92%',
        openPositions: 4,
    },
    cultureValues: [
        { title: 'Client Service', description: 'We are passionate about our clients\' success.', icon: 'handshake' },
        { title: 'Excellence', description: 'We are committed to excellence in everything we do.', icon: 'star' },
        { title: 'Integrity', description: 'We hold ourselves to the highest standards of integrity.', icon: 'verified' },
        { title: 'Partnership', description: 'We work together as one firm.', icon: 'group' },
    ],
    officeLocations: [
        { city: 'New York', country: 'USA', type: 'Global HQ' },
        { city: 'London', country: 'UK', type: 'Regional HQ' },
        { city: 'Bangalore', country: 'India', type: 'Engineering Center' },
        { city: 'Hong Kong', country: 'China', type: 'Regional Office' },
    ],
}

// Settings data
export const settingsData = {
    account: {
        name: 'Alex Johnson',
        email: 'alex.johnson@university.edu',
        phone: '+91 98765 43210',
        dept: 'Computer Science',
    },
    notifications: {
        emailAlerts: true,
        driveUpdates: true,
        applicationUpdates: true,
        interviewReminders: true,
        marketingEmails: false,
    },
    privacy: {
        profileVisible: true,
        showCGPA: true,
        showContact: false,
        allowRecruiterContact: true,
    },
    preferences: {
        darkMode: false,
        language: 'English',
        timezone: 'IST (UTC+5:30)',
    },
}
