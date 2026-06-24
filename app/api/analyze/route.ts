import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { image } = await req.json();

        const response = await fetch(
            "https://router.huggingface.co/hf-inference/models/Bombek1/ai-image-detector-siglip-dinov2",
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

        console.log("HF RAW:", JSON.stringify(result, null, 2));

        if (!Array.isArray(result)) {
            return NextResponse.json([
                { label: "human", score: 0.5 },
                { label: "artificial", score: 0.5 }
            ]);
        }

        const normalized = result.map((item: any) => {
            const label = item.label.toLowerCase();

            if (label.includes("ai") || label.includes("fake")) {
                return { label: "artificial", score: item.score };
            }

            if (label.includes("real") || label.includes("human")) {
                return { label: "human", score: item.score };
            }

            return item;
        });

        return NextResponse.json(normalized);

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Analyze failed" },
            { status: 500 }
        );
    }
}