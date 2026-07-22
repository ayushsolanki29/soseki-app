"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import API from "@/lib/api";
import { toast } from "sonner";

export function EditPaymentDialog({ open, onOpenChange, onSuccess, payment }) {
  const [formData, setFormData] = useState({
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    method: "Bank Transfer",
    reference: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open && payment) {
      setFormData({
        amount: payment.amount || 0,
        date: payment.date ? new Date(payment.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        method: payment.method || "Bank Transfer",
        reference: payment.reference || ""
      });
    }
  }, [open, payment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!payment) return;
    
    if (formData.amount <= 0) {
        toast.error("Please enter a valid amount greater than 0");
        return;
    }

    setIsSubmitting(true);
    try {
      await API.patch(`/payments/${payment.id}`, formData);
      toast.success("Payment updated successfully!");
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to update payment");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!payment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Payment</DialogTitle>
          <DialogDescription>
            Update the payment details for Invoice #{payment.invoice?.invoiceNumber}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold">Payment Amount</label>
            <Input 
                type="number" 
                step="0.01" 
                value={formData.amount}
                onChange={e => setFormData({...formData, amount: parseFloat(e.target.value) || 0})}
                required
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold">Payment Date</label>
            <Input 
                type="date" 
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                required
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold">Payment Method</label>
            <Select value={formData.method} onValueChange={val => setFormData({...formData, method: val})}>
                <SelectTrigger>
                    <SelectValue placeholder="Select Method" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Check">Check</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold">Reference (Optional)</label>
            <Input 
                placeholder="Transaction ID, Check Number, etc."
                value={formData.reference}
                onChange={e => setFormData({...formData, reference: e.target.value})}
            />
          </div>

          <DialogFooter className="mt-4">
            <DialogClose render={
                <Button type="button" variant="outline" disabled={isSubmitting}>Cancel</Button>
            } />
            <Button type="submit" disabled={isSubmitting || formData.amount <= 0}>
                {isSubmitting ? "Saving..." : "Update Payment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
