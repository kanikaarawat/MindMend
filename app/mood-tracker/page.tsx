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
  Sparkles,
  Lightbulb,
  Activity,
} from "lucide-react"
import Link from "next/link"

export default function MoodTracker() {
  const [moodScore, setMoodScore] = useState([7])
  const [selectedFactors, setSelectedFactors] = useState<string[]>([])
  const [notes, setNotes] = useState("")

  const moodFactors = [
    { id: "sleep", label: "Sleep Quality", icon: Moon, color: "indigo" },
    { id: "exercise", label: "Exercise", icon: Dumbbell, color: "emerald" },
    { id: "social", label: "Social Time", icon: Users, color: "purple" },
    { id: "work", label: "Work Stress", icon: Coffee, color: "amber" },
    { id: "weather", label: "Weather", icon: Sun, color: "yellow" },
    { id: "nutrition", label: "Nutrition", icon: Utensils, color: "rose" },
  ]

  const toggleFactor = (factorId: string) => {
    setSelectedFactors((prev) => (prev.includes(factorId) ? prev.filter((id) => id !== factorId) : [...prev, factorId]))
  }

  const getMoodEmoji = (score: number) => {
    if (score >= 8) return <Smile className="w-12 h-12 text-emerald-500" />
    if (score >= 5) return <Meh className="w-12 h-12 text-amber-500" />
    return <Frown className="w-12 h-12 text-indigo-500" />
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
                Mood Tracker
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-5xl">
        <div className="mb-10">
          <div className="flex items-center space-x-3 mb-3">
            <Sparkles className="w-6 h-6 text-indigo-500" />
            <h1 className="text-4xl font-bold text-slate-800">How are you feeling today?</h1>
          </div>
          <p className="text-lg text-slate-600">Take a moment to check in with yourself and track your emotional wellbeing.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Mood Entry */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mood Scale */}
            <Card className="border-0 shadow-xl shadow-indigo-500/10 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <Heart className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span>Overall Mood</span>
                </CardTitle>
                <CardDescription className="text-slate-600 text-base">Rate your mood on a scale from 1-10</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-center">
                  <div className="flex justify-center mb-6">{getMoodEmoji(moodScore[0])}</div>
                  <div className="text-5xl font-bold text-slate-800 mb-4">{moodScore[0]}/10</div>
                  <Badge className="bg-indigo-100 text-indigo-700 text-lg px-6 py-2 font-semibold border-0">
                    {getMoodLabel(moodScore[0])}
                  </Badge>
                </div>

                <div className="px-6">
                  <Slider value={moodScore} onValueChange={setMoodScore} max={10} min={1} step={1} className="w-full" />
                  <div className="flex justify-between text-sm text-slate-500 mt-3 font-medium">
                    <span>1 - Terrible</span>
                    <span>10 - Excellent</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mood Factors */}
            <Card className="border-0 shadow-xl shadow-emerald-500/10 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span>What's Influencing Your Mood?</span>
                </CardTitle>
                <CardDescription className="text-slate-600 text-base">Select factors that might be affecting how you feel today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {moodFactors.map((factor) => {
                    const Icon = factor.icon
                    const isSelected = selectedFactors.includes(factor.id)
                    return (
                      <Button
                        key={factor.id}
                        variant={isSelected ? "default" : "outline"}
                        onClick={() => toggleFactor(factor.id)}
                        className={`flex flex-col items-center space-y-3 h-auto py-6 px-4 rounded-xl transition-all duration-300 ${
                          isSelected
                            ? `bg-gradient-to-br from-${factor.color}-500 to-${factor.color === 'indigo' ? 'purple' : factor.color === 'emerald' ? 'teal' : factor.color === 'purple' ? 'pink' : factor.color === 'amber' ? 'orange' : factor.color === 'yellow' ? 'amber' : 'pink'}-500 hover:from-${factor.color}-600 hover:to-${factor.color === 'indigo' ? 'purple' : factor.color === 'emerald' ? 'teal' : factor.color === 'purple' ? 'pink' : factor.color === 'amber' ? 'orange' : factor.color === 'yellow' ? 'amber' : 'pink'}-600 text-white shadow-lg shadow-${factor.color}-500/25`
                            : `border-${factor.color}-200 hover:bg-${factor.color}-50 text-${factor.color}-600 hover:border-${factor.color}-300`
                        }`}
                      >
                        <Icon className="w-8 h-8" />
                        <span className="text-sm font-semibold">{factor.label}</span>
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="border-0 shadow-xl shadow-purple-500/10 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                    <Brain className="w-5 h-5 text-purple-600" />
                  </div>
                  <span>Additional Notes</span>
                </CardTitle>
                <CardDescription className="text-slate-600 text-base">Share any thoughts, feelings, or events from today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Label htmlFor="notes" className="text-slate-700 font-medium">
                    What's on your mind?
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Today I felt... because... I'm grateful for..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[140px] border-slate-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-12 py-6 text-lg font-semibold rounded-xl shadow-2xl shadow-indigo-500/30"
              >
                Save Mood Entry
              </Button>
            </div>
          </div>

          {/* Sidebar - AI Insights */}
          <div className="space-y-8">
            <Card className="border-0 shadow-xl shadow-indigo-500/10 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span>AI Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                  <h4 className="font-semibold text-indigo-800 mb-3">Pattern Recognition</h4>
                  <p className="text-sm text-indigo-700 leading-relaxed">
                    Based on your recent entries, you tend to feel better on days when you get good sleep and exercise.
                  </p>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                  <h4 className="font-semibold text-emerald-800 mb-3">Weekly Trend</h4>
                  <p className="text-sm text-emerald-700 leading-relaxed">
                    Your mood has improved by 15% this week compared to last week. Keep up the great work!
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                  <h4 className="font-semibold text-amber-800 mb-3">Suggestions</h4>
                  <ul className="text-sm text-amber-700 space-y-2">
                    <li>• Try a 10-minute meditation session</li>
                    <li>• Take a short walk outside</li>
                    <li>• Connect with a friend or family member</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Mood History */}
            <Card className="border-0 shadow-xl shadow-emerald-500/10 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center">
                    <Activity className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span>Recent Entries</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Smile className="w-6 h-6 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-slate-800">Yesterday</p>
                      <p className="text-sm text-slate-600">Mood: 8/10 - Great</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 border-0">8</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Meh className="w-6 h-6 text-amber-600" />
                    <div>
                      <p className="font-semibold text-slate-800">2 days ago</p>
                      <p className="text-sm text-slate-600">Mood: 6/10 - Okay</p>
                    </div>
                  </div>
                  <Badge className="bg-amber-100 text-amber-700 border-0">6</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Smile className="w-6 h-6 text-indigo-600" />
                    <div>
                      <p className="font-semibold text-slate-800">3 days ago</p>
                      <p className="text-sm text-slate-600">Mood: 7/10 - Good</p>
                    </div>
                  </div>
                  <Badge className="bg-indigo-100 text-indigo-700 border-0">7</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
