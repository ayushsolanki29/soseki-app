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
        
        const knownKeys = ['clients', 'projects', 'invoices', 'payments', 'expenses'];
        const unknownKeys = Object.keys(json).filter(key => !knownKeys.includes(key));
        
        if (unknownKeys.length > 0) {
          toast.warning(`Unknown data found: ${unknownKeys.join(', ')}. These will be ignored, but we will proceed with the known data.`, { duration: 6000 });
        } else {
          toast.success("Data parsed successfully!");
        }
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

      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          How it works
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="p-4 border rounded-xl bg-card">
            <h3 className="font-semibold text-lg mb-2">1. Copy Prompt</h3>
            <p className="text-sm text-muted-foreground">Click the "Copy AI Prompt" button below to copy the instructions.</p>
          </div>
          <div className="p-4 border rounded-xl bg-card">
            <h3 className="font-semibold text-lg mb-2">2. Go to AI (Claude Recommended)</h3>
            <p className="text-sm text-muted-foreground">Paste the prompt into Claude, ChatGPT, or Gemini. Upload all your past invoices, excel sheets, raw data, PDFs, or word documents.</p>
          </div>
          <div className="p-4 border rounded-xl bg-card">
            <h3 className="font-semibold text-lg mb-2">3. Get & Upload JSON</h3>
            <p className="text-sm text-muted-foreground">The AI will generate a JSON file or raw JSON text. Upload that file or paste the text in the step below.</p>
          </div>
        </div>
      </section>

      {/* Step 1: Copy */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="bg-primary text-primary-foreground size-6 rounded-full flex items-center justify-center text-sm">1</span>
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
              <Button variant="outline" className="gap-2 h-12" onClick={handleCopyPrompt}>
                <CopyIcon className="size-4" />
                Copy AI Prompt
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Go to Claude (recommended), ChatGPT, or Gemini. Paste the copied prompt, and upload all your files like past invoices, Excel sheets, raw data, PDFs, or Word documents. The AI will give you a JSON file or raw JSON text.
            </p>
          </>
        )}
      </section>

      {/* Step 2: Upload */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="bg-primary text-primary-foreground size-6 rounded-full flex items-center justify-center text-sm">2</span>
          Upload Generated Data
        </h2>
        
        <div className="flex flex-col gap-6 max-w-3xl">
          <div className="border-2 border-dashed rounded-lg p-10 text-center hover:bg-accent/30 transition-colors flex flex-col items-center justify-center">
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
                {file ? file.name : "Upload JSON file here"}
              </span>
            </label>
          </div>
          
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-border"></div>
            <span className="flex-shrink-0 px-4 text-muted-foreground text-sm font-medium uppercase tracking-wider">OR</span>
            <div className="flex-grow border-t border-border"></div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Paste raw JSON text here:</label>
            <textarea
              className="w-full min-h-[160px] p-4 text-sm font-mono border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder='{"clients": [...]}'
              onChange={(e) => {
                try {
                  const text = e.target.value.trim();
                  if (!text) {
                    setParsedData(null);
                    return;
                  }
                  const data = JSON.parse(text);
                  setParsedData(data);
                } catch (err) {
                  // Wait for valid JSON
                }
              }}
            />
          </div>
        </div>
      </section>

      {/* Step 3: Preview & Import */}
      {parsedData && (
        <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="bg-primary text-primary-foreground size-6 rounded-full flex items-center justify-center text-sm">3</span>
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

      {/* Footer / Extra Options */}
      <div className="pt-8 mt-8 border-t">
        <p className="text-sm text-muted-foreground mb-4">
          Need to see the exact JSON structure we expect? You can download an example template here. Please do not upload this template to the AI along with your prompt, as it may confuse the AI into using our example data instead of your actual data.
        </p>
        <Button variant="outline" className="gap-2" onClick={handleDownloadTemplate}>
          <DownloadIcon className="size-4" />
          Download JSON Template Example
        </Button>
      </div>

    </div>
  );
}
