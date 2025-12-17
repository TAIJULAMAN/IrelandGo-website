"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet";
import { CreditCard, X } from "lucide-react";

interface PaymentOnboardingSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function PaymentOnboardingSidebar({
    isOpen,
    onClose,
}: PaymentOnboardingSidebarProps) {
    const [formData, setFormData] = useState({
        cardholderName: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        billingAddress: "",
        city: "",
        postalCode: "",
        country: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add API call to save payment method
        console.log("Saving payment method:", formData);
        onClose();
    };

    const formatCardNumber = (value: string) => {
        const cleaned = value.replace(/\s/g, "");
        const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
        return formatted;
    };

    const formatExpiryDate = (value: string) => {
        const cleaned = value.replace(/\D/g, "");
        if (cleaned.length >= 2) {
            return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
        }
        return cleaned;
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                <SheetHeader className="space-y-3 pb-6 border-b">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <CreditCard className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <SheetTitle className="text-xl font-bold">
                                    Add Payment Method
                                </SheetTitle>
                                <SheetDescription className="text-sm">
                                    Securely add your payment information
                                </SheetDescription>
                            </div>
                        </div>
                    </div>
                </SheetHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-6">
                    {/* Card Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Card Information
                        </h3>

                        <div className="space-y-2">
                            <Label htmlFor="cardholderName" className="text-sm font-medium">
                                Cardholder Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="cardholderName"
                                value={formData.cardholderName}
                                onChange={(e) =>
                                    setFormData({ ...formData, cardholderName: e.target.value })
                                }
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cardNumber" className="text-sm font-medium">
                                Card Number <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="cardNumber"
                                value={formData.cardNumber}
                                onChange={(e) => {
                                    const formatted = formatCardNumber(e.target.value);
                                    if (formatted.replace(/\s/g, "").length <= 16) {
                                        setFormData({ ...formData, cardNumber: formatted });
                                    }
                                }}
                                placeholder="1234 5678 9012 3456"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="expiryDate" className="text-sm font-medium">
                                    Expiry Date <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={(e) => {
                                        const formatted = formatExpiryDate(e.target.value);
                                        if (formatted.replace(/\D/g, "").length <= 4) {
                                            setFormData({ ...formData, expiryDate: formatted });
                                        }
                                    }}
                                    placeholder="MM/YY"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cvv" className="text-sm font-medium">
                                    CVV <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="cvv"
                                    value={formData.cvv}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, "");
                                        if (value.length <= 4) {
                                            setFormData({ ...formData, cvv: value });
                                        }
                                    }}
                                    placeholder="123"
                                    type="password"
                                    maxLength={4}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Billing Address */}
                    <div className="space-y-4 pt-4 border-t">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Billing Address
                        </h3>

                        <div className="space-y-2">
                            <Label htmlFor="billingAddress" className="text-sm font-medium">
                                Street Address <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="billingAddress"
                                value={formData.billingAddress}
                                onChange={(e) =>
                                    setFormData({ ...formData, billingAddress: e.target.value })
                                }
                                placeholder="123 Main Street"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city" className="text-sm font-medium">
                                    City <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="city"
                                    value={formData.city}
                                    onChange={(e) =>
                                        setFormData({ ...formData, city: e.target.value })
                                    }
                                    placeholder="Dublin"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="postalCode" className="text-sm font-medium">
                                    Postal Code <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="postalCode"
                                    value={formData.postalCode}
                                    onChange={(e) =>
                                        setFormData({ ...formData, postalCode: e.target.value })
                                    }
                                    placeholder="D01 F5P2"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="country" className="text-sm font-medium">
                                Country <span className="text-red-500">*</span>
                            </Label>
                            <select
                                id="country"
                                value={formData.country}
                                onChange={(e) =>
                                    setFormData({ ...formData, country: e.target.value })
                                }
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                required
                            >
                                <option value="">Select country</option>
                                <option value="Ireland">Ireland</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="United States">United States</option>
                                <option value="Canada">Canada</option>
                                <option value="Australia">Australia</option>
                            </select>
                        </div>
                    </div>

                    {/* Security Notice */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-xs text-blue-800">
                            <strong>🔒 Secure Payment:</strong> Your payment information is
                            encrypted and secure. We never store your full card details.
                        </p>
                    </div>

                    <SheetFooter className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                            Add Payment Method
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
