import express from 'express';
import authenticateToken from '../middleware/auth'; // Corrected import for default export
const router = express.Router();
// Protect routes with JWT
router.get('/tasks', authenticateToken, async (req, res) => {
    try {
        const tasks = await Task.findAll(); // Example logic to fetch tasks from the database
        res.status(200).send({ tasks });
    }
    catch (error) {
        res.status(500).send({ error: 'Could not fetch tasks.' });
    }
});
export default router;
