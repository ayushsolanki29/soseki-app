"use client";

import { useEffect, useState, use } from "react";
import { QuestionnaireBuilder } from "@/components/questionnaires/questionnaire-builder";
import API from "@/lib/api";
import { SkeletonHelper } from "@/components/shared/skeleton-helper";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";

export default function EditQuestionnairePage({ params }) {
  const unwrappedParams = use(params);
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        const res = await API.get(`/questionnaires/${unwrappedParams.id}`);
        setInitialData(res.data.questionnaire);
      } catch (error) {
        console.error("Failed to fetch questionnaire", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestionnaire();
  }, [unwrappedParams.id]);

  if (isLoading) {
    return (
      <div className="p-8 h-full space-y-6">
        <SkeletonHelper type="dashboard" />
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="p-8 text-center text-muted-foreground mt-20">
        Questionnaire not found.
      </div>
    );
  }

  return (
    <div className="p-8 h-full flex flex-col gap-6 relative">
      <div className="mb-6 flex items-center gap-4">
        {initialData && (
          <DynamicAvatar type="questionnaire" seed={initialData.title} size={48} className="shadow-sm bg-accent/50" />
        )}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Questionnaire</h1>
          <p className="text-muted-foreground mt-1">Modify the fields and settings for <strong>{initialData.title}</strong>.</p>
        </div>
      </div>
      
      <QuestionnaireBuilder initialData={initialData} />
    </div>
  );
}
