"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Camera, X, User, LogOut, MapPin, Bell } from "lucide-react"
import Link from "next/link"
import { useState, useRef, ChangeEvent } from "react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/layout/footer"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function Profile() {
    const [date, setDate] = useState<Date>()
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="max-w-4xl mx-auto py-8 px-4 flex-1 w-full">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Profile Settings</h1>
                    <p className="text-gray-500">Manage your account settings and preferences</p>
                </div>
                
                {/* Personal Details Section */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <div className="flex items-center mb-8">
                        <div className="relative group">
                            <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                {previewImage ? (
                                    <img 
                                        src={previewImage} 
                                        alt="Profile preview" 
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <User className="h-12 w-12 text-gray-400" />
                                )}
                            </div>
                            <div 
                                className="absolute inset-0 rounded-full bg-blue-600 bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Camera className="h-5 w-5 text-white" />
                                <span className="text-xs text-white mt-1">Change</span>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</Label>
                            <Input id="firstName" className="w-full" defaultValue="John" />
                        </div>
                        <div>
                            <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</Label>
                            <Input id="lastName" className="w-full" defaultValue="Doe" />
                        </div>
                    </div>
                    <div className="mb-6">
                        <Label htmlFor="email" className="block w-full text-sm font-medium text-gray-700 mb-1">Email Address</Label>
                        <Input id="email" type="email" className="w-full" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</Label>
                            <Input id="phone" type="tel" className="w-full" defaultValue="+1 234 567 890" />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal bg-white hover:bg-gray-50",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Select date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}