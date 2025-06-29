"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ArrowLeft, CalendarIcon, Clock, Video, Phone, MapPin, Star, Filter, Sparkles, Award, Shield } from "lucide-react"
import Link from "next/link"

export default function AppointmentBooking() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTherapist, setSelectedTherapist] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [sessionType, setSessionType] = useState("")

  const therapists = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      specialty: "Anxiety & Depression",
      rating: 4.9,
      experience: "8 years",
      avatar: "/placeholder.svg?height=60&width=60",
      nextAvailable: "Today, 2:00 PM",
      sessionTypes: ["Video Call", "Phone Call"],
      bio: "Specializes in cognitive behavioral therapy and mindfulness-based interventions.",
    },
    {
      id: 2,
      name: "Dr. Michael Rodriguez",
      specialty: "Trauma & PTSD",
      rating: 4.8,
      experience: "12 years",
      avatar: "/placeholder.svg?height=60&width=60",
      nextAvailable: "Tomorrow, 10:00 AM",
      sessionTypes: ["Video Call", "Phone Call", "In-Person"],
      bio: "Expert in trauma-informed care and EMDR therapy techniques.",
    },
    {
      id: 3,
      name: "Dr. Emily Johnson",
      specialty: "Couples & Family",
      rating: 4.9,
      experience: "10 years",
      avatar: "/placeholder.svg?height=60&width=60",
      nextAvailable: "Today, 4:00 PM",
      sessionTypes: ["Video Call", "In-Person"],
      bio: "Focuses on relationship dynamics and family systems therapy.",
    },
  ]

  const availableTimes = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-emerald-50/50">
      {/* Header */}
      <header className="border-b border-slate-200/50 bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Book Appointment
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="mb-10">
          <div className="flex items-center space-x-3 mb-3">
            <Sparkles className="w-6 h-6 text-indigo-500" />
            <h1 className="text-4xl font-bold text-slate-800">Find Your Perfect Therapist</h1>
          </div>
          <p className="text-lg text-slate-600">
            Connect with licensed professionals who understand your needs and can support your journey to better mental health.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Therapist Selection */}
          <div className="lg:col-span-2 space-y-8">
            {/* Filters */}
            <Card className="border-0 shadow-xl shadow-indigo-500/10 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <Filter className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span>Find the Right Match</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Select>
                    <SelectTrigger className="rounded-xl border-slate-200 focus:border-indigo-400 focus:ring-indigo-400">
                      <SelectValue placeholder="Specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="anxiety">Anxiety & Depression</SelectItem>
                      <SelectItem value="trauma">Trauma & PTSD</SelectItem>
                      <SelectItem value="couples">Couples & Family</SelectItem>
                      <SelectItem value="addiction">Addiction</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger className="rounded-xl border-slate-200 focus:border-indigo-400 focus:ring-indigo-400">
                      <SelectValue placeholder="Session Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video Call</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="person">In-Person</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger className="rounded-xl border-slate-200 focus:border-indigo-400 focus:ring-indigo-400">
                      <SelectValue placeholder="Availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Available Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Therapist List */}
            <div className="space-y-6">
              {therapists.map((therapist) => (
                <Card
                  key={therapist.id}
                  className="border-0 shadow-xl shadow-emerald-500/10 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <Avatar className="w-20 h-20 ring-4 ring-emerald-100">
                        <AvatarImage src={therapist.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-600 text-xl font-bold">
                          {therapist.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">{therapist.name}</h3>
                            <p className="text-indigo-600 font-semibold text-lg">{therapist.specialty}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-2">
                              <Star className="w-5 h-5 text-yellow-500 fill-current" />
                              <span className="font-bold text-slate-800 text-lg">{therapist.rating}</span>
                            </div>
                            <p className="text-sm text-slate-600 font-medium">{therapist.experience} experience</p>
                          </div>
                        </div>

                        <p className="text-slate-600 mb-6 leading-relaxed text-base">{therapist.bio}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-5 h-5 text-emerald-600" />
                              <span className="text-emerald-600 font-semibold">{therapist.nextAvailable}</span>
                            </div>
                            <div className="flex space-x-3">
                              {therapist.sessionTypes.map((type) => (
                                <Badge key={type} className="bg-indigo-100 text-indigo-700 text-sm font-medium border-0 px-3 py-1">
                                  {type === "Video Call" && <Video className="w-4 h-4 mr-1" />}
                                  {type === "Phone Call" && <Phone className="w-4 h-4 mr-1" />}
                                  {type === "In-Person" && <MapPin className="w-4 h-4 mr-1" />}
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
                            onClick={() => setSelectedTherapist(therapist.name)}
                          >
                            Select Therapist
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-8">
            {/* Calendar */}
            <Card className="border-0 shadow-xl shadow-indigo-500/10 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span>Select Date</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-xl"
                />
              </CardContent>
            </Card>

            {/* Time Slots */}
            <Card className="border-0 shadow-xl shadow-emerald-500/10 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span>Available Times</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {availableTimes.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      onClick={() => setSelectedTime(time)}
                      className={`rounded-xl transition-all duration-300 ${
                        selectedTime === time
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg"
                          : "border-emerald-200 hover:bg-emerald-50 text-emerald-600 hover:border-emerald-300"
                      }`}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Session Type */}
            <Card className="border-0 shadow-xl shadow-purple-500/10 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                    <Video className="w-5 h-5 text-purple-600" />
                  </div>
                  <span>Session Type</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant={sessionType === "video" ? "default" : "outline"}
                  onClick={() => setSessionType("video")}
                  className={`w-full justify-start rounded-xl transition-all duration-300 ${
                    sessionType === "video"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
                      : "border-purple-200 hover:bg-purple-50 text-purple-600 hover:border-purple-300"
                  }`}
                >
                  <Video className="w-5 h-5 mr-3" />
                  Video Call
                </Button>
                <Button
                  variant={sessionType === "phone" ? "default" : "outline"}
                  onClick={() => setSessionType("phone")}
                  className={`w-full justify-start rounded-xl transition-all duration-300 ${
                    sessionType === "phone"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
                      : "border-purple-200 hover:bg-purple-50 text-purple-600 hover:border-purple-300"
                  }`}
                >
                  <Phone className="w-5 h-5 mr-3" />
                  Phone Call
                </Button>
                <Button
                  variant={sessionType === "person" ? "default" : "outline"}
                  onClick={() => setSessionType("person")}
                  className={`w-full justify-start rounded-xl transition-all duration-300 ${
                    sessionType === "person"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
                      : "border-purple-200 hover:bg-purple-50 text-purple-600 hover:border-purple-300"
                  }`}
                >
                  <MapPin className="w-5 h-5 mr-3" />
                  In-Person
                </Button>
              </CardContent>
            </Card>

            {/* Booking Summary */}
            {(selectedTherapist || selectedDate || selectedTime || sessionType) && (
              <Card className="border-0 shadow-xl shadow-indigo-500/10 bg-gradient-to-br from-indigo-50 to-purple-50 backdrop-blur-sm rounded-2xl overflow-hidden">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                      <Award className="w-5 h-5 text-indigo-600" />
                    </div>
                    <span>Booking Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedTherapist && (
                    <div className="flex items-center justify-between p-3 bg-white/80 rounded-xl">
                      <span className="text-slate-700 font-medium">Therapist:</span>
                      <span className="text-indigo-600 font-semibold">{selectedTherapist}</span>
                    </div>
                  )}
                  {selectedDate && (
                    <div className="flex items-center justify-between p-3 bg-white/80 rounded-xl">
                      <span className="text-slate-700 font-medium">Date:</span>
                      <span className="text-indigo-600 font-semibold">
                        {selectedDate.toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {selectedTime && (
                    <div className="flex items-center justify-between p-3 bg-white/80 rounded-xl">
                      <span className="text-slate-700 font-medium">Time:</span>
                      <span className="text-indigo-600 font-semibold">{selectedTime}</span>
                    </div>
                  )}
                  {sessionType && (
                    <div className="flex items-center justify-between p-3 bg-white/80 rounded-xl">
                      <span className="text-slate-700 font-medium">Type:</span>
                      <span className="text-indigo-600 font-semibold capitalize">{sessionType}</span>
                    </div>
                  )}
                  <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-4 rounded-xl font-semibold shadow-lg">
                    Confirm Booking
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Trust Indicators */}
            <Card className="border-0 shadow-xl shadow-emerald-500/10 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span>Why Choose Us?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-xl">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Licensed Professionals</p>
                    <p className="text-sm text-slate-600">All therapists are verified and licensed</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-xl">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">HIPAA Compliant</p>
                    <p className="text-sm text-slate-600">Your privacy is our priority</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Flexible Scheduling</p>
                    <p className="text-sm text-slate-600">Book sessions that fit your schedule</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
