"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChangePasswordMutation } from "@/Redux/features/auth/authApi";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export function ChangePasswordForm() {
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Change Password
        </h2>
        <p className="text-slate-500 mt-1 font-medium">
          Ensure your account is using a long, random password to stay secure.
        </p>
      </div>

      <form onSubmit={handleChangePassword} className="space-y-6 max-w-xl">
        <div className="space-y-2">
          <Label
            htmlFor="current-password"
            className="text-[11px] font-bold text-slate-400 uppercase tracking-widest"
          >
            Current Password
          </Label>
          <div className="relative">
            <Input
              id="current-password"
              type={showCurrent ? "text" : "password"}
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value,
                })
              }
              placeholder="Enter your current password"
              className="h-12 pr-10 border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-blue-600 rounded-xl transition-all font-bold text-slate-900 shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-2">
            <Label
              htmlFor="new-password"
              className="text-[11px] font-bold text-slate-400 uppercase tracking-widest"
            >
              New Password
            </Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNew ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
                placeholder="Enter new password"
                className="h-12 pr-10 border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-blue-600 rounded-xl transition-all font-bold text-slate-900 shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="confirm-password"
              className="text-[11px] font-bold text-slate-400 uppercase tracking-widest"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
                placeholder="Confirm new password"
                className="h-12 pr-10 border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-blue-600 rounded-xl transition-all font-bold text-slate-900 shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100/50 mt-8">
          <Button
            type="submit"
            disabled={isChangingPassword}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 rounded-xl font-bold shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40 hover:-translate-y-0.5 transition-all text-base"
          >
            {isChangingPassword ? "Updating Password..." : "Update Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
