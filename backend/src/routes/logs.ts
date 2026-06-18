import { Router, Request, Response } from 'express';
import { getLogs } from '../utils/storage';
import { pool } from '../utils/db';

const router = Router();

// 1. Specific user history path remains at the TOP
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

// 2. Wildcard catch-all parameter at the BOTTOM (Updated to async/await)
router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    // 🍏 Await the asynchronous database query from storage.ts
    const logs = await getLogs(id);

    if (logs === null) {
      res.status(404).json({ error: `No webhook endpoint found for id: ${id}` });
      return;
    }

    // Safely deliver the rows back to your LogViewer layout
    res.status(200).json({ id, logs });
  } catch (err) {
    console.error(`Error retrieving log streams for hardware node ${id}:`, err);
    res.status(500).json({ error: 'Internal server failure parsing log history registry' });
  }
});

export default router;