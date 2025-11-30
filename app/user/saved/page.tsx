"use client"

import { useState } from "react"
import { Home, Plane, MapPin, Pencil, Trash2, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const locationFormSchema = z.object({
  name: z.string().min(2, {
    message: "Location name must be at least 2 characters.",
  }),
  address: z.string().min(5, {
    message: "Please enter a valid address.",
  }),
  description: z.string().optional(),
  isDefault: z.boolean().default(false),
  type: z.enum(["home", "airport", "hotel", "other"] as const, {
    required_error: "Please select a location type.",
  }),
})

type LocationType = "home" | "airport" | "hotel" | "other"

type Location = {
  id: string
  name: string
  description: string
  address: string
  pickupInfo: string
  isDefault: boolean
  icon: React.ReactNode
  type: LocationType
}

type LocationFormValues = z.infer<typeof locationFormSchema>

export default function SavedPage() {
  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false)
  const [isEditLocationOpen, setIsEditLocationOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null)
  const [locations, setLocations] = useState<Location[]>([
    {
      id: '1',
      name: 'Dublin Airport',
      description: 'Terminal 1, Arrivals Hall',
      address: 'Dublin Airport, Dublin, Ireland',
      pickupInfo: 'Pickup: 1st floor, Arrivals Terminal',
      isDefault: true,
      icon: <Plane className="h-5 w-5 text-blue-600" />,
      type: "airport"
    },
    {
      id: '2',
      name: 'Home',
      description: 'Residential Address',
      address: '123 Main Street, Dublin 4, Ireland',
      pickupInfo: 'Pickup: Main entrance',
      isDefault: false,
      icon: <Home className="h-5 w-5 text-blue-600" />,
      type: "home"
    }
  ])

  const handleToggleDefault = (id: string) => {
    setLocations(locations.map(loc => ({
      ...loc,
      isDefault: loc.id === id
    })))
  }

  const form = useForm<LocationFormValues>({
    resolver: zodResolver(locationFormSchema),
    defaultValues: {
      name: "",
      address: "",
      description: "",
      isDefault: false,
      type: "other"
    }
  })

  const handleEditLocation = (location: Location) => {
    setCurrentLocation(location)
    form.reset({
      name: location.name,
      address: location.address,
      description: location.description,
      isDefault: location.isDefault,
      type: location.type
    })
    setIsEditLocationOpen(true)
  }

  const handleDeleteClick = (location: Location) => {
    setCurrentLocation(location)
    setIsDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (currentLocation) {
      setLocations(prev => prev.filter(loc => loc.id !== currentLocation.id))
      setIsDeleteDialogOpen(false)
      setCurrentLocation(null)
    }
  }

  const onSubmit = (data: LocationFormValues, isEdit: boolean = false) => {
    const locationData: Omit<Location, 'id' | 'icon' | 'pickupInfo'> = {
      name: data.name,
      description: data.description || "",
      address: data.address,
      isDefault: data.isDefault,
      type: data.type
    }

    const icon = data.type === "airport" ? 
      <Plane className="h-5 w-5 text-blue-600" /> : 
      data.type === "home" ? 
      <Home className="h-5 w-5 text-blue-600" /> :
      <MapPin className="h-5 w-5 text-blue-600" />

    if (isEdit && currentLocation) {
      // Update existing location
      setLocations(prev => 
        prev.map(loc => ({
          ...loc,
          isDefault: data.isDefault ? loc.id === currentLocation.id : loc.isDefault,
          ...(loc.id === currentLocation.id ? {
            ...locationData,
            pickupInfo: data.description ? `Pickup: ${data.description}` : "Pickup: Main entrance",
            icon
          } : {})
        })));
    } else {
      // Add new location
      const newLocation: Location = {
        ...locationData,
        id: Date.now().toString(),
        pickupInfo: data.description ? `Pickup: ${data.description}` : "Pickup: Main entrance",
        icon
      }

      if (data.isDefault) {
        setLocations(prev => 
          prev.map(loc => ({ ...loc, isDefault: false }))
            .concat(newLocation)
        )
      } else {
        setLocations(prev => [...prev, newLocation])
      }
    }

    form.reset()
    setIsAddLocationOpen(false)
    setIsEditLocationOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Manage Saved Locations</h1>
              <p className="text-gray-500 mt-2">Add, edit, or remove your frequently used locations</p>
            </div>
            <Button 
              className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                form.reset({
                  name: "",
                  address: "",
                  description: "",
                  isDefault: false,
                  type: "other"
                })
                setIsAddLocationOpen(true)
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Location
            </Button>
          </div>

          <div className="space-y-4">
            {locations.map((location) => (
              <Card key={location.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        {location.icon}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold">{location.name}</h3>
                          <span className="text-sm text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                            {location.description}
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                            {location.address}
                          </div>
                          <p className="mt-1">{location.pickupInfo}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Default</span>
                        <Switch
                          checked={location.isDefault}
                          onCheckedChange={() => handleToggleDefault(location.id)}
                          className={`${location.isDefault ? 'bg-blue-600' : 'bg-gray-200'}`}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-gray-600 border-gray-300"
                          onClick={() => handleEditLocation(location)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 border-gray-300 hover:bg-red-50"
                          onClick={() => handleDeleteClick(location)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

    

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Location</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{currentLocation?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsDeleteDialogOpen(false)
                setCurrentLocation(null)
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Location Dialog */}
      <Dialog 
        open={isAddLocationOpen || isEditLocationOpen} 
        onOpenChange={(open) => {
          if (!open) {
            setIsAddLocationOpen(false)
            setIsEditLocationOpen(false)
            setCurrentLocation(null)
          }
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditLocationOpen ? 'Edit Location' : 'Add New Location'}</DialogTitle>
            <DialogDescription>
              {isEditLocationOpen 
                ? 'Update your location details.' 
                : 'Add a new location to your saved places for faster bookings.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={form.handleSubmit((data) => onSubmit(data, isEditLocationOpen))} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Location Name</Label>
              <Input 
                id="name" 
                placeholder="e.g. Home, Work, Hotel" 
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Location Type</Label>
              <select
                id="type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...form.register("type")}
              >
                <option value="home">Home</option>
                <option value="airport">Airport</option>
                <option value="hotel">Hotel</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Pickup Address</Label>
              <Input 
                id="address" 
                placeholder="Enter full address" 
                {...form.register("address")}
              />
              {form.formState.errors.address && (
                <p className="text-sm text-red-500">{form.formState.errors.address.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Additional Details (Optional)</Label>
              <Textarea 
                id="description" 
                placeholder="E.g., Floor, Apartment number, Landmark, etc." 
                {...form.register("description")}
              />
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Switch 
                id="isDefault" 
                checked={form.watch("isDefault")}
                onCheckedChange={(checked) => form.setValue("isDefault", checked)}
              />
              <Label htmlFor="isDefault">Set as default location</Label>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAddLocationOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditLocationOpen ? 'Update Location' : 'Save Location'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
