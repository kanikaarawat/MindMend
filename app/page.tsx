import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Brain, Calendar, BookOpen, Sparkles, Shield, Clock, Star } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/50">
      {/* Header */}
      <header className="border-b border-slate-200/50 bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              MindMend
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-slate-600 hover:text-indigo-600 transition-colors font-medium">
              Features
            </Link>
            <Link href="#about" className="text-slate-600 hover:text-indigo-600 transition-colors font-medium">
              About
            </Link>
            <Link href="#contact" className="text-slate-600 hover:text-indigo-600 transition-colors font-medium">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 font-medium">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-xl shadow-indigo-500/25 px-6 py-2.5 font-medium">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-emerald-50/30"></div>
        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <Badge className="mb-8 bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-0 px-4 py-2 font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            Your Mental Wellness Journey Starts Here
          </Badge>
          <h1 className="text-6xl md:text-7xl font-bold text-slate-800 mb-8 leading-tight">
            Find Peace, Build
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
              {" "}
              Resilience
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Connect with licensed therapists, track your mood with AI insights, access curated self-help resources, 
            and join a supportive community—all in one secure, calming space designed for your wellbeing.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-2xl shadow-indigo-500/30 px-10 py-6 text-lg font-semibold rounded-xl"
              >
                Start Your Journey
              </Button>
            </Link>
            <Link href="/therapist-signup">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/80 backdrop-blur-sm text-slate-700 border-slate-300 hover:bg-white hover:border-indigo-300 px-10 py-6 text-lg font-semibold rounded-xl shadow-lg"
              >
                Join as Therapist
              </Button>
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-slate-500">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-emerald-500" />
              <span className="font-medium">HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-indigo-500" />
              <span className="font-medium">24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-medium">4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-slate-800 mb-6">Everything You Need for Mental Wellness</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive tools and support designed with your mental health in mind, 
              backed by science and delivered with compassion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-xl shadow-indigo-500/10 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden group">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-8 h-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800">AI Mood Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-slate-600 leading-relaxed">
                  Advanced AI-powered insights to help you understand your emotional patterns, triggers, and growth opportunities.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl shadow-emerald-500/10 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden group">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-8 h-8 text-emerald-600" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800">Expert Therapy</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-slate-600 leading-relaxed">
                  Connect with licensed therapists who specialize in your specific needs through secure video or phone sessions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl shadow-purple-500/10 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden group">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800">Self-Help Library</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-slate-600 leading-relaxed">
                  Curated resources, guided meditations, breathing exercises, and evidence-based wellness practices.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl shadow-teal-500/10 hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-500 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden group">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-teal-600" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800">Community Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-slate-600 leading-relaxed">
                  Connect anonymously with others on similar journeys in a safe, moderated, and supportive community space.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-indigo-500 via-purple-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold text-white mb-8">Ready to Begin Your Healing Journey?</h2>
          <p className="text-xl text-indigo-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands who have found support, growth, and peace through MindMend's 
            comprehensive mental wellness platform.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-2xl shadow-black/20 px-12 py-6 text-lg font-semibold rounded-xl">
              Start Free Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">MindMend</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Supporting your mental wellness journey with compassion, science, and care. 
                Your wellbeing is our priority.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-6 text-lg">Platform</h4>
              <ul className="space-y-3">
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
              <h4 className="font-semibold text-white mb-6 text-lg">Support</h4>
              <ul className="space-y-3">
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
              <h4 className="font-semibold text-white mb-6 text-lg">Legal</h4>
              <ul className="space-y-3">
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
          <div className="border-t border-slate-800 mt-12 pt-8 text-center">
            <p className="text-slate-400">
              © 2024 MindMend. All rights reserved. Your privacy and wellbeing are our priority.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
