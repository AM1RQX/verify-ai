"use client";

import { motion } from "framer-motion";
import {
    Brain,
    ShieldCheck,
    Zap,
    ScanSearch,
    Gauge,
    Lock,
} from "lucide-react";

const features = [
    {
        icon: Brain,
        title: "Advanced AI Detection",
        text: "Powerful neural networks analyze every uploaded image with exceptional precision."
    },
    {
        icon: ShieldCheck,
        title: "Trusted Results",
        text: "Receive clear confidence scores backed by professional forensic AI analysis."
    },
    {
        icon: Zap,
        title: "Lightning Fast",
        text: "Complete most image analyses in under three seconds with optimized processing."
    },
    {
        icon: ScanSearch,
        title: "Deep Image Inspection",
        text: "Detect hidden synthetic artifacts invisible to the human eye."
    },
    {
        icon: Gauge,
        title: "Confidence Score",
        text: "Understand exactly how likely an image was created using artificial intelligence."
    },
    {
        icon: Lock,
        title: "Privacy First",
        text: "Your uploads remain secure. Images are processed safely and never shared."
    }
];

export default function MobileFeatures() {
    return (
        <section className="relative px-6 py-20 overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-purple-500/5" />

            <div className="relative">

                <div className="text-center">

                    <p className="uppercase tracking-[4px] text-xs font-semibold text-purple-400">
                        Features
                    </p>

                    <h2 className="mt-4 text-4xl font-black leading-tight">
                        Built for Accuracy
                    </h2>

                    <p className="mt-5 text-zinc-400 leading-7">
                        Everything you need to distinguish AI-generated
                        images from authentic human content.
                    </p>

                </div>

                <div className="mt-14 space-y-5">

                    {features.map((feature, index) => {

                        const Icon = feature.icon;

                        return (

                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: .5,
                                    delay: index * .08
                                }}
                                whileHover={{
                                    scale: 1.02
                                }}
                                className="
                                    rounded-[32px]
                                    border
                                    border-white/10
                                    bg-white/5
                                    backdrop-blur-xl
                                    p-6
                                    shadow-[0_0_40px_rgba(99,102,241,.08)]
                                "
                            >

                                <div className="
                                    w-16
                                    h-16
                                    rounded-3xl
                                    bg-gradient-to-br
                                    from-indigo-500
                                    via-purple-500
                                    to-pink-500
                                    flex
                                    items-center
                                    justify-center
                                    shadow-[0_0_40px_rgba(99,102,241,.35)]
                                ">

                                    <Icon className="w-8 h-8 text-white" />

                                </div>

                                <h3 className="mt-6 text-2xl font-bold">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 text-zinc-400 leading-7">
                                    {feature.text}
                                </p>

                            </motion.div>

                        );

                    })}

                </div>

            </div>

        </section>
    );
}