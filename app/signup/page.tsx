"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Mail, Lock, User, Sparkles, Shield, Clock, Star } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("user")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSignup = async () => {
        setLoading(true)

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    role, // This goes into user_metadata
                },
            },
        })

        setLoading(false)

        if (error) {
            alert("Signup failed: " + error.message)
        } else {
            alert("Check your email to confirm the signup!")
            router.push("/login")
        }
    }

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
                            <CardTitle className="text-3xl font-bold text-slate-800">Create Account</CardTitle>
                        </div>
                        <CardDescription className="text-slate-600 text-lg">Join MindMend and start your wellness journey</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-3">
                            <Label htmlFor="email" className="text-slate-700 font-semibold">
                                Email
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
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
                                    type="password"
                                    placeholder="Minimum 6 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-12 pr-4 py-4 border-slate-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl text-base"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="role" className="text-slate-700 font-semibold">
                                I am a...
                            </Label>
                            <div className="relative">
                                <User className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
                                <Select value={role} onValueChange={setRole}>
                                    <SelectTrigger className="pl-12 pr-4 py-4 border-slate-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl text-base">
                                        <SelectValue placeholder="Select your role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="user">User - Seeking mental health support</SelectItem>
                                        <SelectItem value="therapist">Therapist - Licensed mental health professional</SelectItem>
                                        <SelectItem value="admin">Admin - Platform administrator</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Button
                            onClick={handleSignup}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-6 rounded-xl font-semibold shadow-xl shadow-indigo-500/30 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Creating your account..." : "Create Account"}
                        </Button>

                        <div className="text-center">
                            <p className="text-slate-600 text-base">
                                Already have an account?{" "}
                                <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                                    Sign in
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
