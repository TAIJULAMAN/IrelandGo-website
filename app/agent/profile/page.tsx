"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { CalendarDays, Camera } from "lucide-react";

export default function AgentProfilePage() {
  return (
    <div className="flex flex-col gap-6 pb-4">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your account settings and preferences
        </p>
      </header>

      <Card className="shadow-sm border border-gray-100 bg-white/90">
        <CardHeader className="border-b border-gray-100 pb-0">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="bg-transparent h-auto p-0 border-b border-gray-100 rounded-none flex justify-start gap-4">
              <TabsTrigger
                value="personal"
                className="relative rounded-none border-b-2 border-transparent px-0 pb-3 text-sm font-medium text-gray-500 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
              >
                Personal Details
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="relative rounded-none border-b-2 border-transparent px-0 pb-3 text-sm font-medium text-gray-500 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
              >
                Password & Security
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="relative rounded-none border-b-2 border-transparent px-0 pb-3 text-sm font-medium text-gray-500 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
              >
                Notifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="pt-6">
              <CardContent className="flex flex-col lg:flex-row gap-6 items-start p-0 pb-6">
                {/* Avatar section */}
                <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <button className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700">
                    <Camera className="h-4 w-4" />
                    Change Photo
                  </button>
                </div>

                {/* Form section */}
                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="first-name" className="text-xs font-medium text-gray-600">
                      First Name
                    </Label>
                    <Input id="first-name" defaultValue="Sarah" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="last-name" className="text-xs font-medium text-gray-600">
                      Last Name
                    </Label>
                    <Input id="last-name" defaultValue="Johnson" />
                  </div>

                  <div className="md:col-span-2 space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-medium text-gray-600">
                      Email Address
                    </Label>
                    <Input id="email" type="email" defaultValue="sarah.johnson@email.com" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-xs font-medium text-gray-600">
                      Phone Number
                    </Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="dob" className="text-xs font-medium text-gray-600">
                      Date of Birth
                    </Label>
                    <div className="relative">
                      <Input id="dob" type="date" defaultValue="1990-05-15" className="pr-9" />
                      <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                        <CalendarDays className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>

              <div className="flex justify-end border-t border-gray-100 pt-4 mt-2">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                  Save Changes
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="security" className="pt-6">
              <CardContent className="p-0 pb-6 text-sm text-gray-500">
                Password & Security settings coming soon.
              </CardContent>
            </TabsContent>

            <TabsContent value="notifications" className="pt-6">
              <CardContent className="p-0 pb-6 text-sm text-gray-500">
                Notification preferences coming soon.
              </CardContent>
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
}
