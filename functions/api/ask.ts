// functions/api/ask.ts

interface Env {
  CLOUDFLARE_ACCOUNT_ID: string;
  CLOUDFLARE_API_TOKEN: string;
}

interface AskRequestBody {
  question: string;
  context?: string;
}

interface CloudflareAIResponse {
  result?: {
    response: string;
  };
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const body = (await request.json()) as AskRequestBody;
    const { question, context: pageContext } = body;

    if (!question) {
      return new Response(JSON.stringify({ error: "Question is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const accountId = env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = env.CLOUDFLARE_API_TOKEN;

    if (!accountId || !apiToken) {
      return new Response(
        JSON.stringify({ answer: "Cloudflare credentials not configured." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `You are an expert AI assistant for Codocs documentation and technical blog. Answer the user's question accurately. 
Context provided: ${pageContext || "General documentation and technical resources of the site."}`;

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
          temperature: 0.3,
          max_tokens: 500,
        }),
      }
    );

    const data = (await res.json()) as CloudflareAIResponse;
    
    return new Response(
      JSON.stringify({
        answer: data?.result?.response || "No response generated.",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ answer: "Server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
