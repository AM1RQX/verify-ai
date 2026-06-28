import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const DAILY_LIMIT = 15;

export async function POST(req: Request) {
    try {
        const { image } = await req.json();

        if (!image) {
            return NextResponse.json(
                { error: "No image provided" },
                { status: 400 }
            );
        }

        // Получаем IP пользователя
        const forwarded = req.headers.get("x-forwarded-for");
        const ip =
            forwarded?.split(",")[0].trim() ||
            req.headers.get("x-real-ip") ||
            "unknown";

        const today = new Date().toISOString().split("T")[0];

        let { data: usage } = await supabase
            .from("usage_limits")
            .select("*")
            .eq("ip_address", ip)
            .single();

        if (!usage) {
            await supabase.from("usage_limits").insert({
                ip_address: ip,
                scans_today: 0,
                last_reset: today,
            });

            usage = {
                scans_today: 0,
                last_reset: today,
            };
        }

        if (usage.last_reset !== today) {
            await supabase
                .from("usage_limits")
                .update({
                    scans_today: 0,
                    last_reset: today,
                })
                .eq("ip_address", ip);

            usage.scans_today = 0;
        }

        if (usage.scans_today >= DAILY_LIMIT) {
            return NextResponse.json(
                {
                    error: "Daily limit reached (15 analyses per day)",
                },
                {
                    status: 403,
                }
            );
        }

        const matches = image.match(/^data:(image\/.+);base64,(.+)$/);

        if (!matches) {
            return NextResponse.json(
                { error: "Invalid image format" },
                { status: 400 }
            );
        }

        const mimeType = matches[1];
        const base64Data = matches[2];

        const buffer = Buffer.from(base64Data, "base64");

        const formData = new FormData();

        formData.append(
            "media",
            new Blob([buffer], { type: mimeType }),
            "image"
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
        console.log("SIGHTENGINE:", JSON.stringify(result, null, 2));

        if (result.status !== "success") {
            return NextResponse.json(
                {
                    error: result.error || "Sightengine failed",
                },
                {
                    status: 500,
                }
            );
        }

        const ai =
            Number(result?.type?.ai_generated) ||
            Number(result?.ai_generated) ||
            Number(result?.genai) ||
            0;

        const human = Math.max(0, 1 - ai);

        await supabase
            .from("usage_limits")
            .update({
                scans_today: usage.scans_today + 1,
            })
            .eq("ip_address", ip);

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
            {
                error: "Analyze failed",
            },
            {
                status: 500,
            }
        );
    }
}