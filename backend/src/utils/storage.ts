import { pool } from './db';

export interface RequestLog {
  method: string;
  headers: Record<string, string | string[]>;
  body: unknown;
  query: Record<string, string | string[]>;
  timestamp: number;
  ip: string;
}

// Check if a dynamic URL exists in our database configuration and is still valid
export async function endpointExists(id: string): Promise<boolean> {
  // 🍏 Only consider the endpoint active if it was created within the last 24 hours
  const query = `
    SELECT 1 FROM webhook_nodes 
    WHERE hardware_id = $1 
    AND created_at >= NOW() - INTERVAL '24 hours' 
    LIMIT 1;
  `;
  const result = await pool.query(query, [id]);
  
  // Using ?? 0 provides a fallback if rowCount is null, clearing the error
  return (result.rowCount ?? 0) > 0;
}

// Log a fresh incoming webhook intercept directly to Postgres
export async function appendLog(id: string, log: RequestLog): Promise<void> {
  const query = `
    INSERT INTO webhook_logs (hardware_id, method, headers, body, query, ip, timestamp)
    VALUES ($1, $2, $3, $4, $5, $6, $7);
  `;

  await pool.query(query, [
    id,
    log.method,
    JSON.stringify(log.headers),
    JSON.stringify(log.body),
    JSON.stringify(log.query),
    log.ip,
    new Date(log.timestamp) // Converts the number token into a SQL-friendly Date object
  ]);
}

// Get history logs ordered with the latest captures at the top
// Get history logs ordered with the latest captures at the top
export async function getLogs(id: string): Promise<RequestLog[] | null> {
  // 1. Verify the node actually exists in the base configurations table
  const nodeCheck = await pool.query(
    `SELECT user_id, created_at FROM webhook_nodes WHERE hardware_id = $1 LIMIT 1;`,
    [id]
  );

  if ((nodeCheck.rowCount ?? 0) === 0) {
    return null; // Truly does not exist in the system at all -> 404
  }

  const node = nodeCheck.rows[0];
  const isGuest = node.user_id === 'guest_session' || !node.user_id;

  // 2. If it's a guest node, enforce the strict 24-hour expiration window
  if (isGuest) {
    const createdAtMs = new Date(node.created_at).getTime();
    const oneDayInMs = 24 * 60 * 60 * 1000;
    if (Date.now() - createdAtMs > oneDayInMs) {
      return null; // Expired guest link -> 404
    }
  }

  // 3. Query records. Notice we removed the restrictive 24-hour log filter for authenticated nodes
  const logQuery = `
    SELECT method, headers, body, query, ip, timestamp 
    FROM webhook_logs 
    WHERE hardware_id = $1 
    ORDER BY timestamp DESC;
  `;
  const result = await pool.query(logQuery, [id]);
  
  // 🍏 ALWAYS return an array (even if empty []) instead of hitting a 404 block
  return result.rows as RequestLog[];
}