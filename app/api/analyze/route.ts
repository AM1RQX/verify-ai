import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { image } = await req.json();

        // MODEL 1 (main)
        const res1 = await fetch(
            "https://router.huggingface.co/hf-inference/models/Bombek1/ai-image-detector-siglip-dinov2",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inputs: image }),
            }
        );

        // MODEL 2 (backup / smoothing)
        const res2 = await fetch(
            "https://router.huggingface.co/hf-inference/models/Dafilab/ai-image-detector",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inputs: image }),
            }
        );

        const r1 = await res1.json();
        const r2 = await res2.json();

        console.log("MODEL1:", r1);
        console.log("MODEL2:", r2);

        const extract = (res: any) => {
            if (!Array.isArray(res)) return { ai: 0.5, human: 0.5 };

            let ai = 0;
            let human = 0;

            for (const item of res) {
                const label = (item.label || "").toLowerCase();

                if (label.includes("ai") || label.includes("fake") || label.includes("artificial")) {
                    ai = item.score;
                }

                if (label.includes("real") || label.includes("human")) {
                    human = item.score;
                }
            }

            return { ai, human };
        };

        const m1 = extract(r1);
        const m2 = extract(r2);

        // AVERAGING (главная магия)
        const ai = Math.round(((m1.ai + m2.ai) / 2) * 100);
        const human = 100 - ai;

        return NextResponse.json([
            { label: "artificial", score: ai / 100 },
            { label: "human", score: human / 100 }
        ]);

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Analyze failed" },
            { status: 500 }
        );
    }
}