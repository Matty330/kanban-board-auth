import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // Make sure bcrypt is installed
import { User } from '../models/User'; // Adjust based on your user model import
const router = express.Router();

// Login route
router.post('/login', async (req: any, res: any) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).send({ error: 'Invalid username or password.' });
    }

    // Check if the password matches (if you're using bcrypt)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid username or password.' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id },  // Payload (user information)
      process.env.JWT_SECRET as string,  // Secret key
      { expiresIn: '1h' }  // Set token expiration (e.g., 1 hour)
    );

    // Send the token to the client
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong. Please try again.' });
  }
});

export default router;
