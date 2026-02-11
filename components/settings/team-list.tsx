"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trash2, UserPlus, Mail } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface TeamMember {
    _id: string
    name: string
    email: string
    role: string
    image?: string
}

interface Invitation {
    _id: string
    email: string
    role: string
    status: string
}

export function TeamList() {
    const [members, setMembers] = useState<TeamMember[]>([])
    const [invitations, setInvitations] = useState<Invitation[]>([])
    const [loading, setLoading] = useState(true)
    const [inviteOpen, setInviteOpen] = useState(false)
    const [inviteEmail, setInviteEmail] = useState("")
    const [inviteRole, setInviteRole] = useState("member")
    const [isInviting, setIsInviting] = useState(false)

    const fetchTeam = async () => {
        try {
            const res = await fetch("/api/settings/team")
            if (res.ok) {
                const data = await res.json()
                setMembers(data.members)
                setInvitations(data.invitations)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTeam()
    }, [])

    const handleInvite = async () => {
        setIsInviting(true)
        try {
            const res = await fetch("/api/settings/team", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
            })

            if (!res.ok) {
                if (res.status === 409) throw new Error("User already invited or member")
                throw new Error("Failed to invite")
            }

            toast({ title: "Invitation sent", description: `Invited ${inviteEmail} as ${inviteRole}` })
            setInviteOpen(false)
            setInviteEmail("")
            fetchTeam()
        } catch (error: any) {
            toast({ title: "Error", description: error.message, variant: "destructive" })
        } finally {
            setIsInviting(false)
        }
    }

    const handleRemove = async (id: string) => {
        if (!confirm("Are you sure you want to remove this member?")) return

        try {
            const res = await fetch(`/api/settings/team?id=${id}`, { method: "DELETE" })
            if (!res.ok) throw new Error("Failed to remove")

            toast({ title: "Member removed" })
            fetchTeam()
        } catch (error) {
            toast({ title: "Error", description: "Could not remove member", variant: "destructive" })
        }
    }

    if (loading) return <div>Loading team...</div>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Team Members</h3>
                <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Invite Member
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Invite Teammate</DialogTitle>
                            <DialogDescription>
                                Send an email invitation to join your organization.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="colleague@example.com" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="role">Role</Label>
                                <Select value={inviteRole} onValueChange={setInviteRole}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="member">Member</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="recruiter">Recruiter</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setInviteOpen(false)}>Cancel</Button>
                            <Button onClick={handleInvite} disabled={!inviteEmail || isInviting}>
                                {isInviting ? "Sending..." : "Send Invite"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {members.map((member) => (
                            <TableRow key={member._id}>
                                <TableCell className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={member.image} />
                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{member.name}</span>
                                        <span className="text-xs text-muted-foreground">{member.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="capitalize">{member.role}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" onClick={() => handleRemove(member._id)}>
                                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {invitations.length > 0 && (
                <div className="space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Pending Invitations</h4>
                    <div className="rounded-md border">
                        <Table>
                            <TableBody>
                                {invitations.map((invite) => (
                                    <TableRow key={invite._id}>
                                        <TableCell className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{invite.email}</span>
                                                <span className="text-xs text-muted-foreground">Expires in 7 days</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">Pending</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {/* Could add revoke here */}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}
        </div>
    )
}
