"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import API from "@/lib/api";
import { UserIcon, FolderIcon, FileTextIcon, CheckSquareIcon, HelpCircleIcon } from "lucide-react";
import { formatId } from "@/lib/utils";

export function GlobalSearch({ open, onOpenChange }) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // Custom debounce logic since we might not have use-debounce hook
  React.useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      searchAPI(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const searchAPI = async (searchQuery) => {
    setLoading(true);
    try {
      const res = await API.get(`/dashboard/search?q=${encodeURIComponent(searchQuery)}`);
      if (res.data?.results) {
        setResults(res.data.results);
      }
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  const onSelect = (type, id) => {
    onOpenChange(false);
    setQuery("");
    setResults([]);
    
    switch(type) {
      case 'client':
        router.push(`/dashboard/clients/${id}`);
        break;
      case 'project':
        router.push(`/dashboard/projects/${id}`);
        break;
      case 'invoice':
        router.push(`/dashboard/invoices/${id}`);
        break;
      case 'questionnaire':
        router.push(`/dashboard/questionnaires/${id}/responses`); // Or another generic route
        break;
      case 'support_ticket':
        router.push(`/dashboard/support/${id}`);
        break;
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'client': return <UserIcon className="mr-2 size-4" />;
      case 'project': return <FolderIcon className="mr-2 size-4" />;
      case 'invoice': return <FileTextIcon className="mr-2 size-4" />;
      case 'questionnaire': return <CheckSquareIcon className="mr-2 size-4" />;
      case 'support_ticket': return <HelpCircleIcon className="mr-2 size-4" />;
      default: return null;
    }
  };

  const getFormattedId = (type, id) => {
    switch (type) {
        case 'client': return formatId(id, "CLI");
        case 'project': return formatId(id, "PRJ");
        case 'invoice': return formatId(id, "INV");
        case 'questionnaire': return formatId(id, "FRM");
        case 'support_ticket': return formatId(id, "SPT");
        default: return id;
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} shouldFilter={false}>
      <CommandInput 
        placeholder="Type a command or search..." 
        value={query} 
        onValueChange={setQuery} 
      />
      <CommandList>
        <CommandEmpty>{loading ? "Searching..." : "No results found."}</CommandEmpty>
        
        {results.map((group) => (
          <CommandGroup key={group.group} heading={group.group}>
            {group.items.map((item) => (
              <CommandItem
                key={item.id}
                value={`${item.id} ${item.label} ${item.subLabel || ""}`}
                onSelect={() => onSelect(item.type, item.id)}
              >
                {getIcon(item.type)}
                <span>{item.label}</span>
                <span className="ml-2 text-xs text-muted-foreground">
                  {getFormattedId(item.type, item.id)} {item.subLabel ? `· ${item.subLabel}` : ""}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground gap-2">
        <div className="flex items-center gap-2">
          <span>Open anytime with</span>
          <div className="flex gap-0.5">
            <kbd className="rounded-sm border border-border bg-background px-1.5 font-sans shadow-xs">⌘</kbd>
            <kbd className="rounded-sm border border-border bg-background px-1.5 font-sans shadow-xs">K</kbd>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5">
          <div className="flex gap-0.5">
            <kbd className="rounded-sm border border-border bg-background px-1 font-sans shadow-xs">↑</kbd>
            <kbd className="rounded-sm border border-border bg-background px-1 font-sans shadow-xs">↓</kbd>
          </div>
          <span>to navigate</span>
          <kbd className="ml-1 rounded-sm border border-border bg-background px-1 font-sans shadow-xs">↵</kbd>
          <span>to open</span>
        </div>
      </div>
    </CommandDialog>
  );
}
