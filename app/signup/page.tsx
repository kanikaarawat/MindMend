
"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-100 p-4">
            <div className="w-full max-w-md">
                <Card className="shadow-xl bg-white/90 backdrop-blur">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl text-slate-800">Create Account</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                placeholder="Minimum 6 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label>Role</Label>
                            <select
                                className="w-full border rounded px-3 py-2 text-sm mt-1"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="user">User</option>
                                <option value="therapist">Therapist</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <Button
                            onClick={handleSignup}
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
                        >
                            {loading ? "Signing up..." : "Sign Up"}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
