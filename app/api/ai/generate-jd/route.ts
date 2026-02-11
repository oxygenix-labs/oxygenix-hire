import { NextResponse } from 'next/server';
import { z } from 'zod';

const generateSchema = z.object({
    jobTitle: z.string().min(2),
    employmentType: z.string().optional(),
    location: z.string().optional(),
    experienceLevel: z.string().optional(),
    skills: z.array(z.string()).optional(),
    responsibilities: z.string().optional(),
    companyContext: z.string().optional(),
    promptType: z.string().min(1),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const data = generateSchema.parse(body);

        // Simulate AI Latency
        await new Promise((resolve) => setTimeout(resolve, 1500));

        let generatedContent = "";
        const skillsStr = data.skills?.join(", ") || "relevant skills";

        switch (data.promptType) {
            case "fast":
                generatedContent = `
<h2>Job Title: ${data.jobTitle}</h2>
<p><strong>Location:</strong> ${data.location || "Remote"}</p>
<p><strong>Type:</strong> ${data.employmentType || "Full-time"}</p>

<h3>About the Role</h3>
<p>We are seeking a <strong>${data.experienceLevel || "skilled"}</strong> professional to join our team. In this role, you will be responsible for ${data.responsibilities || "key deliverables"} while contributing to our mission.</p>

<h3>Key Responsibilities</h3>
<ul>
    <li>Execute on core objectives related to ${data.jobTitle}.</li>
    <li>Collaborate with cross-functional teams.</li>
    <li>Ensure high quality of work and timely delivery.</li>
</ul>

<h3>Requirements</h3>
<ul>
    <li>Experience: ${data.experienceLevel || "Mid-level"}.</li>
    <li>Skills: ${skillsStr}.</li>
    <li>Strong communication and problem-solving abilities.</li>
</ul>
`;
                break;

            case "outcome":
                generatedContent = `
<h2>${data.jobTitle} - Impact & Outcomes</h2>
<p>We don't just want a ${data.jobTitle}; we want someone who can deliver results.</p>

<h3>Expected Outcomes (First 90 Days)</h3>
<ul>
    <li>🚀 <strong>Launch:</strong> Deliver initial projects related to ${data.responsibilities?.slice(0, 20)}...</li>
    <li>📈 <strong>Optimize:</strong> Improve existing workflows using ${skillsStr}.</li>
    <li>🤝 <strong>Collaborate:</strong> Integrate with the team and align on ${data.companyContext ? "our mission: " + data.companyContext : "company goals"}.</li>
</ul>

<h3>Who You Are</h3>
<p>You rely on data, move fast, and have a track record of ${data.experienceLevel} level success.</p>
`;
                break;

            case "high-signal":
                generatedContent = `
<h2>${data.jobTitle}</h2>
<p><strong>Strict Requirements:</strong></p>
<ul>
    <li><strong>Stack:</strong> ${skillsStr}.</li>
    <li><strong>Level:</strong> ${data.experienceLevel}.</li>
    <li><strong>Location:</strong> ${data.location}.</li>
</ul>

<p><strong>The Job:</strong></p>
<p>${data.responsibilities || "Get stuff done."}</p>

<p><strong>The Company:</strong></p>
<p>${data.companyContext || "High performance team."}</p>
`;
                break;

            case "culture":
                generatedContent = `
<h2>Join Us as a ${data.jobTitle}</h2>
<p>At our core, we believe in <strong>${data.companyContext || "innovation and empathy"}</strong>. We are looking for a ${data.jobTitle} who embodies these values.</p>

<h3>Why You'll Love It Here</h3>
<ul>
    <li>Current team vibe: Collaborative, ambitious, and supportive.</li>
    <li>We value: ${skillsStr} not just as tools, but as craft.</li>
</ul>

<h3>Your Journey</h3>
<p>As a ${data.experienceLevel} member of our family, you will help shape the future of our product while growing your own career.</p>
`;
                break;

            default:
                generatedContent = "<p>Generated content...</p>";
        }

        return NextResponse.json({ content: generatedContent });
    } catch (error) {
        console.error("[AI_GENERATE]", error);
        return NextResponse.json(
            { error: "Failed to generate content" },
            { status: 500 }
        );
    }
}
