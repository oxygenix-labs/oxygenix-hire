import { Separator } from "@/components/ui/separator"
import { TeamList } from "@/components/settings/team-list"

export default function SettingsTeamPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Team Management</h3>
                <p className="text-sm text-muted-foreground">
                    Invite team members and manage access permissions.
                </p>
            </div>
            <Separator />
            <TeamList />
        </div>
    )
}
