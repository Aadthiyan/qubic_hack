import { Router } from 'express';
import { qubicService } from '../services/QubicService';

const router = Router();

/**
 * GET /api/contract/score/:projectId
 * Get the score from the Qubic Smart Contract
 */
router.get('/score/:projectId', async (req, res) => {
    try {
        const { projectId } = req.params;
        const result = await qubicService.getGuardianScore(projectId);
        res.json({ success: true, data: result });
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch from contract' });
    }
});

/**
 * POST /api/contract/set-score
 * Write the score to the Qubic Smart Contract (Admin only)
 */
router.post('/set-score', async (req, res) => {
    try {
        const { projectId, score, grade } = req.body;

        if (!projectId || score === undefined || grade === undefined) {
            return res.status(400).json({ success: false, error: 'Missing required fields' });
        }

        const success = await qubicService.setGuardianScore(projectId, score, grade);
        res.json({ success: true, message: 'Score update transaction broadcasted' });
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ success: false, error: 'Failed to update contract' });
    }
});

export default router;
