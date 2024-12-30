import dotenv from 'dotenv';  // Usar import en lugar de require
import { ALLOWED_STICKER_EXTENSIONS, Client, GatewayIntentBits } from 'discord.js';
import mongoose from 'mongoose';
import { chat } from './openIA/chat.js';

// Cargar variables de entorno
dotenv.config();  // Cargar el archivo .env

// URL de conexión a MongoDB
const MONGO_URI = process.env.MONGO_URI;  // Cambia esto si usas MongoDB Atlas
const prefix = process.env.PREFIX;

// Función para conectar a MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión exitosa a MongoDB 🚀');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);  // Termina la ejecución si no se puede conectar
    }
};

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
        if (message.content.startsWith(`${prefix}`)) {
            const answer = await chat(message)
            message.reply(answer.choices[0].message);
        }
    } catch (error) {
        console.error('Error encontrado:', error);
    }
});

// Inicia sesión con el token del bot
client.login(process.env.DISCORD_TOKEN);
