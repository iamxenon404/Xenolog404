import { Router, Request, Response } from 'express';
import { appendLog } from '../utils/storage';
import { pool } from '../utils/db'; // Import your DB pool directly

const router = Router();

router.all('/:id', async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    // 1. Structural check against the database core
    const nodeCheck = await pool.query(
      `SELECT user_id, created_at FROM webhook_nodes WHERE hardware_id = $1 LIMIT 1;`,
      [id]
    );

    if ((nodeCheck.rowCount ?? 0) === 0) {
      res.status(404).json({ error: `No webhook endpoint found for id: ${id}` });
      return;
    }

    const node = nodeCheck.rows[0];
    const isGuest = node.user_id === 'guest_session' || !node.user_id;

    // 2. Only enforce the 24-hour lifecycle gate if it's a guest channel
    if (isGuest) {
      const createdAtMs = new Date(node.created_at).getTime();
      const oneDayInMs = 24 * 60 * 60 * 1000;
      if (Date.now() - createdAtMs > oneDayInMs) {
        res.status(404).json({ error: `No webhook endpoint found for id: ${id}` });
        return;
      }
    }

    // 3. Log capture commit
    await appendLog(id, {
      method: req.method,
      headers: req.headers as Record<string, string | string[]>,
      body: req.body ?? null,
      query: req.query as Record<string, string | string[]>,
      timestamp: Date.now(),
      ip: req.ip ?? req.socket.remoteAddress ?? 'unknown',
    });

    res.status(200).json({ received: true });
  } catch (err) {
    console.error(`Error saving inbound webhook data stream for node ${id}:`, err);
    res.status(500).json({ error: 'Internal failure processing incoming datastream transmission' });
  }
});

export default router;