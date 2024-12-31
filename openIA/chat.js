import OpenAI from "openai";
const openai = new OpenAI();
import { personalidad } from '../utils/personality.js'
import { almacenarInfoBD } from '../utils/funcionesUsers.js'

export async function chat(data) {
  const perfil = personalidad.personaFlaiteBrasileiro;
  const prompt = data.content.substring(5);
  const username = data.author.username;
  const discordId = data.author.id;
  const userId = data.author.id;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: perfil },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const mensajeFormateado = {
    username: username,
    prompt: prompt,
    personalidad: perfil,
    discordId: discordId,
    userId: userId,
    answer: completion.choices[0].message.content,
  }

  almacenarInfoBD(mensajeFormateado)
  return completion
}



