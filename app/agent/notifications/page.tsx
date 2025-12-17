"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Check, Trash2, Calendar, User, CreditCard, MapPin } from "lucide-react";

export default function AgentNotificationsPage() {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: "booking",
            icon: <Calendar className="h-5 w-5 text-blue-600" />,
            title: "New Booking Request",
            message: "John Smith requested a booking for Paris trip on Dec 20, 2024",
            time: "2 hours ago",
            isRead: false,
        },
        {
            id: 2,
            type: "payment",
            icon: <CreditCard className="h-5 w-5 text-green-600" />,
            title: "Payment Received",
            message: "€2,400 payment received from Maria Garcia for London tour",
            time: "5 hours ago",
            isRead: false,
        },
        {
            id: 3,
            type: "client",
            icon: <User className="h-5 w-5 text-purple-600" />,
            title: "New Client Registered",
            message: "Emma Wilson has registered as a new client",
            time: "1 day ago",
            isRead: true,
        },
        {
            id: 4,
            type: "booking",
            icon: <MapPin className="h-5 w-5 text-orange-600" />,
            title: "Booking Confirmed",
            message: "Your booking for David Kelly to Dublin has been confirmed",
            time: "2 days ago",
            isRead: true,
        },
        {
            id: 5,
            type: "payment",
            icon: <CreditCard className="h-5 w-5 text-green-600" />,
            title: "Payment Reminder",
            message: "Payment pending for Sarah Murphy's booking (€1,500)",
            time: "3 days ago",
            isRead: true,
        },
    ]);

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    const markAsRead = (id: number) => {
        setNotifications(
            notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
    };

    const deleteNotification = (id: number) => {
        setNotifications(notifications.filter((n) => n.id !== id));
    };

    return (
        <div className="flex flex-col gap-6 pb-4">
            {/* Header */}
            <PageHeader
                title="Notifications"
                description={`You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""
                    }`}
                actions={
                    unreadCount > 0 && (
                        <Button
                            onClick={markAllAsRead}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <Check className="h-4 w-4" />
                            Mark All as Read
                        </Button>
                    )
                }
            />

            {/* Notifications List */}
            <div className="space-y-3">
                {notifications.length === 0 ? (
                    <Card className="shadow-sm border border-gray-100 bg-white/90">
                        <CardContent className="p-12 text-center">
                            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg font-medium mb-2">
                                No notifications
                            </p>
                            <p className="text-gray-400 text-sm">
                                You're all caught up! Check back later for updates.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    notifications.map((notification) => (
                        <Card
                            key={notification.id}
                            className={`shadow-sm border transition-colors ${notification.isRead
                                    ? "border-gray-100 bg-white/90"
                                    : "border-blue-200 bg-blue-50/50"
                                }`}
                        >
                            <CardContent className="p-4">
                                <div className="flex items-start gap-4">
                                    {/* Icon */}
                                    <div
                                        className={`p-3 rounded-lg flex-shrink-0 ${notification.isRead ? "bg-gray-100" : "bg-white"
                                            }`}
                                    >
                                        {notification.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-1">
                                            <h3
                                                className={`font-semibold ${notification.isRead
                                                        ? "text-gray-900"
                                                        : "text-gray-900"
                                                    }`}
                                            >
                                                {notification.title}
                                            </h3>
                                            {!notification.isRead && (
                                                <span className="h-2 w-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">
                                            {notification.message}
                                        </p>
                                        <p className="text-xs text-gray-400">{notification.time}</p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        {!notification.isRead && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => markAsRead(notification.id)}
                                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                            >
                                                <Check className="h-4 w-4" />
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => deleteNotification(notification.id)}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
