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
  Phone,
  Mail,
  MapPin,
  Calendar,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  useGetAllClientsQuery,
  useUpdateClientMutation,
} from "@/Redux/features/client/clientApi";
import { toast } from "sonner";

export default function AgentClientsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
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
  const {
    data: clientsResponse,
    isLoading,
    isError,
  } = useGetAllClientsQuery({ page: currentPage, limit });
  const [updateClient, { isLoading: isUpdating }] = useUpdateClientMutation();

  const clients = clientsResponse?.data || [];
  const meta = clientsResponse?.meta || { total: 0, page: 1 };
  const totalPages = Math.ceil(meta.total / limit);

  // Calculate statistics
  const totalClientsCount = meta.total || clients.length;

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

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex flex-col gap-5 pb-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Header */}
        <PageHeader
          title="Clients Management"
          description={`View and manage all your ${totalClientsCount} client information`}
        />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Link href="/dashboard/clients/add">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-none">
              <Users className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </Link>
        </div>
      </div>

      {/* Clients Table */}
      <Card className="">
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
                  <TableHead className="font-semibold text-center text-white rounded-tr-lg">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12">
                      <div className="flex flex-col items-center gap-2 text-gray-500 font-medium">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        <p>Loading clients...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : isError ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-12 text-red-500"
                    >
                      Failed to load clients. Please try again.
                    </TableCell>
                  </TableRow>
                ) : clients.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-8 text-gray-500"
                    >
                      No clients found in the system
                    </TableCell>
                  </TableRow>
                ) : (
                  clients.map((client: any) => (
                    <TableRow
                      key={client.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
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

          {/* Pagination */}
          {!isLoading && !isError && clients.length > 0 && totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * limit + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * limit, meta.total)}
                </span>{" "}
                of <span className="font-medium">{meta.total}</span> clients
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 px-2"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className={`h-8 w-8 p-0 ${
                          currentPage === page
                            ? "bg-blue-600 hover:bg-blue-700"
                            : ""
                        }`}
                      >
                        {page}
                      </Button>
                    ),
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 px-2"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
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
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl border-2 border-white shadow-sm overflow-hidden">
                  {selectedClient.profileImage ? (
                    <img
                      src={selectedClient.profileImage}
                      alt={selectedClient.fullName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    selectedClient.fullName
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("") || "U"
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {selectedClient.fullName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Client ID: {selectedClient.id}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
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
                  <p className="text-sm text-gray-600 pl-6">
                    {selectedClient.address}
                  </p>
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
                  setEditFormData({
                    ...editFormData,
                    contactNumber: e.target.value,
                  })
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
                    setEditFormData({
                      ...editFormData,
                      country: e.target.value,
                    })
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
                    setEditFormData({
                      ...editFormData,
                      address: e.target.value,
                    })
                  }
                  placeholder="Enter address"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
