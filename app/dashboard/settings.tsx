"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Bell,
  Settings,
  User,
  Shield,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Mail,
  Smartphone,
  Globe,
  Save,
  ArrowLeft,
} from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"

export default function SettingsPage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    darkMode: false,
    language: "en",
    timezone: "UTC",
    privacyLevel: "standard",
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          // Fetch user profile from profiles table
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()
          
          setProfile(profileData || {})
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      // Save settings to database (you can create a settings table)
      // For now, we'll just simulate saving
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Settings saved:', settings)
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-lg font-medium text-slate-700">Loading settings...</p>
        </div>
      </div>
    )
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
              <span className="text-sm">Settings</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/dashboard/notifications">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-600 p-2 rounded-full">
                <Bell className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/dashboard/profile">
              <Avatar className="w-9 h-9 border-2 border-white shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                <AvatarImage src="/placeholder.svg?height=36&width=36" />
                <AvatarFallback className="bg-gradient-to-br from-blue-100 to-green-100 text-blue-600 font-medium">
                  {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Settings</h1>
          <p className="text-slate-500">Manage your account preferences and privacy settings</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Settings */}
            <Card className="border border-slate-100 bg-white/90 backdrop-blur-sm shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <span>Account Settings</span>
                </CardTitle>
                <CardDescription>Manage your account information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-slate-700">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile?.first_name || ""}
                      className="mt-1"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium text-slate-700">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile?.last_name || ""}
                      className="mt-1"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile?.email || ""}
                    className="mt-1"
                    placeholder="Enter your email"
                    disabled
                  />
                  <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
                </div>
                <div>
                  <Label htmlFor="timezone" className="text-sm font-medium text-slate-700">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => setSettings({...settings, timezone: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="GMT">GMT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="border border-slate-100 bg-white/90 backdrop-blur-sm shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Bell className="w-5 h-5 text-green-600" />
                  </div>
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription>Choose how you want to receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-slate-600" />
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Email Notifications</Label>
                      <p className="text-xs text-slate-500">Receive notifications via email</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-5 h-5 text-slate-600" />
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Push Notifications</Label>
                      <p className="text-xs text-slate-500">Receive push notifications in browser</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => setSettings({...settings, pushNotifications: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Volume2 className="w-5 h-5 text-slate-600" />
                    <div>
                      <Label className="text-sm font-medium text-slate-700">SMS Notifications</Label>
                      <p className="text-xs text-slate-500">Receive notifications via SMS</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => setSettings({...settings, smsNotifications: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="border border-slate-100 bg-white/90 backdrop-blur-sm shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <span>Privacy & Security</span>
                </CardTitle>
                <CardDescription>Manage your privacy settings and data preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="privacyLevel" className="text-sm font-medium text-slate-700">Privacy Level</Label>
                  <Select value={settings.privacyLevel} onValueChange={(value) => setSettings({...settings, privacyLevel: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select privacy level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Share with community</SelectItem>
                      <SelectItem value="standard">Standard - Share with therapists only</SelectItem>
                      <SelectItem value="private">Private - Share with no one</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-slate-600" />
                    <div>
                      <Label className="text-sm font-medium text-slate-700">Data Sharing</Label>
                      <p className="text-xs text-slate-500">Allow anonymous data for research</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border border-slate-100 bg-white/90 backdrop-blur-sm shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/dashboard/profile">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                  <Settings className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>

            {/* Save Button */}
            <Card className="border border-slate-100 bg-white/90 backdrop-blur-sm shadow-sm">
              <CardContent className="pt-6">
                <Button 
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-md"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 