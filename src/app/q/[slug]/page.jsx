"use client";

import { useEffect, useState, use } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { CheckCircle2Icon, Loader2Icon } from "lucide-react";
import { SkeletonHelper } from "@/components/shared/skeleton-helper";

export default function PublicQuestionnairePage({ params }) {
  const unwrappedParams = use(params);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await fetch(`/api/public/questionnaires/${unwrappedParams.slug}`);
        const result = await res.json();
        
        if (!res.ok) {
          setError(result.error || "Failed to load form");
        } else {
          setData(result.questionnaire);
          // Initialize answers state with default values
          const initialAnswers = {};
          result.questionnaire.fields.forEach(field => {
            if (field.type === 'CHECKBOX') {
              initialAnswers[field.id] = []; // array for multiple checkboxes
            } else {
              initialAnswers[field.id] = ""; // empty string for others
            }
          });
          setAnswers(initialAnswers);
        }
      } catch (err) {
        setError("Failed to load form. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchForm();
  }, [unwrappedParams.slug]);

  const handleAnswerChange = (fieldId, value) => {
    setAnswers(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleCheckboxChange = (fieldId, option, checked) => {
    setAnswers(prev => {
      const current = prev[fieldId] || [];
      if (checked) {
        return { ...prev, [fieldId]: [...current, option] };
      } else {
        return { ...prev, [fieldId]: current.filter(item => item !== option) };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/public/questionnaires/${unwrappedParams.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers })
      });
      
      const result = await res.json();
      
      if (!res.ok) {
        toast.error(result.error || "Failed to submit form");
      } else {
        setIsSubmitted(true);
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/20 py-12 px-4 sm:px-6 flex justify-center">
        <div className="w-full max-w-3xl space-y-8">
          <SkeletonHelper type="dashboard" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-muted/20 py-12 px-4 sm:px-6 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-destructive">Form Unavailable</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-muted/20 py-12 px-4 sm:px-6 flex items-center justify-center t-page-fade">
        <Card className="max-w-md w-full text-center py-8 border-primary/20 bg-primary/5">
          <CardContent className="space-y-6">
            <div className="mx-auto size-16 bg-primary/20 rounded-full flex items-center justify-center">
              <CheckCircle2Icon className="size-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Thank you!</h2>
              <p className="text-muted-foreground">Your response has been successfully submitted to {data?.organization?.name}.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/10 py-12 px-4 sm:px-6 t-page-fade">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-primary">{data.organization?.name}</p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">{data.title}</h1>
          {data.description && (
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto whitespace-pre-wrap">
              {data.description}
            </p>
          )}
        </div>

        <Card className="border-border shadow-sm">
          <form onSubmit={handleSubmit}>
            <CardContent className="p-8 space-y-10">
              {data.fields.map((field, index) => (
                <div key={field.id} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-base font-semibold text-foreground flex gap-1">
                      {index + 1}. {field.label}
                      {field.required && <span className="text-destructive">*</span>}
                    </Label>
                    {field.description && (
                      <p className="text-sm text-muted-foreground">{field.description}</p>
                    )}
                  </div>

                  <div className="pt-2">
                    {field.type === 'TEXT' && (
                      <Input 
                        placeholder="Your answer" 
                        required={field.required}
                        value={answers[field.id] || ""}
                        onChange={(e) => handleAnswerChange(field.id, e.target.value)}
                        className="max-w-md"
                      />
                    )}

                    {field.type === 'TEXTAREA' && (
                      <Textarea 
                        placeholder="Your answer" 
                        required={field.required}
                        value={answers[field.id] || ""}
                        onChange={(e) => handleAnswerChange(field.id, e.target.value)}
                        className="min-h-[120px]"
                      />
                    )}

                    {field.type === 'SELECT' && (
                      <div className="max-w-md">
                        <Select 
                          required={field.required}
                          value={answers[field.id] || ""}
                          onValueChange={(val) => handleAnswerChange(field.id, val)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((opt, i) => (
                              <SelectItem key={i} value={opt}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {field.type === 'RADIO' && (
                      <RadioGroup 
                        required={field.required}
                        value={answers[field.id] || ""}
                        onValueChange={(val) => handleAnswerChange(field.id, val)}
                        className="space-y-3"
                      >
                        {field.options?.map((opt, i) => (
                          <div key={i} className="flex items-center space-x-3">
                            <RadioGroupItem value={opt} id={`${field.id}-${i}`} />
                            <Label htmlFor={`${field.id}-${i}`} className="font-normal cursor-pointer leading-none text-base">{opt}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}

                    {field.type === 'CHECKBOX' && (
                      <div className="space-y-3">
                        {field.options?.map((opt, i) => (
                          <div key={i} className="flex items-start space-x-3">
                            <Checkbox 
                              id={`${field.id}-${i}`} 
                              checked={answers[field.id]?.includes(opt)}
                              onCheckedChange={(checked) => handleCheckboxChange(field.id, opt, checked)}
                            />
                            <Label htmlFor={`${field.id}-${i}`} className="font-normal cursor-pointer leading-tight text-base pt-0.5">{opt}</Label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="bg-muted/30 p-8 border-t flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Fields marked with <span className="text-destructive">*</span> are required.</p>
              <Button type="submit" size="lg" disabled={isSubmitting} className="px-8">
                {isSubmitting && <Loader2Icon className="size-4 mr-2 animate-spin" />}
                {isSubmitting ? "Submitting..." : "Submit Form"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
