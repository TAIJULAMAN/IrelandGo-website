import { Camera } from "lucide-react";
import React from "react";

interface ProfileData {
  fullName?: string;
  role?: string;
  profileImage?: string;
}

interface ProfileHeaderBannerProps {
  imagePreview: string | null;
  profileData: ProfileData | undefined;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProfileHeaderBanner({
  imagePreview,
  profileData,
  fileInputRef,
  handleImageChange,
}: ProfileHeaderBannerProps) {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 md:p-12 flex flex-col md:flex-row items-center md:items-end gap-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-30"></div>
      </div>
      <div className="relative group z-10">
        <div className="h-32 w-32 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white transition-transform duration-300 group-hover:scale-105">
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
          className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl shadow-xl transition-all hover:scale-110"
        >
          <Camera className="h-5 w-5" />
        </button>
      </div>
      <div className="text-center md:text-left text-white z-10 mt-4 md:mt-0">
        <h1 className="text-3xl font-black tracking-tight mb-1">
          {profileData?.fullName}
        </h1>
        <p className="text-slate-300 font-medium uppercase tracking-widest text-sm flex items-center justify-center md:justify-start gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          {profileData?.role}
        </p>
      </div>
    </div>
  );
}
