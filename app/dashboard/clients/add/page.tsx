"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, User, Mail, Phone, MapPin, Loader2, Lock } from "lucide-react";
import { useAddClientMutation } from "@/Redux/features/client/clientApi";
import { toast } from "sonner";

export default function AddClientPage() {
    const router = useRouter();
    const [addClient, { isLoading }] = useAddClientMutation();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        contactNumber: "",
        address: "",
        country: "Ireland",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await addClient({ data: formData }).unwrap();
            toast.success("Client created successfully");
            router.push("/dashboard/clients");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to create client");
        }
    };

    const handleCancel = () => {
        router.push("/dashboard/clients");
    };

    return (
        <div className="flex flex-col gap-5 pb-5 max-w-7xl mx-auto max-w-4xl">
            {/* Header */}
            <PageHeader
                title="Add New Client"
                description="Fill in the information below to add a new client to your management list"
                showBackButton
                backButtonText="Back to Clients"
                backButtonHref="/dashboard/clients"
            />

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <Card className="shadow-sm border border-gray-100 bg-white/90">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                            <User className="h-5 w-5 text-blue-600" />
                            Client Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-sm font-medium">
                                    Full Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="Enter full name"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium">
                                    Email Address <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="client@example.com"
                                        className="pl-10"
                                        required
                                    />
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="contactNumber" className="text-sm font-medium">
                                    Phone Number <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="contactNumber"
                                        name="contactNumber"
                                        type="tel"
                                        value={formData.contactNumber}
                                        onChange={handleInputChange}
                                        placeholder="+353 87 123 4567"
                                        className="pl-10"
                                        required
                                    />
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium">
                                    Account Password <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Minimum 8 characters"
                                        className="pl-10"
                                        required
                                    />
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Location Information */}
                <Card className="shadow-sm border border-gray-100 bg-white/90">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-purple-600" />
                            Location Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="country" className="text-sm font-medium">
                                    Country <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    placeholder="Enter country"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address" className="text-sm font-medium">
                                    Full Address <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Enter street address"
                                        className="pl-10"
                                        required
                                    />
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        className="px-8 shadow-none"
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 shadow-none"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                            <Save className="h-4 w-4 mr-2" />
                        )}
                        Save Client
                    </Button>
                </div>
            </form>
        </div>
    );
}

