import { createContext, useContext, useState } from 'react'
import api from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(() => {
        const saved = localStorage.getItem('placement_auth')
        return saved ? JSON.parse(saved) : { role: null, user: null, token: null }
    })

    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', { email, password })
            const { token, role, user } = res.data
            const data = { role, user, token }
            setAuth(data)
            localStorage.setItem('placement_auth', JSON.stringify(data))
            return { success: true, role }
        } catch (err) {
            return { success: false, message: err.response?.data?.message || 'Login failed' }
        }
    }

    const register = async (userData) => {
        try {
            const res = await api.post('/auth/register', userData)
            const { token, role, user } = res.data
            const data = { role, user, token }
            setAuth(data)
            localStorage.setItem('placement_auth', JSON.stringify(data))
            return { success: true, role }
        } catch (err) {
            return { success: false, message: err.response?.data?.message || 'Registration failed' }
        }
    }

    const logout = () => {
        setAuth({ role: null, user: null, token: null })
        localStorage.removeItem('placement_auth')
    }

    return (
        <AuthContext.Provider value={{ ...auth, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}
