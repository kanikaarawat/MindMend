"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Sparkles, Heart, Bell, Settings, ArrowLeft } from "lucide-react"
import Link from "next/link"

const resources = [
  {
    title: "Guided Meditation for Stress Relief",
    type: "Video",
    link: "https://www.youtube.com/watch?v=inpok4MKVLM",
    description: "A calming 10-minute meditation to help you relax and reset.",
  },
  {
    title: "Breathing Exercise: 4-7-8 Technique",
    type: "Exercise",
    link: "https://www.medicalnewstoday.com/articles/324417",
    description: "A simple breathing exercise to reduce anxiety and improve sleep.",
  },
  {
    title: "Understanding Anxiety: Article",
    type: "Article",
    link: "https://www.verywellmind.com/anxiety-disorders-4157280",
    description: "Learn about anxiety, its symptoms, and coping strategies.",
  },
  {
    title: "Progressive Muscle Relaxation",
    type: "Exercise",
    link: "https://www.anxietycanada.com/articles/how-to-do-progressive-muscle-relaxation/",
    description: "Step-by-step guide to relaxing your body and mind.",
  },
]

export default function SelfHelpLibraryPage() {
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
              <span className="text-sm">Self-Help Library</span>
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
            <Link href="/dashboard/profile">
              <Avatar className="w-9 h-9 border-2 border-white shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                <AvatarImage src="/placeholder.svg?height=36&width=36" />
                <AvatarFallback className="bg-gradient-to-br from-blue-100 to-green-100 text-blue-600 font-medium">
                  U
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Self-Help Library</h1>
          <p className="text-slate-500">Explore curated resources to support your mental wellness journey</p>
        </div>

        <div className="max-w-3xl">
          <Card className="border border-slate-100 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-slate-800">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <span>Wellness Resources</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-6">
                {resources.map((r) => (
                  <li key={r.title} className="p-6 rounded-xl border border-purple-100 bg-purple-50/50 hover:bg-purple-100/50 transition-colors">
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-semibold text-purple-700 bg-purple-100 px-2 py-1 rounded-full">
                        {r.type}
                      </span>
                    </div>
                    <a 
                      href={r.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-lg font-bold text-purple-900 hover:text-purple-700 transition-colors block mb-2"
                    >
                      {r.title}
                    </a>
                    <div className="text-slate-700 text-sm">{r.description}</div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 