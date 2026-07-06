"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import API from "@/lib/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { CreateClientDialog } from "@/components/forms/create-client-dialog";
import { PlusIcon } from "lucide-react";

export function ProjectForm({ onSuccess, onCancel, initialData = null }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    startDate: initialData?.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    estimatedEndDate: initialData?.estimatedEndDate ? new Date(initialData.estimatedEndDate).toISOString().split('T')[0] : "",
    status: initialData?.status || "Planning",
    clientId: initialData?.clientId || "",
  });
  
  const [clients, setClients] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await API.get("/clients?limit=100");
        setClients(res.data.clients);
      } catch (error) {
        toast.error("Failed to load clients");
      }
    };
    fetchClients();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.startDate) newErrors.startDate = "Start Date is required";
    if (!formData.clientId) newErrors.clientId = "Client is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      let projectData = null;
      if (initialData?.id) {
        const res = await API.patch(`/projects/${initialData.id}`, formData);
        toast.success("Project updated successfully!");
        projectData = res?.data?.project;
      } else {
        const res = await API.post("/projects", formData);
        toast.success("Project created successfully!");
        projectData = res?.data?.project;
      }
      onSuccess?.(projectData);
    } catch (error) {
      toast.error("Operation failed", {
        description: error.response?.data?.error || "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4 px-2 sm:px-4 flex flex-col h-full overflow-y-auto">
      <div className="flex flex-col gap-8 flex-1">
        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-foreground">Project Title</label>
          <Input 
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Website Redesign"
            disabled={isLoading}
            className="w-full h-11"
          />
          {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-foreground">Client</label>
          <div className="flex items-center gap-2">
            <select 
              value={formData.clientId}
              onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
              disabled={isLoading}
              className="flex-1 h-11 flex rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" disabled>Select a client</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
            <CreateClientDialog 
              trigger={
                <Button type="button" variant="outline" size="icon" className="size-11 shrink-0">
                  <PlusIcon className="size-4" />
                </Button>
              }
              onSuccess={(newClient) => {
                if (newClient) {
                  setClients(prev => [...prev, newClient]);
                  setFormData(prev => ({ ...prev, clientId: newClient.id }));
                }
              }}
            />
          </div>
          {errors.clientId && <p className="text-xs text-destructive">{errors.clientId}</p>}
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-foreground">Description (Optional)</label>
          <textarea 
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief details about the project..."
            disabled={isLoading}
            className="w-full min-h-[100px] flex rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div className="flex flex-col gap-3 relative">
            <label className="text-sm font-semibold text-foreground">Start Date</label>
            <Input 
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                disabled={isLoading}
                className="w-full h-11"
            />
            {errors.startDate && <p className="text-xs text-destructive absolute -bottom-6">{errors.startDate}</p>}
            </div>

            <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-foreground leading-tight">Est. End Date <br/><span className="text-muted-foreground font-normal">(Optional)</span></label>
            <Input 
                type="date"
                value={formData.estimatedEndDate}
                onChange={(e) => setFormData({ ...formData, estimatedEndDate: e.target.value })}
                disabled={isLoading}
                className="w-full h-11"
            />
            </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-foreground">Status</label>
          <div className="grid grid-cols-2 gap-1 bg-muted/60 p-1 rounded-lg w-full">
            {["Planning", "Active", "Completed", "On Hold"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFormData({ ...formData, status })}
                className={cn(
                  "text-sm font-medium py-2 px-2 rounded-md transition-all truncate",
                  formData.status === status 
                    ? "bg-background shadow-sm text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

      </div>

      <div className="flex justify-end gap-3 pt-6 mt-auto">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : (initialData ? "Save Changes" : "Create Project")}
        </Button>
      </div>
    </form>
  );
}
