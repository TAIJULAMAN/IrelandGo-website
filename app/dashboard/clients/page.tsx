"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Phone,
  Mail,
  MapPin,
  Filter,
  User,
  Calendar,
  X,
} from "lucide-react";

// Mock client data
const mockClients = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+353 87 123 4567",
    location: "Dublin",
    totalBookings: 12,
    totalSpent: "€3,450",
    status: "Active",
    joinDate: "2024-01-15",
    lastBooking: "2024-12-10",
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone: "+353 86 234 5678",
    location: "Cork",
    totalBookings: 8,
    totalSpent: "€2,100",
    status: "Active",
    joinDate: "2024-02-20",
    lastBooking: "2024-12-05",
  },
  {
    id: 3,
    name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+353 85 345 6789",
    location: "Galway",
    totalBookings: 5,
    totalSpent: "€1,250",
    status: "Active",
    joinDate: "2024-03-10",
    lastBooking: "2024-11-28",
  },
  {
    id: 4,
    name: "Sarah O'Connor",
    email: "sarah.oconnor@email.com",
    phone: "+353 87 456 7890",
    location: "Limerick",
    totalBookings: 15,
    totalSpent: "€4,800",
    status: "Active",
    joinDate: "2023-11-05",
    lastBooking: "2024-12-12",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@email.com",
    phone: "+353 86 567 8901",
    location: "Waterford",
    totalBookings: 3,
    totalSpent: "€750",
    status: "Inactive",
    joinDate: "2024-05-22",
    lastBooking: "2024-08-15",
  },
  {
    id: 6,
    name: "Emma Murphy",
    email: "emma.murphy@email.com",
    phone: "+353 85 678 9012",
    location: "Dublin",
    totalBookings: 20,
    totalSpent: "€6,200",
    status: "Active",
    joinDate: "2023-09-12",
    lastBooking: "2024-12-14",
  },
];

export default function AgentClientsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedClient, setSelectedClient] = useState<typeof mockClients[0] | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  // Filter clients based on status
  const filteredClients = mockClients.filter((client) => {
    const matchesStatus =
      statusFilter === "all" ||
      client.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesStatus;
  });

  // Calculate statistics
  const totalClients = mockClients.length;
  const activeClients = mockClients.filter((c) => c.status === "Active").length;
  const inactiveClients = mockClients.filter((c) => c.status === "Inactive").length;

  const stats = [
    {
      id: 1,
      label: "Total Clients",
      icon: <Users className="h-5 w-5 text-blue-600" />,
      value: totalClients,
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      label: "Active Clients",
      icon: <UserCheck className="h-5 w-5 text-green-600" />,
      value: activeClients,
      bgColor: "bg-green-50",
    },
    {
      id: 3,
      label: "Inactive Clients",
      icon: <UserX className="h-5 w-5 text-orange-600" />,
      value: inactiveClients,
      bgColor: "bg-orange-50",
    }
  ];

  // Handler functions
  const handleViewClient = (client: typeof mockClients[0]) => {
    setSelectedClient(client);
    setIsViewModalOpen(true);
  };

  const handleEditClient = (client: typeof mockClients[0]) => {
    setSelectedClient(client);
    setEditFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      location: client.location,
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteClient = (client: typeof mockClients[0]) => {
    setSelectedClient(client);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = () => {
    // TODO: Add API call to update client
    console.log("Updating client:", selectedClient?.id, editFormData);
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    // TODO: Add API call to delete client
    console.log("Deleting client:", selectedClient?.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 pb-4">
      {/* Header */}
      <PageHeader
        title="Clients Management"
        description="View and manage all your client information"
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((stat) => (
          <Card
            key={stat.id}
            className="shadow-sm border border-gray-100 bg-white/90"
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div
                  className={`h-12 w-12 rounded-full ${stat.bgColor} flex items-center justify-center`}
                >
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Clients Table */}
      <Card className="shadow-sm border border-gray-100 bg-white/90">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CardTitle className="text-xl font-bold">Client List</CardTitle>
            <div className="flex items-center gap-3">
              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="flex h-10 w-40 rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              {/* Add Client Button */}
              <Link href="/agent/clients/add">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Users className="h-4 w-4 mr-2" />
                  Add Client
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-600 hover:bg-blue-600">
                  <TableHead className="font-semibold text-white rounded-tl-lg">Client Name</TableHead>
                  <TableHead className="font-semibold text-white">Contact</TableHead>
                  <TableHead className="font-semibold text-white">Location</TableHead>
                  <TableHead className="font-semibold text-center text-white">Bookings</TableHead>
                  <TableHead className="font-semibold text-center text-white">Total Spent</TableHead>
                  <TableHead className="font-semibold text-center text-white">Status</TableHead>
                  <TableHead className="font-semibold text-center text-white rounded-tr-lg">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No clients found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClients.map((client) => (
                    <TableRow key={client.id} className="hover:bg-gray-50/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                            {client.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{client.name}</p>
                            <p className="text-xs text-gray-500">
                              Joined {new Date(client.joinDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-sm">
                            <Mail className="h-3.5 w-3.5 text-gray-400" />
                            <span className="text-gray-700">{client.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm">
                            <Phone className="h-3.5 w-3.5 text-gray-400" />
                            <span className="text-gray-700">{client.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{client.location}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                          {client.totalBookings}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-semibold text-gray-900">
                          {client.totalSpent}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${client.status === "Active"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-gray-50 text-gray-600 border border-gray-200"
                            }`}
                        >
                          {client.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                            title="View Details"
                            onClick={() => handleViewClient(client)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600"
                            title="Edit Client"
                            onClick={() => handleEditClient(client)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                            title="Delete Client"
                            onClick={() => handleDeleteClient(client)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Client Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Client Details</DialogTitle>
            <DialogDescription>
              View complete information about this client
            </DialogDescription>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Full Name</Label>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <p className="text-sm">{selectedClient.name}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Status</Label>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${selectedClient.status === "Active"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-gray-50 text-gray-600 border border-gray-200"
                      }`}
                  >
                    {selectedClient.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Email</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <p className="text-sm">{selectedClient.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Phone</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <p className="text-sm">{selectedClient.phone}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-600">Location</Label>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <p className="text-sm">{selectedClient.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Total Bookings</Label>
                  <p className="text-2xl font-bold text-blue-600">{selectedClient.totalBookings}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Total Spent</Label>
                  <p className="text-2xl font-bold text-green-600">{selectedClient.totalSpent}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Join Date</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <p className="text-sm">{new Date(selectedClient.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Last Booking</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <p className="text-sm">{new Date(selectedClient.lastBooking).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Client Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Edit Client</DialogTitle>
            <DialogDescription>
              Update client information below
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-sm font-medium">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-name"
                value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                placeholder="Enter full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email" className="text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-email"
                type="email"
                value={editFormData.email}
                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                placeholder="Enter email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-phone" className="text-sm font-medium">
                Phone <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-phone"
                value={editFormData.phone}
                onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                placeholder="Enter phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-location" className="text-sm font-medium">
                Location
              </Label>
              <Input
                id="edit-location"
                value={editFormData.location}
                onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                placeholder="Enter location"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-600">Delete Client</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this client? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedClient && (
            <div className="py-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm font-medium text-gray-900">
                  Client: <span className="font-bold">{selectedClient.name}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Email: {selectedClient.email}
                </p>
                <p className="text-sm text-gray-600">
                  Total Bookings: {selectedClient.totalBookings}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
