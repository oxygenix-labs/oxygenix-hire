const TrustStrip = () => {
    return (
        <section className="py-10 border-y bg-muted/30">
            <div className="container text-center">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Trusted by fast-growing teams worldwide
                </p>
                <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 opacity-70 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                    {/* Text-based placeholders as requested, styled to look like logos */}
                    <div className="flex items-center justify-center text-xl font-bold font-heading text-foreground/80">Acme Corp</div>
                    <div className="flex items-center justify-center text-xl font-bold font-heading text-foreground/80">Global Tech</div>
                    <div className="flex items-center justify-center text-xl font-bold font-heading text-foreground/80">NextGen</div>
                    <div className="flex items-center justify-center text-xl font-bold font-heading text-foreground/80">Starlight</div>
                    <div className="flex items-center justify-center text-xl font-bold font-heading text-foreground/80 hidden lg:flex">Umbrella</div>
                </div>
            </div>
        </section>
    )
}

export default TrustStrip
