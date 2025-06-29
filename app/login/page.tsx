"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Heart, Eye, EyeOff, Mail, Lock, Sparkles, Shield, Clock, Star } from "lucide-react"
import Link from "next/link"
import {supabase} from "@/lib/supabaseClient";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-emerald-50/50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              MindMend
            </span>
          </Link>
        </div>

        <Card className="border-0 shadow-2xl shadow-indigo-500/20 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
          <CardHeader className="text-center space-y-3 pb-8">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <CardTitle className="text-3xl font-bold text-slate-800">Welcome Back</CardTitle>
            </div>
            <CardDescription className="text-slate-600 text-lg">Sign in to continue your wellness journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Google OAuth Button */}
            <Button
              variant="outline"
              className="w-full bg-white border-slate-200 hover:bg-slate-50 text-slate-700 py-6 rounded-xl font-semibold shadow-lg"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-500 font-medium"  onClick={async () => {
                  await supabase.auth.signInWithOAuth({ provider: 'google' })
                }}>Or continue with email</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-slate-700 font-semibold">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 pr-4 py-4 border-slate-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl text-base"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-slate-700 font-semibold">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 py-4 border-slate-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl text-base"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-4 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-slate-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-slate-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    id="remember"
                    type="checkbox"
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                  />
                  <Label htmlFor="remember" className="text-sm text-slate-600 font-medium">
                    Remember me
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Forgot password?
                </Link>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-6 rounded-xl font-semibold shadow-xl shadow-indigo-500/30 text-lg"
                onClick={async () => {
                  const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                  })

                  if (error) {
                    alert(error.message)
                    return
                  }

                  // ✅ Role-based redirect
                  const role = data.user?.user_metadata?.role || "user"
                  console.log("Logged in role:", role)

                  if (role === "admin") {
                    window.location.href = "/admin-dashboard"
                  } else if (role === "therapist") {
                    window.location.href = "/therapist-dashboard"
                  } else {
                    window.location.href = "/dashboard"
                  }
                }}
              >
                Sign In
              </Button>
            </div>

            <div className="text-center">
              <p className="text-slate-600 text-base">
                Don't have an account?{" "}
                <Link href="/signup" className="text-indigo-600 hover:text-indigo-700 font-semibold" >
                  Sign up
                </Link>
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-slate-500 pt-4 border-t border-slate-200">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium">HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">4.9/5 Rating</span>
              </div>
            </div>

            {/* Crisis Support */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-xl p-6 text-center">
              <p className="text-sm text-red-800 font-semibold mb-2">Need immediate help?</p>
              <p className="text-xs text-red-600 leading-relaxed">
                Crisis Text Line: Text HOME to 741741 | National Suicide Prevention Lifeline: 988
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
