"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Video, Phone } from "lucide-react"
import Link from "next/link"

export default function BookSessionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-emerald-50/50 p-6">
      <div className="max-w-xl mx-auto">
        <Card className="border-0 shadow-xl shadow-indigo-500/10 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
          <CardHeader className="flex flex-row items-center space-x-3 pb-4">
            <Calendar className="w-6 h-6 text-indigo-600" />
            <CardTitle className="text-2xl font-bold text-slate-800">Book a Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg text-slate-700 mb-6">Ready to schedule your next therapy session? Choose a therapist and time that works for you.</div>
            <div className="flex space-x-4">
              <Link href="/appointments">
                <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2">
                  <Video className="w-5 h-5" />
                  <span>Book Video Call</span>
                </button>
              </Link>
              <Link href="/appointments">
                <button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Book Phone Call</span>
                </button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 