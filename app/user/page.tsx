"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Headphones, Plus, User } from "lucide-react";

export default function Dashboard() {
  const activities = [
    {
      id: 1,
      type: "Booking Confirmed",
      icon: <Activity className="h-5 w-5 text-green-500" />,
      details: "Downtown Hotel - December 15, 2024",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "Location Saved",
      icon: <Activity className="h-5 w-5 text-blue-500" />,
      details: "City Center Restaurant added to favorites",
      time: "1 day ago",
    },
    {
      id: 3,
      type: "Profile Updated",
      icon: <User className="h-5 w-5 text-purple-500" />,
      details: "Contact information updated successfully",
      time: "4 days ago",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center bg-gray-50 hover:shadow-md transition-shadow">
            <CardHeader className="space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
                  <Plus className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-lg font-semibold text-gray-800">
                New Booking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Create a new reservation</p>
            </CardContent>
          </Card>

          <Card className="text-center bg-gray-50 hover:shadow-md transition-shadow">
            <CardHeader className="space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Edit Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Update your information</p>
            </CardContent>
          </Card>

          <Card className="text-center bg-gray-50 hover:shadow-md transition-shadow">
            <CardHeader className="space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
                  <Headphones className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Contact Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Get help when you need it</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg border">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-6">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start p-3 bg-gray-100 rounded-lg"
                >
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-white shadow-sm">
                    {activity.icon}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">{activity.type}</h3>
                      <span className="text-xs text-gray-500">
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
