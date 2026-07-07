"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PlusIcon, TrashIcon, GripVerticalIcon, ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import API from "@/lib/api";
import { useRouter } from "next/navigation";

export function QuestionnaireBuilder({ initialData }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [maxResponses, setMaxResponses] = useState(initialData?.maxResponses || "");
  
  // Fields state
  const [fields, setFields] = useState(
    initialData?.fields?.map(f => ({
      ...f,
      tempId: crypto.randomUUID(),
      options: f.options ? (typeof f.options === 'string' ? JSON.parse(f.options) : f.options) : []
    })) || []
  );

  const addField = () => {
    setFields([
      ...fields,
      {
        tempId: crypto.randomUUID(),
        type: "TEXT",
        label: "",
        description: "",
        required: false,
        options: []
      }
    ]);
  };

  const updateField = (index, key, value) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

  const removeField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const moveField = (index, direction) => {
    if (direction === "up" && index > 0) {
      const newFields = [...fields];
      [newFields[index - 1], newFields[index]] = [newFields[index], newFields[index - 1]];
      setFields(newFields);
    } else if (direction === "down" && index < fields.length - 1) {
      const newFields = [...fields];
      [newFields[index + 1], newFields[index]] = [newFields[index], newFields[index + 1]];
      setFields(newFields);
    }
  };

  const addOption = (index) => {
    const newFields = [...fields];
    if (!newFields[index].options) newFields[index].options = [];
    newFields[index].options.push(`Option ${newFields[index].options.length + 1}`);
    setFields(newFields);
  };

  const updateOption = (fieldIndex, optionIndex, value) => {
    const newFields = [...fields];
    newFields[fieldIndex].options[optionIndex] = value;
    setFields(newFields);
  };

  const removeOption = (fieldIndex, optionIndex) => {
    const newFields = [...fields];
    newFields[fieldIndex].options.splice(optionIndex, 1);
    setFields(newFields);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Please provide a title");
      return;
    }
    
    const invalidField = fields.find(f => !f.label.trim());
    if (invalidField) {
      toast.error("All fields must have a question/label");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        title,
        description,
        maxResponses: maxResponses ? parseInt(maxResponses) : null,
        fields: fields.map(f => ({
          type: f.type,
          label: f.label,
          description: f.description,
          required: f.required,
          options: (f.type === 'SELECT' || f.type === 'RADIO' || f.type === 'CHECKBOX') ? f.options : null
        }))
      };

      if (initialData?.id) {
        await API.patch(`/questionnaires/${initialData.id}`, payload);
        toast.success("Questionnaire updated!");
        router.push(`/dashboard/questionnaires/${initialData.id}/responses`);
      } else {
        await API.post("/questionnaires", payload);
        toast.success("Questionnaire created!");
        router.push("/dashboard/questionnaires");
      }
    } catch (error) {
      toast.error("Failed to save questionnaire");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full space-y-8 pb-20">
      <Card className="border-border">
        <CardHeader>
          <CardTitle>General Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Form Title *</Label>
            <Input 
              placeholder="e.g. Client Onboarding Form" 
              value={title || ""} 
              onChange={(e) => setTitle(e.target.value)} 
              className="text-lg font-medium"
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea 
              placeholder="Provide some context for your clients..." 
              value={description || ""} 
              onChange={(e) => setDescription(e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label>Max Responses Limit (Optional)</Label>
            <Input 
              type="number" 
              placeholder="Leave empty for unlimited" 
              value={maxResponses || ""} 
              onChange={(e) => setMaxResponses(e.target.value)} 
              className="max-w-[200px]"
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Form Fields</h2>
          <Button onClick={addField} variant="secondary" className="gap-2">
            <PlusIcon className="size-4" /> Add Field
          </Button>
        </div>

        {fields.length === 0 ? (
          <div className="text-center p-12 border-2 border-dashed rounded-lg text-muted-foreground">
            No fields added yet. Click "Add Field" to start building your form.
          </div>
        ) : (
          <div className="space-y-4">
            {fields.map((field, index) => (
              <Card key={field.tempId || index} className="relative group overflow-visible border-border hover:border-primary/50 transition-colors">
                <div className="absolute -left-12 top-4 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" onClick={() => moveField(index, "up")} disabled={index === 0} className="size-8">
                    <ArrowUpIcon className="size-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => moveField(index, "down")} disabled={index === fields.length - 1} className="size-8">
                    <ArrowDownIcon className="size-4" />
                  </Button>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex justify-between gap-6 mb-4">
                    <div className="flex-1 space-y-4">
                      <Input 
                        placeholder="Question or Label..." 
                        value={field.label || ""} 
                        onChange={(e) => updateField(index, "label", e.target.value)} 
                        className="font-medium bg-muted/30"
                      />
                      <Input 
                        placeholder="Help text (optional)..." 
                        value={field.description || ""} 
                        onChange={(e) => updateField(index, "description", e.target.value)} 
                        className="text-sm"
                      />
                    </div>
                    <div className="w-[200px]">
                      <Select value={field.type} onValueChange={(v) => updateField(index, "type", v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Field Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="TEXT">Short Text</SelectItem>
                          <SelectItem value="TEXTAREA">Long Text</SelectItem>
                          <SelectItem value="SELECT">Dropdown (Select)</SelectItem>
                          <SelectItem value="RADIO">Multiple Choice</SelectItem>
                          <SelectItem value="CHECKBOX">Checkboxes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {["SELECT", "RADIO", "CHECKBOX"].includes(field.type) && (
                    <div className="pl-4 border-l-2 border-primary/20 space-y-3 mt-4">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider">Options</Label>
                      {field.options?.map((opt, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border bg-muted/50 flex-shrink-0" />
                          <Input 
                            value={opt || ""} 
                            onChange={(e) => updateOption(index, optIndex, e.target.value)} 
                            className="h-8 text-sm max-w-[300px]"
                          />
                          <Button size="icon" variant="ghost" onClick={() => removeOption(index, optIndex)} className="size-8 text-muted-foreground hover:text-destructive">
                            <TrashIcon className="size-3" />
                          </Button>
                        </div>
                      ))}
                      <Button size="sm" variant="outline" onClick={() => addOption(index)} className="mt-2 h-8">
                        <PlusIcon className="size-3 mr-1" /> Add Option
                      </Button>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-6 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={field.required} 
                        onCheckedChange={(v) => updateField(index, "required", v)}
                        id={`req-${index}`}
                      />
                      <Label htmlFor={`req-${index}`} className="cursor-pointer">Required field</Label>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => removeField(index)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                      <TrashIcon className="size-4 mr-2" /> Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-[240px] right-0 p-4 bg-background/80 backdrop-blur-md border-t flex justify-end gap-4 z-10">
        <Button variant="outline" onClick={() => router.push("/dashboard/questionnaires")}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Questionnaire"}
        </Button>
      </div>
    </div>
  );
}
