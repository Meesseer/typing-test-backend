import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User', required: true },
  wpm: { type: Number, required: true },
  accuracy: { type: Number, required: true },
  totalErrors: { type: Number, required: true },
  errorWords: [String], 
  typingDurations: [Number],  
  createdAt: { type: Date, default: Date.now },
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;
