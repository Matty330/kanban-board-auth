import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // Make sure bcrypt is installed
import { User } from '../models/User'; // Ensure correct casing for User import
const router = express.Router();

// Login route
router.post('/login', async (req: any, res: any) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).send({ error: 'Invalid username or password.' });
    }

    // Check if password matches (bcrypt for hashed password)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid username or password.' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id },  // Payload (user information)
      process.env.JWT_SECRET as string,  // Secret key
      { expiresIn: '1h' }  // Token expires in 1 hour
    );

    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong. Please try again.' });
  }
});

export default router;
