import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_BASE_URL; // use consistent env variable

export const UserLogout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login')
      return
    }

    const logoutUser = async () => {
      try {
        const response = await axios.get(`${API}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (response.status === 200) {
          localStorage.removeItem('token')
          navigate('/login')
        }
      } catch (error) {
        console.error("Logout failed:", error.response?.data || error.message)
        localStorage.removeItem('token')
        navigate('/login')
      }
    }

    logoutUser()
  }, [navigate])

  return (
    <div>Logging out...</div>
  )
}

export default UserLogout
