"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  UserCheck,
  UserX,
  Phone,
  Mail,
  MapPin,
  User,
  Calendar,
  Loader2,
} from "lucide-react";
import { useGetAllClientsQuery, useUpdateClientMutation } from "@/Redux/features/client/clientApi";
import { toast } from "sonner";

export default function AgentClientsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    contactNumber: "",
    address: "",
    country: "",
  });

  // Fetch clients from API
  const { data: clientsResponse, isLoading, isError } = useGetAllClientsQuery({});
  const [updateClient, { isLoading: isUpdating }] = useUpdateClientMutation();

  const clients = clientsResponse?.data || [];

  // Filter clients based on status
  const filteredClients = clients.filter((client: any) => {
    const matchesStatus =
      statusFilter === "all" ||
      client.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesStatus;
  });

  // Calculate statistics
  const totalClientsCount = clients.length;
  const activeClientsCount = clients.filter((c: any) => c.status === "ACTIVE").length;
  const inactiveClientsCount = clients.filter((c: any) => c.status !== "ACTIVE").length;

  const stats = [
    {
      id: 1,
      label: "Total Clients",
      icon: <Users className="h-5 w-5 text-blue-600" />,
      value: totalClientsCount,
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      label: "Active Clients",
      icon: <UserCheck className="h-5 w-5 text-green-600" />,
      value: activeClientsCount,
      bgColor: "bg-green-50",
    },
    {
      id: 3,
      label: "Inactive Clients",
      icon: <UserX className="h-5 w-5 text-orange-600" />,
      value: inactiveClientsCount,
      bgColor: "bg-orange-50",
    },
  ];

  // Handler functions
  const handleViewClient = (client: any) => {
    setSelectedClient(client);
    setIsViewModalOpen(true);
  };

  const handleEditClient = (client: any) => {
    setSelectedClient(client);
    setEditFormData({
      fullName: client.fullName,
      contactNumber: client.contactNumber,
      address: client.address,
      country: client.country || "Ireland",
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedClient) return;

    try {
      await updateClient({
        id: selectedClient.id,
        data: editFormData,
      }).unwrap();
      
      toast.success("Client updated successfully");
      setIsEditModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update client");
    }
  };

  return (
    <div className="flex flex-col gap-5 pb-5">
      {/* Header */}
      <PageHeader
        title="Clients Management"
        description="View and manage all your client information"
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map((stat) => (
          <Card key={stat.id} className={`${stat.bgColor} border-none shadow-none`}>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm">
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Clients Table */}
      <Card className="shadow-sm border-gray-100">
        <CardHeader className="pb-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CardTitle className="text-xl font-bold">Client List</CardTitle>
            <div className="flex items-center gap-3">
               <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex h-10 w-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <Link href="/dashboard/clients/add">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-none">
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
                  <TableHead className="font-semibold text-white rounded-tl-lg">
                    Client Name
                  </TableHead>
                  <TableHead className="font-semibold text-white">
                    Contact
                  </TableHead>
                  <TableHead className="font-semibold text-white">
                    Location
                  </TableHead>
                  <TableHead className="font-semibold text-center text-white">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-center text-white rounded-tr-lg">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12">
                      <div className="flex flex-col items-center gap-2 text-gray-500 font-medium">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        <p>Loading clients...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : isError ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-red-500">
                      Failed to load clients. Please try again.
                    </TableCell>
                  </TableRow>
                ) : filteredClients.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-gray-500"
                    >
                      No clients found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClients.map((client: any) => (
                    <TableRow key={client.id} className="hover:bg-gray-50/50 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm border border-blue-200">
                            {client.fullName
                              ?.split(" ")
                              .map((n: string) => n[0])
                              .join("") || "U"}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {client.fullName}
                            </p>
                            <p className="text-xs text-gray-500">
                              Joined{" "}
                              {new Date(client.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-sm">
                            <Mail className="h-3.5 w-3.5 text-gray-400" />
                            <span className="text-gray-700">
                              {client.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm">
                            <Phone className="h-3.5 w-3.5 text-gray-400" />
                            <span className="text-gray-700">
                              {client.contactNumber}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-0.5">
                           <div className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-gray-400" />
                            <span className="text-sm text-gray-700">
                              {client.country}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 pl-5 truncate max-w-[150px]">
                            {client.address}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            client.status === "ACTIVE"
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
            <DialogTitle className="text-xl font-bold">
              Client Details
            </DialogTitle>
            <DialogDescription>
              View complete information about this client
            </DialogDescription>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                 <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl border-2 border-white shadow-sm">
                    {selectedClient.fullName
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("") || "U"}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{selectedClient.fullName}</h3>
                    <p className="text-sm text-gray-500">Client ID: {selectedClient.id}</p>
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">
                    Status
                  </Label>
                  <div className="flex">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        selectedClient.status === "ACTIVE"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-gray-50 text-gray-600 border border-gray-200"
                      }`}
                    >
                      {selectedClient.status}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">
                    Join Date
                  </Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <p className="text-sm">
                      {new Date(selectedClient.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">
                    Email
                  </Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <p className="text-sm">{selectedClient.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">
                    Phone
                  </Label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <p className="text-sm">{selectedClient.contactNumber}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-600">
                  Location
                </Label>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <p className="text-sm">{selectedClient.country}</p>
                  </div>
                  <p className="text-sm text-gray-600 pl-6">{selectedClient.address}</p>
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
                value={editFormData.fullName}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, fullName: e.target.value })
                }
                placeholder="Enter full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-phone" className="text-sm font-medium">
                Phone <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-phone"
                value={editFormData.contactNumber}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, contactNumber: e.target.value })
                }
                placeholder="Enter phone number"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-country" className="text-sm font-medium">
                  Country
                </Label>
                <Input
                  id="edit-country"
                  value={editFormData.country}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, country: e.target.value })
                  }
                  placeholder="Enter country"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-address" className="text-sm font-medium">
                  Address
                </Label>
                <Input
                  id="edit-address"
                  value={editFormData.address}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, address: e.target.value })
                  }
                  placeholder="Enter address"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)} disabled={isUpdating}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isUpdating}
            >
              {isUpdating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

