"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Activity, Euro, Percent, Plus, Users, CalendarDays, Clock, MapPin, CreditCard } from "lucide-react";

export default function AgentDashboardPage() {
  const [isCreateBookingOpen, setIsCreateBookingOpen] = useState(false);
  const metrics = [
    {
      id: 1,
      label: "Total Bookings",
      icon: <Activity className="h-5 w-5 text-blue-600" />,
      value: "1,432",
      change: "+12% this month",
      changeColor: "text-emerald-600",
    },
    {
      id: 2,
      label: "Total Revenue",
      icon: <Euro className="h-5 w-5 text-green-600" />,
      value: "€15,200",
      change: "+8% this month",
      changeColor: "text-emerald-600",
    },
    {
      id: 3,
      label: "Commission Earned",
      icon: <Percent className="h-5 w-5 text-purple-600" />,
      value: "25%",
      change: "€3,800 earned",
      changeColor: "text-emerald-600",
    },
  ];

  const activities = [
    {
      id: 1,
      title: "New booking created",
      subtitle: "John Smith - Paris Trip",
      time: "2 hours ago",
      type: "booking",
    },
    {
      id: 2,
      title: "Payment received",
      subtitle: "€2,400 from Maria Garcia",
      time: "5 hours ago",
      type: "payment",
    },
    {
      id: 3,
      title: "New client registered",
      subtitle: "David Wilson",
      time: "1 day ago",
      type: "client",
    },
  ];

  return (
    <div className="flex flex-col gap-6 pb-4">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, Sarah!</h1>
          <p className="text-gray-500 text-sm">
            Here's your travel booking dashboard overview
          </p>
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6">
          Logout
        </Button>
      </header>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <Card
            key={metric.id}
            className="shadow-sm border border-gray-100 bg-white/90"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium text-gray-500">
                {metric.label}
              </span>
              <div className="h-9 w-9 rounded-full bg-gray-50 flex items-center justify-center">
                {metric.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold mb-1">{metric.value}</div>
              <p className={`text-xs font-medium ${metric.changeColor}`}>
                {metric.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">Quick Actions</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-5"
            onClick={() => setIsCreateBookingOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Create Booking
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-gray-300 text-gray-800 bg-white"
          >
            <Users className="h-4 w-4" />
            Manage Clients
          </Button>
        </div>
      </section>

      {/* Create New Booking Modal */}
      <Dialog open={isCreateBookingOpen} onOpenChange={setIsCreateBookingOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-xl font-semibold">
              Create New Booking
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Fill in the details below to create a new booking.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="client" className="text-sm font-medium">
                  Select Client <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="client"
                    placeholder="Search by client name"
                    className="pr-9"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <Users className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="pickup-location" className="text-sm font-medium">
                  Pickup Location <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="pickup-location"
                    placeholder="Enter pickup location"
                    className="pr-9"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <MapPin className="h-4 w-4" />
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="destination-location" className="text-sm font-medium">
                  Destination Location <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="destination-location"
                    placeholder="Enter destination location"
                    className="pr-9"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <MapPin className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="pickup-date" className="text-sm font-medium">
                  Pickup Date <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="pickup-date"
                    type="date"
                    className="pr-9"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <CalendarDays className="h-4 w-4" />
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pickup-time" className="text-sm font-medium">
                  Pickup Time <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="pickup-time"
                    type="time"
                    className="pr-9"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <Clock className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="passengers" className="text-sm font-medium">
                  Number of Passengers <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="passengers"
                    type="number"
                    min={1}
                    placeholder="Enter number of passengers"
                    className="pr-9"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <Users className="h-4 w-4" />
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="vehicle-type" className="text-sm font-medium">
                  Select Vehicle Type <span className="text-red-500">*</span>
                </Label>
                <select
                  id="vehicle-type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose vehicle type
                  </option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="van">Van</option>
                  <option value="minibus">Minibus</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox id="additional-luggage" />
                <Label
                  htmlFor="additional-luggage"
                  className="text-sm font-medium text-gray-700"
                >
                  Additional Luggage
                </Label>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="special-requests" className="text-sm font-medium">
                Special Requests (optional)
              </Label>
              <Textarea
                id="special-requests"
                placeholder="Enter any special requests (e.g., child seat required)"
                className="min-h-[96px]"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="payment-method" className="text-sm font-medium">
                Payment Method <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <select
                  id="payment-method"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select payment method
                  </option>
                  <option value="card">Credit / Debit Card</option>
                  <option value="cash">Cash</option>
                  <option value="bank">Bank Transfer</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <CreditCard className="h-4 w-4" />
                </span>
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateBookingOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Create Booking
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Recent Activity */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold">Recent Activity</h2>
        <Card className="shadow-sm border border-gray-100 bg-white/90">
          <CardContent className="divide-y divide-gray-100 p-0">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className={`flex items-start gap-3 px-4 py-4 ${
                  index === 0 ? "rounded-t-lg" : ""
                }`}
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                    {activity.type === "booking" && (
                      <Plus className="h-4 w-4 text-blue-600" />
                    )}
                    {activity.type === "payment" && (
                      <Euro className="h-4 w-4 text-green-600" />
                    )}
                    {activity.type === "client" && (
                      <Users className="h-4 w-4 text-orange-500" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.subtitle}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
