// src/pages/api/ask.ts
export const prerender = false;

import type { APIRoute } from "astro";

interface AskRequestBody {
  question: string;
  context: string;
}

interface CloudflareAIResponse {
  result: {
    response: string;
  };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { question, context } = (await request.json()) as AskRequestBody;

    if (!question || !context) {
      return new Response(
        JSON.stringify({ error: "Question and context are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const accountId = import.meta.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = import.meta.env.CLOUDFLARE_API_TOKEN;

    if (!accountId || !apiToken) {
      return new Response(
        JSON.stringify({ answer: "Cloudflare credentials not configured." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `You are an expert AI assistant for C0desk1 documentation. Your job is to answer the reader's technical questions accurately based ONLY on the provided page context. Keep it concise, professional, and clear. Do not make up facts.

Context:
${context}`;

    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3.2-3b-instruct`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: question },
          ],
          temperature: 0.2,
          max_tokens: 500,
        }),
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Cloudflare AI Error:", errorData);
      return new Response(
        JSON.stringify({ answer: "AI request failed from provider." }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = (await res.json()) as CloudflareAIResponse;

    return new Response(
      JSON.stringify({
        answer: data?.result?.response || "No response generated.",
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ answer: "Internal server error." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
