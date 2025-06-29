"use client"

import { useEffect, useState } from "react"
import { fetchUserProfile } from "@/lib/utils"
import { supabase } from "@/lib/supabaseClient"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Bell, Settings, ArrowLeft, User } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ first_name: "", last_name: "", phone: "", bio: "" })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          setError("User not logged in.")
          setLoading(false)
          return
        }
        const userId = user.id
        const profileData = await fetchUserProfile(userId)
        
        // If profile doesn't have email, use it from auth user
        if (profileData && !profileData.email && user.email) {
          profileData.email = user.email
        }
        
        setProfile(profileData)
        setForm({
          first_name: profileData.first_name || "",
          last_name: profileData.last_name || "",
          phone: profileData.phone || "",
          bio: profileData.bio || "",
        })
      } catch (err: any) {
        console.error("Profile error:", err)
        setError(err.message || "Failed to load profile.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError("User not logged in.")
        setSaving(false)
        return
      }
      const userId = user.id
      const { error: updateError } = await supabase
        .from("customers")
        .update({
          first_name: form.first_name,
          last_name: form.last_name,
          phone: form.phone,
          bio: form.bio,
        })
        .eq("id", userId)
      if (updateError) throw updateError
      setProfile({ ...profile, ...form })
    } catch (err: any) {
      setError(err.message || "Failed to update profile.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-green-50/50 to-purple-50/50">
      {/* Header */}
      <header className="border-b border-slate-100 bg-white/90 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-green-400 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:rotate-12">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-slate-800">MindMend</span>
            </Link>
            <div className="flex items-center space-x-2 text-slate-400">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Profile</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/dashboard/notifications">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-600 p-2 rounded-full">
                <Bell className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-600 p-2 rounded-full">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
            <Avatar className="w-9 h-9 border-2 border-white shadow-sm">
              <AvatarImage src="/placeholder.svg?height=36&width=36" />
              <AvatarFallback className="bg-gradient-to-br from-blue-100 to-green-100 text-blue-600 font-medium">
                {profile?.first_name?.[0]}{profile?.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Profile & Settings</h1>
          <p className="text-slate-500">Manage your personal information and account details</p>
        </div>

        <div className="max-w-2xl">
          <Card className="border border-slate-100 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-slate-800">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <span>Personal Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-slate-500">Loading profile...</p>
                </div>
              )}
              {error && (
                <div className="text-center py-8">
                  <p className="text-red-600">{error}</p>
                </div>
              )}
              {!loading && !error && (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first_name" className="text-sm font-medium text-slate-700">First Name</Label>
                      <Input 
                        name="first_name" 
                        value={form.first_name} 
                        onChange={handleChange} 
                        className="mt-1" 
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="last_name" className="text-sm font-medium text-slate-700">Last Name</Label>
                      <Input 
                        name="last_name" 
                        value={form.last_name} 
                        onChange={handleChange} 
                        className="mt-1" 
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone Number</Label>
                    <Input 
                      name="phone" 
                      value={form.phone} 
                      onChange={handleChange} 
                      className="mt-1" 
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio" className="text-sm font-medium text-slate-700">Bio</Label>
                    <textarea 
                      name="bio" 
                      value={form.bio} 
                      onChange={handleChange} 
                      className="mt-1 w-full rounded-md border border-slate-200 p-3 min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      placeholder="Tell us a bit about yourself..."
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold shadow-md" 
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 