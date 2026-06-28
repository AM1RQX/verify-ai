"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
    {
        name: "Alex Morgan",
        role: "Content Creator",
        text: "VerifyAI instantly detected AI-generated images that fooled every other tool I tested."
    },
    {
        name: "Sarah Chen",
        role: "Designer",
        text: "Beautiful interface, incredibly fast results and surprisingly accurate confidence scores."
    },
    {
        name: "Michael Ross",
        role: "Photographer",
        text: "Now I always verify suspicious images before using them in my projects."
    }
];

export default function MobileTestimonials() {
    return (
        <section className="px-6 py-20">

            <div className="text-center">

                <p className="uppercase tracking-[4px] text-xs text-purple-400 font-semibold">
                    Testimonials
                </p>

                <h2 className="mt-4 text-4xl font-black">
                    Loved by Users
                </h2>

                <p className="mt-5 text-zinc-400 leading-7">
                    Thousands of creators trust VerifyAI every day.
                </p>

            </div>

            <div className="mt-12 space-y-6">

                {reviews.map((review, index) => (

                    <motion.div
                        key={review.name}
                        initial={{ opacity: 0, y: 35 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: .5,
                            delay: index * .12
                        }}
                        className="
                            rounded-[32px]
                            border
                            border-white/10
                            bg-white/5
                            backdrop-blur-xl
                            p-6
                        "
                    >

                        <div className="flex gap-1">

                            {[...Array(5)].map((_, i) => (

                                <Star
                                    key={i}
                                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                                />

                            ))}

                        </div>

                        <p className="mt-5 text-zinc-300 leading-7">
                            "{review.text}"
                        </p>

                        <div className="mt-6">

                            <h3 className="font-bold text-lg">
                                {review.name}
                            </h3>

                            <p className="text-zinc-500 text-sm">
                                {review.role}
                            </p>

                        </div>

                    </motion.div>

                ))}

            </div>

        </section>
    );
}