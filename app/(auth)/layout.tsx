import Navbar from "@/components/shared/navbar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen gap-4">
            <div className="lg:hidden">
                <Navbar />
            </div>
            {children}
        </div>
    );
}
