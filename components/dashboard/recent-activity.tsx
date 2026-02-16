import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentActivity() {
    return (
        <div className="space-y-8">
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1 min-w-0 flex-1">
                    <p className="text-sm font-medium leading-none truncate">Olivia Martin</p>
                    <p className="text-sm text-muted-foreground truncate">
                        New candidate applied for &quot;Frontend Engineer&quot;
                    </p>
                </div>
                <div className="ml-auto font-medium text-sm text-green-600">+2m ago</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/02.png" alt="Avatar" />
                    <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1 min-w-0 flex-1">
                    <p className="text-sm font-medium leading-none truncate">Jackson Lee</p>
                    <p className="text-sm text-muted-foreground truncate">
                        Interview scheduled for &quot;John Doe&quot;
                    </p>
                </div>
                <div className="ml-auto font-medium text-sm text-muted-foreground">1h ago</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/03.png" alt="Avatar" />
                    <AvatarFallback>IN</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1 min-w-0 flex-1">
                    <p className="text-sm font-medium leading-none truncate">Isabella Nguyen</p>
                    <p className="text-sm text-muted-foreground truncate">
                        Offer sent to &quot;Jane Smith&quot;
                    </p>
                </div>
                <div className="ml-auto font-medium text-sm text-muted-foreground">5h ago</div>
            </div>
        </div>
    );
}
