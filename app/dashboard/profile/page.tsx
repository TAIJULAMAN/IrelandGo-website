"use client";

import { PageHeader } from "@/components/common/PageHeader";
import { ChangePasswordForm } from "@/components/dashboard/ChangePasswordForm";
import { EditProfileForm } from "@/components/dashboard/EditProfileForm";
import { ProfileHeaderBanner } from "@/components/dashboard/ProfileHeaderBanner";
import Loading from "@/components/common/loading";
import { useProfileUpdate } from "./useProfileUpdate";

export default function UserProfilePage() {
  const {
    activeTab,
    setActiveTab,
    isLoading,
    isError,
    isUpdating,
    profileData,
    formData,
    setFormData,
    imagePreview,
    fileInputRef,
    handleImageChange,
    handleSaveProfile,
  } = useProfileUpdate();

  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (isError) {
    return (
      <div className="flex items-start justify-start min-h-[60vh]">
        <p className="text-red-500">
          Failed to load profile. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-5">
      <PageHeader
        title="Profile Settings"
        description="Manage your account settings and preferences"
      />

      <div className="max-w-5xl mx-auto w-full">
        <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
          <ProfileHeaderBanner
            imagePreview={imagePreview}
            profileData={profileData}
            fileInputRef={fileInputRef}
            handleImageChange={handleImageChange}
          />

          <div className="p-6 md:p-10">
            {/* Tabs */}
            <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit mb-10 mx-auto md:mx-0">
              <button
                onClick={() => setActiveTab("profile")}
                className={`py-2.5 px-6 rounded-xl font-bold transition-all ${activeTab === "profile"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                  }`}
              >
                Edit Profile
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`py-2.5 px-6 rounded-xl font-bold transition-all ${activeTab === "password"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                  }`}
              >
                Change Password
              </button>
            </div>

            {/* Content Area */}
            <div className="max-w-3xl">
              {activeTab === "profile" ? (
                <EditProfileForm
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleSaveProfile}
                  isUpdating={isUpdating}
                />
              ) : (
                <ChangePasswordForm />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
