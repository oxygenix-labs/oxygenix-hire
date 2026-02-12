import Navbar from "@/components/shared/navbar";
import Hero from "@/components/features/landing/hero";
import TrustStrip from "@/components/features/landing/trust-strip";
import ProblemSection from "@/components/features/landing/problem-section";
import SolutionSection from "@/components/features/landing/solution-section";
import FeaturesGrid from "@/components/features/landing/features-grid";
import ProductPreview from "@/components/features/landing/product-preview";
import PricingSection from "@/components/features/landing/pricing-section";
import Footer from "@/components/shared/footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <Hero />
            <TrustStrip />
            <ProblemSection />
            <SolutionSection />
            <FeaturesGrid />
            <ProductPreview />
            <PricingSection />
            <Footer />
        </main>
    );
}
