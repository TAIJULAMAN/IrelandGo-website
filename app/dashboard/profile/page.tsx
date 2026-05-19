"use client";

import { useRef, useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/Redux/features/settings/profileApi";
import { useChangePasswordMutation } from "@/Redux/features/auth/authApi";
import { toast } from "sonner";

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  const { data: profileRes, isLoading, isError } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();
  const profileData = profileRes?.data;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [initialized, setInitialized] = useState(false);
  if (profileData && !initialized) {
    setFormData({
      name: profileData.fullName || "",
      email: profileData.email || "",
      phone: profileData.contactNumber || "",
      country: profileData.country || "",
    });
    setInitialized(true);
  }

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    const bodyData = JSON.stringify({
      fullName: formData.name,
      country: formData.country,
      contactNumber: formData.phone,
    });

    formDataToSend.append("data", bodyData);

    if (selectedImage) {
      formDataToSend.append("profileImage", selectedImage);
    }

    try {
      await updateProfile(formDataToSend).unwrap();
      toast.success("Profile updated successfully!");
      setSelectedImage(null);
    } catch {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    try {
      await changePassword({
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }).unwrap();
      toast.success("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch {
      toast.error("Failed to change password. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-500">
          Failed to load profile. Please try again later.
        </p>
      </div>
    );
  }

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
                src={
                  imagePreview ||
                  profileData?.profileImage ||
                  "/placeholder-avatar.png"
                }
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-white hover:bg-gray-100 text-blue-600 p-2 rounded-full shadow-lg transition-colors"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-1">{profileData?.fullName}</h1>
            <p className="text-blue-100">{profileData?.role}</p>
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
                <form
                  onSubmit={handleSaveProfile}
                  className="space-y-6 max-w-xl"
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-blue-600"
                    >
                      User Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter full name"
                      className="border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-blue-600"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      disabled
                      placeholder="Enter email"
                      className="border-gray-300 focus:border-blue-600 focus:ring-blue-600 bg-gray-50 cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-blue-600"
                    >
                      Contact Number
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="Enter contact number"
                      className="border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="country"
                      className="text-sm font-medium text-blue-600"
                    >
                      Country
                    </Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      placeholder="Enter country"
                      className="border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isUpdating}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-medium"
                  >
                    {isUpdating ? "Saving..." : "Save & Change"}
                  </Button>
                </form>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-blue-600 mb-6">
                  Change Your Password
                </h2>
                <form
                  onSubmit={handleChangePassword}
                  className="space-y-6 max-w-xl"
                >
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
                      className="border-gray-300 focus:border-blue-600 focus:ring-blue-600"
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
                      className="border-gray-300 focus:border-blue-600 focus:ring-blue-600"
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
                      className="border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isChangingPassword}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-medium"
                  >
                    {isChangingPassword ? "Saving..." : "Save & Change"}
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
