"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Heart,
  ArrowLeft,
  Smile,
  Meh,
  Frown,
  TrendingUp,
  Brain,
  Sun,
  Moon,
  Coffee,
  Utensils,
  Dumbbell,
  Users,
} from "lucide-react"
import Link from "next/link"

export default function MoodTracker() {
  const [moodScore, setMoodScore] = useState([7])
  const [selectedFactors, setSelectedFactors] = useState<string[]>([])
  const [notes, setNotes] = useState("")

  const moodFactors = [
    { id: "sleep", label: "Sleep Quality", icon: Moon, color: "blue" },
    { id: "exercise", label: "Exercise", icon: Dumbbell, color: "green" },
    { id: "social", label: "Social Time", icon: Users, color: "purple" },
    { id: "work", label: "Work Stress", icon: Coffee, color: "orange" },
    { id: "weather", label: "Weather", icon: Sun, color: "yellow" },
    { id: "nutrition", label: "Nutrition", icon: Utensils, color: "red" },
  ]

  const toggleFactor = (factorId: string) => {
    setSelectedFactors((prev) => (prev.includes(factorId) ? prev.filter((id) => id !== factorId) : [...prev, factorId]))
  }

  const getMoodEmoji = (score: number) => {
    if (score >= 8) return <Smile className="w-8 h-8 text-green-500" />
    if (score >= 5) return <Meh className="w-8 h-8 text-yellow-500" />
    return <Frown className="w-8 h-8 text-blue-500" />
  }

  const getMoodLabel = (score: number) => {
    if (score >= 9) return "Excellent"
    if (score >= 8) return "Great"
    if (score >= 7) return "Good"
    if (score >= 6) return "Okay"
    if (score >= 5) return "Fair"
    if (score >= 4) return "Not Great"
    if (score >= 3) return "Poor"
    if (score >= 2) return "Very Poor"
    return "Terrible"
  }

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
              <span className="text-xl font-semibold text-slate-800">Mood Tracker</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">How are you feeling today?</h1>
          <p className="text-slate-600">Take a moment to check in with yourself and track your emotional wellbeing.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Mood Entry */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mood Scale */}
            <Card className="border-blue-100 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-blue-600" />
                  <span>Overall Mood</span>
                </CardTitle>
                <CardDescription>Rate your mood on a scale from 1-10</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="flex justify-center mb-4">{getMoodEmoji(moodScore[0])}</div>
                  <div className="text-3xl font-bold text-slate-800 mb-2">{moodScore[0]}/10</div>
                  <Badge className="bg-blue-100 text-blue-700 text-lg px-4 py-1">{getMoodLabel(moodScore[0])}</Badge>
                </div>

                <div className="px-4">
                  <Slider value={moodScore} onValueChange={setMoodScore} max={10} min={1} step={1} className="w-full" />
                  <div className="flex justify-between text-sm text-slate-500 mt-2">
                    <span>1 - Terrible</span>
                    <span>10 - Excellent</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mood Factors */}
            <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>What's Influencing Your Mood?</span>
                </CardTitle>
                <CardDescription>Select factors that might be affecting how you feel today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {moodFactors.map((factor) => {
                    const Icon = factor.icon
                    const isSelected = selectedFactors.includes(factor.id)
                    return (
                      <Button
                        key={factor.id}
                        variant={isSelected ? "default" : "outline"}
                        onClick={() => toggleFactor(factor.id)}
                        className={`flex flex-col items-center space-y-2 h-auto py-4 ${
                          isSelected
                            ? `bg-${factor.color}-500 hover:bg-${factor.color}-600 text-white`
                            : `border-${factor.color}-200 hover:bg-${factor.color}-50 text-${factor.color}-600`
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="text-sm">{factor.label}</span>
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="border-purple-100 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span>Additional Notes</span>
                </CardTitle>
                <CardDescription>Share any thoughts, feelings, or events from today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-slate-700">
                    What's on your mind?
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Today I felt... because... I'm grateful for..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[120px] border-slate-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-4"
              >
                Save Mood Entry
              </Button>
            </div>
          </div>

          {/* Sidebar - AI Insights */}
          <div className="space-y-6">
            <Card className="border-blue-100 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-blue-600" />
                  <span>AI Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Pattern Recognition</h4>
                  <p className="text-sm text-blue-700">
                    Your mood tends to be higher on days when you exercise and get good sleep. Consider maintaining
                    these habits for better wellbeing.
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Positive Trend</h4>
                  <p className="text-sm text-green-700">
                    Your average mood has improved by 15% over the past month. Keep up the great work!
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">Suggestion</h4>
                  <p className="text-sm text-purple-700">
                    Try the "5-Minute Mindfulness" exercise from your self-help library when feeling stressed.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-green-100 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>This Week's Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Average Mood</span>
                  <span className="font-medium text-green-600">7.2/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Entries Logged</span>
                  <span className="font-medium text-blue-600">6/7 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Best Day</span>
                  <span className="font-medium text-purple-600">Saturday</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Top Factor</span>
                  <span className="font-medium text-orange-600">Good Sleep</span>
                </div>
              </CardContent>
            </Card>

            {/* Encouragement */}
            <Card className="border-pink-100 bg-gradient-to-br from-pink-50 to-purple-50">
              <CardContent className="p-6 text-center">
                <Heart className="w-8 h-8 text-pink-500 mx-auto mb-3" />
                <h4 className="font-medium text-slate-800 mb-2">You're doing great!</h4>
                <p className="text-sm text-slate-600">
                  Taking time to check in with yourself is an important step in your wellness journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
