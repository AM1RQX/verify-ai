import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { image } = await req.json();

        const response = await fetch(
            https://router.huggingface.co/hf-inference/models/Bombek1/ai-image-detector-siglip-dinov2,
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

        console.log("========== HF RESPONSE ==========");
        console.log(JSON.stringify(result, null, 2));
        console.log("=================================");

        if (Array.isArray(result)) {
            const mappedResult = result.map((item: any) => {
                let mappedLabel = item.label;
                const labelLower = item.label.toLowerCase();

                if (labelLower.includes("ai") || labelLower.includes("fake")) {
                    mappedLabel = "artificial";
                } else if (labelLower.includes("real") || labelLower.includes("human")) {
                    mappedLabel = "human";
                }

                return {
                    ...item,
                    label: mappedLabel
                };
            });

            return NextResponse.json(mappedResult);
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("SERVER ERROR:");
        console.error(error);

        return NextResponse.json(
            {
                error: "Analyze failed",
            },
            {
                status: 500,
            }
        );
    }
}