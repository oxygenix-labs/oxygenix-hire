import { Shield, Lock, Server, CheckCircle } from "lucide-react";

const TrustBadges = () => {
    return (
        <section className="py-16 bg-background border-t">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center text-center gap-2">
                        <div className="p-3 bg-primary/5 rounded-full text-primary">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold">Enterprise Security</h3>
                        <p className="text-sm text-muted-foreground">
                            SOC2 Compliant (Coming Soon)
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-2">
                        <div className="p-3 bg-primary/5 rounded-full text-primary">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold">Data Encryption</h3>
                        <p className="text-sm text-muted-foreground">AES-256 bit encryption</p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-2">
                        <div className="p-3 bg-primary/5 rounded-full text-primary">
                            <Server className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold">99.9% Uptime</h3>
                        <p className="text-sm text-muted-foreground">Reliable infrastructure</p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-2">
                        <div className="p-3 bg-primary/5 rounded-full text-primary">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold">GDPR Ready</h3>
                        <p className="text-sm text-muted-foreground">
                            Compliant with global standards
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustBadges;
