"use client"

import { useEffect, useState } from "react"
import { fetchUserNotifications, fetchUserProfile } from "@/lib/utils"
import { supabase } from "@/lib/supabaseClient"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Heart, Settings, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
        const [notificationsData, profileData] = await Promise.all([
          fetchUserNotifications(userId),
          fetchUserProfile(userId),
        ])
        setNotifications(notificationsData)
        setProfile(profileData)
      } catch (err: any) {
        setError(err.message || "Failed to load notifications.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

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
              <span className="text-sm">Notifications</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/dashboard/settings">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-600 p-2 rounded-full">
                <Settings className="w-5 h-5" />
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
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Notifications</h1>
          <p className="text-slate-500">Stay updated with your latest activities and reminders</p>
        </div>

        <div className="max-w-2xl">
          <Card className="border border-slate-100 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-slate-800">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <span>All Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-slate-500">Loading notifications...</p>
                </div>
              )}
              {error && (
                <div className="text-center py-8">
                  <p className="text-red-600">{error}</p>
                </div>
              )}
              {!loading && !error && notifications.length === 0 && (
                <div className="text-center py-8">
                  <div className="mx-auto mb-4 p-4 bg-blue-50 rounded-full w-max">
                    <Bell className="w-8 h-8 text-blue-400" />
                  </div>
                  <p className="text-slate-500">No notifications yet.</p>
                  <p className="text-sm text-slate-400">We'll notify you when there's something new.</p>
                </div>
              )}
              {!loading && !error && notifications.length > 0 && (
                <ul className="space-y-4">
                  {notifications.map((n) => (
                    <li key={n.id} className={`p-4 rounded-xl border transition-colors ${
                      n.read 
                        ? "bg-slate-50 border-slate-200 hover:bg-slate-100/50" 
                        : "bg-blue-50 border-blue-200 hover:bg-blue-100/50"
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={
                          n.type === "reminder" ? "bg-emerald-100 text-emerald-700 border-0" : 
                          n.type === "system" ? "bg-indigo-100 text-indigo-700 border-0" : 
                          "bg-purple-100 text-purple-700 border-0"
                        }>
                          {n.type || "notification"}
                        </Badge>
                        {!n.read && (
                          <span className="text-xs text-blue-600 font-semibold bg-blue-100 px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <div className="text-slate-800 font-medium mb-1">{n.message}</div>
                      <div className="text-xs text-slate-500">{new Date(n.created_at).toLocaleString()}</div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 