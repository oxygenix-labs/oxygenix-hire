"use client";

import { useRouter } from "next/navigation";
import { WorkflowLayout } from "@/components/workflow/workflow-layout";
import { Step1JobDescription } from "@/components/workflow/step-1-jd";
import { Step2ResumeScreening } from "@/components/workflow/step-2-screening";
import { Step3InterviewPlanning } from "@/components/workflow/step-3-interview";
import { Step4HiringDecision } from "@/components/workflow/step-4-decision";
import { Step5Offer } from "@/components/workflow/step-5-offer";

interface WorkflowClientProps {
    job: any;
}

export function WorkflowClient({ job }: WorkflowClientProps) {
    const router = useRouter();
    const currentStep = job.workflow.currentStep;

    const handleComplete = () => {
        router.refresh();
    };

    const handleStepNavigation = async (stepNumber: number) => {
        try {
            const res = await fetch(`/api/jobs/${job._id}/workflow`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentStep: stepNumber,
                }),
            });

            if (!res.ok) throw new Error("Failed to navigate");

            router.refresh();
        } catch (error) {
            console.error("Navigation error:", error);
        }
    };

    return (
        <WorkflowLayout
            currentStep={currentStep}
            jobId={job._id}
            onStepClick={handleStepNavigation}
        >
            {currentStep === 1 && (
                <Step1JobDescription
                    jobId={job._id}
                    initialData={job.workflow.steps.jobDescription.data}
                    onComplete={handleComplete}
                />
            )}
            {currentStep === 2 && (
                <Step2ResumeScreening
                    jobId={job._id}
                    initialData={job.workflow.steps.resumeScreening.data}
                    jdData={job.workflow.steps.jobDescription.data}
                    onComplete={handleComplete}
                    onBack={() => {
                        handleStepNavigation(1);
                    }}
                />
            )}
            {currentStep === 3 && (
                <Step3InterviewPlanning
                    jobId={job._id}
                    initialData={job.workflow.steps.interviewPlanning.data}
                    onComplete={handleComplete}
                    onBack={() => handleStepNavigation(2)}
                />
            )}
            {currentStep === 4 && (
                <Step4HiringDecision
                    jobId={job._id}
                    initialData={job.workflow.steps.hiringDecision.data}
                    onComplete={handleComplete}
                    onBack={() => handleStepNavigation(3)}
                />
            )}
            {currentStep === 5 && (
                <Step5Offer
                    jobId={job._id}
                    initialData={job.workflow.steps.offer.data}
                    onComplete={handleComplete}
                    onBack={() => handleStepNavigation(4)}
                />
            )}
        </WorkflowLayout>
    );
}
