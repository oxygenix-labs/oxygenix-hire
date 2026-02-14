import Navbar from "@/components/shared/navbar";
import Hero from "@/components/features/landing/hero";
import TrustStrip from "@/components/features/landing/trust-strip";
import ProblemSection from "@/components/features/landing/problem-section";
import ValueProposition from "@/components/features/landing/value-proposition";
import HowItWorks from "@/components/features/landing/solution-section";
import FeaturesGrid from "@/components/features/landing/features-grid";
import TargetAudience from "@/components/features/landing/target-audience";
import ComparisonSection from "@/components/features/landing/comparison-section";
import TrustBadges from "@/components/features/landing/trust-badges";
import PricingSection from "@/components/features/landing/pricing-section";
import FinalCTA from "@/components/features/landing/final-cta";
import Footer from "@/components/shared/footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <Hero />
            <TrustStrip />
            <ProblemSection />
            <ValueProposition />
            <HowItWorks />
            <FeaturesGrid />
            <TargetAudience />
            <ComparisonSection />
            <TrustBadges />
            <PricingSection />
            <FinalCTA />
            <Footer />
        </main>
    );
}
