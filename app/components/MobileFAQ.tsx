"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "How accurate is VerifyAI?",
        answer:
            "VerifyAI uses advanced AI models to analyze image patterns and provides a confidence score with high accuracy."
    },
    {
        question: "Is the service free?",
        answer:
            "Yes. Every user receives 15 free analyses every day without a subscription."
    },
    {
        question: "How long does an analysis take?",
        answer:
            "Most image analyses finish in under 3 seconds."
    },
    {
        question: "Are my images stored?",
        answer:
            "No. Your uploaded images are processed securely and are not permanently stored."
    },
    {
        question: "Can I use VerifyAI on mobile?",
        answer:
            "Absolutely. VerifyAI is fully optimized for phones, tablets and desktop devices."
    }
];

export default function MobileFAQ() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section className="px-6 py-20">

            <div className="text-center">

                <p className="uppercase tracking-[4px] text-xs font-semibold text-purple-400">
                    FAQ
                </p>

                <h2 className="mt-4 text-4xl font-black">
                    Frequently Asked Questions
                </h2>

                <p className="mt-5 text-zinc-400 leading-7">
                    Everything you need to know about VerifyAI.
                </p>

            </div>

            <div className="mt-12 space-y-4">

                {faqs.map((faq, index) => {

                    const isOpen = open === index;

                    return (

                        <motion.div
                            key={faq.question}
                            layout
                            className="
                                rounded-[28px]
                                border
                                border-white/10
                                bg-white/5
                                backdrop-blur-xl
                                overflow-hidden
                            "
                        >

                            <button
                                onClick={() =>
                                    setOpen(isOpen ? null : index)
                                }
                                className="
                                    w-full
                                    flex
                                    items-center
                                    justify-between
                                    p-6
                                    text-left
                                "
                            >

                                <span className="font-semibold text-lg">
                                    {faq.question}
                                </span>

                                <motion.div
                                    animate={{
                                        rotate: isOpen ? 180 : 0
                                    }}
                                >
                                    <ChevronDown />
                                </motion.div>

                            </button>

                            <AnimatePresence>

                                {isOpen && (

                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            height: 0
                                        }}
                                        animate={{
                                            opacity: 1,
                                            height: "auto"
                                        }}
                                        exit={{
                                            opacity: 0,
                                            height: 0
                                        }}
                                        transition={{
                                            duration: .25
                                        }}
                                    >

                                        <div className="px-6 pb-6 text-zinc-400 leading-7">

                                            {faq.answer}

                                        </div>

                                    </motion.div>

                                )}

                            </AnimatePresence>

                        </motion.div>

                    );

                })}

            </div>

        </section>
    );
}