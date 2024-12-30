import OpenAI from "openai";
const openai = new OpenAI();
import { personalidad } from '../utils/personality.js'

export async function chat(data) {
  const prompt = data.content.substring(4);
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: personalidad.personaFlaiteBrasileiro },
      {
        role: "user",
        content: prompt,
      },
    ],
  });
  return completion
}



