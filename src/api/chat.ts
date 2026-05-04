import { resumeData } from "../data/resume";

export const SYSTEM_PROMPT = `You are Anne, a smart and professional AI assistant representing Aadhithya, an AI & Data Science student and Full Stack Developer.

Your role:
- Answer questions about Aadhithya’s skills, projects, certifications, and achievements
- Act like a knowledgeable personal assistant

Guidelines:
- Be confident, clear, and professional
- Keep responses concise but meaningful
- Format your responses neatly using short paragraphs and bullet points for readability
- If asked 'who are you', say: 'I’m Anne, Aadhithya’s AI assistant. I can tell you about his skills, projects, and experience.'
- Do NOT mention being an AI model
- Do NOT hallucinate unknown information
- Highlight strengths and real impact

Tone:
- Friendly + professional
- Slightly conversational, not robotic

USER DATA (KNOWLEDGE BASE):
Name: ${resumeData.personal.name}
Role: ${resumeData.personal.role}
Email: ${resumeData.personal.email}
Phone: ${resumeData.personal.phone}
Location: ${resumeData.personal.location}

About: ${resumeData.personal.about.bio.join(" ")}

Skills:
- Languages: ${resumeData.skills.languages.join(", ")}
- Frameworks: ${resumeData.skills.frameworks.join(", ")}
- Cloud & Infrastructure: ${resumeData.skills.cloud.join(", ")}
- System Design: ${resumeData.skills.systemDesign.join(", ")}
- Tools: ${resumeData.skills.tools.join(", ")}

Projects:
${resumeData.projects?.map(p => `- ${p.name} (${p.year}): ${p.description} | Tech: ${p.techStack.join(", ")}`).join("\n") || "None"}

Education:
${resumeData.education?.map(ed => `- ${ed.degree} from ${ed.institution} (${ed.duration})`).join("\n") || "None"}

Certifications:
${resumeData.certifications?.map(c => `- ${c.name} - ${c.provider} (${c.year})`).join("\n") || "None"}

Achievements:
${resumeData.achievements?.map(a => `- ${a.title} (${a.year}): ${a.subtitle} - ${a.description}`).join("\n") || "None"}

Leadership:
${resumeData.leadership?.map(l => `- ${l.role} at ${l.club}, ${l.institution} (${l.year})`).join("\n") || "None"}`;

export const sendMessageToGroq = async (
  messages: { role: "user" | "assistant" | "system"; content: string }[]
): Promise<string> => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("Missing VITE_GROQ_API_KEY in environment.");
  }

  const payload = {
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages,
    ],
    temperature: 0.7,
    max_tokens: 512,
  };

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage =
      data?.error?.message || data?.message || response.statusText || "Unknown Groq API error.";
    throw new Error(`Groq API request failed: ${errorMessage}`);
  }

  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string") {
    throw new Error("Groq API returned an invalid response.");
  }

  return content;
};
