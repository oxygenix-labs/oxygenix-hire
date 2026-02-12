import { NextResponse } from "next/server";
import { z } from "zod";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const generateSchema = z.object({
    jobTitle: z.string().min(2),
    employmentType: z.string().optional(),
    location: z.string().optional(),
    experienceLevel: z.string().optional(),
    skills: z.array(z.string()).optional(),
    responsibilities: z.string().optional(),
    companyContext: z.string().optional(),
    promptType: z.string().min(1),
    llmProvider: z.enum(["openai", "gemini"]).optional().default("openai"),
});

// Helper function to build prompts based on promptType
function buildPrompt(data: z.infer<typeof generateSchema>): { system: string; user: string } {
    const skillsStr = data.skills?.join(", ") || "relevant skills";
    const location = data.location || "Remote";
    const employmentType = data.employmentType || "Full-time";
    const experienceLevel = data.experienceLevel || "Mid-level";
    const responsibilities = data.responsibilities || "key deliverables and responsibilities";
    const companyContext = data.companyContext || "our company mission and values";

    const baseContext = `
Job Title: ${data.jobTitle}
Location: ${location}
Employment Type: ${employmentType}
Experience Level: ${experienceLevel}
Required Skills: ${skillsStr}
Responsibilities: ${responsibilities}
Company Context: ${companyContext}
`;

    switch (data.promptType) {
        case "fast":
            return {
                system: "You are an expert job description writer. Create professional, comprehensive job descriptions in HTML format. Use proper HTML tags like <h2>, <h3>, <p>, <ul>, <li>, <strong>. Be concise but thorough.",
                user: `Create a standard job description with the following details:\n${baseContext}\n\nInclude sections for: Job Title & Details, About the Role, Key Responsibilities, and Requirements. Format the output in HTML.`,
            };

        case "outcome":
            return {
                system: "You are an expert at writing outcome-focused, results-driven job descriptions. Emphasize impact and deliverables over tasks. Use HTML format with emojis for visual appeal.",
                user: `Create an outcome-focused job description with the following details:\n${baseContext}\n\nFocus on:\n- Expected outcomes in the first 90 days\n- Impact and results the candidate will deliver\n- Who the ideal candidate is (data-driven, fast-moving)\n\nUse emojis (🚀, 📈, 🤝) and HTML formatting.`,
            };

        case "high-signal":
            return {
                system: "You are an expert at writing concise, no-fluff job descriptions that attract high-quality candidates. Be direct and specific. Use HTML format.",
                user: `Create a high-signal, concise job description with the following details:\n${baseContext}\n\nBe extremely concise and direct:\n- Strict requirements (Stack, Level, Location)\n- The job in 2-3 sentences\n- The company in 1-2 sentences\n\nNo fluff. HTML format.`,
            };

        case "culture":
            return {
                system: "You are an expert at writing culture-first job descriptions that emphasize values, team dynamics, and company mission. Make it warm and inviting while maintaining professionalism. Use HTML format.",
                user: `Create a culture-focused job description with the following details:\n${baseContext}\n\nEmphasize:\n- Company values and culture\n- Why candidates will love working here\n- Team vibe and collaboration\n- Career growth and journey\n\nMake it warm and inviting. HTML format.`,
            };

        default:
            return {
                system: "You are an expert job description writer. Create professional job descriptions in HTML format.",
                user: `Create a job description for:\n${baseContext}\n\nFormat the output in HTML.`,
            };
    }
}

// Generate job description using OpenAI
async function generateWithOpenAI(data: z.infer<typeof generateSchema>): Promise<string> {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error(
            "OpenAI API key is not configured. Please add OPENAI_API_KEY to your .env.local file."
        );
    }

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const { system, user } = buildPrompt(data);

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: system },
            { role: "user", content: user },
        ],
        temperature: 0.7,
        max_tokens: 1000,
    });

    return completion.choices[0]?.message?.content || "<p>Failed to generate content</p>";
}

// Generate job description using Gemini
async function generateWithGemini(data: z.infer<typeof generateSchema>): Promise<string> {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error(
            "Gemini API key is not configured. Please add GEMINI_API_KEY to your .env.local file."
        );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const { system, user } = buildPrompt(data);

    // Gemini doesn't have a separate system message, so we combine them
    const prompt = `${system}\n\n${user}`;

    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
        },
    });

    const response = result.response;
    return response.text() || "<p>Failed to generate content</p>";
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const data = generateSchema.parse(body);

        let generatedContent: string;

        // Route to appropriate LLM provider
        if (data.llmProvider === "gemini") {
            generatedContent = await generateWithGemini(data);
        } else {
            // Default to OpenAI
            generatedContent = await generateWithOpenAI(data);
        }

        return NextResponse.json({
            content: generatedContent,
            provider: data.llmProvider,
        });
    } catch (error) {
        console.error("[AI_GENERATE] Error details:", error);

        // Provide more specific error messages
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Invalid request data", details: error.issues },
                { status: 400 }
            );
        }

        if (error instanceof Error) {
            console.error("[AI_GENERATE] Error message:", error.message);
            console.error("[AI_GENERATE] Error stack:", error.stack);

            if (error.message.includes("API key") || error.message.includes("Incorrect API key")) {
                return NextResponse.json(
                    {
                        error: "API key error. Please check your configuration.",
                        details: error.message,
                    },
                    { status: 500 }
                );
            }

            // Return the actual error message for debugging
            return NextResponse.json(
                { error: "Failed to generate content", details: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: "Failed to generate content", details: "Unknown error occurred" },
            { status: 500 }
        );
    }
}
