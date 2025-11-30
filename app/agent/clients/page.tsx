"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function AgentClientsPage() {
  return (
    <div className="flex flex-col gap-6 pb-4 max-w-3xl">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Send us a message</h1>
        <p className="text-sm text-gray-500">We are always here to help!</p>
      </header>

      <Card className="shadow-sm border border-gray-100 bg-white/90">
        <CardHeader className="pb-0">
          <CardTitle className="sr-only">Contact Form</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6 pb-6">
          <div className="space-y-1.5">
            <Label htmlFor="full-name" className="text-xs font-medium text-gray-600">
              Full Name
            </Label>
            <Input id="full-name" placeholder="Enter your full name" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-medium text-gray-600">
              Email
            </Label>
            <Input id="email" type="email" placeholder="Enter your email address" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="subject" className="text-xs font-medium text-gray-600">
              Subject
            </Label>
            <select
              id="subject"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue=""
            >
              <option value="" disabled>
                Select a subject
              </option>
              <option value="booking">Booking Inquiry</option>
              <option value="payment">Payment Issue</option>
              <option value="account">Account Support</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message" className="text-xs font-medium text-gray-600">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Tell us how we can help..."
              className="min-h-[140px]"
            />
          </div>

          <div className="pt-2">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Send Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
