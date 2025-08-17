"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Lock, CheckCircle } from "lucide-react"
import { useAuth } from "@/lib/auth"

export function LoginForm() {
  const [aadhaarNumber, setAadhaarNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<"aadhaar" | "otp">("aadhaar")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { sendOTP, login } = useAuth()

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    if (aadhaarNumber.length !== 12 || !/^\d+$/.test(aadhaarNumber)) {
      setError("Please enter a valid 12-digit Aadhaar number")
      setIsSubmitting(false)
      return
    }

    const success = await sendOTP(aadhaarNumber)
    if (success) {
      setStep("otp")
    } else {
      setError("Failed to send OTP. Please check your Aadhaar number.")
    }
    setIsSubmitting(false)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    const success = await login(aadhaarNumber, otp)
    if (!success) {
      setError("Invalid OTP. Please try again.")
    }
    setIsSubmitting(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Shield className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">VoteX Login</CardTitle>
        <CardDescription>Secure blockchain voting with Aadhaar authentication</CardDescription>
      </CardHeader>
      <CardContent>
        {step === "aadhaar" ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="aadhaar">Aadhaar Number</Label>
              <Input
                id="aadhaar"
                type="text"
                placeholder="Enter 12-digit Aadhaar number"
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, "").slice(0, 12))}
                maxLength={12}
                className="text-center tracking-wider"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting || aadhaarNumber.length !== 12}>
              {isSubmitting ? "Sending OTP..." : "Send OTP"}
              <Lock className="ml-2 h-4 w-4" />
            </Button>

            <div className="text-xs text-muted-foreground text-center mt-4">
              <p>Demo credentials:</p>
              <p>Any 12-digit number • OTP: 123456</p>
              <p>Admin access: 123456789012</p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                OTP sent to mobile number linked with Aadhaar ending in ****{aadhaarNumber.slice(-4)}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                type="text"
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                maxLength={6}
                className="text-center tracking-widest text-lg"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setStep("aadhaar")} className="flex-1">
                Back
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting || otp.length !== 6}>
                {isSubmitting ? "Verifying..." : "Login"}
                <Shield className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
