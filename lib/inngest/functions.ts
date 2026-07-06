import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts";
import { inngest } from "./client";
import { sendWelcomeEmail } from "../nodemailer";

export const sendSignUpEmail = inngest.createFunction(
  { id: "sign-up-email", triggers: { event: "app/user.created" } },
  async ({ event, step }: { event: { data: Record<string, string> }; step: { ai: { models: { gemini: (options: { model: string }) => unknown }; infer: (name: string, options: Record<string, unknown>) => Promise<unknown> }; run: (name: string, fn: () => Promise<void>) => Promise<void> } }) => {
    const userProfile = `
      - Country: ${event.data.country}
      - Investment goals: ${event.data.investmentGoals}
      - Risk tolerance: ${event.data.riskTolerance}
      - Preferred industry: ${event.data.preferredIndustry}
    `;

    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace("{{userProfile}}", userProfile);

    const response = await step.ai.infer("generate-welcome-intro", {
      model: step.ai.models.gemini({ model: "gemini-2.5-flash-lite" }),
      body: {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
    });

    await step.run("send-welcome-email", async () => {
      const responseData = response as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> } | undefined;
      const part = responseData?.candidates?.[0]?.content?.parts?.[0];
      const introText =
        (part && "text" in part ? part.text : null) ||
        "Thanks for joining Signalist. You now have the tools to track markets and make smart moves.";


        const { data: {email, name} } = event;

        return await sendWelcomeEmail({email, name, intro: introText })
    });

    return {
      access: true,
      message: "Welcome, email sent successfully",
    };
  }
);