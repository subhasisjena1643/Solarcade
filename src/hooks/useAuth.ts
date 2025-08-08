"use client"

import { useState, useEffect } from 'react'

interface User {
  id: string
  username: string
  avatar?: string
  email?: string
}

interface UseAuthReturn {
  user: User | null
  isLoading: boolean
  login: (username: string, password?: string) => Promise<void>
  logout: () => void
  register: (username: string, email: string, password: string) => Promise<void>
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const stored = localStorage.getItem('solarcade_user')
        if (stored) {
          const userData = JSON.parse(stored)
          setUser(userData)
        } else {
          // Create a guest user for demo purposes
          const guestUser: User = {
            id: `guest_${Math.random().toString(36).substr(2, 9)}`,
            username: `Player_${Math.floor(Math.random() * 1000)}`,
            avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${Math.random()}`
          }
          setUser(guestUser)
          localStorage.setItem('solarcade_user', JSON.stringify(guestUser))
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (username: string, password?: string) => {
    setIsLoading(true)
    try {
      // For demo purposes, create a user with the provided username
      const userData: User = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        username,
        avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${username}`
      }
      
      setUser(userData)
      localStorage.setItem('solarcade_user', JSON.stringify(userData))
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // For demo purposes, create a user with the provided details
      const userData: User = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        username,
        email,
        avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${username}`
      }
      
      setUser(userData)
      localStorage.setItem('solarcade_user', JSON.stringify(userData))
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('solarcade_user')
  }

  return {
    user,
    isLoading,
    login,
    logout,
    register
  }
}
