"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Heart } from "lucide-react"

export default function NeedSupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-emerald-50/50 p-6">
      <div className="max-w-xl mx-auto">
        <Card className="border-0 shadow-xl shadow-red-500/10 bg-gradient-to-br from-red-50 to-pink-50 backdrop-blur-sm rounded-2xl overflow-hidden">
          <CardHeader className="flex flex-row items-center space-x-3 pb-4">
            <Heart className="w-6 h-6 text-red-600" />
            <CardTitle className="text-2xl font-bold text-red-800">Need Support?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg text-red-700 mb-4">If you need immediate help, please use the resources below:</div>
            <ul className="mb-6 space-y-2">
              <li className="text-sm text-red-800 font-semibold">Crisis Text Line: <span className="font-normal">Text HOME to 741741</span></li>
              <li className="text-sm text-red-800 font-semibold">National Suicide Prevention Lifeline: <span className="font-normal">988</span></li>
              <li className="text-sm text-red-800 font-semibold">Emergency: <span className="font-normal">Call 911</span></li>
            </ul>
            <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg flex items-center justify-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Contact Support</span>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 