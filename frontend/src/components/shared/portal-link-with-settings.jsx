"use client";

import { Button } from "@/components/ui/button";
import { LinkIcon } from "lucide-react";
import { DocumentSettingsDialog } from "@/components/shared/document-settings-dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function PortalLinkWithSettings({ 
    portalLink, 
    organization, 
    onOrganizationUpdate, 
    documentType = "invoice",
    masterCurrency = "INR",
    className
}) {
    const copyPortalLink = () => {
        navigator.clipboard.writeText(portalLink);
        toast.success("Portal link copied to clipboard!");
    };

    return (
        <div className={cn("flex items-center bg-secondary/50 rounded-md overflow-hidden border", className)}>
            <Button 
                variant="ghost" 
                onClick={copyPortalLink} 
                className="gap-2 h-9 rounded-none hover:bg-secondary/80 border-r"
            >
                <LinkIcon className="size-4" />
                Portal Link
            </Button>
            <DocumentSettingsDialog 
                organization={organization}
                onOrganizationUpdate={onOrganizationUpdate}
                documentType={documentType}
                masterCurrency={masterCurrency}
                trigger={<Button variant="ghost" className="h-9 w-9 rounded-none px-0 hover:bg-secondary/80" />}
            />
        </div>
    );
}
