"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ArrowLeft, CalendarIcon, Clock, Video, Phone, MapPin, Star, Filter } from "lucide-react"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-slate-800">Book Appointment</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Find Your Perfect Therapist</h1>
          <p className="text-slate-600">
            Connect with licensed professionals who understand your needs and can support your journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Therapist Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <Card className="border-blue-100 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-blue-600" />
                  <span>Find the Right Match</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Select>
                    <SelectTrigger>
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
                    <SelectTrigger>
                      <SelectValue placeholder="Session Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video Call</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="person">In-Person</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
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
            <div className="space-y-4">
              {therapists.map((therapist) => (
                <Card
                  key={therapist.id}
                  className="border-green-100 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={therapist.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-green-100 text-green-600 text-lg">
                          {therapist.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-semibold text-slate-800">{therapist.name}</h3>
                            <p className="text-blue-600 font-medium">{therapist.specialty}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1 mb-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="font-medium text-slate-800">{therapist.rating}</span>
                            </div>
                            <p className="text-sm text-slate-600">{therapist.experience}</p>
                          </div>
                        </div>

                        <p className="text-slate-600 mb-4">{therapist.bio}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-green-600 font-medium">{therapist.nextAvailable}</span>
                            </div>
                            <div className="flex space-x-2">
                              {therapist.sessionTypes.map((type) => (
                                <Badge key={type} className="bg-blue-100 text-blue-700 text-xs">
                                  {type === "Video Call" && <Video className="w-3 h-3 mr-1" />}
                                  {type === "Phone Call" && <Phone className="w-3 h-3 mr-1" />}
                                  {type === "In-Person" && <MapPin className="w-3 h-3 mr-1" />}
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button
                            className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
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
          <div className="space-y-6">
            {/* Calendar */}
            <Card className="border-purple-100 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5 text-purple-600" />
                  <span>Select Date</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border-0"
                  disabled={(date) => date < new Date()}
                />
              </CardContent>
            </Card>

            {/* Time Selection */}
            {selectedDate && (
              <Card className="border-blue-100 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span>Available Times</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {availableTimes.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className={selectedTime === time ? "bg-blue-500 hover:bg-blue-600 text-white" : ""}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Session Type */}
            {selectedTime && (
              <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Session Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={sessionType} onValueChange={setSessionType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose session type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">
                        <div className="flex items-center space-x-2">
                          <Video className="w-4 h-4" />
                          <span>Video Call</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="phone">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>Phone Call</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="person">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>In-Person</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            )}

            {/* Booking Summary */}
            {selectedTherapist && selectedDate && selectedTime && sessionType && (
              <Card className="border-green-100 bg-gradient-to-br from-green-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="text-green-800">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Therapist:</span>
                    <span className="font-medium text-slate-800">{selectedTherapist}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Date:</span>
                    <span className="font-medium text-slate-800">{selectedDate.toDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Time:</span>
                    <span className="font-medium text-slate-800">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Type:</span>
                    <span className="font-medium text-slate-800">{sessionType}</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-slate-600">Cost:</span>
                    <span className="font-bold text-slate-800">$120</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white mt-4">
                    Confirm Booking
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Support */}
            <Card className="border-red-100 bg-red-50/50 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <p className="text-sm text-red-800 font-medium mb-1">Need help choosing?</p>
                <p className="text-xs text-red-600 mb-3">
                  Our care coordinators can help match you with the right therapist
                </p>
                <Button variant="outline" size="sm" className="bg-white text-red-600 border-red-200 hover:bg-red-50">
                  Get Help Choosing
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
