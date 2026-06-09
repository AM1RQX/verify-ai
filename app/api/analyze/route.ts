import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { image } = await req.json();

        const response = await fetch(
            "https://router.huggingface.co/hf-inference/models/umm-maybe/AI-image-detector",
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

        console.log("HF RESPONSE:");
        console.log(result);

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