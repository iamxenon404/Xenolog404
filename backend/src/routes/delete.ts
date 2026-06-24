import { Router, Request, Response } from 'express';
import { pool } from '../utils/db';

const router = Router();

router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { userId } = req.body; // Protect so only the node owner can delete it

  try {
    // 1. Double check that the node actually belongs to the requesting user
    const ownerCheck = await pool.query(
      'SELECT user_id FROM webhook_nodes WHERE hardware_id = $1 LIMIT 1;',
      [id]
    );

    if ((ownerCheck.rowCount ?? 0) === 0) {
      res.status(404).json({ error: 'Target hardware node not found.' });
      return;
    }

    // Guest strings or registered IDs must match up perfectly
    if (ownerCheck.rows[0].user_id !== userId) {
      res.status(403).json({ error: 'Unauthorized payload deletion request.' });
      return;
    }

    // 2. Cascade delete records across your operational tables
    // (Wipes out history logs first so it doesn't fail foreign key constraint)
    await pool.query('DELETE FROM webhook_logs WHERE hardware_id = $1;', [id]);
    await pool.query('DELETE FROM webhook_nodes WHERE hardware_id = $1;', [id]);

    res.status(200).json({ success: true, deletedId: id });
  } catch (err) {
    console.error(`Error destroying log stream workspace ${id}:`, err);
    res.status(500).json({ error: 'Internal database processing failure.' });
  }
});

export default router;