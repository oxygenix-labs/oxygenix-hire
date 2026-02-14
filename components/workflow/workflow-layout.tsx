"use client";

import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
interface WorkflowLayoutProps {
    currentStep: number; // 1-5
    jobId: string;
    children: React.ReactNode;
    onStepClick?: (stepNumber: number) => void;
}

const steps = [
    { number: 1, title: "Job Description", id: "jobDescription" },
    { number: 2, title: "Resume Screening", id: "resumeScreening" },
    { number: 3, title: "Interview Planning", id: "interviewPlanning" },
    { number: 4, title: "Hiring Decision", id: "hiringDecision" },
    { number: 5, title: "Offer & Close", id: "offer" },
];

export function WorkflowLayout({ currentStep, children, onStepClick }: WorkflowLayoutProps) {
    return (
        <div className="flex flex-col space-y-6 p-4 md:p-6">
            {/* Stepper Header */}
            <div className="relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -z-10 -translate-y-1/2" />
                <div className="flex justify-between w-full max-w-4xl mx-auto">
                    {steps.map((step) => {
                        const isCompleted = step.number < currentStep;
                        const isCurrent = step.number === currentStep;
                        const isLocked = step.number > currentStep;
                        const isClickable = isCompleted || isCurrent;

                        return (
                            <div
                                key={step.number}
                                className="flex flex-col items-center gap-2 bg-background px-2"
                            >
                                <div
                                    onClick={() => isClickable && onStepClick?.(step.number)}
                                    className={cn(
                                        "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                                        isCompleted &&
                                            "border-primary bg-primary text-primary-foreground cursor-pointer hover:scale-110 hover:shadow-lg",
                                        isCurrent &&
                                            "border-primary ring-4 ring-primary/20 cursor-pointer",
                                        isLocked &&
                                            "border-muted-foreground/30 text-muted-foreground cursor-not-allowed"
                                    )}
                                >
                                    {isCompleted ? (
                                        <Check className="h-5 w-5" />
                                    ) : isLocked ? (
                                        <Lock className="h-4 w-4" />
                                    ) : (
                                        <span className="font-bold">{step.number}</span>
                                    )}
                                </div>
                                <span
                                    className={cn(
                                        "text-xs font-medium whitespace-nowrap",
                                        isLocked ? "text-muted-foreground" : "text-foreground"
                                    )}
                                >
                                    {step.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Workflow Content */}
            <div className="flex-1 bg-card rounded-xl border shadow-sm min-h-[500px] p-6">
                {children}
            </div>
        </div>
    );
}
