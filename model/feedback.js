import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true, // Ejemplo: "username#1234"
  },
  idDiscord: {
    type: String,
    required: true, // Ejemplo: "123456789012345678"
  },
  roles: {
    type: [String], // Roles que tiene el usuario, si es necesario
    default: [],
  },
  feedbackText: {
    type: String,
    required: true, // Texto del feedback proporcionado por el usuario
  },
  category: {
    type: String, // Ejemplo: "Bug", "Sugerencia", "Mejora de UX"
    default: "General",
  },
  tags: {
    type: [String], // Etiquetas asignadas automáticamente o manualmente
    default: [],
  },
  channel: {
    type: String, // Canal donde se envió el feedback, Ejemplo: "#sugerencias"
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Fecha y hora del feedback
  },
  status: {
    type: String, // Estado del feedback, Ejemplo: "Pendiente", "Revisado"
    default: "Pendiente",
  },
  priority: {
    type: String, // Prioridad asignada, Ejemplo: "Alta", "Media", "Baja"
    default: "Media",
  },
  assignedTo: {
    type: String, // Responsable asignado (si aplica)
    default: null,
  },
  botVersion: {
    type: String, // Versión del bot en el momento del feedback
    default: null,
  },
  sentiment: {
    type: String, // Análisis de sentimiento, Ejemplo: "Positivo", "Negativo"
    default: "Neutro",
  },
  relatedLogs: {
    type: String, // Logs relacionados si es sobre un error (opcional)
    default: null,
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
export { Feedback };
