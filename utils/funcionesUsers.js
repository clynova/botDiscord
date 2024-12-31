import dotenv from 'dotenv';
import { UserRequest } from '../model/userRequest.js';
import mongoose from 'mongoose';

dotenv.config();
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

function almacenarInfoBD(mensaje) {
  //console.log('****'.repeat(50), mensaje)
  const objUserRequest = new UserRequest({
    user: mensaje.username,
    idDiscord: mensaje.discordId,
    requestType: 'test',
    question: mensaje.prompt,
    answer: mensaje.answer,
  });
  objUserRequest
    .save()
    .then(() => console.log("The prompt has been saved in the database."))
    .catch((error) => console.error(error));
}


export { almacenarInfoBD };

/*
  user: {
    type: String,
    required: true,
  },
  idDiscord: {
    type: String,
    required: true,
  },
  requestType: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,*/