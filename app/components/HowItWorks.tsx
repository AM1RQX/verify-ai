const steps = [
    {
        number: "01",
        title: "Upload Content",
        text: "Upload an image or video you want to verify."
    },
    {
        number: "02",
        title: "AI Analysis",
        text: "Our detection engine scans patterns, metadata and visual artifacts."
    },
    {
        number: "03",
        title: "Get Results",
        text: "Receive confidence scores and detailed explanations."
    },
    {
        number: "04",
        title: "Verify Authenticity",
        text: "Make informed decisions using AI-powered insights."
    }
];

export default function HowItWorks() {
    return (
        <section
            id="how"
            className="max-w-7xl mx-auto px-6 py-24"
        >
            <div className="text-center mb-16">

                <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm border border-blue-500/20">
                    Process
                </span>

                <h2 className="text-5xl font-bold mt-6">
                    How It Works
                </h2>

                <p className="text-white/60 mt-4 max-w-2xl mx-auto">
                    A simple four-step workflow designed for speed,
                    accuracy and ease of use.
                </p>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                {steps.map((step) => (
                    <div
                        key={step.number}
                        className="
              group
              relative
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
                bg-gradient-to-r
                from-blue-500
                to-purple-600
                flex
                items-center
                justify-center
                font-bold
                text-lg
                mb-6
                group-hover:scale-110
                transition
              "
                        >
                            {step.number}
                        </div>

                        <h3 className="text-2xl font-semibold mb-3">
                            {step.title}
                        </h3>

                        <p className="text-white/60 leading-relaxed">
                            {step.text}
                        </p>

                    </div>
                ))}

            </div>
        </section>
    );
}