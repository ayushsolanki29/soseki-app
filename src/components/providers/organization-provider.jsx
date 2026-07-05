"use client";

import { createContext, useContext, useState, useEffect } from "react";
import API from "@/lib/api";
import { setGlobalDateFormat } from "@/lib/utils";

const OrganizationContext = createContext(null);

export function OrganizationProvider({ children }) {
  const [organization, setOrganization] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrganization = async () => {
    try {
      const res = await API.get("/organization");
      setOrganization(res.data.organization);
      if (res.data.organization?.dateFormat) {
        setGlobalDateFormat(res.data.organization.dateFormat);
      }
    } catch (error) {
      console.error("Failed to fetch organization settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, []);

  return (
    <OrganizationContext.Provider value={{ organization, isLoading, refetch: fetchOrganization }}>
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error("useOrganization must be used within an OrganizationProvider");
  }
  return context;
}
