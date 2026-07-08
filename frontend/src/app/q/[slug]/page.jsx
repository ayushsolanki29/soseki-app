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
import { CheckCircle2Icon, Loader2Icon, LockIcon } from "lucide-react";
import { SkeletonHelper } from "@/components/shared/skeleton-helper";
import { LogoIcon } from "@/components/logo";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";
import Link from "next/link";
import API from "@/lib/api";

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
        const res = await API.get(`/questionnaires/public/${unwrappedParams.slug}`);
        
        setData(res.data.questionnaire);
        // Initialize answers state with default values
        const initialAnswers = {};
        res.data.questionnaire.fields.forEach(field => {
          if (field.type === 'CHECKBOX') {
            initialAnswers[field.id] = []; // array for multiple checkboxes
          } else {
            initialAnswers[field.id] = ""; // empty string for others
          }
        });
        setAnswers(initialAnswers);
      } catch (err) {
        setError(err.response?.data?.error || err.response?.data?.message || "Failed to load form. Please try again.");
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
      const res = await API.post(`/questionnaires/public/${unwrappedParams.slug}`, { answers });
      
      if (res.data.success) {
        setIsSubmitted(true);
      } else {
        toast.error(res.data.error || res.data.message || "Failed to submit form");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || err.response?.data?.message || "An unexpected error occurred. Please try again.");
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
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-destructive/5 via-background to-background pointer-events-none" />
        
        <Card className="max-w-md w-full border-border/40 shadow-2xl shadow-black/5 rounded-2xl overflow-hidden bg-card/50 backdrop-blur-md relative z-10 text-center py-8">
          <CardContent className="space-y-6 pt-6">
            <div className="mx-auto size-16 bg-destructive/10 rounded-full flex items-center justify-center">
              <LockIcon className="size-8 text-destructive/80" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Form Unavailable</h2>
              <p className="text-muted-foreground text-sm leading-relaxed px-4">
                {error}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-12 relative z-10">
          <Link href="/" className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
            <span className="text-sm text-muted-foreground">Powered by</span>
            <LogoIcon className="size-5 grayscale" />
            <span className="font-bold text-foreground tracking-tight">Soseki</span>
          </Link>
        </div>
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
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 t-page-fade flex flex-col relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      
      <div className="max-w-3xl mx-auto space-y-12 flex-1 w-full relative z-10">
        <div className="text-center flex flex-col items-center pt-8">
          <div className="flex flex-col items-center gap-4 mb-8">
            {data.organization?.name && (
              <DynamicAvatar type="organization" seed={data.organization.name} size={72} className="shadow-lg border-2 border-background" />
            )}
            <p className="text-xs font-bold tracking-widest text-primary uppercase">{data.organization?.name}</p>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">{data.title}</h1>
          {data.description && (
            <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed whitespace-pre-wrap">
              {data.description}
            </p>
          )}
        </div>

        <Card className="border-border/40 shadow-2xl shadow-black/5 rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm">
          <form onSubmit={handleSubmit}>
            <CardContent className="p-8 sm:p-12 space-y-12">
              {data.fields.map((field, index) => (
                <div key={field.id} className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-lg font-semibold text-foreground flex gap-1 items-baseline">
                      <span className="text-muted-foreground/50 font-normal text-sm mr-2">{index + 1}.</span> 
                      {field.label}
                      {field.required && <span className="text-destructive text-sm ml-1">*</span>}
                    </Label>
                    {field.description && (
                      <p className="text-sm text-muted-foreground ml-6">{field.description}</p>
                    )}
                  </div>

                  <div className="pt-2 ml-6">
                    {field.type === 'TEXT' && (
                      <Input 
                        placeholder="Your answer" 
                        required={field.required}
                        value={answers[field.id] || ""}
                        onChange={(e) => handleAnswerChange(field.id, e.target.value)}
                        className="max-w-md bg-background/50 border-border/50 focus-visible:ring-primary/20 h-12 text-base"
                      />
                    )}

                    {field.type === 'TEXTAREA' && (
                      <Textarea 
                        placeholder="Your answer" 
                        required={field.required}
                        value={answers[field.id] || ""}
                        onChange={(e) => handleAnswerChange(field.id, e.target.value)}
                        className="min-h-[120px] bg-background/50 border-border/50 focus-visible:ring-primary/20 text-base resize-y"
                      />
                    )}

                    {field.type === 'SELECT' && (
                      <div className="max-w-md">
                        <Select 
                          required={field.required}
                          value={answers[field.id] || ""}
                          onValueChange={(val) => handleAnswerChange(field.id, val)}
                        >
                          <SelectTrigger className="h-12 bg-background/50 border-border/50 text-base">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((opt, i) => (
                              <SelectItem key={i} value={opt} className="text-base py-3">{opt}</SelectItem>
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
                        className="space-y-4"
                      >
                        {field.options?.map((opt, i) => (
                          <div key={i} className="flex items-center space-x-4">
                            <RadioGroupItem value={opt} id={`${field.id}-${i}`} className="size-5" />
                            <Label htmlFor={`${field.id}-${i}`} className="font-normal cursor-pointer leading-none text-base">{opt}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}

                    {field.type === 'CHECKBOX' && (
                      <div className="space-y-4">
                        {field.options?.map((opt, i) => (
                          <div key={i} className="flex items-start space-x-4">
                            <Checkbox 
                              id={`${field.id}-${i}`} 
                              checked={answers[field.id]?.includes(opt)}
                              onCheckedChange={(checked) => handleCheckboxChange(field.id, opt, checked)}
                              className="size-5 mt-0.5"
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
            <CardFooter className="bg-muted/10 p-8 sm:px-12 sm:py-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground w-full sm:w-auto text-center sm:text-left">Fields marked with <span className="text-destructive">*</span> are required.</p>
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto px-10 h-12 text-base rounded-full shadow-md hover:shadow-lg transition-all">
                {isSubmitting && <Loader2Icon className="size-5 mr-2 animate-spin" />}
                {isSubmitting ? "Submitting..." : "Submit Response"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>

      <div className="mt-16 pb-12 flex flex-col items-center justify-center relative z-10 space-y-6">
        <Link href="/" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
          <span className="text-sm text-muted-foreground">Powered by</span>
          <LogoIcon className="size-5 grayscale" />
          <span className="font-bold text-foreground tracking-tight">Soseki</span>
        </Link>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground/60">
          <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
          <span>&middot;</span>
          <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          <span>&middot;</span>
          <a href="#" className="hover:text-foreground transition-colors">Report Abuse</a>
        </div>
      </div>
    </div>
  );
}
