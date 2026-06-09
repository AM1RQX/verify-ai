const reviews = [
    {
        name: "Sarah Chen",
        role: "CTO at VisionTech",
        text: "VerifyAI became an essential part of our content moderation workflow. Fast, accurate and easy to use."
    },
    {
        name: "Michael Rodriguez",
        role: "Head of Content",
        text: "The accuracy is impressive. We tested multiple platforms and VerifyAI delivered the best experience."
    },
    {
        name: "Emily Johnson",
        role: "AI Researcher",
        text: "One of the strongest AI detection tools we have evaluated so far. The interface is beautiful too."
    },
    {
        name: "David Wilson",
        role: "Digital Journalist",
        text: "I use VerifyAI daily to verify images before publishing stories. It saves hours of manual work."
    },
    {
        name: "Olivia Martin",
        role: "Content Creator",
        text: "Simple, clean and surprisingly accurate. The confidence scores help a lot."
    },
    {
        name: "James Brown",
        role: "Security Analyst",
        text: "A must-have tool for anyone working with online media verification."
    }
];

export default function Testimonials() {
    return (
        <section
            id="testimonials"
            className="max-w-7xl mx-auto px-6 py-24"
        >
            <div className="text-center mb-16">

                <span className="px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-300 text-sm border border-yellow-500/20">
                    Reviews
                </span>

                <h2 className="text-5xl font-bold mt-6">
                    Loved by Users Worldwide
                </h2>

                <p className="text-white/60 mt-4 max-w-2xl mx-auto">
                    This is BETA testing, so this reviews are not real.
                </p>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {reviews.map((review) => (
                    <div
                        key={review.name}
                        className="
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
                        <div className="text-yellow-400 text-xl mb-4">
                            ★★★★★
                        </div>

                        <p className="text-white/70 leading-relaxed">
                            "{review.text}"
                        </p>

                        <div className="mt-8 pt-6 border-t border-white/10">

                            <div className="font-semibold text-lg">
                                {review.name}
                            </div>

                            <div className="text-white/40 text-sm">
                                {review.role}
                            </div>

                        </div>

                    </div>
                ))}

            </div>
        </section>
    );
}