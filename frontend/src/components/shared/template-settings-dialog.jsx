"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { SettingsIcon } from "lucide-react";
import API from "@/lib/api";
import { toast } from "sonner";

export function TemplateSettingsDialog({ 
    organization, 
    onOrganizationUpdate,
    documentType = "invoice" 
}) {
    const [isOpen, setIsOpen] = useState(false);
    
    // Selection state
    const [invoiceTemplate, setInvoiceTemplate] = useState(organization?.invoiceTemplate || "soseki-modern");
    const [expenseTemplate, setExpenseTemplate] = useState(organization?.expenseTemplate || "soseki-modern");
    const [isSavingTemplates, setIsSavingTemplates] = useState(false);

    // Request state
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [requestDescription, setRequestDescription] = useState("");
    const [requestFile, setRequestFile] = useState(null);
    const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

    const handleSaveTemplates = async (e) => {
        e.preventDefault();
        setIsSavingTemplates(true);
        try {
            const res = await API.patch("/organization", { 
                invoiceTemplate,
                expenseTemplate
            });
            toast.success("Template settings updated!");
            onOrganizationUpdate(res.data.organization);
            setIsOpen(false);
        } catch (error) {
            toast.error("Failed to update templates");
        } finally {
            setIsSavingTemplates(false);
        }
    };

    const handleRequestTemplate = async (e) => {
        e.preventDefault();
        if (!requestDescription.trim()) return toast.error("Please provide a description");
    
        setIsSubmittingRequest(true);
        try {
            let attachmentUrl = null;
            if (requestFile) {
                const formData = new FormData();
                formData.append("file", requestFile);
                const uploadRes = await API.post("/upload/image", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                attachmentUrl = uploadRes.data.url;
            }
    
            await API.post("/organization/template-requests", {
                type: documentType,
                description: requestDescription.trim(),
                attachmentUrl
            });
    
            toast.success("Template request submitted! We will contact you soon.");
            setShowRequestForm(false);
            setRequestDescription("");
            setRequestFile(null);
        } catch (error) {
            toast.error("Failed to submit request");
        } finally {
            setIsSubmittingRequest(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger render={<Button variant="outline" size="sm" className="gap-2 h-8 text-xs" />}>
                <SettingsIcon className="size-3" />
                Template Settings
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px]">
                {!showRequestForm ? (
                    <form onSubmit={handleSaveTemplates}>
                        <DialogHeader>
                            <DialogTitle>Template Settings</DialogTitle>
                            <DialogDescription>
                                Choose a template for your {documentType === "invoice" ? "invoices" : "expense receipts"}.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            {documentType === "invoice" && (
                                <div className="space-y-2">
                                    <Label>Invoice Template</Label>
                                    <Select value={invoiceTemplate} onValueChange={setInvoiceTemplate} disabled={isSavingTemplates}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Template" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="soseki-modern">Soseki Modern</SelectItem>
                                            <SelectItem value="tax-invoice">Tax Invoice</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                            
                            {documentType === "expense" && (
                                <div className="space-y-2">
                                    <Label>Expense Template</Label>
                                    <Select value={expenseTemplate} onValueChange={setExpenseTemplate} disabled={isSavingTemplates}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Template" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="soseki-modern">Soseki Modern (A4)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            <div className="pt-4 border-t border-muted">
                                <p className="text-sm text-muted-foreground mb-2">Need a specific layout?</p>
                                <Button type="button" variant="secondary" className="w-full" onClick={() => setShowRequestForm(true)}>
                                    Request Custom Template
                                </Button>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={isSavingTemplates}>
                                {isSavingTemplates ? "Saving..." : "Save Preferences"}
                            </Button>
                        </DialogFooter>
                    </form>
                ) : (
                    <form onSubmit={handleRequestTemplate}>
                        <DialogHeader>
                            <DialogTitle>Request Custom Template</DialogTitle>
                            <DialogDescription>
                                Describe what you need, and our team will build a custom {documentType} template for your organization.
                            </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                            <Label>Description & Requirements</Label>
                            <Textarea 
                                value={requestDescription}
                                onChange={e => setRequestDescription(e.target.value)}
                                placeholder="Describe your desired layout, specific fields needed, colors, etc."
                                className="min-h-[100px]"
                            />
                            </div>

                            <div className="space-y-2">
                            <Label>Example/Reference Image (Optional)</Label>
                            <Input 
                                type="file" 
                                accept="image/*,.pdf" 
                                onChange={(e) => setRequestFile(e.target.files?.[0])}
                            />
                            </div>
                        </div>

                        <DialogFooter className="flex justify-between items-center w-full sm:justify-between">
                            <Button type="button" variant="ghost" onClick={() => setShowRequestForm(false)}>Back</Button>
                            <Button type="submit" disabled={isSubmittingRequest}>
                                {isSubmittingRequest ? "Submitting..." : "Submit Request"}
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
