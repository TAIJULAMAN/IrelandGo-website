"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Activity, Euro, MapPin, Calendar, CheckCircle } from "lucide-react";

export default function UserDashboardPage() {
  const metrics = [
    {
      id: 1,
      label: "Total Bookings",
      icon: <Activity className="h-5 w-5 text-blue-600" />,
      value: "12",
      change: "+3 this month",
      changeColor: "text-emerald-600",
    },
    {
      id: 2,
      label: "Total Spent",
      icon: <Euro className="h-5 w-5 text-green-600" />,
      value: "€3,450",
      change: "+€850 this month",
      changeColor: "text-emerald-600",
    },
    {
      id: 3,
      label: "Saved Locations",
      icon: <MapPin className="h-5 w-5 text-purple-600" />,
      value: "8",
      change: "2 new favorites",
      changeColor: "text-emerald-600",
    },
  ];

  const recentBookings = [
    {
      id: 1,
      destination: "Dublin City Tour",
      date: "2024-12-25",
      time: "09:00 AM",
      status: "Confirmed",
      amount: "€450",
    },
    {
      id: 2,
      destination: "Galway Coastal Drive",
      date: "2024-12-28",
      time: "10:30 AM",
      status: "Confirmed",
      amount: "€680",
    },
    {
      id: 3,
      destination: "Cork Heritage Tour",
      date: "2024-12-30",
      time: "02:00 PM",
      status: "Pending",
      amount: "€520",
    },
    {
      id: 4,
      destination: "Cliffs of Moher Trip",
      date: "2025-01-05",
      time: "08:00 AM",
      status: "Confirmed",
      amount: "€890",
    },
    {
      id: 5,
      destination: "Killarney National Park",
      date: "2025-01-10",
      time: "09:30 AM",
      status: "Pending",
      amount: "€750",
    },
  ];

  return (
    <div className="flex flex-col gap-6 pb-4">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, John!</h1>
          <p className="text-gray-500 text-sm">
            Here's your travel dashboard overview
          </p>
        </div>
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

      {/* Recent Bookings Table */}
      <Card className="shadow-sm border border-gray-100 bg-white/90">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Bookings</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-600 hover:bg-blue-600">
                <TableHead className="font-semibold text-white rounded-tl-lg">Destination</TableHead>
                <TableHead className="font-semibold text-white">Date & Time</TableHead>
                <TableHead className="font-semibold text-white">Status</TableHead>
                <TableHead className="font-semibold text-white text-right rounded-tr-lg">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBookings.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{booking.destination}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {new Date(booking.date).toLocaleDateString()} at {booking.time}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${booking.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {booking.status === "Confirmed" && (
                        <CheckCircle className="h-3 w-3" />
                      )}
                      {booking.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-900">
                    {booking.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="shadow-sm border border-gray-100 bg-white/90">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Booking Confirmed</p>
                <p className="text-sm text-gray-600">Dublin City Tour - December 25, 2024</p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Euro className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Payment Successful</p>
                <p className="text-sm text-gray-600">€450 paid for Dublin City Tour</p>
                <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Location Saved</p>
                <p className="text-sm text-gray-600">Temple Bar Restaurant added to favorites</p>
                <p className="text-xs text-gray-400 mt-1">1 day ago</p>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <Activity className="h-5 w-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Profile Updated</p>
                <p className="text-sm text-gray-600">Contact information updated successfully</p>
                <p className="text-xs text-gray-400 mt-1">2 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
