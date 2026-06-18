import { Router, Request, Response } from 'express';
import { endpointExists, appendLog } from '../utils/storage';

const router = Router();

// 🍏 Converted to an async route handler
router.all('/:id', async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    // 🍏 Await the asynchronous database existence check
    const exists = await endpointExists(id);
    
    if (!exists) {
      res.status(404).json({ error: `No webhook endpoint found for id: ${id}` });
      return;
    }

    // 🍏 Await the asynchronous INSERT command to commit the log entry
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