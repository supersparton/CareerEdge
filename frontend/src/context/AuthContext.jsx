import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(() => {
        const saved = localStorage.getItem('placement_auth')
        return saved ? JSON.parse(saved) : { role: null, user: null }
    })

    const login = (role, userData) => {
        const data = {
            role,
            user: userData || {
                name: role === 'student' ? 'Alex Johnson' : role === 'admin' ? 'Training & Placement' : 'Sarah Mitchell',
                email: role === 'student' ? 'alex.johnson@university.edu' : role === 'admin' ? 'tpo@university.edu' : 'sarah@techcorp.com',
                avatar: role === 'student' ? 'AJ' : role === 'admin' ? 'TP' : 'SM',
                subtitle: role === 'student' ? 'B.Tech CS, 2024' : role === 'admin' ? 'Coordinator' : 'HR Manager, TechCorp'
            }
        }
        setAuth(data)
        localStorage.setItem('placement_auth', JSON.stringify(data))
    }

    const logout = () => {
        setAuth({ role: null, user: null })
        localStorage.removeItem('placement_auth')
    }

    return (
        <AuthContext.Provider value={{ ...auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}
