import { pool } from './db';

export interface RequestLog {
  method: string;
  headers: Record<string, string | string[]>;
  body: unknown;
  query: Record<string, string | string[]>;
  timestamp: number;
  ip: string;
}

// Check if a dynamic URL exists in our database configuration

export async function endpointExists(id: string): Promise<boolean> {
  const query = 'SELECT 1 FROM webhook_nodes WHERE hardware_id = $1 LIMIT 1;';
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
    log.timestamp
  ]);
}

// Get history logs ordered with the latest captures at the top
export async function getLogs(id: string): Promise<RequestLog[] | null> {
  // First make sure the endpoint node is structurally valid
  const exists = await endpointExists(id);
  if (!exists) return null;

  const query = `
    SELECT method, headers, body, query, ip, timestamp 
    FROM webhook_logs 
    WHERE hardware_id = $1 
    ORDER BY timestamp DESC;
  `;
  const result = await pool.query(query, [id]);
  
  return result.rows as RequestLog[];
}