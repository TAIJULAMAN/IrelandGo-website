"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Check,
  Calendar,
  MapPin,
  CreditCard,
  AlertCircle,
  Loader2,
  Undo2,
} from "lucide-react";
import {
  useGetMyNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkNotificationAsUnreadMutation,
  useMarkAllAsReadMutation,
} from "@/Redux/features/notification/notificationApi";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

export default function UserNotificationsPage() {
  const { data: response, isLoading, isError } = useGetMyNotificationsQuery();
  const [markAsReadMutation, { isLoading: isMarkingRead }] =
    useMarkNotificationAsReadMutation();
  const [markAsUnreadMutation, { isLoading: isMarkingUnread }] =
    useMarkNotificationAsUnreadMutation();
  const [markAllAsReadMutation, { isLoading: isMarkingAllRead }] =
    useMarkAllAsReadMutation();

  const notifications = response?.data || [];
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = async (id: string) => {
    try {
      await markAsReadMutation(id).unwrap();
      toast.success("Notification marked as read");
    } catch (error) {
      toast.error("Failed to mark notification as read");
    }
  };

  const markAsUnread = async (id: string) => {
    try {
      await markAsUnreadMutation(id).unwrap();
      toast.success("Notification marked as unread");
    } catch (error) {
      toast.error("Failed to mark notification as unread");
    }
  };

  const markAllAsRead = async () => {
    try {
      await markAllAsReadMutation().unwrap();
      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error("Failed to mark all as read");
    }
  };

  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("booking"))
      return <Calendar className="h-5 w-5 text-blue-600" />;
    if (t.includes("payment"))
      return <CreditCard className="h-5 w-5 text-green-600" />;
    if (t.includes("location"))
      return <MapPin className="h-5 w-5 text-purple-600" />;
    if (t.includes("reminder"))
      return <AlertCircle className="h-5 w-5 text-orange-600" />;
    return <Bell className="h-5 w-5 text-blue-600" />;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 pb-4">
        <PageHeader
          title="Notifications"
          description="Loading your notifications..."
        />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              className="animate-pulse shadow-sm border border-gray-100 bg-white/90"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gray-100 h-11 w-11 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-1/4" />
                    <div className="h-3 bg-gray-100 rounded w-3/4" />
                    <div className="h-2 bg-gray-100 rounded w-1/6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-6 pb-4">
        <PageHeader
          title="Notifications"
          description="Failed to load notifications"
        />
        <Card className="shadow-sm border border-red-100 bg-red-50/50">
          <CardContent className="p-12 text-center">
            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-600 text-lg font-medium mb-2">
              Something went wrong
            </p>
            <p className="text-red-400 text-sm">
              Failed to load notifications. Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-4">
      {/* Header */}
      <PageHeader
        title="Notifications"
        description={`You have ${unreadCount} unread notification${
          unreadCount !== 1 ? "s" : ""
        }`}
        actions={
          unreadCount > 0 && (
            <Button
              onClick={markAllAsRead}
              disabled={isMarkingAllRead}
              variant="outline"
              className="flex items-center gap-2"
            >
              {isMarkingAllRead ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
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
              className={`shadow-sm border transition-colors ${
                notification.read
                  ? "border-gray-100 bg-white/90"
                  : "border-blue-200 bg-blue-50/50"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`p-3 rounded-lg flex-shrink-0 ${
                      notification.read ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    {getIcon(notification.title)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="h-2 w-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {notification.body}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!notification.read ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={isMarkingRead}
                        onClick={() => markAsRead(notification.id)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        {isMarkingRead ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={isMarkingUnread}
                        onClick={() => markAsUnread(notification.id)}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                      >
                        {isMarkingUnread ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Undo2 className="h-4 w-4" />
                        )}
                      </Button>
                    )}
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
