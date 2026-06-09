const features = [
    {
        title: "Fast Analysis",
        desc: "Get results in seconds with advanced AI-powered detection.",
        icon: "⚡",
    },
    {
        title: "Image Detection",
        desc: "Identify AI-generated images with high confidence.",
        icon: "◈",
    },
    {
        title: "Video Detection",
        desc: "Analyze video frames and detect synthetic media.",
        icon: "▶",
    },
    {
        title: "Secure & Private",
        desc: "All uploads are encrypted and processed securely.",
        icon: "🛡",
    },
    {
        title: "AI Insights",
        desc: "Get detailed explanations behind every result.",
        icon: "◎",
    },
    {
        title: "Cloud Storage",
        desc: "Access previous analyses anytime from your dashboard.",
        icon: "⬡",
    },
];

export default function Features() {
    return (
        <section
            id="features"
            className="max-w-7xl mx-auto px-6 py-24"
        >
            <div className="text-center mb-16">

                <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm border border-purple-500/20">
                    Features
                </span>

                <h2 className="text-5xl font-bold mt-6">
                    Powerful Features
                </h2>

                <p className="text-white/60 mt-4 max-w-2xl mx-auto">
                    Advanced AI detection tools designed to help you identify
                    synthetic content with confidence.
                </p>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="
              group
              rounded-3xl
              border
              border-white/10
              bg-white/[0.03]
              p-8
              hover:border-purple-500/40
              hover:-translate-y-2
              transition-all
              duration-300
            "
                    >
                        <div
                            className="
                w-16
                h-16
                rounded-2xl
                flex
                items-center
                justify-center
                text-2xl
                bg-gradient-to-br
                from-blue-500/20
                to-purple-500/20
                border
                border-purple-500/20
                mb-6
                group-hover:scale-110
                transition
              "
                        >
                            {feature.icon}
                        </div>

                        <h3 className="text-2xl font-semibold mb-3">
                            {feature.title}
                        </h3>

                        <p className="text-white/60 leading-relaxed">
                            {feature.desc}
                        </p>

                    </div>
                ))}

            </div>
        </section>
    );
}