import dotenv from 'dotenv';  // Usar import en lugar de require
import { ALLOWED_STICKER_EXTENSIONS, Client, GatewayIntentBits } from 'discord.js';
import { chat } from './openIA/chat.js';
import { almacenarFeedback } from './utils/funcionesFeedback.js'

dotenv.config();
const PREFIX_CHAT = process.env.PREFIX_CHAT;
const PREFIX_FEEDBACK = process.env.PREFIX_FEEDBACK;

// Crear una instancia del cliente de Discord
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// Evento: el bot está listo
client.once('ready', () => {
    console.log(`¡Bot iniciado como ${client.user.tag}!`);
});

// Evento: manejar mensajes
client.on('messageCreate', async (message) => {
    try {
        if (message.author.bot) return;
        if (message.content.startsWith(`${PREFIX_CHAT}`)) {
            const answer = await chat(message)
            message.reply(answer.choices[0].message);
        }
        if (message.content.startsWith(`${PREFIX_FEEDBACK}`)) {

            feedbackHandler(message)

        }
    } catch (error) {
        console.error('Error encontrado:', error);
    }
});

const feedbackHandler = (message) => {
    const content = message.content.trim();
    const regex = /\/feedback\s+(\w+)?\s+(\w+)?\s+(.+)/;

    const match = content.match(regex);
    if (!match) {
        message.reply("Por favor, usa el formato correcto: `//feedback [categoría] [prioridad] [mensaje]`");
        return;
    }

    const [, category = "General", priority = "Media", feedbackText] = match;
    const feedbackData = {
        user: message.author.username + "#" + message.author.discriminator,
        idDiscord: message.author.id,
        roles: message.member.roles.cache.map((role) => role.name),
        feedbackText,
        category,
        priority,
        channel: message.channel.name,
    };

    almacenarFeedback(feedbackData);
    message.reply("¡Gracias por tu feedback! Lo hemos registrado correctamente.");
};

// Inicia sesión con el token del bot
client.login(process.env.DISCORD_TOKEN);
