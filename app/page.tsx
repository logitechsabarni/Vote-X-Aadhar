"use client"

import { useAuth } from "@/lib/auth"
import { LoginForm } from "@/components/auth/login-form"
import { Header } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, CheckCircle, Users } from "lucide-react"

export default function HomePage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome to VoteX, {user.name}</h1>
              <p className="text-muted-foreground">
                {user.role === "admin"
                  ? "Manage elections and monitor voting"
                  : "Participate in secure blockchain voting"}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Secure Authentication</h3>
                  <p className="text-sm text-muted-foreground">Verified with Aadhaar-based authentication</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Blockchain Security</h3>
                  <p className="text-sm text-muted-foreground">Immutable and transparent voting records</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Verified Results</h3>
                  <p className="text-sm text-muted-foreground">Real-time, tamper-proof election results</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">Current Elections</h3>
                    <p className="text-sm text-muted-foreground">No active elections at this time</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Elections will appear here when they become available. You'll receive notifications when new voting
                  opportunities are open.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-2xl">
                <Shield className="h-16 w-16 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">VoteX</h1>
            <p className="text-xl text-muted-foreground mb-2">Secure Blockchain Voting Platform</p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the future of democratic participation with Aadhaar-authenticated, blockchain-secured voting
              that ensures transparency, security, and trust.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="grid gap-6">
                <div className="flex gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Aadhaar Authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      Secure identity verification using India's Aadhaar system
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Blockchain Security</h3>
                    <p className="text-sm text-muted-foreground">Immutable voting records with complete transparency</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Instant Results</h3>
                    <p className="text-sm text-muted-foreground">Real-time vote counting with verifiable results</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
