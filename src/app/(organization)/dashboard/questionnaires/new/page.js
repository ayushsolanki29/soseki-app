"use client";

import { QuestionnaireBuilder } from "@/components/questionnaires/questionnaire-builder";

export default function NewQuestionnairePage() {
  return (
    <div className="p-8 h-full flex flex-col gap-6 relative">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Create Questionnaire</h1>
        <p className="text-muted-foreground mt-2">Design a new form or question bank for your clients.</p>
      </div>
      
      <QuestionnaireBuilder />
    </div>
  );
}
