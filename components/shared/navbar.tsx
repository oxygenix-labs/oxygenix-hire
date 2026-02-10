import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

const Navbar = () => {
    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="font-heading font-bold text-xl tracking-tight text-primary flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                            O
                        </div>
                        Oxygenix Hire
                    </Link>
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                        <Link href="#product" className="hover:text-foreground transition-colors">Product</Link>
                        <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
                        <Link href="/docs" className="hover:text-foreground transition-colors">Docs</Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/login">
                            <Button variant="ghost" size="sm">Log in</Button>
                        </Link>
                        <Link href="/signup">
                            <Button size="sm">Try Free</Button>
                        </Link>
                    </div>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
