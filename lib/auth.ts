"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  aadhaarNumber: string
  name: string
  email: string
  phone: string
  isVerified: boolean
  role: "voter" | "admin"
}

interface AuthContextType {
  user: User | null
  login: (aadhaarNumber: string, otp: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  sendOTP: (aadhaarNumber: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("votex-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const sendOTP = async (aadhaarNumber: string): Promise<boolean> => {
    // Mock Aadhaar OTP sending
    console.log(`[VoteX] Sending OTP to Aadhaar: ${aadhaarNumber}`)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock success for valid Aadhaar format (12 digits)
    return aadhaarNumber.length === 12 && /^\d+$/.test(aadhaarNumber)
  }

  const login = async (aadhaarNumber: string, otp: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Mock authentication - in real app, this would verify with Aadhaar API
      console.log(`[VoteX] Authenticating Aadhaar: ${aadhaarNumber} with OTP: ${otp}`)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock success for OTP "123456"
      if (otp === "123456") {
        const mockUser: User = {
          id: `user_${Date.now()}`,
          aadhaarNumber: aadhaarNumber,
          name: "John Doe", // In real app, fetched from Aadhaar
          email: "john.doe@example.com",
          phone: "+91 98765 43210",
          isVerified: true,
          role: aadhaarNumber === "123456789012" ? "admin" : "voter",
        }

        setUser(mockUser)
        localStorage.setItem("votex-user", JSON.stringify(mockUser))
        return true
      }

      return false
    } catch (error) {
      console.error("[VoteX] Authentication error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("votex-user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading, sendOTP }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
