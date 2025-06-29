"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MessageCircle } from "lucide-react"

const forums = [
  {
    topic: "Coping with Anxiety",
    posts: 23,
    lastPost: "2 hours ago by @alex",
  },
  {
    topic: "Mindfulness & Meditation",
    posts: 17,
    lastPost: "1 hour ago by @jordan",
  },
  {
    topic: "Dealing with Burnout",
    posts: 12,
    lastPost: "3 hours ago by @sam",
  },
  {
    topic: "Share Your Wins!",
    posts: 30,
    lastPost: "just now by @taylor",
  },
]

export default function CommunityForumsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-emerald-50/50 p-6">
      <div className="max-w-3xl mx-auto">
        <Card className="border-0 shadow-xl shadow-teal-500/10 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
          <CardHeader className="flex flex-row items-center space-x-3 pb-4">
            <Users className="w-6 h-6 text-teal-600" />
            <CardTitle className="text-2xl font-bold text-slate-800">Community Forums</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-6">
              {forums.map((f) => (
                <li key={f.topic} className="p-4 rounded-xl border bg-teal-50 border-teal-100">
                  <div className="flex items-center space-x-2 mb-1">
                    <MessageCircle className="w-4 h-4 text-teal-400" />
                    <span className="font-semibold text-teal-700">{f.topic}</span>
                  </div>
                  <div className="text-slate-700 text-sm mt-1">{f.posts} posts • Last: {f.lastPost}</div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 