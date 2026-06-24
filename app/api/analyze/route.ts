import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { image } = await req.json();

        const formData = new FormData();

        formData.append("media_base64", image);
        formData.append("models", "genai");
        formData.append("api_user", process.env.SIGHTENGINE_API_USER!);
        formData.append("api_secret", process.env.SIGHTENGINE_API_SECRET!);

        const response = await fetch(
            "https://api.sightengine.com/1.0/check.json",
            {
                method: "POST",
                body: formData,
            }
        );

        const result = await response.json();

        console.log("SIGHTENGINE:", JSON.stringify(result, null, 2));

        const ai =
            result?.type?.ai_generated ??
            result?.ai_generated ??
            0;

        const human = 1 - ai;

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