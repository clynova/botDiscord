import dotenv from 'dotenv';
import { Feedback } from '../model/feedback.js';
import mongoose from 'mongoose';

dotenv.config();
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

function almacenarFeedback(mensaje) {
    const feedbackData = new Feedback({
        user: mensaje.user,             // Nombre de usuario
        idDiscord: mensaje.idDiscord,       // ID de Discord del usuario
        roles: mensaje.roles,               // Roles del usuario (si es necesario)
        feedbackText: mensaje.feedbackText, // Texto del feedback enviado por el usuario
        category: mensaje.category,         // Categoría del feedback (opcional)
        priority: mensaje.priority,         // Prioridad del feedback (opcional)
        channel: mensaje.channel,           // Canal de donde se envió el feedback
        timestamp: new Date(),              // Fecha y hora del feedback
        status: mensaje.status,             // Estado (pendiente, revisado, etc.)
        sentiment: mensaje.sentiment,       // Análisis de sentimiento (si aplica)
    });

    feedbackData
        .save()
        .then(() => console.log("The feedback has been saved in the database."))
        .catch((error) => console.error("Error saving feedback:", error));
}

export { almacenarFeedback };