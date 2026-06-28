"use client";

import { motion } from "framer-motion";
import { Upload, Brain, BadgeCheck } from "lucide-react";

const steps = [
    {
        icon: Upload,
        title: "Upload Image",
        text: "Choose any AI or real image from your device."
    },
    {
        icon: Brain,
        title: "AI Analysis",
        text: "Our AI inspects thousands of visual patterns within seconds."
    },
    {
        icon: BadgeCheck,
        title: "Get Results",
        text: "Receive a confidence score and detailed AI probability."
    }
];

export default function MobileHowItWorks() {
    return (
        <section className="px-6 py-20">

            <div className="text-center">

                <p className="uppercase tracking-[4px] text-xs text-purple-400 font-semibold">
                    How It Works
                </p>

                <h2 className="mt-4 text-4xl font-black">
                    Three Simple Steps
                </h2>

                <p className="mt-5 text-zinc-400 leading-7">
                    Detect AI generated images in less than a minute.
                </p>

            </div>

            <div className="mt-14 space-y-8">

                {steps.map((step, index) => {

                    const Icon = step.icon;

                    return (

                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: .5,
                                delay: index * .15
                            }}
                            className="
                                relative
                                rounded-[32px]
                                border
                                border-white/10
                                bg-white/5
                                backdrop-blur-xl
                                p-6
                            "
                        >

                            <div className="absolute top-6 right-6 text-5xl font-black text-white/5">
                                0{index + 1}
                            </div>

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
                                {step.title}
                            </h3>

                            <p className="mt-3 text-zinc-400 leading-7">
                                {step.text}
                            </p>

                        </motion.div>

                    );

                })}

            </div>

        </section>
    );
}