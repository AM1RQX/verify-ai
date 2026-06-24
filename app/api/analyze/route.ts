import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { image } = await req.json();

        const base64Data = image.split(",")[1];

        const buffer = Buffer.from(base64Data, "base64");

        const formData = new FormData();

        formData.append(
            "media",
            new Blob([buffer], { type: "image/jpeg" }),
            "image.jpg"
        );

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

        console.log("SIGHTENGINE RESULT:", result);

        const ai =
            result?.type?.ai_generated ??
            result?.ai_generated ??
            result?.genai ??
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