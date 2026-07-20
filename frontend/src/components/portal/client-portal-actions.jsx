"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LinkIcon, SettingsIcon, Building, CreditCard, Building2, Landmark, MapPin, Mail, Phone, Hash } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

export function ClientPortalActions({ profile }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("company");

  const orgName = profile?.organization?.name || "Organization";
  const orgProfile = profile?.organization?.profile || {};

  const copyPortalLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Portal link copied to clipboard!");
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="secondary" onClick={copyPortalLink} className="gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border-none shadow-sm h-9 px-4 rounded-full font-medium">
        <LinkIcon className="size-4" />
        Portal Link
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-full shadow-sm">
            <SettingsIcon className="size-4 text-slate-600" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-slate-50/50">
          <DialogHeader className="p-6 pb-4 bg-white border-b border-slate-100">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Building2 className="w-5 h-5 text-primary" /> {orgName} Details
            </DialogTitle>
            <DialogDescription>
              Basic company information and payment details.
            </DialogDescription>
          </DialogHeader>
          
          <div className="p-6 pt-2 bg-slate-50/50">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-white border shadow-sm rounded-full p-1 h-auto">
                <TabsTrigger value="company" className="rounded-full py-2 data-[state=active]:bg-primary/5 data-[state=active]:text-primary data-[state=active]:shadow-none">
                  Company
                </TabsTrigger>
                <TabsTrigger value="bank" className="rounded-full py-2 data-[state=active]:bg-primary/5 data-[state=active]:text-primary data-[state=active]:shadow-none">
                  Bank Details
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="company" className="space-y-4 outline-none">
                <Card className="border-border/40 shadow-sm">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 mt-0.5 text-slate-400" />
                      <div>
                        <div className="text-xs text-slate-500 font-medium">Email</div>
                        <div className="text-sm font-medium">{orgProfile.email || "Not provided"}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 mt-0.5 text-slate-400" />
                      <div>
                        <div className="text-xs text-slate-500 font-medium">Phone</div>
                        <div className="text-sm font-medium">{orgProfile.phone || "Not provided"}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 mt-0.5 text-slate-400" />
                      <div>
                        <div className="text-xs text-slate-500 font-medium">Region</div>
                        <div className="text-sm font-medium">{orgProfile.region || "Not provided"}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Building className="w-4 h-4 mt-0.5 text-slate-400" />
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <div>
                          <div className="text-xs text-slate-500 font-medium">Tax ID</div>
                          <div className="text-sm font-medium">{orgProfile.taxId || "N/A"}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 font-medium">Reg. Number</div>
                          <div className="text-sm font-medium">{orgProfile.registrationNumber || "N/A"}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bank" className="space-y-4 outline-none">
                <Card className="border-border/40 shadow-sm overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Landmark className="w-24 h-24" />
                  </div>
                  <CardContent className="p-5 space-y-4 relative z-10">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1.5">
                        <Landmark className="w-3.5 h-3.5" /> Bank Name
                      </div>
                      <div className="text-base font-semibold text-slate-900">{orgProfile.bankName || "Not provided"}</div>
                    </div>
                    
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                      <div className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5" /> Account Number
                      </div>
                      <div className="font-mono text-sm font-semibold tracking-wider text-slate-800">
                        {orgProfile.accountNumber || "Not provided"}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1.5">
                          <Hash className="w-3.5 h-3.5" /> Routing Number
                        </div>
                        <div className="text-sm font-medium">{orgProfile.routingNumber || "Not provided"}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" /> Branch
                        </div>
                        <div className="text-sm font-medium">{orgProfile.branch || "Not provided"}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
