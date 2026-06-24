import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { image } = await req.json();

        const response = await fetch(
            "https://api.sightengine.com/1.0/check.json",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    media_base64: image,
                    models: "genai",
                    api_user: process.env.SIGHTENGINE_API_USER!,
                    api_secret: process.env.SIGHTENGINE_API_SECRET!,
                }),
            }
        );

        const result = await response.json();
        console.log(JSON.stringify(result, null, 2));

        console.log("SIGHTENGINE:", result);

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