const BASE_URL = 'http://localhost:5000/api'

const request = async (endpoint, options = {}) => {
    const saved = localStorage.getItem('placement_auth')
    const authData = saved ? JSON.parse(saved) : null
    const token = authData?.token
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    })

    const data = await response.json()

    if (!response.ok) {
        const error = new Error(data.message || 'Request failed')
        error.response = { data }
        throw error
    }

    return { data }
}

const api = {
    get: (url, options) => request(url, { ...options, method: 'GET' }),
    post: (url, body, options) => request(url, { ...options, method: 'POST', body: JSON.stringify(body) }),
    put: (url, body, options) => request(url, { ...options, method: 'PUT', body: JSON.stringify(body) }),
    delete: (url, options) => request(url, { ...options, method: 'DELETE' }),
}

export default api
