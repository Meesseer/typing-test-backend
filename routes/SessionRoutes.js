import express from 'express';
import authMiddleware from '../middleware/auth.js'; // Import auth middleware
import Session from '../models/Session.js';

const router = express.Router();

router.post('/sessions', authMiddleware, async (req, res) => {

  const { wpm, accuracy, totalErrors, errorWords, typingDurations } = req.body;
  const userId = req.user.userId; 
  
  try {

    const newSession = new Session({
      userId,
      wpm,
      accuracy,
      totalErrors,
      errorWords,
      typingDurations,
      createdAt: new Date(), 
    });

    await newSession.save();

    res.status(201).json({ message: 'Session saved successfully', session: newSession });
  } catch (error) {
    console.error("Error saving session:", error.stack);
    res.status(500).json({ message: 'Error saving session', error });
  }
});

router.get('/sessions/:userId', authMiddleware, async (req, res) => {
  const { userId } = req.params;

  if (req.user.userId !== userId) {
    return res.status(403).json({ message: 'Unauthorized access to this user\'s sessions' });
  }

  try {
    const sessions = await Session.find({ userId });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving sessions', error });
  }
});

export default router;
