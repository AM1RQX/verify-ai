export default function Pricing() {
    return (
        <section
            id="pricing"
            className="max-w-7xl mx-auto px-6 py-24"
        >
            <div className="text-center mb-16">

                <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm border border-purple-500/20">
                    Pricing
                </span>

                <h2 className="text-5xl font-bold mt-6">
                    Choose Your Plan
                </h2>

                <p className="text-white/60 mt-4">
                    This is BETA testing. Pricing isnt working yet. I will add stripe integration soon.
                </p>

            </div>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* FREE */}
                <div
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
                    <h3 className="text-3xl font-bold">
                        Free
                    </h3>

                    <div className="mt-4 text-5xl font-bold">
                        $0
                    </div>

                    <div className="text-white/50 mt-2">
                        Perfect for trying VerifyAI
                    </div>

                    <ul className="mt-8 space-y-4 text-white/70">

                        <li>✓ 10 analyses per day</li>
                        <li>✓ Basic AI detection</li>
                        <li>✓ Analysis history</li>
                        <li>✓ Community support</li>

                    </ul>

                    <button
                        className="
            w-full
            mt-8
            py-3
            rounded-xl
            border
            border-white/10
            hover:bg-white/5
            transition
            "
                    >
                        Get Started
                    </button>
                </div>

                {/* PRO */}
                <div
                    className="
          relative
          rounded-3xl
          border
          border-purple-500
          bg-white/[0.04]
          p-8
          scale-105
          shadow-[0_0_60px_rgba(168,85,247,0.2)]
          "
                >

                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">

                        <span className="px-4 py-2 rounded-full bg-purple-600 text-sm">
                            Most Popular
                        </span>

                    </div>

                    <h3 className="text-3xl font-bold">
                        Pro
                    </h3>

                    <div className="mt-4 text-5xl font-bold">
                        $9
                    </div>

                    <div className="text-white/50 mt-2">
                        Per month
                    </div>

                    <ul className="mt-8 space-y-4 text-white/70">

                        <li>✓ Unlimited analyses</li>
                        <li>✓ Advanced AI models</li>
                        <li>✓ Detailed reports</li>
                        <li>✓ Priority support</li>
                        <li>✓ Faster processing</li>

                    </ul>

                    <button
                        className="
            w-full
            mt-8
            py-3
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-purple-600
            hover:scale-105
            transition
            "
                    >
                        Start Free Trial
                    </button>

                </div>

                {/* ENTERPRISE */}
                <div
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
                    <h3 className="text-3xl font-bold">
                        Enterprise
                    </h3>

                    <div className="mt-4 text-4xl font-bold">
                        Custom
                    </div>

                    <div className="text-white/50 mt-2">
                        For teams and businesses
                    </div>

                    <ul className="mt-8 space-y-4 text-white/70">

                        <li>✓ API Access</li>
                        <li>✓ Team Management</li>
                        <li>✓ Dedicated Support</li>
                        <li>✓ Custom Integrations</li>
                        <li>✓ SLA Guarantee</li>

                    </ul>

                    <button
                        className="
            w-full
            mt-8
            py-3
            rounded-xl
            border
            border-white/10
            hover:bg-white/5
            transition
            "
                    >
                        Contact Sales
                    </button>

                </div>

            </div>
        </section>
    );
}