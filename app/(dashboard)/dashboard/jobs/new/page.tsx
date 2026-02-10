import { CreateJobForm } from "@/components/jobs/create-job-form"
import { Separator } from "@/components/ui/separator"

export default function CreateJobPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Create Job Post</h3>
                <p className="text-sm text-muted-foreground">
                    Fill in the details below to create a new job opening.
                </p>
            </div>
            <Separator />
            <CreateJobForm />
        </div>
    )
}
