import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Brain, Calendar, BookOpen } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      {/* Header */}
      <header className="border-b border-blue-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-slate-800">MindMend</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-slate-600 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="#about" className="text-slate-600 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-slate-600 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button variant="outline" className="bg-white text-blue-600 border-blue-200 hover:bg-blue-50">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-100">
            Your Mental Wellness Journey Starts Here
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            Find Peace, Build
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {" "}
              Resilience
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Connect with licensed therapists, track your mood, access self-help resources, and join a supportive
            community—all in one secure, calming space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-xl px-8 py-4 text-lg"
              >
                Start Your Journey
              </Button>
            </Link>
            <Link href="/therapist-signup">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-slate-700 border-slate-200 hover:bg-slate-50 px-8 py-4 text-lg"
              >
                Join as Therapist
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Everything You Need for Mental Wellness</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive tools and support designed with your mental health in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-blue-100 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-slate-800">Mood Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-slate-600">
                  AI-powered insights to help you understand your emotional patterns and triggers
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-slate-800">Therapy Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-slate-600">
                  Book and manage appointments with licensed therapists that match your needs
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-purple-100 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-slate-800">Self-Help Library</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-slate-600">
                  Curated resources, exercises, and guided meditations for your wellness journey
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-teal-100 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
                <CardTitle className="text-slate-800">Community Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-slate-600">
                  Connect anonymously with others on similar journeys in a safe, moderated space
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-500 to-green-500">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Begin Your Healing Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands who have found support, growth, and peace through MindMend
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl px-8 py-4 text-lg">
              Start Free Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-white">MindMend</span>
              </div>
              <p className="text-slate-400">Supporting your mental wellness journey with compassion and care.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/crisis" className="hover:text-white transition-colors">
                    Crisis Resources
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/hipaa" className="hover:text-white transition-colors">
                    HIPAA Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-slate-400">
              © 2024 MindMend. All rights reserved. Your privacy and wellbeing are our priority.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
