"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");

  // Mock user data
  const userData = {
    name: "John Doe",
    role: "User",
    email: "john.doe@example.com",
    phone: "+353 86 234 5678",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  };

  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add API call to update profile
    console.log("Updating profile:", formData);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add API call to change password
    console.log("Changing password");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="flex flex-col gap-6 pb-4">
      {/* Page Header */}
      <PageHeader
        title="Profile Settings"
        description="Manage your account settings and preferences"
      />

      <div className="max-w-4xl mx-auto w-full">
        {/* Blue Header Banner with Avatar */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-lg p-8 flex items-center gap-6">
          <div className="relative group">
            <div className="h-28 w-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={userData.avatar}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-white hover:bg-gray-100 text-blue-600 p-2 rounded-full shadow-lg transition-colors">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-1">{userData.name}</h1>
            <p className="text-blue-100">{userData.role}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex gap-8 px-8">
            <button
              onClick={() => setActiveTab("profile")}
              className={`py-4 px-2 font-medium transition-colors relative ${activeTab === "profile"
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Edit Profile
              {activeTab === "profile" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("password")}
              className={`py-4 px-2 font-medium transition-colors relative ${activeTab === "password"
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Change Password
              {activeTab === "password" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <Card className="shadow-sm border-t-0 rounded-t-none">
          <CardContent className="p-8">
            {activeTab === "profile" ? (
              <div>
                <h2 className="text-2xl font-bold text-blue-600 mb-6">
                  Edit Your Profile
                </h2>
                <form onSubmit={handleSaveProfile} className="space-y-6 max-w-xl">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-blue-600">
                      User Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter full name"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-blue-600">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Enter email"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-blue-600">
                      Contact Number
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="Enter contact number"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-medium"
                  >
                    Save & Change
                  </Button>
                </form>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-blue-600 mb-6">
                  Change Your Password
                </h2>
                <form onSubmit={handleChangePassword} className="space-y-6 max-w-xl">
                  <div className="space-y-2">
                    <Label
                      htmlFor="current-password"
                      className="text-sm font-medium text-blue-600"
                    >
                      Current Password
                    </Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value,
                        })
                      }
                      placeholder="Enter current password"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="new-password"
                      className="text-sm font-medium text-blue-600"
                    >
                      New Password
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      placeholder="Enter new password"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="confirm-password"
                      className="text-sm font-medium text-blue-600"
                    >
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="Confirm new password"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-medium"
                  >
                    Save & Change
                  </Button>
                </form>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
