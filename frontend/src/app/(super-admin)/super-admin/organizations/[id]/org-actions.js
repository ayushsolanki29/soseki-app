"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function OrgActions({ org }) {
  const router = useRouter();
  
  
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isDeletingOrg, setIsDeletingOrg] = useState(false);
  
  const [editData, setEditData] = useState({
    name: org.name || "",
    masterCurrency: org.masterCurrency || "USD",
    address: org.address || "",
    dateFormat: org.dateFormat || "dd-MMM-yy",
    invoiceFooterNote: org.profile?.invoiceFooterNote || "",
    expenseFooterNote: org.profile?.expenseFooterNote || "",
    invoiceTemplate: org.profile?.invoiceTemplate || "soseki-modern",
    expenseTemplate: org.profile?.expenseTemplate || "soseki-modern",
    termsAndConditions: org.profile?.termsAndConditions || "",
  });
  
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusToggle = async () => {
    const newStatus = org.status === "Blocked" ? "Active" : "Blocked";
    setIsLoading(true);
    try {
      await API.patch(`/super-admin/organizations/${org.id}/status`, { status: newStatus });
      toast.success("Success", {
        description: `Organization ${newStatus.toLowerCase()} successfully.`
      });
      router.refresh();
    } catch (error) {
      toast.error("Error", {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await API.put(`/super-admin/organizations/${org.id}`, editData);
      toast.success("Success", {
        description: "Organization updated successfully."
      });
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      toast.error("Error", {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await API.put(`/super-admin/organizations/${org.id}/admin-password`, { newPassword });
      toast.success("Success", {
        description: "Admin password changed successfully."
      });
      setIsChangingPassword(false);
      setNewPassword("");
    } catch (error) {
      toast.error("Error", {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSubmit = async () => {
    setIsLoading(true);
    try {
      await API.delete(`/super-admin/organizations/${org.id}`);
      toast.success("Success", {
        description: "Organization deleted successfully."
      });
      router.push("/super-admin/organizations");
    } catch (error) {
      toast.error("Error", {
        description: error.message
      });
      setIsLoading(false);
      setIsDeletingOrg(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Details</Button>
      <Button variant="outline" onClick={() => setIsChangingPassword(true)}>Change Admin Password</Button>
      <Button 
        variant={org.status === "Blocked" ? "default" : "destructive"} 
        onClick={handleStatusToggle}
        disabled={isLoading}
      >
        {org.status === "Blocked" ? "Unblock Organization" : "Block Organization"}
      </Button>
      <Button 
        variant="destructive" 
        onClick={() => setIsDeletingOrg(true)}
      >
        Delete Organization
      </Button>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Organization</DialogTitle>
            <DialogDescription>
              Make changes to the organization's core details here.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={editData.name} 
                  onChange={(e) => setEditData({...editData, name: e.target.value})} 
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="currency">Master Currency</Label>
                <Select 
                  value={editData.masterCurrency} 
                  onValueChange={(value) => setEditData({...editData, masterCurrency: value})}
                >
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                    <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                    <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    <SelectItem value="SGD">SGD - Singapore Dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address" 
                  value={editData.address} 
                  onChange={(e) => setEditData({...editData, address: e.target.value})} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dateFormat">Date Format</Label>
                <Input 
                  id="dateFormat" 
                  value={editData.dateFormat} 
                  onChange={(e) => setEditData({...editData, dateFormat: e.target.value})} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="invoiceFooterNote">Invoice Footer Note</Label>
                <Input 
                  id="invoiceFooterNote" 
                  value={editData.invoiceFooterNote} 
                  onChange={(e) => setEditData({...editData, invoiceFooterNote: e.target.value})} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="expenseFooterNote">Expense Footer Note</Label>
                <Input 
                  id="expenseFooterNote" 
                  value={editData.expenseFooterNote} 
                  onChange={(e) => setEditData({...editData, expenseFooterNote: e.target.value})} 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="invoiceTemplate">Invoice Template</Label>
                  <Select 
                    value={editData.invoiceTemplate} 
                    onValueChange={(value) => setEditData({...editData, invoiceTemplate: value})}
                  >
                    <SelectTrigger id="invoiceTemplate">
                      <SelectValue placeholder="Select Template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="soseki-modern">Soseki Modern</SelectItem>
                      <SelectItem value="tax-invoice">Detailed Tax Invoice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="expenseTemplate">Expense Template</Label>
                  <Select 
                    value={editData.expenseTemplate} 
                    onValueChange={(value) => setEditData({...editData, expenseTemplate: value})}
                  >
                    <SelectTrigger id="expenseTemplate">
                      <SelectValue placeholder="Select Template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="soseki-modern">Soseki Modern</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button type="submit" disabled={isLoading}>Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={isChangingPassword} onOpenChange={setIsChangingPassword}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Admin Password</DialogTitle>
            <DialogDescription>
              Set a new password for the primary admin of this organization.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePasswordSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input 
                  id="new-password" 
                  type="password"
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  required 
                  minLength={6}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsChangingPassword(false)}>Cancel</Button>
              <Button type="submit" disabled={isLoading || newPassword.length < 6}>Change Password</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Organization Dialog */}
      <Dialog open={isDeletingOrg} onOpenChange={setIsDeletingOrg}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-destructive">Delete Organization</DialogTitle>
            <DialogDescription>
              Are you sure you want to completely delete {org.name}? This action cannot be undone and will permanently remove all users, projects, and data associated with this organization.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeletingOrg(false)} disabled={isLoading}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteSubmit} disabled={isLoading}>Yes, Delete Organization</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
