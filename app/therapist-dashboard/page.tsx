"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  Calendar,
  Users,
  Clock,
  Video,
  Phone,
  MessageCircle,
  FileText,
  TrendingUp,
  Bell,
  Settings,
  Star,
  CheckCircle,
  Sparkles,
  Activity,
  Award,
  UserCheck,
  AlertCircle,
} from "lucide-react"

export default function TherapistDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const todayAppointments = [
    {
      id: 1,
      patient: "Jordan M.",
      time: "9:00 AM",
      type: "Video Call",
      status: "upcoming",
      notes: "Follow-up on anxiety management techniques",
    },
    {
      id: 2,
      patient: "Alex K.",
      time: "10:30 AM",
      type: "Phone Call",
      status: "completed",
      notes: "Initial consultation - depression screening",
    },
    {
      id: 3,
      patient: "Sam R.",
      time: "2:00 PM",
      type: "Video Call",
      status: "upcoming",
      notes: "CBT session - cognitive restructuring",
    },
    {
      id: 4,
      patient: "Taylor P.",
      time: "3:30 PM",
      type: "Video Call",
      status: "upcoming",
      notes: "Couples therapy session",
    },
  ]

  const recentPatients = [
    {
      id: 1,
      name: "Jordan M.",
      lastSession: "2 days ago",
      progress: "Improving",
      riskLevel: "low",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Alex K.",
      lastSession: "1 week ago",
      progress: "Stable",
      riskLevel: "medium",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Sam R.",
      lastSession: "3 days ago",
      progress: "Excellent",
      riskLevel: "low",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const getRiskBadge = (level: string) => {
    switch (level) {
      case "low":
        return <Badge className="bg-green-100 text-green-700 border-0">Low Risk</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-700 border-0">Medium Risk</Badge>
      case "high":
        return <Badge className="bg-red-100 text-red-700 border-0">High Risk</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-0">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-700 border-0">Upcoming</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-700 border-0">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-700 border-0">Cancelled</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-0">Unknown</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">MindMend</span>
              <Badge className="bg-blue-100 text-blue-700 border-0 font-semibold">Therapist Portal</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">SC</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Good morning, Dr. Chen</h1>
          </div>
          <p className="text-gray-600">You have 4 appointments scheduled for today. Here's your overview.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200 rounded-lg p-1">
            <TabsTrigger value="overview" className="rounded-md">Overview</TabsTrigger>
            <TabsTrigger value="appointments" className="rounded-md">Appointments</TabsTrigger>
            <TabsTrigger value="patients" className="rounded-md">Patients</TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-md">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border border-gray-200 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">4</p>
                          <p className="text-sm text-gray-600 font-medium">Today's Sessions</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Users className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">23</p>
                          <p className="text-sm text-gray-600 font-medium">Active Patients</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Star className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">4.9</p>
                          <p className="text-sm text-gray-600 font-medium">Avg Rating</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Today's Schedule */}
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span>Today's Schedule</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {todayAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          {appointment.type === "Video Call" ? (
                            <Video className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Phone className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900">{appointment.patient}</h4>
                          <p className="text-sm text-gray-600">{appointment.time} • {appointment.type}</p>
                          <p className="text-sm text-gray-500">{appointment.notes}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          {getStatusBadge(appointment.status)}
                          <Button size="sm" variant="outline">
                            Join
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Recent Patients */}
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <Users className="w-5 h-5 text-green-600" />
                      <span>Recent Patients</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentPatients.map((patient) => (
                      <div key={patient.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={patient.avatar} />
                          <AvatarFallback className="bg-green-100 text-green-600 font-semibold">
                            {patient.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900">{patient.name}</h4>
                          <p className="text-sm text-gray-600">{patient.lastSession}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">{patient.progress}</Badge>
                            {getRiskBadge(patient.riskLevel)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <Activity className="w-5 h-5 text-purple-600" />
                      <span>Quick Actions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Session
                    </Button>
                    <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50">
                      <FileText className="w-4 h-4 mr-2" />
                      View Notes
                    </Button>
                    <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </CardContent>
                </Card>

                {/* Performance Summary */}
                <Card className="border border-gray-200 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <Award className="w-5 h-5 text-yellow-600" />
                      <span>Performance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span className="text-gray-700 font-medium">Sessions This Week</span>
                      <span className="text-yellow-600 font-bold">18</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-gray-700 font-medium">Patient Satisfaction</span>
                      <span className="text-green-600 font-bold">96%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-gray-700 font-medium">Response Time</span>
                      <span className="text-blue-600 font-bold">2.3h</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">All Appointments</CardTitle>
                <CardDescription>Manage your upcoming and past appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-600">Appointment management interface will be implemented here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Patient Management</CardTitle>
                <CardDescription>View and manage your patient roster</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-600">Patient management interface will be implemented here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Analytics Dashboard</CardTitle>
                <CardDescription>View detailed analytics and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-600">Analytics and reporting interface will be implemented here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
