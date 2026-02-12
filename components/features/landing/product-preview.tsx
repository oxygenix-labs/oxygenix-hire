const ProductPreview = () => {
    return (
        <section className="py-24 bg-muted/30 border-y overflow-hidden">
            <div className="container px-4 md:px-6 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-heading mb-12">
                    Beautiful, powerful, and easy to use.
                </h2>

                <div className="relative mx-auto max-w-5xl rounded-xl border bg-background shadow-2xl lg:rounded-2xl ring-1 ring-white/10">
                    <div className="aspect-[16/9] w-full rounded-lg bg-muted flex flex-col items-center justify-center text-muted-foreground relative overflow-hidden">
                        {/* Abstract UI representation */}
                        <div className="absolute inset-0 bg-background">
                            {/* Mock Header */}
                            <div className="h-12 border-b flex items-center px-4 gap-4">
                                <div className="w-24 h-4 bg-muted rounded"></div>
                                <div className="flex-1"></div>
                                <div className="w-8 h-8 rounded-full bg-muted"></div>
                            </div>
                            {/* Mock Sidebar & Content */}
                            <div className="flex h-[calc(100%-3rem)]">
                                <div className="w-64 border-r p-4 hidden md:block">
                                    <div className="space-y-3">
                                        <div className="w-full h-8 bg-primary/10 rounded"></div>
                                        <div className="w-full h-8 bg-muted rounded"></div>
                                        <div className="w-full h-8 bg-muted rounded"></div>
                                        <div className="w-full h-8 bg-muted rounded"></div>
                                    </div>
                                </div>
                                <div className="flex-1 p-6">
                                    <div className="w-48 h-8 bg-muted rounded mb-6"></div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-32 bg-muted rounded border"></div>
                                        <div className="h-32 bg-muted rounded border"></div>
                                        <div className="h-32 bg-muted rounded border"></div>
                                    </div>
                                    <div className="mt-6 h-64 bg-muted rounded border flex items-center justify-center">
                                        <span className="text-muted-foreground/50 font-medium text-lg">
                                            Product Dashboard Preview
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductPreview;
