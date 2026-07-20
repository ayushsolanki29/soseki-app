"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { SettingsIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import API from "@/lib/api";
import { toast } from "sonner";

export function DocumentSettingsDialog({ 
    organization, 
    onOrganizationUpdate,
    documentType = "invoice",
    masterCurrency = "INR",
    trigger
}) {
    const [isOpen, setIsOpen] = useState(false);
    
    // Determine generic labels based on currency (INR vs others)
    const isIndia = masterCurrency === "INR";
    const labels = {
        taxId: isIndia ? "GSTIN" : "Tax ID / VAT No.",
        regNo: isIndia ? "PAN" : "Registration / Company No.",
        region: isIndia ? "State" : "Region / Province",
        routingNo: isIndia ? "IFSC Code" : "Routing No. / Sort Code"
    };

    // Form state initialized from organization.profile
    const profile = organization?.profile || {};
    
    const [formData, setFormData] = useState({
        phone: profile.phone || "",
        email: profile.email || "",
        taxId: profile.taxId || "",
        registrationNumber: profile.registrationNumber || "",
        region: profile.region || "",
        accountNumber: profile.accountNumber || "",
        bankName: profile.bankName || "",
        routingNumber: profile.routingNumber || "",
        branch: profile.branch || "",
        upiId: profile.upiId || "",
        termsAndConditions: profile.termsAndConditions || "",
        invoiceFooterNote: profile.invoiceFooterNote || "",
        expenseFooterNote: profile.expenseFooterNote || "",
        invoiceTemplate: profile.invoiceTemplate || "soseki-modern",
        expenseTemplate: profile.expenseTemplate || "soseki-modern"
    });

    useEffect(() => {
        if (organization?.profile) {
            setFormData({
                phone: organization.profile.phone || "",
                email: organization.profile.email || "",
                taxId: organization.profile.taxId || "",
                registrationNumber: organization.profile.registrationNumber || "",
                region: organization.profile.region || "",
                accountNumber: organization.profile.accountNumber || "",
                bankName: organization.profile.bankName || "",
                routingNumber: organization.profile.routingNumber || "",
                branch: organization.profile.branch || "",
                upiId: organization.profile.upiId || "",
                termsAndConditions: organization.profile.termsAndConditions || "",
                invoiceFooterNote: organization.profile.invoiceFooterNote || "",
                expenseFooterNote: organization.profile.expenseFooterNote || "",
                invoiceTemplate: organization.profile.invoiceTemplate || "soseki-modern",
                expenseTemplate: organization.profile.expenseTemplate || "soseki-modern"
            });
        }
    }, [organization]);

    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState("company");

    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSelectChange = (field) => (value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveSettings = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await API.patch("/organization", formData);
            toast.success("Settings updated successfully!");
            onOrganizationUpdate(res.data.organization);
            setIsOpen(false);
        } catch (error) {
            toast.error("Failed to update settings");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {trigger ? (
                <DialogTrigger render={trigger}>
                    <SettingsIcon className="size-4" />
                </DialogTrigger>
            ) : (
                <DialogTrigger render={<Button variant="outline" className="px-2" />}>
                    <SettingsIcon className="size-4" />
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-[550px] max-h-[85vh] overflow-hidden flex flex-col p-0">
                <form onSubmit={handleSaveSettings} className="flex flex-col h-full overflow-hidden">
                    <DialogHeader className="p-6 pb-4 border-b shrink-0">
                        <DialogTitle>Document Settings</DialogTitle>
                        <DialogDescription>
                            Configure details that will appear on your generated documents.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="flex-1 overflow-y-auto px-6 py-2">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-2">
                            <TabsList className="grid w-full grid-cols-3 mb-6">
                                <TabsTrigger value="company">Company</TabsTrigger>
                                <TabsTrigger value="bank">Bank Details</TabsTrigger>
                                <TabsTrigger value="template">Templates</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="company" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Contact Phone</Label>
                                        <Input value={formData.phone} onChange={handleInputChange('phone')} placeholder="+1 234 567 890" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Contact Email</Label>
                                        <Input type="email" value={formData.email} onChange={handleInputChange('email')} placeholder="billing@company.com" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>{labels.taxId}</Label>
                                        <Input value={formData.taxId} onChange={handleInputChange('taxId')} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>{labels.regNo}</Label>
                                        <Input value={formData.registrationNumber} onChange={handleInputChange('registrationNumber')} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>{labels.region}</Label>
                                    <Input value={formData.region} onChange={handleInputChange('region')} placeholder="e.g. California" />
                                </div>
                            </TabsContent>

                            <TabsContent value="bank" className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Bank Name</Label>
                                    <Input value={formData.bankName} onChange={handleInputChange('bankName')} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Account Number</Label>
                                        <Input value={formData.accountNumber} onChange={handleInputChange('accountNumber')} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>{labels.routingNo}</Label>
                                        <Input value={formData.routingNumber} onChange={handleInputChange('routingNumber')} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Branch</Label>
                                    <Input value={formData.branch} onChange={handleInputChange('branch')} />
                                </div>
                                {isIndia && (
                                    <div className="space-y-2">
                                        <Label>UPI ID</Label>
                                        <Input value={formData.upiId} onChange={handleInputChange('upiId')} placeholder="e.g. business@upi" />
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="template" className="space-y-4">
                                {documentType === "invoice" && (
                                    <div className="space-y-2">
                                        <Label>Invoice Template</Label>
                                        <Select value={formData.invoiceTemplate} onValueChange={handleSelectChange('invoiceTemplate')}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Template" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="soseki-modern">Soseki Modern</SelectItem>
                                                <SelectItem value="tax-invoice">Detailed Tax Invoice</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                                
                                {documentType === "expense" && (
                                    <div className="space-y-2">
                                        <Label>Expense Template</Label>
                                        <Select value={formData.expenseTemplate} onValueChange={handleSelectChange('expenseTemplate')}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Template" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="soseki-modern">Soseki Modern</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                                
                                <div className="space-y-2 pt-2 border-t mt-4">
                                    <Label>Default Terms & Conditions</Label>
                                    <Textarea 
                                        value={formData.termsAndConditions} 
                                        onChange={handleInputChange('termsAndConditions')} 
                                        className="h-20 text-xs" 
                                        placeholder="Enter standard terms..." 
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Footer Note</Label>
                                    <Input 
                                        value={documentType === "invoice" ? formData.invoiceFooterNote : formData.expenseFooterNote} 
                                        onChange={handleInputChange(documentType === "invoice" ? 'invoiceFooterNote' : 'expenseFooterNote')} 
                                        placeholder="e.g. Thank you for your business!" 
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <DialogFooter className="p-6 pt-4 border-t shrink-0">
                        <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save Settings"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
