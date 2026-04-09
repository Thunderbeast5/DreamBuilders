import { useState, useEffect } from 'react'
import { api } from '../lib/api'
import { AuthContext } from './AuthContextInstance'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  // Attach token to every request
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      localStorage.setItem('token', token)
    } else {
      delete api.defaults.headers.common['Authorization']
      localStorage.removeItem('token')
    }
  }, [token])

  // Fetch current user on mount if token exists
  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setLoading(false)
        return
      }
      try {
        const { data } = await api.get('/auth/me')
        setUser(data)
      } catch {
        setToken(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const login = async (email, password, role) => {
    const { data } = await api.post('/auth/login', { email, password, role })
    setToken(data.token)
    setUser(data.user)
    return data
  }

  const signup = async (name, email, password, role) => {
    const { data } = await api.post('/auth/register', {
      name,
      email,
      password,
      role,
    })
    setToken(data.token)
    setUser(data.user)
    return data
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
