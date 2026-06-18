import { Router, Request, Response } from 'express';
import { generateId } from '../utils/idgen';
import { pool } from '../utils/db';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { userId } = req.body; // Expecting userId from your frontend auth session
  const id = generateId();

  if (!userId) {
    res.status(400).json({ error: 'Missing userId parameter' });
    return;
  }

  try {
    // Persist the custom endpoint generation to Postgres
    const query = `
      INSERT INTO webhook_nodes (user_id, hardware_id)
      VALUES ($1, $2)
      ON CONFLICT (hardware_id) DO NOTHING
      RETURNING *;
    `;
    await pool.query(query, [userId, id]);

    const protocol = process.env.NODE_ENV === 'production' ? 'https' : req.protocol;
    const baseUrl = `${protocol}://${req.get('host')}`;

    res.status(201).json({
      id,
      url: `${baseUrl}/hook/${id}`,
    });
  } catch (err) {
    console.error('Database insertion error:', err);
    res.status(500).json({ error: 'Failed to create and save persistent webhook endpoint' });
  }
});

export default router;