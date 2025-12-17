"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Trash2, Plus } from "lucide-react";

export default function AgentPaymentMethodsPage() {
    const [isAddingNew, setIsAddingNew] = useState(false);
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

    // Mock saved payment methods
    const [paymentMethods, setPaymentMethods] = useState([
        {
            id: 1,
            type: "Visa",
            last4: "4242",
            expiryDate: "12/25",
            isDefault: true,
        },
        {
            id: 2,
            type: "Mastercard",
            last4: "8888",
            expiryDate: "09/26",
            isDefault: false,
        },
    ]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add API call to save payment method
        console.log("Saving payment method:", formData);
        setIsAddingNew(false);
        // Reset form
        setFormData({
            cardholderName: "",
            cardNumber: "",
            expiryDate: "",
            cvv: "",
            billingAddress: "",
            city: "",
            postalCode: "",
            country: "",
        });
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
        <div className="flex flex-col gap-6 pb-4">
            {/* Header */}
            <PageHeader
                title="Payment Methods"
                description="Manage your payment methods and billing information"
                actions={
                    !isAddingNew && (
                        <Button
                            onClick={() => setIsAddingNew(true)}
                            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Add Payment Method
                        </Button>
                    )
                }
            />

            {/* Add New Payment Method Form */}
            {isAddingNew && (
                <Card className="shadow-sm border border-gray-100 bg-white/90">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <CreditCard className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">Add New Payment Method</h2>
                                    <p className="text-sm text-gray-500">
                                        Securely add your payment information
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
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

                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsAddingNew(false)}
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
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Saved Payment Methods */}
            <Card className="shadow-sm border border-gray-100 bg-white/90">
                <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Saved Payment Methods</h2>

                    {paymentMethods.length === 0 ? (
                        <div className="text-center py-12">
                            <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">No payment methods saved yet</p>
                            <Button
                                onClick={() => setIsAddingNew(true)}
                                className="mt-4 bg-blue-600 hover:bg-blue-700"
                            >
                                Add Your First Payment Method
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {paymentMethods.map((method) => (
                                <div
                                    key={method.id}
                                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-gray-100 rounded-lg">
                                            <CreditCard className="h-6 w-6 text-gray-600" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-semibold">
                                                    {method.type} •••• {method.last4}
                                                </p>
                                                {method.isDefault && (
                                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                                                        Default
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Expires {method.expiryDate}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {!method.isDefault && (
                                            <Button variant="outline" size="sm">
                                                Set as Default
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
