export default function Footer() {
    return (
        <footer className="border-t border-white/10 mt-24">

            <div className="max-w-7xl mx-auto px-6 py-12">

                <div className="grid lg:grid-cols-4 gap-8">

                    <div>
                        <h3 className="text-2xl font-bold">
                            VerifyAI
                        </h3>

                        <p className="text-white/50 mt-4">
                            Detect AI-generated content with confidence.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">
                            Product
                        </h4>

                        <ul className="space-y-2 text-white/50">
                            <li>Features</li>
                            <li>Pricing</li>
                            <li>API</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">
                            Company
                        </h4>

                        <ul className="space-y-2 text-white/50">
                            <li>About</li>
                            <li>Blog</li>
                            <li>Contact</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">
                            Resources
                        </h4>

                        <ul className="space-y-2 text-white/50">
                            <li>Help Center</li>
                            <li>Privacy Policy</li>
                            <li>Terms of Service</li>
                        </ul>
                    </div>

                </div>

                <div className="mt-10 text-center text-white/40 text-sm">
                    © 2025 VerifyAI. All rights reserved.
                </div>

            </div>

        </footer>
    );
}