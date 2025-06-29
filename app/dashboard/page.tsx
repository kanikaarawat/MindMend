"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  Calendar,
  MessageCircle,
  BookOpen,
  Users,
  TrendingUp,
  Smile,
  Meh,
  Frown,
  Bell,
  Settings,
  Video,
  Phone,
} from "lucide-react"
import { fetchUserAppointments, fetchUserNotifications, fetchUserProfile } from "@/lib/utils"
import { supabase } from "@/lib/supabaseClient"
import Link from "next/link"

export default function UserDashboard() {
  const [currentMood, setCurrentMood] = useState<"happy" | "neutral" | "sad" | null>(null)
  const [appointments, setAppointments] = useState<any[]>([])
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
        const [profileData, appointmentsData, notificationsData] = await Promise.all([
          fetchUserProfile(userId),
          fetchUserAppointments(userId),
          fetchUserNotifications(userId),
        ])
        
        if (profileData && !profileData.email && user.email) {
          profileData.email = user.email
        }
        
        setProfile(profileData)
        setAppointments(appointmentsData)
        setNotifications(notificationsData)
      } catch (err: any) {
        let errorMsg = "Failed to load data.";
        if (err) {
          if (typeof err === "string") {
            errorMsg = err;
          } else if (err.message) {
            errorMsg = err.message;
          } else if (err.error_description) {
            errorMsg = err.error_description;
          } else if (err.error) {
            errorMsg = err.error;
          } else {
            errorMsg = JSON.stringify(err);
          }
        }
        console.error("Dashboard error:", err, errorMsg);
        setError(errorMsg);
      }finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const moodData = [
    { day: "Mon", mood: 7 },
    { day: "Tue", mood: 6 },
    { day: "Wed", mood: 8 },
    { day: "Thu", mood: 5 },
    { day: "Fri", mood: 7 },
    { day: "Sat", mood: 9 },
    { day: "Sun", mood: 8 },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-lg font-medium text-slate-700">Loading your wellness dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
        <Card className="w-full max-w-md border-red-200 bg-white/90 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-triangle">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                <path d="M12 9v4"/>
                <path d="M12 17h.01"/>
              </svg>
              Something went wrong
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-6">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-green-50/50 to-purple-50/50">
      {/* Header */}
      <header className="border-b border-slate-100 bg-white/90 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-green-400 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:rotate-12">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-slate-800">MindMend</span>
          </Link>

          <div className="flex items-center space-x-3">
            <Link href="/dashboard/notifications">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-600 relative p-2 rounded-full">
                <Bell className="w-5 h-5" />
                {notifications.filter((n) => !n.read).length > 0 && (
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </Button>
            </Link>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-1">Welcome back, {profile?.first_name || "Jordan"}</h1>
          <p className="text-slate-500">How are you feeling today? Let's check in on your wellness journey.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Mood Check */}
            <Card className="border border-slate-100 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Heart className="w-5 h-5 text-blue-600" />
                  </div>
                  <span>Quick Mood Check</span>
                </CardTitle>
                <CardDescription className="text-slate-500">How are you feeling right now?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setCurrentMood("happy")}
                    className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 ${
                      currentMood === "happy"
                        ? "bg-green-50 border-2 border-green-200 shadow-inner"
                        : "border border-slate-100 hover:border-green-100 hover:bg-green-50/50"
                    }`}
                  >
                    <div className={`p-3 rounded-full mb-2 ${
                      currentMood === "happy" ? "bg-green-100 text-green-600" : "bg-slate-50 text-slate-400"
                    }`}>
                      <Smile className="w-6 h-6" />
                    </div>
                    <span className={`text-sm font-medium ${
                      currentMood === "happy" ? "text-green-700" : "text-slate-600"
                    }`}>Good</span>
                  </button>
                  <button
                    onClick={() => setCurrentMood("neutral")}
                    className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 ${
                      currentMood === "neutral"
                        ? "bg-yellow-50 border-2 border-yellow-200 shadow-inner"
                        : "border border-slate-100 hover:border-yellow-100 hover:bg-yellow-50/50"
                    }`}
                  >
                    <div className={`p-3 rounded-full mb-2 ${
                      currentMood === "neutral" ? "bg-yellow-100 text-yellow-600" : "bg-slate-50 text-slate-400"
                    }`}>
                      <Meh className="w-6 h-6" />
                    </div>
                    <span className={`text-sm font-medium ${
                      currentMood === "neutral" ? "text-yellow-700" : "text-slate-600"
                    }`}>Okay</span>
                  </button>
                  <button
                    onClick={() => setCurrentMood("sad")}
                    className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 ${
                      currentMood === "sad"
                        ? "bg-blue-50 border-2 border-blue-200 shadow-inner"
                        : "border border-slate-100 hover:border-blue-100 hover:bg-blue-50/50"
                    }`}
                  >
                    <div className={`p-3 rounded-full mb-2 ${
                      currentMood === "sad" ? "bg-blue-100 text-blue-600" : "bg-slate-50 text-slate-400"
                    }`}>
                      <Frown className="w-6 h-6" />
                    </div>
                    <span className={`text-sm font-medium ${
                      currentMood === "sad" ? "text-blue-700" : "text-slate-600"
                    }`}>Struggling</span>
                  </button>
                </div>
                {currentMood && (
                  <div className="mt-6 text-center">
                    <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-md hover:shadow-lg transition-all">
                      Log Mood
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Mood Trends */}
            <Card className="border border-slate-100 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <span>Your Mood This Week</span>
                </CardTitle>
                <CardDescription className="text-slate-500">Track your emotional patterns over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between h-40 space-x-1.5">
                  {moodData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                      <div
                        className="w-full bg-gradient-to-t from-blue-400 to-green-400 rounded-t-lg transition-all duration-500 ease-in-out"
                        style={{ height: `${(data.mood / 10) * 100}%` }}
                      />
                      <span className="text-xs font-medium text-slate-500">{data.day}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-slate-600">Average: <span className="font-semibold">7.1/10</span></span>
                  <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                    +0.8 from last week
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/dashboard/self-help-library">
                <Card className="border border-slate-100 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all cursor-pointer group">
                  <CardContent className="p-5">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                        <BookOpen className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 group-hover:text-purple-600 transition-colors">Self-Help Library</h3>
                        <p className="text-sm text-slate-500">Explore guided exercises</p>
                        <div className="mt-2">
                          <span className="inline-flex items-center text-xs font-medium text-purple-600">
                            Browse resources
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-1">
                              <path d="M5 12h14"/>
                              <path d="m12 5 7 7-7 7"/>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/dashboard/community-forums">
                <Card className="border border-slate-100 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all cursor-pointer group">
                  <CardContent className="p-5">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-teal-100 rounded-xl group-hover:bg-teal-200 transition-colors">
                        <Users className="w-6 h-6 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 group-hover:text-teal-600 transition-colors">Community Forums</h3>
                        <p className="text-sm text-slate-500">Connect with others</p>
                        <div className="mt-2">
                          <span className="inline-flex items-center text-xs font-medium text-teal-600">
                            Join conversations
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-1">
                              <path d="M5 12h14"/>
                              <path d="m12 5 7 7-7 7"/>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Appointments */}
            <Card className="border border-slate-100 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <span>Upcoming Sessions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {appointments.length === 0 ? (
                  <div className="text-center py-6">
                    <div className="mx-auto mb-4 p-4 bg-blue-50 rounded-full w-max">
                      <Calendar className="w-8 h-8 text-blue-400" />
                    </div>
                    <p className="text-slate-500 mb-4">No upcoming appointments.</p>
                    <Link href="/dashboard/book-session">
                      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-md">
                        Book New Session
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-100 hover:bg-blue-50/50 transition-colors">
                        <Avatar className="w-10 h-10 border-2 border-white shadow">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                            {appointment.therapist_name?.split(" ").map((n: string) => n[0]).join("") || "T"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-800 truncate">{appointment.therapist_name || "Therapist"}</p>
                          <p className="text-sm text-slate-600">{appointment.date} at {appointment.time}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            {appointment.type === "Video Call" ? (
                              <Video className="w-3.5 h-3.5 text-blue-500" />
                            ) : (
                              <Phone className="w-3.5 h-3.5 text-blue-500" />
                            )}
                            <span className="text-xs text-blue-600 font-medium">{appointment.type || "Session"}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Link href="/dashboard/book-session">
                      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-md">
                        Book New Session
                      </Button>
                    </Link>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Progress Card */}
            <Card className="border border-slate-100 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-800">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <span>Your Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">Weekly Goals</span>
                    <span className="font-medium text-green-600">4/5</span>
                  </div>
                  <Progress value={80} className="h-2 bg-slate-100" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">Mood Entries</span>
                    <span className="font-medium text-blue-600">6/7 days</span>
                  </div>
                  <Progress value={86} className="h-2 bg-slate-100" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">Self-Care Activities</span>
                    <span className="font-medium text-purple-600">3/3</span>
                  </div>
                  <Progress value={100} className="h-2 bg-slate-100" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Support */}
            <Card className="border border-red-100 bg-red-50/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-pulse">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                    <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>
                  </svg>
                  Need Support?
                </CardTitle>
                <CardDescription className="text-red-600">We're here for you 24/7</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full bg-white text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 shadow-sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Crisis Chat
                </Button>
                <div className="text-xs text-red-600 text-center space-y-1">
                  <p className="font-medium">Crisis Text Line: Text HOME to 741741</p>
                  <p className="font-medium">National Suicide Prevention Lifeline: 988</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}