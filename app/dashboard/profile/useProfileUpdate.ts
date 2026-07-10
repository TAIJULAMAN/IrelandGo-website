import { useState, useRef, useEffect } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/Redux/features/settings/profileApi";
import { toast } from "sonner";

export function useProfileUpdate() {
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  const { data: profileRes, isLoading, isError } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
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

  useEffect(() => {
    if (profileData && !initialized) {
      setFormData({
        name: profileData.fullName || "",
        email: profileData.email || "",
        phone: profileData.contactNumber || "",
        country: profileData.country || "",
      });
      setInitialized(true);
    }
  }, [profileData, initialized]);

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

  return {
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
  };
}
