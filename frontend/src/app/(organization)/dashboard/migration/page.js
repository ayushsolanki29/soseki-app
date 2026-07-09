"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DownloadIcon, CopyIcon, UploadCloudIcon, CheckCircleIcon, ArrowRightIcon, Loader2 } from "lucide-react";
import API from "@/lib/api";

export default function MigrationPage() {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState({ clients: 0, projects: 0, invoices: 0, payments: 0 });
  
  const [promptData, setPromptData] = useState({ prompt: "", template: null });
  const [isLoadingPrompt, setIsLoadingPrompt] = useState(true);

  useEffect(() => {
    fetchPrompt();
  }, []);

  const fetchPrompt = async () => {
    try {
      const res = await API.get("/migration/prompt");
      setPromptData({ prompt: res.data.prompt, template: res.data.template });
    } catch (error) {
      toast.error("Failed to load AI Prompt from server.");
    } finally {
      setIsLoadingPrompt(false);
    }
  };

  const handleDownloadTemplate = () => {
    if (!promptData.template) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(promptData.template, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "soseki_migration_template.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleCopyPrompt = () => {
    if (!promptData.prompt) return;
    navigator.clipboard.writeText(promptData.prompt);
    toast.success("AI Prompt copied to clipboard!");
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    if (uploadedFile.type !== "application/json") {
      toast.error("Please upload a valid JSON file.");
      return;
    }

    setFile(uploadedFile);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        setParsedData(json);
        toast.success("Data parsed successfully!");
      } catch (error) {
        toast.error("Failed to parse JSON file. Ensure it is valid.");
        console.error(error);
      }
    };
    reader.readAsText(uploadedFile);
  };

  const handleImportAll = async () => {
    if (!parsedData) return;
    setIsImporting(true);
    try {
      const res = await API.post("/migration/import", parsedData);
      setImportStatus(res.data.imported);
      toast.success("All data imported successfully!");
      setParsedData(null);
      setFile(null);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to import data.");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="p-8 h-full flex flex-col gap-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI-Assisted Data Migration</h1>
        <p className="text-muted-foreground mt-2">Convert your unstructured messy data into Soseki using AI.</p>
      </div>

      {/* Step 1: Tutorial Placeholders */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="bg-primary text-primary-foreground size-6 rounded-full flex items-center justify-center text-sm">1</span> 
          How it works
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-video bg-accent/50 rounded-lg border border-dashed flex items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 opacity-10 bg-[url('https://api.dicebear.com/10.x/glass/svg?seed=placeholder')] bg-cover" />
               <p className="text-muted-foreground text-sm relative z-10 font-medium">GIF Placeholder {i}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Step 2: Download & Copy */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="bg-primary text-primary-foreground size-6 rounded-full flex items-center justify-center text-sm">2</span> 
          Prepare AI Instructions
        </h2>
        {isLoadingPrompt ? (
          <div className="flex flex-col items-center justify-center py-6 border-2 border-dashed rounded-lg bg-accent/20">
             <Loader2 className="size-6 text-primary animate-spin mb-2" />
             <p className="text-sm font-medium text-muted-foreground">We are cooking, just a moment...</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="gap-2 h-12" onClick={handleDownloadTemplate}>
                <DownloadIcon className="size-4" />
                1. Download JSON Template
              </Button>
              <Button variant="outline" className="gap-2 h-12" onClick={handleCopyPrompt}>
                <CopyIcon className="size-4" />
                2. Copy AI Prompt
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Go to ChatGPT or Claude. Paste the copied prompt, attach the downloaded JSON template, and upload your messy data (PDFs, Excel, etc). The AI will generate a strict JSON file.
            </p>
          </>
        )}
      </section>

      {/* Step 3: Upload */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="bg-primary text-primary-foreground size-6 rounded-full flex items-center justify-center text-sm">3</span> 
          Upload Generated Data
        </h2>
        <div className="border-2 border-dashed rounded-lg p-10 text-center hover:bg-accent/30 transition-colors">
          <input 
            type="file" 
            id="json-upload" 
            accept=".json" 
            className="hidden" 
            onChange={handleFileUpload}
          />
          <label htmlFor="json-upload" className="cursor-pointer flex flex-col items-center gap-3">
            <UploadCloudIcon className="size-10 text-muted-foreground" />
            <span className="font-medium text-lg">
              {file ? file.name : "Click to upload AI-generated JSON file"}
            </span>
          </label>
        </div>
      </section>

      {/* Step 4: Preview & Import */}
      {parsedData && (
        <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="bg-primary text-primary-foreground size-6 rounded-full flex items-center justify-center text-sm">4</span> 
            Review & Import
          </h2>
          
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="font-medium mb-4">I found this data:</h3>
            <ul className="space-y-3 mb-6 text-sm">
              <li className="flex justify-between items-center bg-accent/50 p-3 rounded-md">
                <span>Clients detected</span>
                <span className="font-bold">{parsedData.clients?.length || 0}</span>
              </li>
              <li className="flex justify-between items-center bg-accent/50 p-3 rounded-md">
                <span>Projects detected</span>
                <span className="font-bold">{parsedData.projects?.length || 0}</span>
              </li>
              <li className="flex justify-between items-center bg-accent/50 p-3 rounded-md">
                <span>Invoices detected</span>
                <span className="font-bold">{parsedData.invoices?.length || 0}</span>
              </li>
              <li className="flex justify-between items-center bg-accent/50 p-3 rounded-md">
                <span>Payments detected</span>
                <span className="font-bold">{parsedData.payments?.length || 0}</span>
              </li>
            </ul>

            <Button 
              className="w-full h-12 gap-2" 
              onClick={handleImportAll} 
              disabled={isImporting}
            >
              {isImporting ? "Importing..." : "Import All Data"}
              <ArrowRightIcon className="size-4" />
            </Button>
          </div>
        </section>
      )}

      {/* Success State */}
      {(importStatus.clients > 0 || importStatus.invoices > 0) && !parsedData && (
        <section className="space-y-4 animate-in fade-in duration-500">
          <div className="border border-green-500/20 bg-green-500/10 rounded-lg p-6 flex flex-col items-center text-center gap-3">
            <CheckCircleIcon className="size-10 text-green-500" />
            <h3 className="font-bold text-lg text-green-600">Import Successful!</h3>
            <p className="text-sm">
              Successfully imported {importStatus.clients} clients, {importStatus.projects} projects, {importStatus.invoices} invoices, and {importStatus.payments} payments.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
