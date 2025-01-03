import mongoose from 'mongoose';

const userRequestSchema = new mongoose.Schema({
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
    default: Date.now,
  },
});

const UserRequest = mongoose.model('usersRequest', userRequestSchema);
export { UserRequest };