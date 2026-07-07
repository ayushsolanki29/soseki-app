"use client";

import { QuestionnaireBuilder } from "@/components/questionnaires/questionnaire-builder";

export default function NewQuestionnairePage() {
  return (
    <div className="p-8 h-full flex flex-col gap-6 relative">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Create Questionnaire</h1>
        <div className="flex items-center gap-2 mt-2">
          <p className="text-muted-foreground">Design a new form or question bank for your clients.</p>
          <span className="text-muted-foreground">&middot;</span>
          <a href="/dashboard/questionnaires/import" className="text-primary hover:underline font-medium flex items-center gap-1 text-sm">
            Have raw data? Import with AI
          </a>
        </div>
      </div>
      
      <QuestionnaireBuilder />
    </div>
  );
}
