import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { image } = await req.json();

        const response = await fetch(
            "https://router.huggingface.co/hf-inference/models/Nahrawy/AIorNot",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inputs: image,
                }),
            }
        );

        const result = await response.json();

        console.log("RAW MODEL:", JSON.stringify(result, null, 2));

        let ai = 0;
        let human = 0;

        if (Array.isArray(result)) {
            for (const item of result) {
                const label = String(item.label || "").toLowerCase();

                if (
                    label.includes("ai") ||
                    label.includes("fake") ||
                    label.includes("artificial")
                ) {
                    ai = item.score;
                }

                if (
                    label.includes("real") ||
                    label.includes("human")
                ) {
                    human = item.score;
                }
            }
        }

        return NextResponse.json([
            {
                label: "artificial",
                score: ai,
            },
            {
                label: "human",
                score: human,
            },
        ]);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Analyze failed" },
            { status: 500 }
        );
    }
}