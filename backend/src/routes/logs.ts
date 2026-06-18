import { Router, Request, Response } from 'express';
import { getLogs } from '../utils/storage';
import { pool } from '../utils/db';

const router = Router();

// 1. Existing route: Fetch data logs for a specific node box
router.get('/:id', (req: Request, res: Response) => {
  const id = req.params.id as string;
  const logs = getLogs(id);

  if (logs === null) {
    res.status(404).json({ error: `No webhook endpoint found for id: ${id}` });
    return;
  }

  res.status(200).json({ id, logs });
});

// 2. New route: Recover all historical hardware IDs belonging to a user
router.get('/user/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const query = `
      SELECT hardware_id, created_at 
      FROM webhook_nodes 
      WHERE user_id = $1 
      ORDER BY created_at DESC;
    `;
    const result = await pool.query(query, [userId]);
    
    res.status(200).json({ success: true, nodes: result.rows });
  } catch (err) {
    console.error('Database recovery error:', err);
    res.status(500).json({ error: 'Failed to recover saved nodes for this user' });
  }
});

export default router;