export default function DashboardPreview() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-12">

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10">

                <h2 className="text-4xl font-bold text-center mb-4">
                    How To Detect AI Images Yourself
                </h2>

                <p className="text-center text-white/60 max-w-3xl mx-auto mb-12">
                    You don't always need special tools. Many AI-generated images
                    contain visual clues that can reveal they were created by AI.
                </p>

                <div className="grid lg:grid-cols-3 gap-6">

                    <div className="rounded-2xl border border-white/10 p-6">
                        <div className="text-5xl mb-4">👋</div>

                        <h3 className="text-xl font-semibold mb-3">
                            Check Hands & Fingers
                        </h3>

                        <p className="text-white/60">
                            AI often creates extra fingers, strange hand shapes,
                            fused fingers or impossible poses.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 p-6">
                        <div className="text-5xl mb-4">👀</div>

                        <h3 className="text-xl font-semibold mb-3">
                            Look At Eyes
                        </h3>

                        <p className="text-white/60">
                            Eyes may have different sizes, strange reflections,
                            or unnatural symmetry.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 p-6">
                        <div className="text-5xl mb-4">📝</div>

                        <h3 className="text-xl font-semibold mb-3">
                            Read Text Carefully
                        </h3>

                        <p className="text-white/60">
                            AI frequently generates distorted letters,
                            misspelled words and unreadable text.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 p-6">
                        <div className="text-5xl mb-4">💡</div>

                        <h3 className="text-xl font-semibold mb-3">
                            Inspect Lighting
                        </h3>

                        <p className="text-white/60">
                            Shadows and reflections sometimes don't match
                            the position of the light source.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 p-6">
                        <div className="text-5xl mb-4">🏠</div>

                        <h3 className="text-xl font-semibold mb-3">
                            Check Backgrounds
                        </h3>

                        <p className="text-white/60">
                            AI often creates warped objects, broken geometry
                            and unrealistic details.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 p-6">
                        <div className="text-5xl mb-4">🔍</div>

                        <h3 className="text-xl font-semibold mb-3">
                            Zoom In
                        </h3>

                        <p className="text-white/60">
                            Small details usually reveal AI artifacts that
                            are invisible at first glance.
                        </p>
                    </div>

                </div>

            </div>

        </section>
    );
}