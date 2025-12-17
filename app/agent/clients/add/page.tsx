"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, User, Mail, Phone, MapPin, Calendar, Car, Clock } from "lucide-react";

export default function AddClientPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        dateOfBirth: "",
        // Booking Information
        pickupLocation: "",
        dropoffLocation: "",
        pickupDate: "",
        pickupTime: "",
        numberOfPassengers: "",
        vehicleType: "",
        specialRequests: "",
        notes: "",
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add API call to save client data
        console.log("Form submitted:", formData);
        // Redirect back to clients list
        router.push("/agent/clients");
    };

    const handleCancel = () => {
        router.push("/agent/clients");
    };

    return (
        <div className="flex flex-col gap-5 pb-5 container mx-auto">
            {/* Header */}
            <PageHeader
                title="Add New Client"
                description="Fill in the information below to add a new client"
                showBackButton
                backButtonText="Back to Clients"
                backButtonHref="/agent/clients"
            />

            <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <Card className="shadow-sm border border-gray-100 bg-white/90 mb-6">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                            <User className="h-5 w-5 text-blue-600" />
                            Personal Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-sm font-medium">
                                    First Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Enter first name"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-sm font-medium">
                                    Last Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Enter last name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="dateOfBirth" className="text-sm font-medium">
                                Date of Birth
                            </Label>
                            <div className="relative">
                                <Input
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    className="pr-10"
                                />
                                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="shadow-sm border border-gray-100 bg-white/90 mb-6">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                            <Phone className="h-5 w-5 text-green-600" />
                            Contact Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
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

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-medium">
                                Phone Number <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+353 87 123 4567"
                                    className="pl-10"
                                    required
                                />
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Address Information */}
                <Card className="shadow-sm border border-gray-100 bg-white/90 mb-6">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-purple-600" />
                            Address Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="address" className="text-sm font-medium">
                                Street Address
                            </Label>
                            <Input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Enter street address"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city" className="text-sm font-medium">
                                    City
                                </Label>
                                <Input
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="Enter city"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="country" className="text-sm font-medium">
                                    Country
                                </Label>
                                <Input
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    placeholder="Enter country"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Booking Information */}
                <Card className="shadow-sm border border-gray-100 bg-white/90 mb-6">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                            <Car className="h-5 w-5 text-orange-600" />
                            Booking Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="pickupLocation" className="text-sm font-medium">
                                    Pickup Location
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="pickupLocation"
                                        name="pickupLocation"
                                        value={formData.pickupLocation}
                                        onChange={handleInputChange}
                                        placeholder="Enter pickup location"
                                        className="pl-10"
                                    />
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="dropoffLocation" className="text-sm font-medium">
                                    Dropoff Location
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="dropoffLocation"
                                        name="dropoffLocation"
                                        value={formData.dropoffLocation}
                                        onChange={handleInputChange}
                                        placeholder="Enter dropoff location"
                                        className="pl-10"
                                    />
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="pickupDate" className="text-sm font-medium">
                                    Pickup Date
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="pickupDate"
                                        name="pickupDate"
                                        type="date"
                                        value={formData.pickupDate}
                                        onChange={handleInputChange}
                                        className="pr-10"
                                    />
                                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="pickupTime" className="text-sm font-medium">
                                    Pickup Time
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="pickupTime"
                                        name="pickupTime"
                                        type="time"
                                        value={formData.pickupTime}
                                        onChange={handleInputChange}
                                        className="pr-10"
                                    />
                                    <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="numberOfPassengers" className="text-sm font-medium">
                                    Number of Passengers
                                </Label>
                                <Input
                                    id="numberOfPassengers"
                                    name="numberOfPassengers"
                                    type="number"
                                    min="1"
                                    value={formData.numberOfPassengers}
                                    onChange={handleInputChange}
                                    placeholder="Enter number of passengers"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="vehicleType" className="text-sm font-medium">
                                    Vehicle Type
                                </Label>
                                <select
                                    id="vehicleType"
                                    name="vehicleType"
                                    value={formData.vehicleType}
                                    onChange={handleInputChange}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                >
                                    <option value="">Select vehicle type</option>
                                    <option value="sedan">Sedan</option>
                                    <option value="suv">SUV</option>
                                    <option value="van">Van</option>
                                    <option value="minibus">Minibus</option>
                                    <option value="luxury">Luxury Car</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="specialRequests" className="text-sm font-medium">
                                Special Requests (Optional)
                            </Label>
                            <Textarea
                                id="specialRequests"
                                name="specialRequests"
                                value={formData.specialRequests}
                                onChange={handleInputChange}
                                placeholder="Any special requests for the booking (e.g., child seat, wheelchair accessible)..."
                                className="min-h-[100px]"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Notes */}
                <Card className="shadow-sm border border-gray-100 bg-white/90 mb-6">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-bold">Additional Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Label htmlFor="notes" className="text-sm font-medium">
                                Notes (Optional)
                            </Label>
                            <Textarea
                                id="notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleInputChange}
                                placeholder="Add any additional notes about the client..."
                                className="min-h-[120px]"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        className="px-6"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        Save Client
                    </Button>
                </div>
            </form>
        </div>
    );
}
