"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Send, Bell, Sparkles } from "lucide-react"
import { useState } from "react"

export function NewsLetter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Handle newsletter subscription logic here
      setIsSubscribed(true)
      setTimeout(() => {
        setIsSubscribed(false)
        setEmail("")
      }, 3000)
    }
  }

  return (
    <section className="bg-gray-50">
      <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center container mx-auto px-5 md:px-0 py-10 md:py-16">
        <div>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 text-gray-900">
            Stay updated with <span className="text-blue-600">Ireland's best</span> travel deals
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
            Subscribe to our newsletter and get exclusive access to special offers, insider tips, and the latest updates on Ireland's most breathtaking destinations delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubscribe} className="mt-6 md:mt-10">
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 md:px-6 py-4 md:py-6 text-sm md:text-base lg:text-lg rounded-xl border-gray-300 focus:border-blue-600 focus:ring-blue-600"
              />
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-4 md:py-6 text-sm md:text-base lg:text-lg rounded-xl whitespace-nowrap"
              >
                {isSubscribed ? "✓ Subscribed!" : "Subscribe Now"}
              </Button>
            </div>
            <p className="text-xs md:text-sm text-gray-500 mt-3 md:mt-4">
              Join 10,000+ travelers exploring Ireland. Unsubscribe anytime.
            </p>
          </form>
        </div>

        <div className="relative h-64 md:h-96 lg:h-[600px] w-full md:w-auto flex items-center justify-center">
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {/* Mail Icon - Top Left */}
            <div className="group relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-float">
              <Mail className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-white" />
              <div className="absolute -top-2 -right-2 w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </div>
            </div>

            {/* Send Icon - Top Right */}
            <div className="group relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-float-delay-1">
              <Send className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-white" />
            </div>

            {/* Bell Icon - Bottom Left */}
            <div className="group relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-3xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-float-delay-2">
              <Bell className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-white" />
            </div>

            {/* Sparkles Icon - Bottom Right */}
            <div className="group relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-3xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-float-delay-3">
              <Sparkles className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-white" />
            </div>
          </div>

          {/* Floating decorative elements */}
          <div className="absolute top-10 right-10 w-3 h-3 md:w-4 md:h-4 bg-blue-400 rounded-full animate-ping opacity-75"></div>
          <div className="absolute bottom-20 left-10 w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
